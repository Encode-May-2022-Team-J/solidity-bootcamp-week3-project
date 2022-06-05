import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { MyNFT, TJToken, Shop } from "../typechain";
// eslint-disable-next-line node/no-unpublished-import
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// eslint-disable-next-line node/no-unpublished-import
import { BigNumber } from "ethers";

describe("NFT Shop", function () {
  let tokenContract: TJToken;
  let nftContract: MyNFT;
  let shopContract: Shop;
  let accounts: SignerWithAddress[];
  const DEFAULT_PURCHASE_RATIO = 100;
  const DEFAULT_MINT_PRICE = 0.3333333333333333;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const [tokenContractFactory, nftContractFactory, shopContractFactory] =
      await Promise.all([
        ethers.getContractFactory("TJToken"),
        ethers.getContractFactory("MyNFT"),
        ethers.getContractFactory("Shop"),
      ]);
    tokenContract = await tokenContractFactory.deploy();
    await tokenContract.deployed();
    nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    shopContract = await shopContractFactory.deploy(
      DEFAULT_PURCHASE_RATIO,
      ethers.utils.parseEther(DEFAULT_MINT_PRICE.toFixed(18)),
      tokenContract.address,
      nftContract.address
    );
    await shopContract.deployed();
    const minterRole = await tokenContract.MINTER_ROLE();
    const minterRoleTx = await tokenContract.grantRole(
      minterRole,
      shopContract.address
    );
    await minterRoleTx.wait();
    const nftMinterRole = await nftContract.MINTER_ROLE();
    const nftMinterRoleTx = await nftContract.grantRole(
      nftMinterRole,
      shopContract.address
    );
    await nftMinterRoleTx.wait();
  });

  describe("mint NFT", function () {
    let tokensBalanceBefore: BigNumber;
    let ownerPool: BigNumber;
    let publicPool: BigNumber;
    const NFT_ID: number = 1;

    beforeEach(async () => {
      const mintNft = await nftContract.safeMint(accounts[0].address, NFT_ID);
      await mintNft.wait();
      ownerPool = await shopContract.ownerPool();
      publicPool = await shopContract.publicPool();
    });

    it("mint NFT", async () => {
      const [nftBalance, nftOwner, ntfUri] = await Promise.all([
        nftContract.balanceOf(accounts[0].address),
        nftContract.ownerOf(NFT_ID),
        nftContract.tokenURI(NFT_ID),
      ]);
      expect(nftBalance).to.eq(1);
      expect(nftOwner).to.eq(accounts[0].address);
      expect(ntfUri).to.eq(`http://127.0.0.1:3000/images/${NFT_ID}`);
    });
  });

  describe("When a user purchase an ERC20 from the Token contract", async () => {
    let accountValue: BigNumber;
    let txFee: BigNumber;
    let tokensEarned: BigNumber;
    const ETHER_SPEND: number = 500;

    beforeEach(async () => {
      accountValue = await accounts[0].getBalance();
      const purchaseTokenTx = await shopContract.purchaseTokens({
        value: ethers.utils.parseEther(ETHER_SPEND.toFixed(0)),
      });
      const purchaseTokenTxReceipt = await purchaseTokenTx.wait();
      const gasUsed = purchaseTokenTxReceipt.gasUsed;
      const effectiveGasPrice = purchaseTokenTxReceipt.effectiveGasPrice;
      txFee = gasUsed.mul(effectiveGasPrice);
      tokensEarned = await tokenContract.balanceOf(accounts[0].address);
    });

  });
});
