const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");
describe("FundeMe", async function () {
  let fundMe;
  let deployer;
  let mockV3Aggregator;
  beforeEach(async function () {
    // const accounts = await ethers.getSigners()
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });
  describe("constructor", async function () {
    it("set the aggregrator address correctly", async function () {
      const response = await fundMe.priceFeed();
      assert.equal(response, mockV3Aggregator.address);
    });
  });
});
