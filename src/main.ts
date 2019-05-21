import { getStockDetail } from './core/datasource/handle'

const ans = getStockDetail('TQQQ')
ans.then(stock => {
    const high = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const low = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    stock.prices.forEach(price => {
        const highPer = Math.floor((price.high - Math.floor(price.high)) * 10)
        high[highPer]++

        const lowPer = Math.floor((price.low - Math.floor(price.low)) * 10)
        low[lowPer]++
    })
    high.forEach((it, index) => {
        console.log(`${index}: ${it}`)
    })
    low.forEach((it, index) => {
        console.log(`${index}: ${it}`)
    })
})
