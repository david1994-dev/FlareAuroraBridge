import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import { owner_pk } from "./config.json";

const config: HardhatUserConfig = {
  defaultNetwork: "amoy",
  networks: {
    amoy: {
      url: "https://polygon-amoy-bor-rpc.publicnode.com",
      chainId: 80002,
      accounts: [owner_pk],
    },
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
