const ethers = require('ethers');

const {token_address, owner_pk, spin_address, faucet_address} = require('../../config.json');

const PROVIDER = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com", 137);

const CONTRACT_ABI = [{
  "constant": false,
  "inputs": [
      {
          "name": "_spender",
          "type": "address"
      },
      {
          "name": "_value",
          "type": "uint256"
      }
  ],
  "name": "approve",
  "outputs": [
      {
          "name": "",
          "type": "bool"
      }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];

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
 
  const tokenAmount = 1000000; // 1M
  //const tokenAmount = 10000000; // 10M
  //const tokenAmount = 50000000; // 50M
  //const tokenAmount = 100000000; // 100M
  //const tokenAmount = 200000000; // 200M
  // const tokenAmount = 1000000000; // 1B
  let txOptions = {
    gasPrice: 113000000000, // 40 Gwei
    gasLimit: 50000
    // nonce: 9
  };

  let approve_amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )

    const a = await FLARE_CONTRACT.approve("0x79517Eca22dad3e96F4d84fd3C6dae3551aBdFc6", ethers.utils.parseEther(tokenAmount.toString()), txOptions);

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
