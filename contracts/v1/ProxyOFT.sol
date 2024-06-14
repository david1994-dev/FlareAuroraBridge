// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { ProxyOFT } from "@layerzerolabs/solidity-examples/contracts/token/oft/v1/ProxyOFT.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract PolygonProxy is ProxyOFT {
    constructor(
        address _lzEndpoint,
        address _token
    ) ProxyOFT(_lzEndpoint, _token) Ownable() {}
}
