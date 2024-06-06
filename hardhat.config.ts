import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { owner_pk } = require('./config.json');

const config: HardhatUserConfig = {
  defaultNetwork: "polygon",
  networks: {
    hardhat: {
    },
    // aurora: {
    //   url: "https://avalanche.drpc.org",
    //   chainId: 43114,
    //   accounts: [owner_pk]


    //   // url: "https://rpc.sepolia.org",
    //   // chainId: 11155111,
    //   // accounts: [owner_pk]
    // },
    polygon: {
      url: "https://polygon-rpc.com",
      chainId: 137,
      //gasPrice: 0,
      accounts: [owner_pk, owner_pk]

      // url: "https://polygon-amoy-bor-rpc.publicnode.com",
      // chainId: 80002,
      // //gasPrice: 0,
      // accounts: [owner_pk, owner_pk]
    }
  },
  solidity: {
    version: "0.8.22",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
};

export default config;
