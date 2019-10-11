<template>
  <div class="pool-list">
    <transition-group name="fade" tag="div">
      <article class="message is-link is-small" v-for="pool in pools" :key="pool.player">
        <div class="message-header">
          <span>{{ pool.player }}</span>
          <div class="message-header-menu">
            <div class="message-header-menu-item">
              <img
                src="../assets/icons/search-icon.svg"
                alt="検索"
                class="image is-16x16"
                @click="toggleShowFilter(pool.player, 'search')"
              />
            </div>
            <div class="message-header-menu-item">
              <button class="delete" @click="removePoolListByPlayer(pool.player)">></button>
            </div>
          </div>
        </div>
        <div class="message-body">
          <transition name="fade">
            <div class="show-filter" v-show="pool['showFilters']['search']">
              <div class="tabs is-toggle is-fullwidth is-small">
                <ul>
                  <li
                    :class="{'is-active': pool['showFilters']['top']}"
                    @click="toggleShowFilter(pool.player, 'top')"
                  >
                    <a>
                      <span>Top</span>
                    </a>
                  </li>
                  <li
                    :class="{'is-active': pool['showFilters']['mid']}"
                    @click="toggleShowFilter(pool.player, 'mid')"
                  >
                    <a>
                      <span>Mid</span>
                    </a>
                  </li>
                  <li
                    :class="{'is-active': pool['showFilters']['bot']}"
                    @click="toggleShowFilter(pool.player, 'bot')"
                  >
                    <a>
                      <span>Bot</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="tabs is-toggle is-fullwidth is-small">
                <ul>
                  <li
                    :class="{'is-active': pool['showFilters']['attackers']}"
                    @click="toggleShowFilter(pool.player, 'attackers')"
                  >
                    <a>
                      <span>火力</span>
                    </a>
                  </li>
                  <li
                    :class="{'is-active': pool['showFilters']['tanks']}"
                    @click="toggleShowFilter(pool.player, 'tanks')"
                  >
                    <a>
                      <span>タンク</span>
                    </a>
                  </li>
                  <li
                    :class="{'is-active': pool['showFilters']['specialists']}"
                    @click="toggleShowFilter(pool.player, 'specialists')"
                  >
                    <a>
                      <img src="../assets/icons/star-icon.svg" alt="star" class="image is-16x16" />
                      <span>のみ</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </transition>

          <div class="panel">
            <transition name="fade">
              <div class="pool-item-lane" v-show="pool['showFilters']['top']">
                <div class="hero-list-wrapper">
                  <div class="hero-list-header">
                    <div class="hero-list-header-content">
                      <span class="tag has-text-dark">TOP</span>
                    </div>
                  </div>
                  <div class="hero-list-body">
                    <transition-group name="fade" tag="div" class="tag-list">
                      <span
                        class="tag"
                        :class="{ 'is-danger': isAttacker(hero), 'is-info': !isAttacker(hero),'is-specialist': isSpecialist(hero) }"
                        v-for="hero in pool.top.filteredHeros"
                        :key="hero.name"
                      >{{ hero.name }}</span>
                    </transition-group>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div class="pool-item-lane" v-show="pool['showFilters']['mid']">
                <div class="hero-list-wrapper">
                  <div class="hero-list-header">
                    <div class="hero-list-header-content">
                      <span class="tag has-text-dark">MID</span>
                    </div>
                  </div>
                  <div class="hero-list-body" v-if="pool.mid">
                    <transition-group name="fade" tag="div" class="tag-list">
                      <span
                        class="tag"
                        :class="{ 'is-danger': isAttacker(hero), 'is-info': !isAttacker(hero),'is-specialist': isSpecialist(hero) }"
                        v-for="hero in pool.mid.filteredHeros"
                        :key="hero.name"
                      >{{ hero.name }}</span>
                    </transition-group>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div class="pool-item-lane" v-show="pool['showFilters']['bot']">
                <div class="hero-list-wrapper">
                  <div class="hero-list-header">
                    <div class="hero-list-header-content">
                      <span class="tag has-text-dark">BOT</span>
                    </div>
                  </div>
                  <div class="hero-list-body" v-if="pool.bot">
                    <transition-group name="fade" tag="div" class="tag-list">
                      <span
                        class="tag"
                        :class="{ 'is-danger': isAttacker(hero), 'is-info': !isAttacker(hero),'is-specialist': isSpecialist(hero) }"
                        v-for="hero in pool.bot.filteredHeros"
                        :key="hero.name"
                      >{{ hero.name }}</span>
                    </transition-group>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </article>
    </transition-group>

    <div class="player-select">
      <div class="field has-addons">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select name="player" v-model="selectedPlayerName">
              <option disabled value>プレイヤーを選択</option>
              <option v-for="player in players" :key="player.name">{{ player.name }}</option>
            </select>
          </div>
        </div>
        <div class="control">
          <button class="button is-link" @click="addPoolList(selectedPlayerName)">表示する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PoolList",
  data: function() {
    return {
      selectedPlayerName: "",
      players: [],
      pools: {}
    };
  },
  methods: {
    isAttacker: function(hero) {
      if (hero.role === "attack") {
        return true;
      }
      return false;
    },
    isSpecialist: function(hero) {
      if (hero.specialist) {
        return true;
      }
      return false;
    },
    toggleShowFilter: function(player, target) {
      if (this.pools[player]["showFilters"][target]) {
        this.$set(this.pools[player]["showFilters"], target, false);
      } else {
        this.$set(this.pools[player]["showFilters"], target, true);
      }
      switch (target) {
        case "attackers":
        case "tanks":
        case "specialists":
          this.filterHeros(player);
          break;
        default:
          break;
      }
    },
    filterHeros: function(player) {
      const pools = this.pools;
      let pool = pools[player];
      let filtered = { top: [], mid: [], bot: [] };

      filtered["top"] = pool["top"]["heros"];
      filtered["mid"] = pool["mid"]["heros"];
      filtered["bot"] = pool["bot"]["heros"];

      if (!this.pools[player]["showFilters"]["attackers"]) {
        filtered["top"] = filtered["top"].filter(
          hero => hero.role !== "attack"
        );
        filtered["mid"] = filtered["mid"].filter(
          hero => hero.role !== "attack"
        );
        filtered["bot"] = filtered["bot"].filter(
          hero => hero.role !== "attack"
        );
      }

      if (!this.pools[player]["showFilters"]["tanks"]) {
        filtered["top"] = filtered["top"].filter(hero => hero.role !== "tank");
        filtered["mid"] = filtered["mid"].filter(hero => hero.role !== "tank");
        filtered["bot"] = filtered["bot"].filter(hero => hero.role !== "tank");
      }

      if (this.pools[player]["showFilters"]["specialists"]) {
        filtered["top"] = filtered["top"].filter(hero => hero.specialist);
        filtered["mid"] = filtered["mid"].filter(hero => hero.specialist);
        filtered["bot"] = filtered["bot"].filter(hero => hero.specialist);
      }

      this.pools[player]["top"]["filteredHeros"] = filtered["top"];
      this.pools[player]["mid"]["filteredHeros"] = filtered["mid"];
      this.pools[player]["bot"]["filteredHeros"] = filtered["bot"];
    },
    getPlayers: async function() {
      let players = [];
      await this.$http
        .get(this.$myjson.players)
        .then(function(res) {
          players = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
      return players;
    },
    getPoolByPlayer: async function(player) {
      const target = this.players.find(item => {
        return item.name === player;
      });
      const id = target.pool;

      let pool = {};
      await this.$http
        .get(id)
        .then(function(res) {
          pool = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
      return pool;
    },
    sortHeros: function(pool) {
      pool["top"]["heros"].sort(function(a, b) {
        if (a.role < b.role) return -1;
        if (a.role > b.role) return 1;
        if (a.name < b.name) return -1;
        if (a.name < b.name) return 1;
      });
      pool["mid"]["heros"].sort(function(a, b) {
        if (a.role < b.role) return -1;
        if (a.role > b.role) return 1;
        if (a.name < b.name) return -1;
        if (a.name < b.name) return 1;
      });
      pool["bot"]["heros"].sort(function(a, b) {
        if (a.role < b.role) return -1;
        if (a.role > b.role) return 1;
        if (a.name < b.name) return -1;
        if (a.name < b.name) return 1;
      });
      return pool;
    },
    addPoolList: async function(player) {
      if (!this.selectedPlayerName) {
        return;
      }

      if (this.pools[player]) {
        return;
      }

      let pool = await this.getPoolByPlayer(player);

      pool = this.sortHeros(pool);

      pool["top"]["filteredHeros"] = pool["top"]["heros"];
      pool["mid"]["filteredHeros"] = pool["mid"]["heros"];
      pool["bot"]["filteredHeros"] = pool["bot"]["heros"];

      this.$set(this.pools, player, pool);

      const showFilters = {
        top: true,
        mid: true,
        bot: true,
        attackers: true,
        tanks: true,
        specialists: false,
        search: false
      };
      this.$set(this.pools[player], "showFilters", showFilters);

      this.$ga.event("pool_list", "show", player);
    },
    removePoolListByPlayer: function(player) {
      this.$delete(this.pools, player);
    }
  },
  created: async function() {
    let players = await this.getPlayers();
    players.sort(function(a, b) {
      return a.name < b.name ? -1 : 1;
    });
    this.players = players;
  }
};
</script>

<style scoped>
.pool-list {
  margin-top: 1rem;
}

.pool-list .message:not(:last-child) {
  margin-bottom: 1rem;
}

.player-select {
  margin: 1rem 0;
}

.message-header-menu {
  display: flex;
  align-items: center;
}

.message-header-menu-item:not(:last-child) {
  margin-right: 1em;
}

.message-body {
  padding: 0.1em 0.5em;
}

.panel-block {
  flex-direction: column;
  align-items: flex-start;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
}

.hero-list-wrapper {
  display: flex;
}

.hero-list-body {
  display: flex;
  flex-wrap: wrap;
}

.hero-list-wrapper .tag {
  margin: 0.2em;
}

.hero-list-header-content .tag {
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
  min-width: 2.8em;
  background-color: transparent;
}

.pool-item-lane {
  padding: 0.1em 0;
}

.pool-item-lane:not(:first-child) {
  border-top: 1px solid hsl(0, 0%, 76%);
}

.attacker-wrapper,
.tank-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.is-specialist {
  background: url("../assets/icons/star-icon.svg") no-repeat;
  background-size: 1.2em;
  background-position: 0.4em 50%;
  padding-left: 1.7em;
}

.show-filter {
  margin-top: 0.4em;
}

.show-filter .tabs:not(:last-child) {
  margin-bottom: 0.4em;
}

.tabs li {
  width: 33%;
}

.tabs a {
  text-decoration: none !important;
  background-color: transparent;
  border-color: #b5b5b5;
}

.tabs a:hover {
  text-decoration: none !important;
  background-color: transparent;
  border-color: #b5b5b5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
