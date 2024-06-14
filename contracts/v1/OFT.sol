// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { OFT } from "@layerzerolabs/solidity-examples/contracts/token/oft/v1/OFT.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract AuroraV1FlareOFT is OFT {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint
    ) OFT(_name, _symbol, _lzEndpoint) Ownable() {}
}
