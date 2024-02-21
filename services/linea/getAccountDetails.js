import axios from "axios";
import {ethers} from "ethers";

const getAccountDetails = async function (address) {
    const rpc = 'https://rpc.linea.build';
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
        },
        {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [{
                to: '0xd83af4fbD77f3AB65C3B1Dc4B38D7e67AEcf599A',
                data: '0x70a08231000000000000000000000000' + address.slice(2)
            }, 'latest'],
            id: 3
        }
    ];

    try {
        const response = await axios.post(rpc, data);
        const results = response.data;
        const balanceResult = results.find(res => res.id === 1);
        const nonceResult = results.find(res => res.id === 2);
        const xpBalanceResult = results.find(res => res.id === 3);
        const balanceInWei = balanceResult ? balanceResult.result : '0';
        const nonce = nonceResult ? parseInt(nonceResult.result, 16) : 0;
        const balanceInEther = Number(ethers.utils.formatEther(balanceInWei)).toFixed(4);
        const xpBalance = xpBalanceResult ? ethers.utils.formatUnits(xpBalanceResult.result, 18) : 0;
        return {
            linea_balance: balanceInEther,
            linea_tx: nonce,
            xp_balance: Number(xpBalance).toFixed(2)
        };
    } catch (error) {
        console.error("Error fetching account details:", error);
        return null;
    }
};

export default getAccountDetails;
