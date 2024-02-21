import axios from "axios";
import {ethers} from "ethers";

const getAccountDetails = async function (address) {
    const rpc = 'https://mainnet.era.zksync.io';
    const data = [
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
        const response = await axios.post(rpc, data);
        const results = response.data;
        const balanceResult = results.find(res => res.id === 1);
        const nonceResult = results.find(res => res.id === 2);

        const balanceInWei = balanceResult ? balanceResult.result : '0';
        const nonce = nonceResult ? parseInt(nonceResult.result, 16) : 0; // nonce是十六进制格式，需要转换
        const balanceInEther = Number(ethers.utils.formatEther(balanceInWei)).toFixed(4);

        return {
            era_balance: balanceInEther,
            era_tx: nonce
        };
    } catch (error) {
        console.error("Error fetching account details:", error);
        return null;
    }
};

export default getAccountDetails;
