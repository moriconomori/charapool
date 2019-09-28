var app = new Vue({
  el: '#app',
  data: {
    pools: [],
    players: [],
    selectedPlayerName: '',
    selectedPlayerPool: null,
    showSelectedPlayer: false,
    herosName: [],
  },
  methods: {
    show: async function() {
      if (this.selectedPlayerName) {
        this.selectedPlayerPool = await this.getPoolByPlayer(this.selectedPlayerName);
        this.showSelectedPlayer = true;
        gtag('event', 'show', { 'event_category': 'pool', 'event_label': this.selectedPlayerName });
      }
    },
    addList: async function() {
      if (this.selectedPlayerName) {
        var selectedPlayerPool = await this.getPoolByPlayer(this.selectedPlayerName);
        this.pools.push(selectedPlayerPool);
        gtag('event', 'add_list', { 'event_category': 'pool', 'event_label': this.selectedPlayerName });
      }
    },
    removeList: function(player) {
      var index = 0;
      for (let i = 0; i < this.pools.length; i++) {
        const item = this.pools[i];
        if (item.player === player) {
          index = i;
          break;
        }
      }
      this.pools.splice(index, 1);
    },
    hide: function() {
      this.showSelectedPlayer = false;
    },
    getPoolByPlayer: async function(player) {
      var pool;
      var uri = './api/pools.php?player=' + player;
      await axios.get(uri)
        .then(function(res) {
          pool = res.data[0];
        })
        .catch(function(err) {
          console.log('Error!');
        });
      return pool;
    },
    register: function() {
      gtag('event', 'register', { 'event_category': 'register' });
    },
    init: async function() {
      var players = [];
      await axios.get('./api/players.php')
        .then(function(res) {
          players = res.data;
        })
        .catch(function(err) {
          console.log('Error!');
        });
      this.players = players;

      var herosName = [];
      await axios.get('./data/heros_name.json')
        .then(function(res) {
          herosName = res.data;
        })
        .catch(function(err) {
          console.log('Error!');
        });
      this.herosName = herosName;
    },
    remove: function(player) {
      this.removeList(player);
    },
  },
  created: async function() {
    await this.init();
  },
})
