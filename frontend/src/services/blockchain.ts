import { useEffect, useState } from 'react';
import BlockchainService from './BlockchainService';

export const useWallet = () => {
  const [etherBalance, setEtherBalance] = useState('0.0 ETH');

  const walletAddress = BlockchainService.address();

  useEffect(() => {
    const getEtherBalance = async () => {
      setEtherBalance(await BlockchainService.etherBalance());
    };
    getEtherBalance().catch(console.error);
  }, []);

  return { walletAddress, etherBalance };
};
