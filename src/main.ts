import { getDetail } from "./request/vantage/vantage";
import { Symbol, TimeSeries } from "./request/vantage/params";

const res = getDetail(TimeSeries.DailyAdjusted, Symbol.TQQQ);
res.then(data => {
    console.log(data);
});
