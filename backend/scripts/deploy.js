const hre = require("hardhat");

async function main() {
    const rwa_factory = await hre.ethers.getContractFactory("RWASingleton");

	// test NFT
	const rwa = await rwa_factory.deploy("Tomato", "TMT", '0xC96662B0Ce405652fd9844056bd1F302fbD3c74C');
	await rwa.waitForDeployment();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
