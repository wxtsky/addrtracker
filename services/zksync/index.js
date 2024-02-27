import fetchAddressTransactions from "@/services/zksync/getTransactions";
import calculateActivity from "@/services/zksync/getActivity";
import getAccountDetails from "@/services/zksync/getAccountDetails";
import getLiteInfo from "@/services/zksync/getLiteInfo";
import getEthInfo from "@/services/zksync/getEthInfo";

const getZksyncData = async (address) => {
    const storedNotes = window.localStorage.getItem('zksyncAddressNotes');
    const notes = storedNotes ? JSON.parse(storedNotes) : {};
    const note = notes[address] || '';
    const transactions = await fetchAddressTransactions(address);
    const {
        era_day,
        era_week,
        era_month,
        era_last_tx,
        era_gas,
        era_contract,
        era_vol,
        era_paymaster
    } = calculateActivity(transactions, address);
    const {era_balance, era_tx} = await getAccountDetails(address);
    const {lite_eth, lite_tx} = await getLiteInfo(address);
    const {mainnet_balance, mainnet_tx} = await getEthInfo(address);


    return {
        key: address,
        address,
        note,
        era_day,
        era_week,
        era_gas,
        era_last_tx,
        era_month,
        era_vol,
        era_tx,
        era_paymaster,
        era_contract,
        era_balance,
        lite_eth,
        lite_tx,
        mainnet_balance,
        mainnet_tx,
    }
}

export default getZksyncData;