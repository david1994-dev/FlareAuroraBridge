import hre, { ethers } from 'hardhat'

const { owner_pk} = require('../../config.json');
const {PolygonFlareOFTAdapterAddress, AuroraFlareOFTAddress} = require('../../constant.json');
import {EndpointId} from '@layerzerolabs/lz-definitions';

// const ethers = require('ethers');
    async function main() {
    const eidA = EndpointId.POLYGON_MAINNET
    const eidB = EndpointId.AURORA_MAINNET
    const PROVIDER = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com", 137);
    const owner = (await hre.ethers.getSigners())[0];

    const oftAdapterArtifact = await hre.artifacts.readArtifact(
        "PolygonProxy"
    );

    const FLARE_WALLET = new ethers.Wallet(owner_pk, PROVIDER);
    const myOFTA = new ethers.Contract(
        PolygonFlareOFTAdapterAddress,
        oftAdapterArtifact.abi,
        owner
    );

    const oftArtifact = await hre.artifacts.readArtifact(
        "AuroraV1FlareOFT"
    );


    const myOFTB = new ethers.Contract(
        AuroraFlareOFTAddress,
        oftArtifact.abi,
        owner
    );

    
    const signers = await ethers.getSigners()

    const ownerA = signers.at(0)!
    const ownerB = ownerA;
    let txOptions = {
        gasPrice: 40000000000, // 40 Gwei
        gasLimit: 50000
        // nonce: 9
      };
    // const myOFTA = (await ethers.getContractFactory("PolygonFlareAdapter")).attach("0x8354dbe1407A5318A6dA94925f024fd5E6325Bd6");//polygon adapter

    let a = await myOFTA.connect(ownerA).setTrustedRemote(eidB,  ethers.utils.solidityPack(["address", "address"], [myOFTB.address, myOFTA.address]))
    let b = await myOFTB.connect(ownerB).setTrustedRemote(eidA,  ethers.utils.solidityPack(["address", "address"], [myOFTA.address, myOFTB.address]))
    console.log(a, b);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
