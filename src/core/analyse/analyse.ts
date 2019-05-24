import { Stock } from '../../model/Stock'

export function analyse(stock: Stock): string {
    let ans = ''
    ans += base(stock) + '\n'
    ans += point(stock) + '\n'
    ans += low(stock) + '\n'
    return ans
}

/**
 * 基础信息
 *
 * @param stock 数据源
 * */
function base(stock: Stock): string {
    let ans = `${stock.symbol}: 共${stock.prices.length}个交易日`
    return ans
}

function low(stock: Stock): string {
    let ans = ''
    const prices = stock.prices
    let upCount = 0
    let totalCount = 0
    for (let i = 0; i < prices.length; i++) {
        if (prices[i].realRate < -0.07) {
            ans += i + ' ' + prices[i].start + ': ' + prices[i].realRate + '\n'
            if (prices[i - 1]) {
                ans += i - 1 + ' The next day：' + prices[i - 1].start + ': ' + prices[i - 1].realRate + '\n'
                if (prices[i - 1].realRate > 0) {
                    upCount++
                }
                totalCount++
            }
        }
    }
    ans += `${upCount / totalCount} UP`

    return ans
}

/**
 * 小数点分布
 *
 * @param stock 数据源
 * */
function point(stock: Stock): string {
    const high = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const low = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    stock.prices.forEach(price => {
        const highPer = Math.floor((price.high - Math.floor(price.high)) * 10)
        high[highPer]++

        const lowPer = Math.floor((price.low - Math.floor(price.low)) * 10)
        low[lowPer]++
    })

    let most = 0
    let highest = 0
    high.forEach((it, index) => {
        if (it > most) {
            most = it
            highest = index
        }
    })

    most = 0
    let lowest = 0
    low.forEach((it, index) => {
        if (it > most) {
            most = it
            lowest = index
        }
    })

    return `小数点最高点为：0.${highest}, 最低点为：0.${lowest}`
}
