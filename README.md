# Deploy and mint dumy token named TestToken (1T) To Aurora and Polygon
Aurora contract address: 0x3F231E2c08C41cFEd36cE575416F200C8B81FfE4
Polygon contract address: 0x3F231E2c08C41cFEd36cE575416F200C8B81FfE4

# Create 2 contacts named AuroraBridge and FlareBridge
Create 2 contracts, config _lzEndpoint, _delegate, _token
Follow: https://docs.layerzero.network/v2/developers/evm/oft/adapter

# Update hardhat config file and deploy constract
Deploy AuroraBridge to aurora network
Deploy FlareBridge to polygon network 
AuroraBirdge address: 0x40E5F267e7cAFa2f303119a6361bd21316923B21
FlareBridge address: 0x79517Eca22dad3e96F4d84fd3C6dae3551aBdFc6

## Testing bridge
Run scripts/test.js
Transaction return with fail status: 0xca6fb0c8d9594c46c8c065a9292562cd1c22637e15e4f542f46e3faf2ee7c432

## Deploying the contract

You can target any network from your Hardhat config using:

```
npx hardhat run --network <network-name> scripts/deploy.ts
```
