const hre = require("hardhat");

async function main() {

    let registry = "0x43c47B76D24Ad1F73f5Ab12442A016397A5ae9F6";
    // registry = "0xc30141B657f4216252dc59Af2e7CdB9D8792e1B0";
    //bsc
    let AnyswapImplL2 = "0x23C78B3d85b45BfA6DC8e09b517ba2d9b0ECCA8C";
    let OneInchSwapImpl = "0x833390Fc8D0e82BBE47EC0fAA73a3bdd13839f21";
    let ooSwapImpl = "0x60199D41Ab2c108c769DF5b5Ec4c6D57aA561FC9";

    //fantom
    // polygon
    let HyphenImplL2 = "0xe0c1ccEC71cc933FF01ed19228eFB1004F1d7942";
    // avax
    HyphenImplL2 = "0x833390Fc8D0e82BBE47EC0fAA73a3bdd13839f21";
    let AnyswapImplL2Route = {
        route: AnyswapImplL2,
        isEnabled: true,
        isMiddleware: false,
    };
    let OneInchSwapImplRoute = {
        route: OneInchSwapImpl,
        isEnabled: true,
        isMiddleware: true,
    };
    let ooSwapImplRoute = {
        route: ooSwapImpl,
        isEnabled: true,
        isMiddleware: true,
    };
    let HyphenImplL2Route = {
        route: ooSwapImpl,
        isEnabled: true,
        isMiddleware: false,
    }
    let routes = [
        HyphenImplL2Route,
        AnyswapImplL2Route
    ]
    if (true) {
        const registryIns = await ethers.getContractAt("Registry", registry);
        let res = await registryIns.addRoutes(routes);
        console.log("res:", res);
        // res = await registryIns.routes(2);
        // console.log("res:", res.toString());
        return;
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
