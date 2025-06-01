// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RWASingleton
 * @dev Single contract managing RWA NFTs and their Dutch Auctions
 */
contract RWASingleton is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    
    // Structs
    struct RWAMetadata {
        string productName;
        string description;
        string sellerDetails;
        string imageURI;
        bytes32[] certificateHashes; // Optional - for ZK Proof verification
        string refundPolicy;
        string termsAndConditions;
        uint256 createdAt;
        address seller;
    }
    
    struct DutchAuction {
        uint256 startingPrice;
        uint256 minimumPrice;
        uint256 startTime;
        uint256 endTime;
        address seller;
        bool isActive;
        bool hasEnded;
        uint256 createdAt;
    }
    
    // Constants
    uint256 public constant AUCTION_DURATION = 24 hours;
    uint256 public constant PRICE_REDUCTION_FACTOR = 2; // 50% minimum price
    
    // State variables
    uint256 private _tokenIdCounter;
    
    // Mappings
    mapping(uint256 => RWAMetadata) public rwaMetadata;
    mapping(uint256 => DutchAuction) public auctions;
    mapping(address => uint256[]) public sellerTokens;
    
    // Contract settings
    uint256 public listingFee = 0.001 ether;
    address public feeRecipient;
    
    // Arrays for tracking
    uint256[] public allTokenIds;
    uint256[] public activeAuctions;
    
    // Events
    event RWAListed(
        uint256 indexed tokenId,
        address indexed seller,
        string productName,
        uint256 startingPrice,
        uint256 minimumPrice,
        uint256 startTime,
        uint256 endTime
    );
    
    event AuctionPurchased(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 price,
        uint256 timestamp
    );
    
    event AuctionCanceled(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 timestamp
    );
    
    event ListingFeeUpdated(uint256 newFee);
    event FeeRecipientUpdated(address newRecipient);
    
    // Modifiers
    modifier auctionExists(uint256 tokenId) {
        require(auctions[tokenId].seller != address(0), "Auction does not exist");
        _;
    }
    
    modifier auctionActive(uint256 tokenId) {
        DutchAuction memory auction = auctions[tokenId];
        require(auction.isActive && !auction.hasEnded, "Auction is not active");
        require(block.timestamp >= auction.startTime, "Auction has not started");
        require(block.timestamp <= auction.endTime, "Auction time has expired");
        _;
    }
    
    modifier onlyTokenSeller(uint256 tokenId) {
        require(auctions[tokenId].seller == msg.sender, "Only seller can call this function");
        _;
    }
    
    constructor(
        string memory name,
        string memory symbol,
        address _feeRecipient
    ) ERC721(name, symbol) ERC721URIStorage() Ownable(msg.sender) {
        feeRecipient = _feeRecipient;
    }
    
    /**
     * @dev List a new RWA with Dutch Auction
     */
    function listRWA(
        // RWA Metadata
        string memory productName,
        string memory description,
        string memory sellerDetails,
        string memory imageURI,
        bytes32[] memory certificateHashes, // Optional - can be empty array
        string memory refundPolicy,
        string memory termsAndConditions,
        string memory tokenURI,
        
        // Auction Details
        uint256 startingPrice
    ) external payable nonReentrant returns (uint256 tokenId) {
        require(msg.value >= listingFee, "Insufficient listing fee");
        require(startingPrice > 0, "Starting price must be greater than 0");
        require(bytes(productName).length > 0, "Product name required");
        
        tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // Mint NFT to seller
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        // Store RWA metadata
        rwaMetadata[tokenId] = RWAMetadata({
            productName: productName,
            description: description,
            sellerDetails: sellerDetails,
            imageURI: imageURI,
            certificateHashes: certificateHashes,
            refundPolicy: refundPolicy,
            termsAndConditions: termsAndConditions,
            createdAt: block.timestamp,
            seller: msg.sender
        });
        
        // Create Dutch Auction
        uint256 minimumPrice = startingPrice / PRICE_REDUCTION_FACTOR;
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + AUCTION_DURATION;
        
        auctions[tokenId] = DutchAuction({
            startingPrice: startingPrice,
            minimumPrice: minimumPrice,
            startTime: startTime,
            endTime: endTime,
            seller: msg.sender,
            isActive: true,
            hasEnded: false,
            createdAt: block.timestamp
        });
        
        // Update tracking arrays and mappings
        allTokenIds.push(tokenId);
        activeAuctions.push(tokenId);
        sellerTokens[msg.sender].push(tokenId);
        
        // Transfer listing fee
        if (listingFee > 0) {
            (bool success, ) = payable(feeRecipient).call{value: listingFee}("");
            require(success, "Fee transfer failed");
        }
        
        // Refund excess payment
        if (msg.value > listingFee) {
            uint256 refund = msg.value - listingFee;
            (bool refundSuccess, ) = payable(msg.sender).call{value: refund}("");
            require(refundSuccess, "Refund transfer failed");
        }
        
        emit RWAListed(
            tokenId,
            msg.sender,
            productName,
            startingPrice,
            minimumPrice,
            startTime,
            endTime
        );
    }
    
    /**
     * @dev Get current auction price for a token
     */
    function getCurrentPrice(uint256 tokenId) public view auctionExists(tokenId) returns (uint256) {
        DutchAuction memory auction = auctions[tokenId];
        
        if (auction.hasEnded || !auction.isActive) {
            return 0;
        }
        
        if (block.timestamp >= auction.endTime) {
            return auction.minimumPrice;
        }
        
        if (block.timestamp <= auction.startTime) {
            return auction.startingPrice;
        }
        
        // Linear price reduction calculation
        uint256 timeElapsed = block.timestamp - auction.startTime;
        uint256 priceReduction = (auction.startingPrice - auction.minimumPrice) * timeElapsed / AUCTION_DURATION;
        
        return auction.startingPrice - priceReduction;
    }
    
    /**
     * @dev Purchase NFT at current auction price
     */
    function purchase(uint256 tokenId) external payable nonReentrant auctionActive(tokenId) {
        uint256 currentPrice = getCurrentPrice(tokenId);
        require(msg.value >= currentPrice, "Insufficient payment");
        
        DutchAuction storage auction = auctions[tokenId];
        address seller = auction.seller;
        
        // End auction
        auction.isActive = false;
        auction.hasEnded = true;
        
        // Remove from active auctions
        _removeFromActiveAuctions(tokenId);
        
        // Transfer NFT to buyer
        _transfer(seller, msg.sender, tokenId);
        
        // Transfer payment to seller
        (bool success, ) = payable(seller).call{value: currentPrice}("");
        require(success, "Payment transfer failed");
        
        // Refund excess payment
        if (msg.value > currentPrice) {
            uint256 refund = msg.value - currentPrice;
            (bool refundSuccess, ) = payable(msg.sender).call{value: refund}("");
            require(refundSuccess, "Refund transfer failed");
        }
        
        emit AuctionPurchased(tokenId, msg.sender, seller, currentPrice, block.timestamp);
    }
    
    /**
     * @dev Cancel auction (only seller)
     */
    function cancelAuction(uint256 tokenId) external auctionExists(tokenId) onlyTokenSeller(tokenId) {
        DutchAuction storage auction = auctions[tokenId];
        require(auction.isActive && !auction.hasEnded, "Auction is not active");
        
        auction.isActive = false;
        auction.hasEnded = true;
        
        // Remove from active auctions
        _removeFromActiveAuctions(tokenId);
        
        emit AuctionCanceled(tokenId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Emergency withdrawal for expired auctions
     */
    function emergencyEndAuction(uint256 tokenId) external auctionExists(tokenId) onlyTokenSeller(tokenId) {
        DutchAuction storage auction = auctions[tokenId];
        require(block.timestamp > auction.endTime, "Auction has not expired");
        require(auction.isActive && !auction.hasEnded, "Auction is not active");
        
        auction.isActive = false;
        auction.hasEnded = true;
        
        // Remove from active auctions
        _removeFromActiveAuctions(tokenId);
        
        emit AuctionCanceled(tokenId, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Get RWA metadata for a token
     */
    function getRWAMetadata(uint256 tokenId) external view returns (RWAMetadata memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return rwaMetadata[tokenId];
    }
    
    /**
     * @dev Get auction information for a token
     */
    function getAuctionInfo(uint256 tokenId) external view auctionExists(tokenId) returns (
        uint256 currentPrice,
        uint256 startingPrice,
        uint256 minimumPrice,
        uint256 startTime,
        uint256 endTime,
        address seller,
        bool isActive,
        bool hasEnded,
        uint256 timeRemaining
    ) {
        DutchAuction memory auction = auctions[tokenId];
        
        return (
            getCurrentPrice(tokenId),
            auction.startingPrice,
            auction.minimumPrice,
            auction.startTime,
            auction.endTime,
            auction.seller,
            auction.isActive,
            auction.hasEnded,
            auction.endTime > block.timestamp ? auction.endTime - block.timestamp : 0
        );
    }
    
    /**
     * @dev Get certificate hashes for ZK proof verification
     */
    function getCertificateHashes(uint256 tokenId) external view returns (bytes32[] memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return rwaMetadata[tokenId].certificateHashes;
    }
    
    /**
     * @dev Check if token has any certificate hashes
     */
    function hasCertificates(uint256 tokenId) external view returns (bool) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return rwaMetadata[tokenId].certificateHashes.length > 0;
    }
    
    /**
     * @dev Verify if a certificate hash exists for a token
     */
    function verifyCertificateHash(uint256 tokenId, bytes32 hash) external view returns (bool) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        bytes32[] memory hashes = rwaMetadata[tokenId].certificateHashes;
        
        if (hashes.length == 0) {
            return false;
        }
        
        for (uint256 i = 0; i < hashes.length; i++) {
            if (hashes[i] == hash) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @dev Get all tokens owned by a seller
     */
    function getSellerTokens(address seller) external view returns (uint256[] memory) {
        return sellerTokens[seller];
    }
    
    /**
     * @dev Get all active auctions
     */
    function getActiveAuctions() external view returns (uint256[] memory) {
        return activeAuctions;
    }
    
    /**
     * @dev Get all token IDs
     */
    function getAllTokens() external view returns (uint256[] memory) {
        return allTokenIds;
    }
    
    /**
     * @dev Get total number of tokens
     */
    function getTotalTokens() external view returns (uint256) {
        return _tokenIdCounter;
    }
    
    /**
     * @dev Get paginated active auctions
     */
    function getActiveAuctionsPaginated(uint256 offset, uint256 limit) external view returns (uint256[] memory) {
        require(offset < activeAuctions.length, "Offset exceeds array length");
        
        uint256 end = offset + limit;
        if (end > activeAuctions.length) {
            end = activeAuctions.length;
        }
        
        uint256[] memory result = new uint256[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = activeAuctions[i];
        }
        
        return result;
    }
    
    /**
     * @dev Update certificate hashes (only owner)
     */
    function updateCertificateHashes(uint256 tokenId, bytes32[] memory newHashes) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        rwaMetadata[tokenId].certificateHashes = newHashes;
    }
    
    /**
     * @dev Update listing fee (only owner)
     */
    function updateListingFee(uint256 newFee) external onlyOwner {
        listingFee = newFee;
        emit ListingFeeUpdated(newFee);
    }
    
    /**
     * @dev Update fee recipient (only owner)
     */
    function updateFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "Invalid fee recipient");
        feeRecipient = newRecipient;
        emit FeeRecipientUpdated(newRecipient);
    }
    
    /**
     * @dev Emergency withdrawal (only owner)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    // Internal functions
    function _removeFromActiveAuctions(uint256 tokenId) internal {
        for (uint256 i = 0; i < activeAuctions.length; i++) {
            if (activeAuctions[i] == tokenId) {
                activeAuctions[i] = activeAuctions[activeAuctions.length - 1];
                activeAuctions.pop();
                break;
            }
        }
    }
    
    // Override required functions
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721) returns (address) {
        super._burn(tokenId);
        delete rwaMetadata[tokenId];
        delete auctions[tokenId];
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
