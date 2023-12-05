const BN = require('bn.js');

const TokenizedAccess = artifacts.require("TokenizedAccess");


const PARAMS = {
  tokenName: "TokenizedAccess",
  tokenSymbol: "TKNZDCCSS",
  cost: new BN(777).mul(new BN(Math.pow(10, 12))),
  maxSupply: 1000,
  maxMintAmountPerTx: 99,
  hiddenMetadataUri: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Saturn.png',
  baseUri: 'https://upload.wikimedia.org/wikipedia/commons/2/28/'
}



module.exports = async (deployer) => {
  await deployer.deploy(TokenizedAccess, ...Object.values(PARAMS));
};
