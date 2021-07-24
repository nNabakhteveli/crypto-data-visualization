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
        async setBTC() {
            const fetching = await fetch('./data/Bitcoin.json');
            const res = await fetching.json();
            this.BTC = res;
            this.coins.push(this.BTC);
        },

        async setETH() {
            const fetching = await fetch('./data/Ethereum.json');
            const res = await fetching.json();
            this.ETH = res;
            this.coins.push(this.ETH);
        },

        async setADA() {
            const fetching = await fetch('./data/Cardano.json');
            const res = await fetching.json();
            this.ADA = res;
            this.coins.push(this.ADA);
        },

        async setXRP() {
            const fetching = await fetch('./data/Ripple.json');
            const res = await fetching.json();
            this.XRP = res;
            this.coins.push(this.XRP);
        },

        async setBNB() {
            const fetching = await fetch('./data/BNB.json');
            const res = await fetching.json();
            this.BNB = res;
            this.coins.push(this.BNB);
        },

        async setLINK() {
            const fetching = await fetch('./data/Chainlink.json');
            const res = await fetching.json();
            this.LINK = res;
            this.coins.push(this.LINK);
        },

        async setDOT() {
            const fetching = await fetch('./data/Polkadot.json');
            const res = await fetching.json();
            this.DOT = res;
            this.coins.push(this.DOT);
        },

        async setDOGE() {
            const fetching = await fetch('./data/Doge.json');
            const res = await fetching.json();
            this.DOGE = res;
            this.coins.push(this.DOGE);
        },

        async setLTC() {
            const fetching = await fetch('./data/Litecoin.json');
            const res = await fetching.json();
            this.LTC = res;
            this.coins.push(this.LTC);
        }
    },
    
    mounted() {
        this.$nextTick(function() {
            this.setBTC();
            this.setETH();
            this.setADA();
            this.setXRP();
            this.setBNB();
            this.setLINK();
            this.setDOT();
            this.setDOGE();
            this.setLTC();
        })
    }

}).mount("#container");
