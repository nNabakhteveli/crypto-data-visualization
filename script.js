const APIKEY = 'amq5jptnsna65hkogat66b';

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
                last7days: null
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
                last7days: null
            },

            coins: [this.BTC, this.ETH]
        }
    },

    methods: {
        callTheAPI(coinSymbol) {
            let URL = `https://api.lunarcrush.com/v2?data=assets&key=${APIKEY}&symbol=${coinSymbol.symbol}&data_points=365&interval=day`;
            fetch(URL)
            .then(response => response.json())
            .then(result => {
                const data = result.data[0];
                console.log(data);
                coinSymbol.name = data.name;
                coinSymbol.price = `$${(data.price).toLocaleString()}`;
                coinSymbol.percent_24h = `${data.percent_change_24h}%`;
                coinSymbol.percent_7d = `${data.percent_change_7d}%`;
                coinSymbol.marketCap = `$${data.market_cap.toLocaleString()}`;
                coinSymbol.volume24h = `$${data.volume_24h.toLocaleString()}`;
                coinSymbol.circulSupply = `${(data.max_supply).toLocaleString()} ${coinSymbol.symbol}`;
            });
        }
    },

    mounted() {
        this.$nextTick(function () {
        this.callTheAPI(this.BTC);
        this.callTheAPI(this.ETH);
        })
    },

    computed: {
        style() {
            if(this.BTC.percent_24h > 0) {
                return {
                    color: 'green'
                }
            }
            return {
                color: 'red'
            }
        }
    }
}).mount("#container");

