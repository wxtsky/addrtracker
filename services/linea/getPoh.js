import axios from "axios";


const getPoh = async (address) => {
    try {
        const response = await axios.get('https://linea-xp-poh-api.linea.build/poh/' + address);
        return response.data['poh']
    } catch (e) {
        return false
    }
}
export default getPoh;