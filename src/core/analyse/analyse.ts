import { Stock } from '../../model/Stock'

export function analyse(stock: Stock): string {
    let ans = ''
    ans += base(stock) + '\n'
    ans += point(stock) + '\n'
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
