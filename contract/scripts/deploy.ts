import { ethers } from "ethers";
import dotenv from "dotenv";
import * as tokenJson from "../artifacts/contracts/ERC20.sol/TJToken.json";
import * as nftContractJson from "../artifacts/contracts/ERC721.sol/MyNFT.json";
import * as shopContractJson from "../artifacts/contracts/Shop.sol/Shop.json";

dotenv.config();

const DEFAULT_PURCHASE_RATIO = 100;
const DEFAULT_MINT_PRICE = 0.3333333333333333;

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  console.log(`Deploying from account address ${wallet.address}`);

  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);

  const balanceBN = await signer.getBalance();

  const balance = Number(ethers.utils.formatEther(balanceBN));

  console.log(`Wallet balance ${balance}`);

  if (balance < 0.02) {
    throw new Error("Not enough ether");
  }

  console.log("Deploying TJToken contract");
  // const tokenContractFactory = new ethers.ContractFactory(
  //   tokenJson.abi,
  //   tokenJson.bytecode,
  //   signer
  // );

  // const tokenContract = await tokenContractFactory.deploy();
  // await tokenContract.deployed();

  const tokenContract = new ethers.Contract(
    "0x756aa13F4087224DB972AE31946435Da3AB65CbC",
    tokenJson.abi,
    signer
  );

  console.log(`TJToken address: ${tokenContract.address}`);

  console.log("Deploying NFT contract");
  const nftContractFactory = new ethers.ContractFactory(
    nftContractJson.abi,
    nftContractJson.bytecode,
    signer
  );

  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();

  console.log(`MyNFT address: ${nftContract.address}`);

  console.log("Deploying Shop contract");
  const shopContractFactory = new ethers.ContractFactory(
    shopContractJson.abi,
    shopContractJson.bytecode,
    signer
  );

  const shopContract = await shopContractFactory.deploy(
    DEFAULT_PURCHASE_RATIO,
    ethers.utils.parseEther(DEFAULT_MINT_PRICE.toFixed(18)),
    tokenContract.address,
    nftContract.address
  );
  await shopContract.deployed();

  console.log(`Shop address: ${shopContract.address}`);

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

  console.log("Deployment complete");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
