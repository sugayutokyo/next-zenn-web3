const zennCoin = artifacts.require('ZennCoin');

module.exports = function (deployer) {
  const initSupply = 10000000000;

  deployer.deploy(zennCoin, initSupply);
};
