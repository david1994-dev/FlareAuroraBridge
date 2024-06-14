import { ethers } from "hardhat";
const {destination_lz_address} = require('../../../constant.json');
const {faucet_address} = require('../../../config.json');
const fs = require('fs');

async function main() {
 //deploy AuroraFlareOFT
 console.log('deploy AuroraFlareOFT....')
 const AuroraFlareOFTFactory = await ethers.getContractFactory("AuroraV1FlareOFT");  
 const AuroraFlareOFTInstance = await AuroraFlareOFTFactory.deploy("Flare Test Tokenaa", "2TTT", destination_lz_address);
 await AuroraFlareOFTInstance.deployed();
 const AuroraFlareOFTAddress = AuroraFlareOFTInstance.address;

 console.log("done AuroraFlareOFT: " + AuroraFlareOFTAddress)


 const data = fs.readFileSync('constant.json');
 const jsonData = JSON.parse(data);
 
  jsonData.AuroraFlareOFTAddress = AuroraFlareOFTAddress;
  fs.writeFileSync('constant.json', JSON.stringify(jsonData));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
