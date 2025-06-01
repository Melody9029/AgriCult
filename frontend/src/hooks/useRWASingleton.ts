import { useContractRead, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import contractData from '../contracts/RWASingleton.json';

export function useRWASingleton() {
  // Read functions
  const { data: activeAuctions } = useContractRead({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: 'activeAuctions',
  });

  const { data: listingFee } = useContractRead({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: 'listingFee',
  });

  // Write functions
  const { writeAsync: listRWA } = useContractWrite({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: 'listRWA',
  });

  const { writeAsync: purchase } = useContractWrite({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: 'purchase',
  });

  const { writeAsync: cancelAuction } = useContractWrite({
    address: contractData.address as `0x${string}`,
    abi: contractData.abi,
    functionName: 'cancelAuction',
  });

  // Helper functions
  const listProduct = async (
    productName: string,
    description: string,
    sellerDetails: string,
    imageURI: string,
    certificateHashes: string[],
    refundPolicy: string,
    termsAndConditions: string,
    tokenURI: string,
    startingPrice: number
  ) => {
    if (!listingFee) throw new Error('Listing fee not loaded');

    return listRWA({
      args: [
        productName,
        description,
        sellerDetails,
        imageURI,
        certificateHashes,
        refundPolicy,
        termsAndConditions,
        tokenURI,
        parseEther(startingPrice.toString()),
      ],
      value: listingFee,
    });
  };

  const purchaseProduct = async (tokenId: number, price: number) => {
    return purchase({
      args: [tokenId],
      value: parseEther(price.toString()),
    });
  };

  const cancelProduct = async (tokenId: number) => {
    return cancelAuction({
      args: [tokenId],
    });
  };

  return {
    activeAuctions,
    listingFee,
    listProduct,
    purchaseProduct,
    cancelProduct,
  };
} 