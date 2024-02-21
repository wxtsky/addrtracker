import axios from "axios";
import {ethers} from "ethers";

const getEthInfo = async function (address) {
    const rpc = 'https://cloudflare-eth.com';
    const batchData = [
        {
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [address, 'latest'],
            id: 1,
        },
        {
            jsonrpc: '2.0',
            method: 'eth_getTransactionCount',
            params: [address, 'latest'],
            id: 2,
        }
    ];

    try {
        const response = await axios.post(rpc, batchData);
        const balanceResult = response.data.find(r => r.id === 1);
        const nonceResult = response.data.find(r => r.id === 2);

        const balanceInWei = balanceResult.result;
        const nonce = nonceResult.result;

        const mainnet_balance = Number(ethers.utils.formatEther(balanceInWei)).toFixed(4);
        const mainnet_tx = parseInt(nonce, 16);

        return {mainnet_balance, mainnet_tx};
    } catch (error) {
        console.error(error);
        return {
            mainnet_balance: null,
            mainnet_tx: null
        }
    }
};

export default getEthInfo;
