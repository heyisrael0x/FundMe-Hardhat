 // SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library priceConverter {

    function getPrice(AggregatorV3Interface priceFeed) internal view returns(uint256){
        // ABI
        // Address
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        // ETH in terms of USD
        // 1500.00000000
        return uint256(answer * 1e10); // 1**10 = 1000000000
    }

    // function getVersion() internal view returns (uint256) {
    //     AggregatorV3Interface priceFeed = AggregatorV3Interface( 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e );
    //     return priceFeed.version();
    // }

    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns(uint256){
        uint256 ethPrice = getPrice(priceFeed);
        // from getPrice() 1500_000000000000000000 = ETH/USD Price
        // from value 1_000000000000000000 = number of ETH the user is sending
        uint256 ethAmountInUsd = (ethPrice * ethAmount)/ 1e18;
        return ethAmountInUsd;
    }
}