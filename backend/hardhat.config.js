require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.28",
  settings: {
    viaIR: true,
    optimizer: {
      enabled: true,
        runs: 200,
      }
  }
  },
  networks: {
    flow: {
    url: "https://mainnet.evm.nodes.onflow.org",
        accounts: [process.env.PRIVATE_KEY],
        chainId: 747,
    }
  }
};
