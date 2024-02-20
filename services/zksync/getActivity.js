function timestampToDate(timestamp) {
    // 创建一个新的Date对象
    const date = new Date(timestamp);
    // 获取年份
    const year = date.getFullYear();
    // 获取月份，月份是从0开始的，所以需要加1
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    // 获取日期
    const day = ('0' + date.getDate()).slice(-2);
    // 组合成格式为xxxx/xx/xx的字符串
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
        era_day: activity.daily.size,
        era_week: activity.weekly.size,
        era_month: activity.monthly.size,
        era_gas: (Number(totalFee) / 1e18).toFixed(4),
        era_last_tx: transactions.length > 0 ? timestampToDate(transactions[0].timestamp * 1000) : "N/A"
    };
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
