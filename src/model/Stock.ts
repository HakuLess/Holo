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

    constructor(public start: Date, public end: Date) {

    }
}
