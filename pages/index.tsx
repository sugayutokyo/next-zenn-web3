import type { NextPage } from 'next';
import { useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ZCContract from '../build/contracts/ZennCoin.json';
import { ZennCoin } from '../types/abi/ZennCoin';

// プロバイダの設定
const web3 = new Web3(new Web3.providers.HttpProvider(`http://127.0.0.1:7545`));

// コントラクトのアドレス
const address = '0x8F4D574EFe77e00af32C54d2A0D07F7C53cb56bF';

const ABI = ZCContract.abi as any as AbiItem;
// コントラクトのインスタンス
const contract = new web3.eth.Contract(ABI, address) as unknown as ZennCoin;

const walletAddressUserA = '0x7D4d7a0da0e8e1Dc90a86fDB82882a94190d89D6';
const walletAddressUserB = '0x95a1D1A9fA7280E8A98c288a7bFD69EFdEFcD390';

const Home: NextPage = () => {
  const [balanceZcUserA, setBalanceZcUserA] = useState(''); // ZennCoin残高 UserA
  const [balanceEthUserA, setBalanceEthUserA] = useState(''); // ETH残高 UserA
  const [balanceZcUserB, setBalanceZcUserB] = useState(''); // ZennCoin残高 UserB
  const [balanceEthUserB, setBalanceEthUserB] = useState(''); // ETH残高 UserB
  const getBalance = async (userType: string) => {
    if (userType === 'a') {
      setBalanceZcUserA(await contract.methods.balanceOf(walletAddressUserA).call());
      setBalanceEthUserA(await web3.eth.getBalance(walletAddressUserA));
    } else if (userType === 'b') {
      setBalanceZcUserB(await contract.methods.balanceOf(walletAddressUserB).call());
      setBalanceEthUserB(await web3.eth.getBalance(walletAddressUserB));
    }
  };

  return (
    <div className="m-5">
      <h2>UserA Info</h2>
      {balanceZcUserA ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ZennCoin Balance</th>
              <th className="px-4 py-2">ETH Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{balanceZcUserA}</td>
              <td className="border px-4 py-2">{balanceEthUserA}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>「UserA 残高を取得」を押してください</div>
      )}
      <h2>UserB Info</h2>
      {balanceZcUserA ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ZennCoin Balance</th>
              <th className="px-4 py-2">ETH Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{balanceZcUserB}</td>
              <td className="border px-4 py-2">{balanceEthUserB}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>「UserB 残高を取得」を押してください</div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getBalance('a')}>
        UserA 残高を取得
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5"
        onClick={() => getBalance('b')}>
        UserB 残高を取得
      </button>
    </div>
  );
};

export default Home;
