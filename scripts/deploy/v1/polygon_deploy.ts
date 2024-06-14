import { ethers } from "hardhat";
const {origin_lz_address, polygonFlareAddress} = require('../../../constant.json');
const {faucet_address} = require('../../../config.json');
const fs = require('fs');

async function main() {
//  //deploy PolygonFlare
//  console.log('deploy PolygonFlare....')
//  const PolygonFlareFactory = await ethers.getContractFactory("FlareTestToken");

//  const PolygonFlareInstant = await PolygonFlareFactory.deploy();
//  await PolygonFlareInstant.deployed();
//  const polygonFlareAddress = PolygonFlareInstant.address;

//  console.log("done polygonFlareAddress: " + polygonFlareAddress)

 //deploy PolygonFlareOFTAdapter
 console.log('deploy PolygonFlareOFTAdapter....')
 const PolygonFlareOFTAdapterFactory = await ethers.getContractFactory("PolygonProxy");
 const PolygonFlareOFTAdapterInstance = await PolygonFlareOFTAdapterFactory.deploy(origin_lz_address, polygonFlareAddress);
 await PolygonFlareOFTAdapterInstance.deployed();
 const PolygonFlareOFTAdapterAddress = PolygonFlareOFTAdapterInstance.address;

 console.log("done PolygonFlareOFTAdapter: " + PolygonFlareOFTAdapterAddress)


 const data = fs.readFileSync('constant.json');
 const jsonData = JSON.parse(data);
 
  jsonData.polygonFlareAddress = polygonFlareAddress;
  jsonData.PolygonFlareOFTAdapterAddress = PolygonFlareOFTAdapterAddress;
  fs.writeFileSync('constant.json', JSON.stringify(jsonData));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
