async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);
  console.log("Funding......");
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait();
  console.log("funds withdrawn!");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
