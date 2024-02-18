import fetchAddressTransactions from "@/services/zksync/getTransactions";
import calculateActivity from "@/services/zksync/getActivity";
import getVol from "@/services/zksync/getVol";
import getEraBalance from "@/services/zksync/getEraBalance";

const getZksyncData = async (address) => {
    const transactions = await fetchAddressTransactions(address);
    const {era_day, era_week, era_month} = calculateActivity(transactions);
    const {era_vol} = getVol(transactions);
    const era_tx = transactions.length;
    const era_balance = await getEraBalance(address);
    return {
        address,
        era_day,
        era_week,
        era_month,
        era_vol,
        era_tx,
        era_balance
    }
}
export default getZksyncData;