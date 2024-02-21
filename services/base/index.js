import fetchAddressTransactions from "@/services/base/getTransactions";
import calculateActivity from "@/services/base/getActivity";
import getAccountDetails from "@/services/base/getAccountDetails";
import getVol from "@/services/base/getVol";
import getEthInfo from "@/services/base/getEthInfo";


const getBaseData = async (address) => {
    const transactions = await fetchAddressTransactions(address);
    const {base_day, base_week, base_month, base_last_tx, base_gas} = calculateActivity(transactions);
    const {base_vol} = getVol(transactions);
    const {base_balance, base_tx} = await getAccountDetails(address);
    const {mainnet_balance, mainnet_tx} = await getEthInfo(address);
    return {
        key: address,
        address,
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