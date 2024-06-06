import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { owner_pk } = require('./config.json');

const config: HardhatUserConfig = {
  defaultNetwork: "aurora",
  networks: {
    hardhat: {
    },
    aurora: {
      url: "https://mainnet.aurora.dev/727b7d29cff3f12b1976b5a1bcf8e7c2b1bc612a8856b460ab9bbdfadd725ba",
      chainId: 1313161554,
      accounts: [owner_pk]
    },
    polygon: {
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: [owner_pk, owner_pk]
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
