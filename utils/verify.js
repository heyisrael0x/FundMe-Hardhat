const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("verifying contract.....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgumenta: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already Verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

module.exports = {verify}
