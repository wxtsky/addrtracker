export default function getVol(transactions) {
    return {base_vol: Number(transactions.reduce((acc, tx) => acc + Number(tx.value), 0)).toFixed(3)}
}