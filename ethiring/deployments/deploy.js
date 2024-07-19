async function main() {
  const EmploymentPackage = await ethers.getContractFactory(
    "EmploymentPackage"
  );
  const employmentPackage = await EmploymentPackage.deploy();
  console.log("Contract Deployed to Address:", employmentPackage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
