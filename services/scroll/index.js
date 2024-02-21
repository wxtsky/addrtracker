import fetchAddressTransactions from "@/services/scroll/getTransactions";
import calculateActivity from "@/services/scroll/getActivity";
import getVol from "@/services/scroll/getVol";
import getAccountDetails from "@/services/scroll/getAccountDetails";
import getEthInfo from "@/services/scroll/getEthInfo";


const getScrollData = async (address) => {
    const transactions = await fetchAddressTransactions(address);
    const {scroll_day, scroll_week, scroll_month, scroll_last_tx, scroll_gas} = calculateActivity(transactions);
    const {scroll_vol} = getVol(transactions);
    const {scroll_balance, scroll_tx} = await getAccountDetails(address);
    const {mainnet_balance, mainnet_tx} = await getEthInfo(address);
    return {
        key: address,
        address,
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