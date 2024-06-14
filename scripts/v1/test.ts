import { expect } from "chai";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from "@layerzerolabs/lz-definitions";
import hre, { ethers } from "hardhat";
const {PolygonFlareOFTAdapterAddress} = require('../../constant.json');

// Test interacts with already deployed contracts
// to assert a send operation is possible
async function main() {
    const eidB = EndpointId.AURORA_MAINNET
    const owner = (await hre.ethers.getSigners())[0];
    const oftAdapterArtifact = await hre.artifacts.readArtifact(
        "PolygonProxy"
    );
    
    const myOFTA = new ethers.Contract(
        PolygonFlareOFTAdapterAddress,
        oftAdapterArtifact.abi,
        owner
    );

    // Defining the amount of tokens to send and constructing the parameters for the send operation
    const tokensToSend = ethers.utils.parseEther("1");
   // estimate nativeFees
   let nativeFee = (await myOFTA.estimateSendFee(eidB, owner.address, tokensToSend, false, "0x")).nativeFee
        console.log(nativeFee);
        return;
   // swaps token to other chain
   let tx = await myOFTA.connect(owner).sendFrom(
        owner.address,
        eidB,
        owner.address,
        tokensToSend,
        owner.address,
       ethers.constants.AddressZero,
       "0x",
       { value: nativeFee }
   )

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
