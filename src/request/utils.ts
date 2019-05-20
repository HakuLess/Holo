import https from "https";

export function httpsGet(url: string): Promise<JSON> {
    return new Promise<JSON>(resolve => {
        console.log(url);
        https.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", chunk => {
                body += chunk;
            });
            res.on("end", function() {
                resolve(JSON.parse(body));
            });
        });
    });
}
