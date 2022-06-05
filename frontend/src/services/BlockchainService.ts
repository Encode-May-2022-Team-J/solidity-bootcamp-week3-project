import { ethers } from 'ethers';

let provider: ethers.providers.BaseProvider;
let userWallet: ethers.Wallet;

const setup = () => {
  provider = ethers.getDefaultProvider(process.env.REACT_APP_PROVIDER_NETWORK);
  userWallet = ethers.Wallet.createRandom().connect(provider);
};

const address = () => userWallet.address;

const networkName = () => process.env.REACT_APP_PROVIDER_NETWORK;

const etherBalance = async () => {
  const etherBalanceBN = await provider.getBalance(address());
  const etherBalance = ethers.utils.formatEther(etherBalanceBN);
  return etherBalance + ' ETH';
};

const BlockchainService = {
  setup,
  address,
  networkName,
  etherBalance
};

export default BlockchainService;
