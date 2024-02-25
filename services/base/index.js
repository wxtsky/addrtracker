import fetchAddressTransactions from "@/services/base/getTransactions";
import calculateActivity from "@/services/base/getActivity";
import getAccountDetails from "@/services/base/getAccountDetails";
import getEthInfo from "@/services/base/getEthInfo";


const getBaseData = async (address) => {
    const storedNotes = window.localStorage.getItem('zksyncAddressNotes');
    const notes = storedNotes ? JSON.parse(storedNotes) : {};
    const note = notes[address] || '';
    const transactions = await fetchAddressTransactions(address);
    const {
        base_day,
        base_week,
        base_month,
        base_last_tx,
        base_gas,
        base_vol
    } = calculateActivity(transactions, address);
    const {base_balance, base_tx} = await getAccountDetails(address);
    const {mainnet_balance, mainnet_tx} = await getEthInfo(address);
    return {
        key: address,
        address,
        note,
        base_day,
        base_week,
        base_gas,
        base_last_tx,
        base_month,
        base_vol,
        base_tx,
        base_balance,
        mainnet_balance,
        mainnet_tx,
    }
}
export default getBaseData;