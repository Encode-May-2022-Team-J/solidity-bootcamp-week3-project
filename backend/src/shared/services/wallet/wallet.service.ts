import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class WalletService {
  wallet: ethers.Wallet;

  constructor() {
    this.setupWallet();
  }

  setupWallet() {
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '');
  }

  walletAddress() {
    return this.wallet.address;
  }
}
