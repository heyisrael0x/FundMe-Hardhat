const { network } = require("hardhat");
const {
  developmentChains,
  DECIMAL,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // developmentChains.some((chainId) => chainId === 31337)
//   console.log(chainId);
  if (developmentChains.includes(chainId == 31337)) /*console.log(chainId);*/ {
    
    log("Local network detected! deploying....");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMAL, INITIAL_ANSWER],
    });
    log("Mocks Deployed!");
    log("______________________________________________");
  }
};

module.exports.tags = ["all", "mocks"];
