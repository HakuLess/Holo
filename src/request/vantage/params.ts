export enum TimeSeries {
    Intraday = "TIME_SERIES_INTRADAY",
    Daily = "TIME_SERIES_DAILY",
    DailyAdjusted = "TIME_SERIES_DAILY_ADJUSTED",
    Weekly = "TIME_SERIES_WEEKLY",
    WeeklyAdjusted = "TIME_SERIES_WEEKLY_ADJUSTED",
    Monthly = "TIME_SERIES_MONTHLY",
    MonthlyAdjusted = "TIME_SERIES_MONTHLY_ADJUSTED",
    Quote = "GLOBAL_QUOTE",
    Search = "SYMBOL_SEARCH",
}

export enum Symbol {
    TQQQ = "TQQQ",
}

export enum Interval {
    _1Min = "1min",
    _5Min = "5min",
    _15Min = "15min",
    _30Min = "30min",
    _60Min = "60min",
}

export enum Output {
    Compat = "compat",
    Full = "full",
}
