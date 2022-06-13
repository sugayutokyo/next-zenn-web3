// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZennCoin is ERC20 {
  constructor(uint256 initialSupply) ERC20("ZENC", "ZEC") {
    _mint(msg.sender, initialSupply);
  }
}