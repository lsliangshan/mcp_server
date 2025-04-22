/** 自然周范围（周一为起始） */
function getWeekRange(offsetWeeks = 0, baseDate = new Date()) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offsetWeeks * 7);
    return calculateWeekRange(date);
}
/** 自然月范围 */
function getMonthRange(offsetMonths = 0, baseDate = new Date()) {
    const date = new Date(baseDate);
    date.setMonth(date.getMonth() + offsetMonths);
    return calculateMonthRange(date);
}
/** 自然年范围 */
function getYearRange(offsetYears = 0, baseDate = new Date()) {
    const date = new Date(baseDate);
    date.setFullYear(date.getFullYear() + offsetYears);
    return calculateYearRange(date);
}
/** 自然季度范围 */
function getQuarterRange(offsetQuarters = 0, baseDate = new Date()) {
    const date = new Date(baseDate);
    // 计算季度偏移后的日期
    const currentQuarter = Math.floor(date.getMonth() / 3); // 当前季度（0-3）
    date.setMonth(date.getMonth() + offsetQuarters * 3);
    // 处理跨年逻辑（如从 Q1 偏移 -1 到 Q4）
    const targetQuarter = currentQuarter + offsetQuarters;
    const yearOffset = Math.floor(targetQuarter / 4);
    if (yearOffset !== 0) {
        date.setFullYear(date.getFullYear() + yearOffset);
    }
    return calculateQuarterRange(date);
}
// 计算自然周范围（内部实现）
function calculateWeekRange(date) {
    const baseDate = new Date(date);
    const dayOfWeek = baseDate.getDay(); // 0=周日
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return [monday.getTime(), sunday.getTime()];
}
// 计算自然月范围（内部实现）
function calculateMonthRange(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDay.setHours(0, 0, 0, 0);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    return [firstDay.getTime(), lastDay.getTime()];
}
// 计算自然年范围（内部实现）
function calculateYearRange(date) {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    firstDay.setHours(0, 0, 0, 0);
    const lastDay = new Date(date.getFullYear(), 11, 31);
    lastDay.setHours(23, 59, 59, 999);
    return [firstDay.getTime(), lastDay.getTime()];
}
// 新增：计算自然季度范围（内部实现）
function calculateQuarterRange(date) {
    const year = date.getFullYear();
    const currentQuarter = Math.floor(date.getMonth() / 3); // 0=Q1, 1=Q2, 2=Q3, 3=Q4
    const startMonth = currentQuarter * 3; // 季度起始月份（0-based）
    const endMonth = startMonth + 2; // 季度结束月份（0-based）
    // 季度起始日（首月第一天 00:00:00）
    const firstDay = new Date(year, startMonth, 1);
    firstDay.setHours(0, 0, 0, 0);
    // 季度结束日（末月最后一天 23:59:59.999）
    const lastDay = new Date(year, endMonth + 1, 0); // 下个月的第0天 = 本月最后一天
    lastDay.setHours(23, 59, 59, 999);
    return [firstDay.getTime(), lastDay.getTime()];
}
export function getRangeTimeByTimeType(timeType) {
    const now = new Date();
    let rangeTime = [];
    if (timeType.match(/last\d+Months/)) {
        const months = Number(timeType.match(/last(\d+)Months/)?.[1]);
        rangeTime = [
            now.setHours(0, 0, 0, 0) - months * 30 * 24 * 60 * 60 * 1000,
            now.getTime(),
        ];
    }
    else if (timeType.match(/last\d+Days/)) {
        const days = Number(timeType.match(/last(\d+)Days/)?.[1]);
        rangeTime = [
            now.setHours(0, 0, 0, 0) - days * 24 * 60 * 60 * 1000,
            now.getTime(),
        ];
    }
    else if (timeType.match(/last\d+Weeks/)) {
        const weeks = Number(timeType.match(/last(\d+)Weeks/)?.[1]);
        rangeTime = [
            now.setHours(0, 0, 0, 0) - weeks * 7 * 24 * 60 * 60 * 1000,
            now.getTime(),
        ];
    }
    else if (timeType.match(/last\d+Years/)) {
        const years = Number(timeType.match(/last(\d+)Years/)?.[1]);
        rangeTime = [
            now.setHours(0, 0, 0, 0) - years * 365 * 24 * 60 * 60 * 1000,
            now.getTime(),
        ];
    }
    else {
        switch (timeType) {
            case "today":
                rangeTime = [now.setHours(0, 0, 0, 0), now.setHours(23, 59, 59, 999)];
                break;
            case "yesterday":
                rangeTime = [
                    now.setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000,
                    now.setHours(23, 59, 59, 999) - 24 * 60 * 60 * 1000,
                ];
                break;
            case "beforeYesterday":
                rangeTime = [
                    now.setHours(0, 0, 0, 0) - 2 * 24 * 60 * 60 * 1000,
                    now.setHours(23, 59, 59, 999) - 2 * 24 * 60 * 60 * 1000,
                ];
                break;
            case "week":
                rangeTime = getWeekRange();
                break;
            case "lastWeek":
                rangeTime = getWeekRange(-1);
                break;
            case "beforeLastWeek":
                rangeTime = getWeekRange(-2);
                break;
            case "month":
                rangeTime = getMonthRange();
                break;
            case "lastMonth":
                rangeTime = getMonthRange(-1);
                break;
            case "beforeLastMonth":
                rangeTime = getMonthRange(-2);
                break;
            case "quarter":
                rangeTime = getQuarterRange();
                break;
            case "lastQuarter":
                rangeTime = getQuarterRange(-1);
                break;
            case "beforeLastQuarter":
                rangeTime = getQuarterRange(-2);
                break;
            case "year":
                rangeTime = getYearRange();
                break;
            case "lastYear":
                rangeTime = getYearRange(-1);
                break;
            case "beforeLastYear":
                rangeTime = getYearRange(-2);
                break;
        }
    }
    return rangeTime;
}
