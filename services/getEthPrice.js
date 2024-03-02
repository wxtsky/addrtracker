import axios from "axios";

const getEthPrice = async () => {
    try {
        const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
        const response = await axios.get(url)
        return Number(response.data['USD'])
    } catch (e) {
        console.log(e)
        return 0
    }
}
export default getEthPrice;