const networkConfig = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeedAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306", //"PricefeedAddressForSepoliaGoesHere"
  },
  31337: {
    name: "localhost",
  },
};

const developmentChains = ["hardhat", "localhost","31337"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;
module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
};
