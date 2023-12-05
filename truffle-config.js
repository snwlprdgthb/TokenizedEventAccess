const HDWalletProvider = require("@truffle/hdwallet-provider");
// move to env next commit, this seed just for testing
const MNEMONIC = ""


module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {

    goerli: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: MNEMONIC
          },
          providerOrUrl: `https://goerli.infura.io/v3/9e88c13b1b0c478daba07d6d93f6362a`,
          addressIndex: 0
        }),
      network_id: 5,
      gas: 8000000,
      gasPrice: 113864531661,
      confirmations: 2,
      timeoutBlocks: 200
    }
  },
  compilers: {
    solc: {
      version: "0.8.7",
    }
  },
};
