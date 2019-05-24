export class Stock {
    public prices: Price[] = []
    public lastUpdate: Date = new Date()

    constructor(public symbol: string) {

    }
}

export class Price {
    public open: number = 0
    public high: number = 0
    public low: number = 0
    public close: number = 0
    // 当天 收盘 vs 开盘
    public rate: number = 0.0
    // 当天 收盘 vs 前一个交易日收盘
    public realRate: number = 0.0

    constructor(public start: Date, public end: Date) {

    }
}
