import { ethers } from 'ethers';
import { Injectable } from '@nestjs/common';
import { ProviderService } from 'src/shared/services/provider/provider.service';
import { SignerService } from 'src/shared/services/signer/signer.service';

import * as NftContract from 'src/assets/contracts/MyNFT.json';
import * as TokenContract from 'src/assets/contracts/TJToken.json';

@Injectable()
export class ContractService {
  nftContractPublicInstance: ethers.Contract;
  nftContractSignedInstance: ethers.Contract;
  tokenContractPublicInstance: ethers.Contract;
  tokenContractSignedInstance: ethers.Contract;

  constructor(
    private providerService: ProviderService,
    private signerService: SignerService,
  ) {
    this.setupNFTContractInstances();
    this.setupTokenContractInstances();
  }

  setupNFTContractInstances() {
    const contractAddress = process.env.NFT_ADDRESS;
    if (!contractAddress || contractAddress.length === 0) return;
    this.nftContractPublicInstance = new ethers.Contract(
      contractAddress,
      NftContract.abi,
      this.providerService.provider,
    );
    this.nftContractSignedInstance = new ethers.Contract(
      contractAddress,
      NftContract.abi,
      this.signerService.signer,
    );
  }

  setupTokenContractInstances() {
    const contractAddress = process.env.NFT_ADDRESS;
    if (!contractAddress || contractAddress.length === 0) return;
    this.tokenContractPublicInstance = new ethers.Contract(
      contractAddress,
      TokenContract.abi,
      this.providerService.provider,
    );
    this.tokenContractSignedInstance = new ethers.Contract(
      contractAddress,
      TokenContract.abi,
      this.signerService.signer,
    );
  }

  async mintNFT(address: string, nftId: number) {
    return await this.nftContractSignedInstance.safeMint(address, nftId);
  }

  async getNftUri(nftId: number) {
    return this.nftContractPublicInstance.tokenURI(nftId);
  }

  async tokenBalanceOf(address: string) {
    const balanceBN = await this.tokenContractPublicInstance.balanceOf(address);
    const balance = ethers.utils.formatEther(balanceBN);
    return balance;
  }
}
