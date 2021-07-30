import express from 'express';
import { fileURLToPath } from "url";
import { dirname } from "path";
import fetch from 'node-fetch';
import fs from 'fs';
import openHttpLink from 'open';


async function callTheAPI(coinSymbol, path) {
    const APIKEY = 'amq5jptnsna65hkogat66b';
    let URL = `https://api.lunarcrush.com/v2?data=assets&key=${APIKEY}&symbol=${coinSymbol}&data_points=365&interval=day`;
    const fetching = await fetch(URL);
    const result = await fetching.json();
    const data = result.data[0];

    let dataToPass = JSON.stringify({
        name: data.name,
        symbol: data.symbol,
        price: `$${(data.price).toLocaleString()}`,
        percent_24h: `${data.percent_change_24h}`,
        percent_7d: `${data.percent_change_7d}`,
        marketCap: `$${data.market_cap.toLocaleString()}`,
        volume24h: `$${data.volume_24h.toLocaleString()}`,
        circulSupply: parseInt(data.max_supply).toLocaleString()
    });
    fs.writeFile(path, dataToPass, (err) => { if (err) throw err });
    console.log(`${coinSymbol}'s Data has been written`);
}

const app = express();
const port = 3000;
const hostname = "127.0.0.1";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function writeData() {
    fs.readFile('./public/data/coins.json', (err, data) => {
        if (err) throw err;
        const coinsArr = JSON.parse(data).data;
        setInterval(() => {
            coinsArr.forEach(coin => callTheAPI(coin.symbol, coin.path));
        }, 10000); // To update the data in every 10 seconds
    });
}
writeData();

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    writeData(); 
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, hostname, () => {
    console.log(`Your server is running at http://${hostname}:${port}/`);
    openHttpLink(`http://${hostname}:${port}/`);
});