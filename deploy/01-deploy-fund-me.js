const { networkConfig, devlopmentChains } = require("../helper-hardhat-config");
const { network, artifacts, ethers } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    // console.log(MockV3Aggregator);
    // const ethUsdAggregator = /*"0x694AA1769357215DE4FAC081bf1f309aDC325306"*/ await get("MockV3Aggregator");
    const aggregator = await ethers.getContractFactory("MockV3Aggregator");
    const ethUsdAggregator = await aggregator.deploy(18, "1000000000000000000");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
    console.log(ethUsdPriceFeedAddress);
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    console.log(ethUsdPriceFeedAddress);
  }
  log("-----------------------------------");
  log("Deploying FundMe and waiting for confirmations...");

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], // put pricefeed address
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`FundMe deployed at ${fundMe.address}`);

  // if (
  //   !devlopmentChains.includes(chainId == 31337) &&
  //   process.env.ETHERSCAN_API_KEY
  // ) {
  //   await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  // }
  log("---------------------------------------------------");
};
module.exports.tags = ["all", "fundme"];