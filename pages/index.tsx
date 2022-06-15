import type { NextPage } from 'next';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ZCContract from '../build/contracts/ZennCoin.json';
import { ZennCoin } from '../types/abi/ZennCoin';

// プロバイダの設定
const web3 = new Web3(new Web3.providers.HttpProvider(`http://127.0.0.1:7545`));

// コントラクトのアドレス
const address = '0x7D4d7a0da0e8e1Dc90a86fDB82882a94190d89D6';

const ABI = ZCContract.abi as any as AbiItem;
// コントラクトのインスタンス
const contract = new web3.eth.Contract(ABI, address) as unknown as ZennCoin;

const Home: NextPage = () => {
  (async () => {
    const accountsWeb3 = await web3.eth.getAccounts();
    console.log(accountsWeb3);
  })();
  return <div></div>;
};

export default Home;
