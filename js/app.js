Vue.component('footer-component', {
  template: `
  <footer class="footer">
    <p>
      <span>Ver. 0.9.0</span>
    </p>
    <p>
      <span>&copy; 2019 Morico</span>
    </p>
  </footer>
  `
})

var router = new VueRouter({
  mode: 'history',
  routes: [],
})

var app = new Vue({
  el: '#app',
  router: router,
  data: {
    pools: [],
    pool: [],
    players: [],
    player: '',
    selectedPlayerName: '',
    selectedPlayerPool: null,
    herosName: [],
  },
  methods: {
    addList: async function() {
      if (this.selectedPlayerName) {
        gtag('event', 'add_list', { 'event_category': 'pool', 'event_label': this.selectedPlayerName });

        for (let i = 0; i < this.pools.length; i++) {
          const item = this.pools[i];
          if (item.player === this.selectedPlayerName) {
            return;
          }
        }

        var selectedPlayerPool = await this.getPoolByPlayer(this.selectedPlayerName);

        this.pools.push(selectedPlayerPool);
      }
    },
    sortHeros: function(heros) {
      var herosSorted = [];

      for (let i = 0; i < heros.length; i++) {
        const specialty = heros[i].specialty;
        if (specialty == "good") {
          herosSorted.unshift(heros[i]);
        } else {
          herosSorted.push(heros[i]);
        }
      }

      return herosSorted;
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
    getPoolByPlayer: async function(player) {
      var pool = [];

      var uri = 'api/pools/' + player;
      await axios.get(uri)
        .then(function(res) {
          pool = res.data[0];
        })
        .catch(function(err) {
          console.log('Error!');
        });

      pool.heros = this.sortHeros(pool.heros);
      return pool;
    },
    register: function() {
      gtag('event', 'register', { 'event_category': 'register' });
    },
    init: async function() {
      var players = [];
      await axios.get('api/players')
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
    serviceWorkerRegister: function() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function() {
          console.log('Service Worker Registered');
        });
      }
    }
  },
  created: async function() {
    await this.init();
    this.serviceWorkerRegister();

    if (this.$route.path == '/pool/list.html') {
      this.player = this.$route.query.player;
      this.pool = await this.getPoolByPlayer(this.player);
      document.title = 'ヒーロープール(' + this.player + ') | Charpool';
    }
  },
})
