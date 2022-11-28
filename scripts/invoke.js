const hre = require("hardhat");

var DECIMAL = ethers.BigNumber.from('1000000000000000000');
async function main() {

    let owner = "0xF26DdF26623e8Ae83f78012a48d24704AD175431";

    //bsc
    let _router = "0xd1c5966f9f5ee6881ff6b261bbeda45972b1b5f3";
    let usdtAddr = "0x55d398326f99059ff775485246999027b3197955";
    let registryAddr = "0x43c47B76D24Ad1F73f5Ab12442A016397A5ae9F6";
    let AnyswapImplL2Addr = "0x23C78B3d85b45BfA6DC8e09b517ba2d9b0ECCA8C";
    //bsc
    let cbridgeImpl = "0x150DFB479EdF4B4F2932DF3Cdf3924d1e4e3CBEe";
    const usdt = await ethers.getContractAt("MockToken", usdtAddr);

    // if (true){
    //     const ICBridge = await ethers.getContractAt("ICBridge", registryAddr);
    //     await ICBridge.with();
    //     return;
    // }

    const registry = await ethers.getContractAt("Registry", registryAddr);
    if (false) {
        await usdt.approve(cbridgeImpl, DECIMAL.mul(40));
        let res = await registry.outboundTransferTo(buildUserRequest());
        console.log("res:", res.toString());
        return;
    }
}

function buildUserRequest() {
    // 5000太小 请用较大的值
    let data = ethers.utils.defaultAbiCoder.encode(["uint32"], [15000]);
    return {
        receiverAddress:"0xF26DdF26623e8Ae83f78012a48d24704AD175431",
        toChainId:137,
        amount:DECIMAL.mul(40),
        middlewareRequest:{
            id:0,
            optionalNativeAmount:0,
            inputToken:"0x55d398326f99059fF775485246999027B3197955",
            data:data,
        },
        bridgeRequest:{
            id:7,
            optionalNativeAmount:0,
            inputToken:"0x55d398326f99059fF775485246999027B3197955",
            data:data,
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
