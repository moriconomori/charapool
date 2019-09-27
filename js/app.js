var app = new Vue({
  el: '#app',
  data: {
    pools: [],
    players: [],
    selectedPlayerName: '',
    selectedPlayerPool: null,
    showSelectedPlayer: false
  },
  methods: {
    show: async function() {
      if (this.selectedPlayerName) {
        this.selectedPlayerPool = await this.getPoolByPlayer(this.selectedPlayerName);
        this.showSelectedPlayer = true;
      }
    },
    addList: async function() {
      if (this.selectedPlayerName) {
        var selectedPlayerPool = await this.getPoolByPlayer(this.selectedPlayerName);
        this.pools.push(selectedPlayerPool);
      }
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
    register: function() {},
  },
  created: async function() {
    var players = [];
    await axios.get('./api/players.php')
      .then(function(res) {
        players = res.data;
      })
      .catch(function(err) {
        console.log('Error!');
      });
    this.players = players;
  }
})
