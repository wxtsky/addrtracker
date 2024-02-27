function timestampToDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
}

export default function calculateActivity(transactions, address) {
    const activity = {
        daily: new Set(),
        weekly: new Set(),
        monthly: new Set(),
        contract: new Set(),
        paymaster: new Set()
    };
    let totalFee = 0
    let era_vol = 0
    transactions.forEach(transaction => {
        const date = new Date(transaction.timestamp * 1000);
        const day = date.toISOString().substring(0, 10); // yyyy-mm-dd
        const week = `${date.getFullYear()}-W${getWeekNumber(date)}`;
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

        activity.daily.add(day);
        activity.weekly.add(week);
        activity.monthly.add(month);
        if (transaction.method_name !== "0x" && (transaction.from_address).toLowerCase() === address.toLowerCase()) {
            totalFee += Number(transaction.fee);
            activity.contract.add(transaction.to_address);
            era_vol += Number(transaction.value)
            if (transaction.transaction_type === "0x71") {
                activity.paymaster.add(transaction.to_address);
            }
        }
    });

    return {
        era_day: activity.daily.size,
        era_week: activity.weekly.size,
        era_month: activity.monthly.size,
        era_gas: (Number(totalFee) / 1e18).toFixed(4),
        era_last_tx: transactions.length > 0 ? transactions[0].timestamp : "N/A",
        era_contract: activity.contract.size,
        era_vol: era_vol.toFixed(3),
        era_paymaster: activity.paymaster.size,
    };
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
