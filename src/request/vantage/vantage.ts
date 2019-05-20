/**
 * ALPHA VANTAGE Date Source
 * @URL: https://www.alphavantage.co/documentation/
 * */
import { httpsGet } from "../utils";
import { Interval, Output, Symbol, TimeSeries } from "./params";
import { KEY_VANTAGE } from "../../Keys";

const API_KEY = KEY_VANTAGE;

export async function getDetail(func: TimeSeries, symbol: Symbol, interval?: Interval, outputSize = Output.Full) {
    let url = "https://www.alphavantage.co/query?";
    url += `function=${func}`;
    url += `&symbol=${symbol}`;
    if (interval) {
        url += `&interval=${interval}`;
    }
    url += `&outputsize=${outputSize}`;
    url += `&apikey=${API_KEY}`;
    const data = await httpsGet(url);
    for (let dataKey in data) {
        console.log(dataKey);
    }
    return data;
}
