import axios from "axios";
import {ethers} from "ethers";

export default async function fetchAddressTransactions(address, cursor = null, accumulatedList = []) {
    const input = {
        json: {
            address: address,
            take: 20,
            desc: true,
            cursor: cursor
        }
    };
    const url = `https://base.l2scan.co/api/trpc/address.getAddressTxs?input=${encodeURIComponent(JSON.stringify(input))}`;
    try {
        const response = await axios.get(url);
        const {list, nextCursor} = response.data.result.data.json;
        const newList = list.map(tx => ({
            "value": tx.value ? ethers.utils.formatUnits(tx.value, 18) : 0,
            "fee": tx.fee,
            "timestamp": tx.timestamp,
            "to_address": tx.to_address,
            "from_address": tx.from_address,
            "method_name": tx.method_name,
        }));
        const accumulatedNewList = [...accumulatedList, ...newList];
        if (nextCursor !== null) {
            return fetchAddressTransactions(address, nextCursor, accumulatedNewList);
        } else {
            return accumulatedNewList;
        }
    } catch (error) {
        console.error(`Error fetching transactions: ${error}`);
        return [];
    }
}