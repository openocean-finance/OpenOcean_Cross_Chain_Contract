const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Greeter", function () {
    before("deploy", async function () {
        let [signer] = await ethers.getSigners();
        this.signer = signer;
        this.registry = await deploy("Registry", this.signer.address);
        this.testMock = await deploy("TestMock");
    });
    it("decode data", async function () {
        let data = ethers.utils.defaultAbiCoder.encode(["uint32"], [5000]);
        console.log("data:", data.toString());
        let res = await this.testMock.decodeData(data);
        console.log("decode data:", res.toString());
    });

});

async function deploy(name, ...arg) {
    const MyContract = await ethers.getContractFactory(name);
    const myContract = await MyContract.deploy(...arg);
    return await myContract.deployed();
}

