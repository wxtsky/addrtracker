import axios from 'axios';

export default async function getLiteInfo(address) {
    try {
        const response = await axios.post(
            'https://api.zksync.io/jsrpc',
            {
                'id': 1,
                'jsonrpc': '2.0',
                'method': 'account_info',
                'params': [
                    address
                ]
            }
        );
        const tx = response.data.result.committed.nonce;
        const eth_balance = response.data.result.committed.balances['ETH'] ? response.data.result.committed.balances['ETH'] : 0;
        return {
            lite_eth: (Number(eth_balance) / 1e18).toFixed(4),
            lite_tx: tx
        }
    } catch (error) {
        console.error(error);
        return {
            lite_eth: null,
            lite_tx: null
        }
    }

}