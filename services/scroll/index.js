import fetchAddressTransactions from "@/services/scroll/getTransactions";
import calculateActivity from "@/services/scroll/getActivity";
import getAccountDetails from "@/services/scroll/getAccountDetails";
import getEthInfo from "@/services/scroll/getEthInfo";


const getScrollData = async (address) => {
    const storedNotes = window.localStorage.getItem('scrollAddressNotes');
    const notes = storedNotes ? JSON.parse(storedNotes) : {};
    const note = notes[address] || '';
    const transactions = await fetchAddressTransactions(address);
    const {
        scroll_day,
        scroll_week,
        scroll_month,
        scroll_last_tx,
        scroll_gas,
        scroll_vol
    } = calculateActivity(transactions, address);
    const {scroll_balance, scroll_tx} = await getAccountDetails(address);
    const {mainnet_balance, mainnet_tx} = await getEthInfo(address);
    return {
        key: address,
        address,
        note,
        scroll_day,
        scroll_week,
        scroll_gas,
        scroll_last_tx,
        scroll_month,
        scroll_vol,
        scroll_tx,
        scroll_balance,
        mainnet_balance,
        mainnet_tx,
    }
}
export default getScrollData;