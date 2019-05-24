import { getDetail } from '../../request/vantage/vantage'
import { TimeSeries } from '../../request/vantage/params'
import { Price, Stock } from '../../model/Stock'
import fs from 'fs'

export async function getStockDetail(symbol): Promise<Stock> {
    // 如果之前有 有效日志，LastUpdate在8h内
    const cache = readLog(symbol)
    if (cache) {
        return Promise.resolve(cache as Stock)
    }

    // 没有缓存，则从网络数据拉取 & 同时更新缓存文件
    const data = await getDetail(TimeSeries.Daily, symbol)
    const stock = new Stock(symbol)
    const seriesKey = getSeriesKey(data)
    for (let dataKey in data) {
        for (let day in (data[seriesKey])) {
            let price = new Price(
                new Date(day),
                new Date(day)
            )
            price.open = data[seriesKey][day]['1. open']
            price.high = data[seriesKey][day]['2. high']
            price.low = data[seriesKey][day]['3. low']
            price.close = data[seriesKey][day]['4. close']
            price.rate = (price.close - price.open) / price.open

            const next = stock.prices[stock.prices.length - 1]
            if (next) {
                next.realRate = (next.close - price.close) / price.close
            }
            // console.log(price.start)
            stock.prices.push(price)
        }
    }
    writeLog(stock)
    return Promise.resolve(stock)
}

/**
 * 获取不同时段请求的Key值
 * @param data 数据源
 * */
function getSeriesKey(data: JSON): string {
    for (let dataKey in data) {
        if (dataKey.indexOf('Time Series') >= 0) {
            return dataKey
        }
    }
    return ''
}

/**
 * 历史数据写入JSON文件
 * 文件名称使用 ${Symbol}.json
 *
 * @param stock Stock数据
 * */
export function writeLog(stock: Stock) {
    stock.lastUpdate = new Date()
    const data = JSON.stringify(stock)
    // 当前文件路径
    const cur = `${process.cwd()}/log/${stock.symbol}.json`
    fs.writeFileSync(cur, data)
}

/**
 * 读取日志数据
 *
 * @param symbol 股票代号
 * */
function readLog(symbol: string): boolean | Stock {
    const cur = `${process.cwd()}/log/${symbol}.json`
    if (fs.existsSync(cur)) {
        const buffer = fs.readFileSync(cur)
        const data = JSON.parse(buffer.toString())
        // 获取到 毫秒 级别数据，缓存时间1h
        if (new Date().getTime() - new Date(data.lastUpdate).getTime() < 60 * 60 * 1000) {
            return data as Stock
        } else {
            return false
        }
    } else {
        return false
    }
}

