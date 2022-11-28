//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    uint constant internal DECIMAL_18 = uint(1000000000000000000);
    constructor(string memory name, string memory symbol, uint supply)ERC20(name, symbol) {
        _mint(msg.sender, supply * DECIMAL_18);
    }
}
