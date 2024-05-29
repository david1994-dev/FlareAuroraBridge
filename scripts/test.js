const {owner_pk, faucet_address} = require('../config.json');
const {PolygonFlareOFTAdapterAddress} = require('../constant.json');
const {Options} = require('@layerzerolabs/lz-v2-utilities');
const {EndpointId} = require('@layerzerolabs/lz-definitions');
const ethers = require('ethers');

    async function main() {
      const eidA = EndpointId.POLYGON_V2_TESTNET
      const eidB = EndpointId.AURORA_V2_TESTNET
      const initialAmount = ethers.utils.parseEther('100')

      const PROVIDER = new ethers.providers.JsonRpcProvider("https://polygon-amoy-bor-rpc.publicnode.com", 80002);
      
      const CONTRACT_ABI = [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "target",
                "type": "address"
              }
            ],
            "name": "AddressEmptyCode",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "AddressInsufficientBalance",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "FailedInnerCall",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InvalidDelegate",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InvalidEndpointCall",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InvalidLocalDecimals",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "bytes",
                "name": "options",
                "type": "bytes"
              }
            ],
            "name": "InvalidOptions",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "LzTokenUnavailable",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
              }
            ],
            "name": "NoPeer",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "msgValue",
                "type": "uint256"
              }
            ],
            "name": "NotEnoughNative",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "OnlyEndpoint",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
              },
              {
                "internalType": "bytes32",
                "name": "sender",
                "type": "bytes32"
              }
            ],
            "name": "OnlyPeer",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "OnlySelf",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "token",
                "type": "address"
              }
            ],
            "name": "SafeERC20FailedOperation",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "bytes",
                "name": "result",
                "type": "bytes"
              }
            ],
            "name": "SimulationResult",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amountLD",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "minAmountLD",
                "type": "uint256"
              }
            ],
            "name": "SlippageExceeded",
            "type": "error"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "uint32",
                    "name": "eid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "uint16",
                    "name": "msgType",
                    "type": "uint16"
                  },
                  {
                    "internalType": "bytes",
                    "name": "options",
                    "type": "bytes"
                  }
                ],
                "indexed": false,
                "internalType": "struct EnforcedOptionParam[]",
                "name": "_enforcedOptions",
                "type": "tuple[]"
              }
            ],
            "name": "EnforcedOptionSet",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "inspector",
                "type": "address"
              }
            ],
            "name": "MsgInspectorSet",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "guid",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "internalType": "uint32",
                "name": "srcEid",
                "type": "uint32"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "toAddress",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountReceivedLD",
                "type": "uint256"
              }
            ],
            "name": "OFTReceived",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "guid",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "internalType": "uint32",
                "name": "dstEid",
                "type": "uint32"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountSentLD",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountReceivedLD",
                "type": "uint256"
              }
            ],
            "name": "OFTSent",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
              },
              {
                "indexed": false,
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
              }
            ],
            "name": "PeerSet",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "preCrimeAddress",
                "type": "address"
              }
            ],
            "name": "PreCrimeSet",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "SEND",
            "outputs": [
              {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "SEND_AND_CALL",
            "outputs": [
              {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "uint32",
                    "name": "srcEid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "sender",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint64",
                    "name": "nonce",
                    "type": "uint64"
                  }
                ],
                "internalType": "struct Origin",
                "name": "origin",
                "type": "tuple"
              }
            ],
            "name": "allowInitializePath",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "approvalRequired",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "pure",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
              },
              {
                "internalType": "uint16",
                "name": "_msgType",
                "type": "uint16"
              },
              {
                "internalType": "bytes",
                "name": "_extraOptions",
                "type": "bytes"
              }
            ],
            "name": "combineOptions",
            "outputs": [
              {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "composeMsgSender",
            "outputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "decimalConversionRate",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "endpoint",
            "outputs": [
              {
                "internalType": "contract ILayerZeroEndpointV2",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
              },
              {
                "internalType": "uint16",
                "name": "msgType",
                "type": "uint16"
              }
            ],
            "name": "enforcedOptions",
            "outputs": [
              {
                "internalType": "bytes",
                "name": "enforcedOption",
                "type": "bytes"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
              },
              {
                "internalType": "bytes32",
                "name": "_peer",
                "type": "bytes32"
              }
            ],
            "name": "isPeer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "uint32",
                    "name": "srcEid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "sender",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint64",
                    "name": "nonce",
                    "type": "uint64"
                  }
                ],
                "internalType": "struct Origin",
                "name": "_origin",
                "type": "tuple"
              },
              {
                "internalType": "bytes32",
                "name": "_guid",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
              },
              {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
              },
              {
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes"
              }
            ],
            "name": "lzReceive",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "components": [
                      {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                      },
                      {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                      }
                    ],
                    "internalType": "struct Origin",
                    "name": "origin",
                    "type": "tuple"
                  },
                  {
                    "internalType": "uint32",
                    "name": "dstEid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "guid",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address",
                    "name": "executor",
                    "type": "address"
                  },
                  {
                    "internalType": "bytes",
                    "name": "message",
                    "type": "bytes"
                  },
                  {
                    "internalType": "bytes",
                    "name": "extraData",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct InboundPacket[]",
                "name": "_packets",
                "type": "tuple[]"
              }
            ],
            "name": "lzReceiveAndRevert",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "uint32",
                    "name": "srcEid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "sender",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint64",
                    "name": "nonce",
                    "type": "uint64"
                  }
                ],
                "internalType": "struct Origin",
                "name": "_origin",
                "type": "tuple"
              },
              {
                "internalType": "bytes32",
                "name": "_guid",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
              },
              {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
              },
              {
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes"
              }
            ],
            "name": "lzReceiveSimulate",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "msgInspector",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
              },
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "name": "nextNonce",
            "outputs": [
              {
                "internalType": "uint64",
                "name": "nonce",
                "type": "uint64"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "oApp",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "oAppVersion",
            "outputs": [
              {
                "internalType": "uint64",
                "name": "senderVersion",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "receiverVersion",
                "type": "uint64"
              }
            ],
            "stateMutability": "pure",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "oftVersion",
            "outputs": [
              {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
              },
              {
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
              }
            ],
            "stateMutability": "pure",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
              }
            ],
            "name": "peers",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "preCrime",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "uint32",
                    "name": "dstEid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "to",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amountLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "minAmountLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "extraOptions",
                    "type": "bytes"
                  },
                  {
                    "internalType": "bytes",
                    "name": "composeMsg",
                    "type": "bytes"
                  },
                  {
                    "internalType": "bytes",
                    "name": "oftCmd",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
              }
            ],
            "name": "quoteOFT",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "minAmountLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "maxAmountLD",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct OFTLimit",
                "name": "oftLimit",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "int256",
                    "name": "feeAmountLD",
                    "type": "int256"
                  },
                  {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                  }
                ],
                "internalType": "struct OFTFeeDetail[]",
                "name": "oftFeeDetails",
                "type": "tuple[]"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "amountSentLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amountReceivedLD",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct OFTReceipt",
                "name": "oftReceipt",
                "type": "tuple"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "uint32",
                    "name": "dstEid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "to",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amountLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "minAmountLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "extraOptions",
                    "type": "bytes"
                  },
                  {
                    "internalType": "bytes",
                    "name": "composeMsg",
                    "type": "bytes"
                  },
                  {
                    "internalType": "bytes",
                    "name": "oftCmd",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
              },
              {
                "internalType": "bool",
                "name": "_payInLzToken",
                "type": "bool"
              }
            ],
            "name": "quoteSend",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "nativeFee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "lzTokenFee",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct MessagingFee",
                "name": "msgFee",
                "type": "tuple"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "uint32",
                    "name": "dstEid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "to",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amountLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "minAmountLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "extraOptions",
                    "type": "bytes"
                  },
                  {
                    "internalType": "bytes",
                    "name": "composeMsg",
                    "type": "bytes"
                  },
                  {
                    "internalType": "bytes",
                    "name": "oftCmd",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "nativeFee",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "lzTokenFee",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct MessagingFee",
                "name": "_fee",
                "type": "tuple"
              },
              {
                "internalType": "address",
                "name": "_refundAddress",
                "type": "address"
              }
            ],
            "name": "send",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "bytes32",
                    "name": "guid",
                    "type": "bytes32"
                  },
                  {
                    "internalType": "uint64",
                    "name": "nonce",
                    "type": "uint64"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "nativeFee",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "lzTokenFee",
                        "type": "uint256"
                      }
                    ],
                    "internalType": "struct MessagingFee",
                    "name": "fee",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct MessagingReceipt",
                "name": "msgReceipt",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "amountSentLD",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amountReceivedLD",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct OFTReceipt",
                "name": "oftReceipt",
                "type": "tuple"
              }
            ],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_delegate",
                "type": "address"
              }
            ],
            "name": "setDelegate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "uint32",
                    "name": "eid",
                    "type": "uint32"
                  },
                  {
                    "internalType": "uint16",
                    "name": "msgType",
                    "type": "uint16"
                  },
                  {
                    "internalType": "bytes",
                    "name": "options",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct EnforcedOptionParam[]",
                "name": "_enforcedOptions",
                "type": "tuple[]"
              }
            ],
            "name": "setEnforcedOptions",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_msgInspector",
                "type": "address"
              }
            ],
            "name": "setMsgInspector",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
              },
              {
                "internalType": "bytes32",
                "name": "_peer",
                "type": "bytes32"
              }
            ],
            "name": "setPeer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_preCrime",
                "type": "address"
              }
            ],
            "name": "setPreCrime",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "sharedDecimals",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "pure",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "token",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];
      
      const FLARE_WALLET = new ethers.Wallet(owner_pk, PROVIDER);
      const myOFTA = new ethers.Contract(
        PolygonFlareOFTAdapterAddress,
        CONTRACT_ABI,
        FLARE_WALLET
      );
          // await myOFTA.mint(faucet_address, initialAmount) //my metamask address
      
          // Defining the amount of tokens to send and constructing the parameters for the send operation
          const tokensToSend = ethers.utils.parseEther('1')
      
          // Defining extra message execution options for the send operation
          const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString()
      
          const sendParam = [
              eidB,
              ethers.utils.zeroPad(faucet_address, 32),//my metamask address
              tokensToSend,
              tokensToSend,
              options,
              '0x',
              '0x',
          ]
          
          // Fetching the native fee for the token send operation
          const [nativeFee] = await myOFTA.quoteSend(sendParam, false)
          let txOptions = {
            gasPrice: 113000000000,
            gasLimit: 100000,
            value: nativeFee
          };

          // Executing the send operation from myOFTA contract
          const tx = await myOFTA.send(sendParam, [nativeFee, 0], faucet_address, txOptions)
          console.log(tx);
          // Fetching the final token balances of ownerA and ownerB
          // const finalBalanceA = await myOFTA.balanceOf(ownerA.address)
          // const finalBalanceB = await myOFTB.balanceOf(ownerB.address)
      
          // Asserting that the final balances are as expected after the send operation
          // expect(finalBalanceA).eql(initialAmount.sub(tokensToSend))
          // expect(finalBalanceB).eql(tokensToSend)       
          // console,log(finalBalanceA, finalBalanceB) ;     
      }
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
