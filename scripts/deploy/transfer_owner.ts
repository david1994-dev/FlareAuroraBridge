import {ethers} from "hardhat";

const {faucet_address} = require('../../config.json');

async function main() {
    const newOwnerAddress = "0x34Bf5996391B6195eF673744435d668741E4A8b0"; // Dev


    const gFlareContract = await ethers.getContractFactory("PipeFlareFaucet");
    const gFlare = await (gFlareContract).attach(faucet_address);

    const a = await gFlare.transferOwnership(newOwnerAddress);

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
