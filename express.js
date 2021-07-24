import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';


async function callTheAPI(coinSymbol) {
    const APIKEY = 'amq5jptnsna65hkogat66b';
    let URL = `https://api.lunarcrush.com/v2?data=assets&key=${APIKEY}&symbol=${coinSymbol}&data_points=365&interval=day`;
    const fetching = await fetch(URL);
    const result = await fetching.json();
    const data = result.data[0];

    let dataToPass = JSON.stringify({
        name: data.name,
        price: data.price,
        percent_24h: data.percent_change_24h,
        percent_7d: data.percent_change_7d,
        marketCap: data.market_cap,
        volume24h: data.volume_24h.toLocaleString,
        circulSupply: `${data.max_supply} - ${coinSymbol}`
    });

    fs.writeFile('data.json', dataToPass, (err) => { if (err) throw err });
    console.log('Data has been written to the file');
}


let coins = ['BTC', 'ETH', 'ADA', 'USDT', 'BNB', 'LINK', 'DOGE', 'LTC', 'DOT', 'XRP'];


callTheAPI('BTC');



