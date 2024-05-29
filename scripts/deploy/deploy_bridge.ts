import { ethers } from "hardhat";

async function main() {
  const ContractFactory = await ethers.getContractFactory("AuroraFlareOFT");
  // const ContractFactory = await ethers.getContractFactory("PolygonFlareAdapter");

  // const instance = await ContractFactory.deploy("0x3F231E2c08C41cFEd36cE575416F200C8B81FfE4", "0x1a44076050125825900e736c501f859c50fE728c", "0x8edfA0D8616Df076cAe8448dc5354Dc05e3e4cba");
  const instance = await ContractFactory.deploy("TestToken1", "1T","0x1a44076050125825900e736c501f859c50fE728c", "0x8edfA0D8616Df076cAe8448dc5354Dc05e3e4cba");
  await instance.deployed();
  
  console.log(`Contract deployed to ${instance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
