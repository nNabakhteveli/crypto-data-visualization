import fetch from 'node-fetch';
import fs from 'fs';


async function callTheAPI(coinSymbol, path) {
    const APIKEY = 'amq5jptnsna65hkogat66b';
    let URL = `https://api.lunarcrush.com/v2?data=assets&key=${APIKEY}&symbol=${coinSymbol}&data_points=365&interval=day`;
    const fetching = await fetch(URL);
    const result = await fetching.json();
    const data = result.data[0];


    let dataToPass = JSON.stringify({
        name: data.name,
        price: `$${(data.price).toLocaleString()}`,
        percent_24h: `${data.percent_change_24h}`,
        percent_7d: `${data.percent_change_7d}`,
        marketCap: `$${data.market_cap.toLocaleString()}`,
        volume24h: `$${data.volume_24h.toLocaleString()}`,
        circulSupply: `${data.max_supply} ${coinSymbol}`
    });

    fs.writeFile(path, dataToPass, (err) => { if (err) throw err });
    console.log(`${coinSymbol}'s Data has been written`);
}


let coinsArr = [
    {
        symbol: 'BTC',
        path: './data/Bitcoin.json'
    },

    {
        symbol: 'ETH',
        path: './data/Ethereum.json'
    },

    {
        symbol: 'ADA',
        path: './data/Cardano.json'
    },

    {
        symbol: 'XRP',
        path: './data/Ripple.json'
    },

    {
        symbol: 'BNB',
        path: './data/BNB.json'
    },

    {
        symbol: 'LINK',
        path: './data/Chainlink.json'
    },

    {
        symbol: 'DOT',
        path: './data/Polkadot.json'
    },

    {
        symbol: 'DOGE',
        path: './data/Doge.json'
    },

    {
        symbol: 'LTC',
        path: './data/Litecoin.json'
    }
];

coinsArr.forEach(coin => callTheAPI(coin.symbol, coin.path));

