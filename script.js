
const app = Vue.createApp({
    data() {
        return {
            BTC: {
                symbol: 'BTC',
                name: '',
                price: '',
                percent_24h: null,
                percent_7d: null,
                marketCap: null,
                volume24h: null,
                circulSupply: null,
            },

            ETH: {
                symbol: 'ETH',
                name: '',
                price: '',
                percent_24h: null,
                percent_7d: null,
                marketCap: null,
                volume24h: null,
                circulSupply: null,
            },

            coins: []
        }
    },

    methods: {
        async callTheAPI(coinSymbol) {
            const APIKEY = 'amq5jptnsna65hkogat66b';
            let URL = `https://api.lunarcrush.com/v2?data=assets&key=${APIKEY}&symbol=${coinSymbol.symbol}&data_points=365&interval=day`;
            const fetching = await fetch(URL);
            const result = await fetching.json();

            const data = result.data[0];
            coinSymbol.name = data.name;
            coinSymbol.price = `$${(data.price).toLocaleString()}`;
            coinSymbol.percent_24h = `${data.percent_change_24h}%`;
            coinSymbol.percent_7d = `${data.percent_change_7d}%`;
            coinSymbol.marketCap = `$${data.market_cap.toLocaleString()}`;
            coinSymbol.volume24h = `$${data.volume_24h.toLocaleString()}`;
            coinSymbol.circulSupply = `${(data.max_supply).toLocaleString()} ${coinSymbol.symbol}`;
        }
    },
    
    mounted() {
        this.$nextTick(function () {
            this.callTheAPI(this.BTC);
            this.callTheAPI(this.ETH);

            this.coins.push(this.BTC);
            this.coins.push(this.ETH);
            console.log(this.coins);
        })
    }

}).mount("#container");


