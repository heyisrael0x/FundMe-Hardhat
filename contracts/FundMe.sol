// Get funds from user
// Withdraw funds
// Set a minimum funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

/**
 * @title A contract for crowd funding
 * @author oluwagbogo
 * @notice this contract is a decentralized funds payment
 */
error FundMe__NotOwner();

contract FundMe {
    //Type Decleractions
    using priceConverter for uint256;

    //state variable
    // uint256 public number;
    uint256 public MINIMUM_USD = 50 * 1e18;
    address[] public funders;
    mapping(address => uint) addressToAmountFunded;
    address public owner;
    AggregatorV3Interface public s_priceFeed;

    // Modifiers
    modifier onlyOwner() {
    // require(msg.sender == owner, "sender is not owner!");
    if (msg.sender != owner) {
        revert FundMe__NotOwner();
    }
    _;
    }
    constructor(address priceFeedAddress) {
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
        owner = msg.sender;
    }

    function fund() public payable {
        // we wan to be able to set a minimum fund amount in USD
        // 1. how do we send eth to this contract
        // number = 5;
        // require(getConversionRate(msg.value) >= minimumUsd, "Don't send enough"); // 1e18 == 1*10**18 == 1000000000000000000
        require(msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD, "Don't send enough"); // 1e18 == 1*10**18 == 1000000000000000000
        // 18 decimals
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        // resting an array
        funders = new address[](0);
        // actually withdraw the funds

        // //transfer
        // payable(msg.sender).transfer(address(this).balance);
        // //send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, 'Send failed');
        // //call
        (bool callSucess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSucess, "call failed");
    }


    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
