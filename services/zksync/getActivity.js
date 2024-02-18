export default function calculateActivity(transactions) {
    const activity = {
        daily: new Set(),
        weekly: new Set(),
        monthly: new Set(),
    };

    transactions.forEach(transaction => {
        const date = new Date(transaction.timestamp * 1000);
        const day = date.toISOString().substring(0, 10); // yyyy-mm-dd
        const week = `${date.getFullYear()}-W${getWeekNumber(date)}`;
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

        activity.daily.add(day);
        activity.weekly.add(week);
        activity.monthly.add(month);
    });

    return {
        era_day: activity.daily.size,
        era_week: activity.weekly.size,
        era_month: activity.monthly.size,
    };
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
