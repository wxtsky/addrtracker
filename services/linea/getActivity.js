function timestampToDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
}

export default function calculateActivity(transactions) {
    const activity = {
        daily: new Set(),
        weekly: new Set(),
        monthly: new Set(),
    };
    let totalFee = 0
    transactions.forEach(transaction => {
        const date = new Date(transaction.timestamp * 1000);
        const day = date.toISOString().substring(0, 10); // yyyy-mm-dd
        const week = `${date.getFullYear()}-W${getWeekNumber(date)}`;
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

        activity.daily.add(day);
        activity.weekly.add(week);
        activity.monthly.add(month);
        totalFee += Number(transaction.fee);
    });

    return {
        linea_day: activity.daily.size,
        linea_week: activity.weekly.size,
        linea_month: activity.monthly.size,
        linea_gas: (Number(totalFee) / 1e18).toFixed(4),
        linea_last_tx: transactions.length > 0 ? timestampToDate(transactions[0].timestamp * 1000) : "N/A"
    };
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
