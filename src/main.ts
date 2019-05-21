import { getStockDetail } from './core/datasource/handle'
import { analyse } from './core/analyse/analyse'

const ans = getStockDetail('TQQQ')
ans.then(stock => {
    console.log(analyse(stock))
})
