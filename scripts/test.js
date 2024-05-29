const {token_address, owner_pk, spin_address, faucet_address} = require('../config.json');
const {mumbai_address, sepolia} = require('../constant.json');
const Options = require('@layerzerolabs/lz-v2-utilities');
const EndpointId = require('@layerzerolabs/lz-definitions');
const hardhat = require('hardhat');
// import { ethers } from "hardhat";
const {ethers} = hardhat;

    async function main() {
      console.log(owner_pk, mumbai_address);
      const eidA = EndpointId.AURORA_MAINNET
      const eidB = EndpointId.POLYGON_MAINNET
      const PROVIDER = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com", 137);

      //deploy PolygonFlare
      console.log('deploy PolygonFlare....')
      const PolygonFlareFactory = await ethers.getContractFactory("FlareTestToken");

      const PolygonFlareInstant = await PolygonFlareFactory.deploy();
      await PolygonFlareInstant.deployed();
      const polygonFlareAddress = PolygonFlareInstant.address;

      console.log("done polygonFlareAddress: " + polygonFlareAddress)

      //deploy PolygonFlareOFTAdapter
      console.log('deploy PolygonFlareOFTAdapter....')
      const PolygonFlareOFTAdapterFactory = await ethers.getContractFactory("PolygonFlareAdapter");
      const PolygonFlareOFTAdapterInstance = await PolygonFlareOFTAdapterFactory.deploy(polygonFlareAddress, mumbai_address, faucet_address);
      await PolygonFlareOFTAdapterInstance.deployed();
      const PolygonFlareOFTAdapterAddress = PolygonFlareOFTAdapterInstance.address;

      console.log("done PolygonFlareOFTAdapter: " + PolygonFlareOFTAdapterAddress)

      //deploy AuroraFlareOFT
      console.log('deploy AuroraFlareOFT....')
      const AuroraFlareOFTFactory = await ethers.getContractFactory("AuroraFlareOFT");    
      const AuroraFlareOFTInstance = await AuroraFlareOFTFactory.deploy("Flare Test Token", "2T",sepolia, faucet_address);
      await AuroraFlareOFTInstance.deployed();
      const AuroraFlareOFTAddress = AuroraFlareOFTInstance.address;

      console.log("done AuroraFlareOFT: " + AuroraFlareOFTAddress)

      //call set peer on each
      console.log('set peer....')
      const CONTRACT_ADDRESS = PolygonFlareOFTAdapterAddress; //lz flare polygon address
      const FLARE_WALLET = new ethers.Wallet(owner_pk, PROVIDER);
  
      const signers = await ethers.getSigners()
  
      const ownerA = signers.at(0)
      const ownerB = signers.at(1)
      const endpointOwner = signers.at(2)

      const myOFTA = await PolygonFlareFactory.deploy('aOFT', 'aOFT', mumbai_address, ownerA.address)
      const myOFTB = await PolygonFlareFactory.deploy('bOFT', 'bOFT', sepolia, ownerB.address)
  
      await myOFTA.connect(ownerA).setPeer(eidB, ethers.utils.zeroPad(myOFTB.address, 32))
      await myOFTB.connect(ownerB).setPeer(eidA, ethers.utils.zeroPad(myOFTA.address, 32))


      //call approve
      console.log('set approve....')
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
      
      const FLARE_CONTRACT = new ethers.Contract(
        polygonFlareAddress,
        CONTRACT_ABI,
        FLARE_WALLET
      );
             
        // const tokenAmount = 1000000;
        let txOptions = {
          gasPrice: 40000000000, // 40 Gwei
          gasLimit: 50000
          // nonce: 9
        };

        let approve_amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )
        await FLARE_CONTRACT.approve(PolygonFlareOFTAdapterAddress, ethers.utils.parseEther(approve_amount.toString()), txOptions);
      
      //send token
      console.log('send....')
      const initialAmount = ethers.utils.parseEther('100')
        await myOFTA.mint(ownerA.address, initialAmount)

        // Defining the amount of tokens to send and constructing the parameters for the send operation
        const tokensToSend = ethers.utils.parseEther('1')

        // Defining extra message execution options for the send operation
        const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString()

        const sendParam = [
            eidB,
            ethers.utils.zeroPad(ownerB.address, 32),
            tokensToSend,
            tokensToSend,
            options,
            '0x',
            '0x',
        ]

        // Fetching the native fee for the token send operation
        const [nativeFee] = await myOFTA.quoteSend(sendParam, false)

        // Executing the send operation from myOFTA contract
        let tx = await myOFTA.send(sendParam, [nativeFee, 0], ownerA.address, { value: nativeFee })
        console.log(tx);     
      }
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
