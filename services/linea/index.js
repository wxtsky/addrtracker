import fetchAddressTransactions from "@/services/linea/getTransactions";
import calculateActivity from "@/services/linea/getActivity";
import getAccountDetails from "@/services/linea/getAccountDetails";
import getEthInfo from "@/services/linea/getEthInfo";


const getLineaData = async (address) => {
    const storedNotes = window.localStorage.getItem('lineaAddressNotes');
    const notes = storedNotes ? JSON.parse(storedNotes) : {};
    const note = notes[address] || '';
    const transactions = await fetchAddressTransactions(address);
    const {
        linea_day,
        linea_week,
        linea_month,
        linea_last_tx,
        linea_gas,
        linea_vol
    } = calculateActivity(transactions, address);
    const {linea_balance, linea_tx, xp_balance} = await getAccountDetails(address);
    const {mainnet_balance, mainnet_tx} = await getEthInfo(address);
    return {
        key: address,
        address,
        note,
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
        xp_balance
    }
}
export default getLineaData;