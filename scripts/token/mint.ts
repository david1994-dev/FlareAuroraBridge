import {ethers} from "hardhat";

const {token_address, wallet_address, faucet_address, airdrop_address, spin_address} = require('../../config.json');

async function main() {

    const accountAddress = "0x32a61e97Af471887923E8d0bC2b4F243975297eC"; // Faucet

    //const tokenAmount = 1000000; // 1M
    //const tokenAmount = 10000000; // 10M
    const tokenAmount = 50000000; // 50M
    //const tokenAmount = 100000000; // 100M
	//const tokenAmount = 1000000000; // 1B

    const gFlareContract = await ethers.getContractFactory("FlareToken");
    const gFlare = await (gFlareContract).attach(token_address);

    const a = await gFlare.mint(spin_address, ethers.utils.parseEther(tokenAmount.toString()));

    console.log(a);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
