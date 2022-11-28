require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");

const {privateKey, address, privateKeyTest} = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    mainnet: {
      url: 'http://101.32.108.85:7545',
      chainId: 1,
      gasPrice: 85000000000,
      timeout: 10000000,
      accounts: [privateKey],
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/d87255a6627542eba4eaa9d5278832e0',
      chainId: 4,
      gasPrice: 1000000000,
      gas: 2000000,
      timeout: 10000000,
      accounts: [privateKeyTest],
    },
    bsc_mainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gas: 3000000,
      timeout: 10000000,
      accounts: [privateKey],
    },
    'fantom': {
      url: 'https://rpc.ftm.tools/',
      chainId: 250,
      timeout: 10000000,
      accounts: [privateKey],
    },
    'polygon': {
      url: 'https://polygon-rpc.com/',
      chainId: 137,
      timeout: 10000000,
      accounts: [privateKey],
    },
    'avax': {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: 43114,
      timeout: 10000000,
      accounts: [privateKey],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // rinkey 4BHS9W9P85SIIK1ZER11Y8P9T43MI454ES
    // bsc QQQ3E4UT98E7V6AAFRPEMYD21M1VG4HNHY
    //bsc_api_key   9CT3EDZ4SDQVSUE97CHXJC41N25EZ2Q567
    //fantom 2BN1VNKZUJN3S39CUXZA42G4JEPKHGSQ85
    //polygon 8466XFIH5XKTQ2I6TZQDSQNW9QERPQ71MX
    apiKey: '8466XFIH5XKTQ2I6TZQDSQNW9QERPQ71MX',
  },
  solidity: "0.8.4",
};
