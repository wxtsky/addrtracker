import fetchAddressTransactions from "@/services/zksync/getTransactions";
import calculateActivity from "@/services/zksync/getActivity";
import getVol from "@/services/zksync/getVol";
import getEraBalance from "@/services/zksync/getEraBalance";
import getLiteInfo from "@/services/zksync/getLiteInfo";
import getEthInfo from "@/services/zksync/getEthInfo";

const getZksyncData = async (address) => {
    const transactions = await fetchAddressTransactions(address);
    const {era_day, era_week, era_month, era_last_tx, era_gas} = calculateActivity(transactions);
    const {era_vol} = getVol(transactions);
    const era_tx = transactions.length;
    const era_balance = await getEraBalance(address);
    const {lite_eth, lite_tx} = await getLiteInfo(address);
    const {mainnet_balance, mainnet_tx} = await getEthInfo(address);
    return {
        key: address,
        address,
        era_day,
        era_week,
        era_gas,
        era_last_tx,
        era_month,
        era_vol,
        era_tx,
        era_balance,
        lite_eth,
        lite_tx,
        mainnet_balance,
        mainnet_tx
    }
}
export default getZksyncData;