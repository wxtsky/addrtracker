import axios from "axios";
import {ethers} from "ethers";

const getEraBalance = async function (address) {
    const rpc = 'https://mainnet.era.zksync.io';
    const data = {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
    };

    try {
        const response = await axios.post(rpc, data);
        const balanceInWei = response.data.result;
        return Number(ethers.utils.formatEther(balanceInWei)).toFixed(4)
    } catch (error) {
        return null;
    }
};
export default getEraBalance;