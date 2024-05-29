import { expect } from "chai";

import {
  PolygonFlareOFTAdapterAddress,
  AuroraFlareOFTAddress,
} from "../constant.json";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from "@layerzerolabs/lz-definitions";
import hre, { ethers } from "hardhat";

// Test interacts with already deployed contracts
// to assert a send operation is possible
async function main() {
  const eidB = EndpointId.SEPOLIA_V2_TESTNET;

  const owner = (await hre.ethers.getSigners())[0];
  const oftAdapterArtifact = await hre.artifacts.readArtifact(
    "PolygonFlareOFTAdapter"
  );
  const myOFTA = new ethers.Contract(
    PolygonFlareOFTAdapterAddress,
    oftAdapterArtifact.abi,
    owner
  );
  const oftArtifact = await hre.artifacts.readArtifact("AuroraFlareOFT");
  const myOFTB = new ethers.Contract(
    AuroraFlareOFTAddress,
    oftArtifact.abi,
    owner
  );
  const erc20Artifact = await hre.artifacts.readArtifact("FlareTestToken");
  const myERC20 = new ethers.Contract(
    AuroraFlareOFTAddress,
    erc20Artifact.abi,
    owner
  );

  const initialAmount = await myERC20.balanceOf(owner.address);

  // Defining the amount of tokens to send and constructing the parameters for the send operation
  const tokensToSend = ethers.utils.parseEther("1");

  // Defining extra message execution options for the send operation
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(200000, 0)
    .toHex()
    .toString();

  const sendParam = [
    eidB,
    ethers.utils.zeroPad(owner.address, 32), //my metamask address
    tokensToSend,
    tokensToSend,
    options,
    "0x",
    "0x",
  ];

  // Fetching the native fee for the token send operation
  const [nativeFee] = await myOFTA.quoteSend(sendParam, false);
  console.log("nativeFee", ethers.utils.formatEther(nativeFee));

  await myERC20.approve(myOFTA.address, tokensToSend);

  // Executing the send operation from myOFTA contract
  const tx = await myOFTA.send(sendParam, [nativeFee, 0], owner.address, {
    value: nativeFee,
  });
  console.log(tx);

  // Fetching the final token balances of ownerA and ownerB
  const finalBalanceA = await myERC20.balanceOf(owner.address);
  const finalBalanceB = await myOFTB.balanceOf(owner.address);

  // Asserting that the final balances are as expected after the send operation
  expect(finalBalanceA).eql(initialAmount.sub(tokensToSend));
  expect(finalBalanceB).eql(tokensToSend);
  // console,log(finalBalanceA, finalBalanceB) ;
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
