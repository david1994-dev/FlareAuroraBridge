import { expect } from "chai";
import { ethers } from "hardhat";

describe("GFlare", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("GFlare");

    const instance = await ContractFactory.deploy();
    await instance.deployed();

    expect(await instance.name()).to.equal("gFlare");
  });
});
