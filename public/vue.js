const app = Vue.createApp({
    data() {
        return {
            BTC: {},
            ETH: {},
            ADA: {},
            XRP: {},
            BNB: {},
            LINK: {},
            DOT: {},
            DOGE: {},
            LTC: {},

            coins: []
        }
    },

    methods: {
        async setValuesFromJSON(path, coin) {
            const fetching = await fetch(path);
            const response = await fetching.json();
            coin = response;
            this.coins.push(coin);
        }
    },
    
    mounted() {
        this.$forceUpdate();
        this.$nextTick(function() {
            this.setValuesFromJSON('./data/Bitcoin.json', this.BTC);
            this.setValuesFromJSON('./data/Ethereum.json', this.ETH);
            this.setValuesFromJSON('./data/Cardano.json', this.ADA);
            this.setValuesFromJSON('./data/Ripple.json', this.XRP);
            this.setValuesFromJSON('./data/BNB.json', this.BNB);
            this.setValuesFromJSON('./data/Chainlink.json', this.LINK);
            this.setValuesFromJSON('./data/Polkadot.json', this.DOT);
            this.setValuesFromJSON('./data/Doge.json', this.DOGE);
            this.setValuesFromJSON('./data/Litecoin.json', this.LTC);
        })
    }

}).mount("#container");
