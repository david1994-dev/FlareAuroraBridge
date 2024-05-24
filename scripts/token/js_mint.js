const ethers = require('ethers');

const {token_address, owner_pk, spin_address, faucet_address} = require('../../config.json');

const PROVIDER = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com", 137);
const WALLET = new ethers.Wallet(owner_pk, PROVIDER);

const CONTRACT_ABI = [{
  "inputs": [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "mint",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},];
const CONTRACT_ADDRESS = token_address;
const FLARE_WALLET = new ethers.Wallet(owner_pk, PROVIDER);
const FLARE_CONTRACT = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  FLARE_WALLET
);

async function getGasPrice() {
  const currentGasPrice = await PROVIDER.getGasPrice();

  return ethers.utils.hexlify(parseInt(currentGasPrice));
}


async function main() {
 
  //const tokenAmount = 1000000; // 1M
  //const tokenAmount = 10000000; // 10M
  //const tokenAmount = 50000000; // 50M
  //const tokenAmount = 100000000; // 100M
  //const tokenAmount = 200000000; // 200M
  const tokenAmount = 1000000000; // 1B
  let txOptions = {
    gasPrice: 40000000000, // 40 Gwei
  };

  console.log(txOptions);

  //const a = await gFlare.mint(accountAddress, ethers.utils.parseEther(tokenAmount.toString()));
  const a = await FLARE_CONTRACT.mint(faucet_address, ethers.utils.parseEther(tokenAmount.toString()), txOptions);
  //const a = await gFlare.mint(wallet_address, ethers.utils.parseEther(tokenAmount.toString()));
  //const a = await FLARE_CONTRACT.mint(spin_address, ethers.utils.parseEther(tokenAmount.toString()));
  //const a = await FLARE_CONTRACT.mint("0x54440510477Cef723eF6e0Af4fAF898e89609289", ethers.utils.parseEther(tokenAmount.toString())); // Signer

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
