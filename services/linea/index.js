import fetchAddressTransactions from "@/services/linea/getTransactions";
import calculateActivity from "@/services/linea/getActivity";
import getLineaBalance from "@/services/linea/getLineaBalance";
import getVol from "@/services/linea/getVol";
import getEthInfo from "@/services/linea/getEthInfo";


const getLineaData = async (address) => {
    const transactions = await fetchAddressTransactions(address);
    const {linea_day, linea_week, linea_month, linea_last_tx, linea_gas} = calculateActivity(transactions);
    const {linea_vol} = getVol(transactions);
    const linea_tx = transactions.length;
    const linea_balance = await getLineaBalance(address);
    const {mainnet_balance, mainnet_tx} = await getEthInfo(address);
    return {
        key: address,
        address,
        linea_day,
        linea_week,
        linea_gas,
        linea_last_tx,
        linea_month,
        linea_vol,
        linea_tx,
        linea_balance,
        mainnet_balance,
        mainnet_tx,
    }
}
export default getLineaData;