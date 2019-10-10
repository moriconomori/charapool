<template>
  <div class="pool-list">
    <transition-group name="fade" tag="div">
      <article class="message is-link is-small" v-for="pool in pools" :key="pool.player">
        <div class="message-header">
          <span>{{ pool.player }}</span>
          <div class="message-header-menu">
            <div class="message-header-menu-item">
              <img
                src="/img/icons/search-icon.svg"
                alt="検索"
                class="image is-16x16"
                @click="toggleSearchMenu(pool.player)"
              />
            </div>
            <div class="message-header-menu-item">
              <button class="delete" @click="removePoolListByPlayer(pool.player)"></button>
            </div>
          </div>
        </div>
        <div class="message-body">
          <transition name="fade">
            <div class="show-filter" v-show="showSearchMenu[pool.player]">
              <div class="tabs is-toggle is-fullwidth is-small">
                <ul>
                  <li
                    :class="showTopLane[pool.player] ? 'is-active' : ''"
                    @click="toggleTopLane(pool.player)"
                  >
                    <a>
                      <span>Top</span>
                    </a>
                  </li>
                  <li
                    :class="showMidLane[pool.player] ? 'is-active' : ''"
                    @click="toggleMidLane(pool.player)"
                  >
                    <a>
                      <span>Mid</span>
                    </a>
                  </li>
                  <li
                    :class="showBotLane[pool.player] ? 'is-active' : ''"
                    @click="toggleBotLane(pool.player)"
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
                    :class="showAttacker[pool.player] ? 'is-active' : ''"
                    @click="toggleAttacker(pool.player)"
                  >
                    <a>
                      <span>火力</span>
                    </a>
                  </li>
                  <li
                    :class="showTank[pool.player] ? 'is-active' : ''"
                    @click="toggleTank(pool.player)"
                  >
                    <a>
                      <span>タンク</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>星のみ</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </transition>

          <div class="panel">
            <transition name="fade">
              <div class="pool-item-lane" v-show="showTopLane[pool.player]">
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
                        v-for="hero in pool.top.heros"
                        :key="hero.name"
                      >{{ hero.name }}</span>
                    </transition-group>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div class="pool-item-lane" v-if="showMidLane[pool.player]">
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
                        v-for="hero in pool.mid.heros"
                        :key="hero.name"
                      >{{ hero.name }}</span>
                    </transition-group>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div class="pool-item-lane" v-if="showBotLane[pool.player]">
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
                        v-for="hero in pool.bot.heros"
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
      pools: [],
      players: [],
      showSearchMenu: {},
      showTopLane: {},
      showMidLane: {},
      showBotLane: {},
      showAttacker: {},
      showTank: {}
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
    toggleSearchMenu: function(player) {
      if (this.showSearchMenu[player]) {
        this.$delete(this.showSearchMenu, player);
        return;
      }
      this.$set(this.showSearchMenu, player, true);
    },
    toggleTopLane: function(player) {
      if (this.showTopLane[player]) {
        this.$delete(this.showTopLane, player);
        return;
      }
      this.$set(this.showTopLane, player, true);
    },
    toggleMidLane: function(player) {
      if (this.showMidLane[player]) {
        this.$delete(this.showMidLane, player);
        return;
      }
      this.$set(this.showMidLane, player, true);
    },
    toggleBotLane: function(player) {
      if (this.showBotLane[player]) {
        this.$delete(this.showBotLane, player);
        return;
      }
      this.$set(this.showBotLane, player, true);
    },
    toggleAttacker: function(player) {
      let index;
      let pool = this.pools.find(function(pool, i) {
        index = i;
        return pool.player === player;
      });

      if (this.showAttacker[player]) {
        let filtered;

        filtered = pool.top.heros.filter(function(hero) {
          return hero.role !== "attack";
        });
        this.$set(pool.top, "heros", filtered);

        filtered = pool.mid.heros.filter(function(hero) {
          return hero.role !== "attack";
        });
        this.$set(pool.mid, "heros", filtered);

        filtered = pool.bot.heros.filter(function(hero) {
          return hero.role !== "attack";
        });
        this.$set(pool.bot, "heros", filtered);

        this.$delete(this.showAttacker, player);
        return;
      }

      this.pools[index].top.heros.splice(0, 0, ...pool["top"]["attackers"]);
      this.pools[index].mid.heros.splice(0, 0, ...pool["mid"]["attackers"]);
      this.pools[index].bot.heros.splice(0, 0, ...pool["bot"]["attackers"]);

      this.$set(this.showAttacker, player, true);
    },
    toggleTank: function(player) {
      let index;
      let pool = this.pools.find(function(pool, i) {
        index = i;
        return pool.player === player;
      });

      if (this.showTank[player]) {
        let filtered;

        filtered = pool.top.heros.filter(function(hero) {
          return hero.role !== "tank";
        });
        this.$set(pool.top, "heros", filtered);

        filtered = pool.mid.heros.filter(function(hero) {
          return hero.role !== "tank";
        });
        this.$set(pool.mid, "heros", filtered);

        filtered = pool.bot.heros.filter(function(hero) {
          return hero.role !== "tank";
        });
        this.$set(pool.bot, "heros", filtered);

        this.$delete(this.showTank, player);
        return;
      }

      let lastIndex;
      lastIndex = this.pools[index].top.heros.length;
      this.pools[index].top.heros.splice(lastIndex, 0, ...pool["top"]["tanks"]);
      lastIndex = this.pools[index].mid.heros.length;
      this.pools[index].mid.heros.splice(lastIndex, 0, ...pool["mid"]["tanks"]);
      lastIndex = this.pools[index].bot.heros.length;
      this.pools[index].bot.heros.splice(lastIndex, 0, ...pool["bot"]["tanks"]);

      this.$set(this.showTank, player, true);
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
    addPoolList: async function(player) {
      if (!this.selectedPlayerName) {
        return;
      }

      if (
        this.pools.find(pool => {
          if (pool.player === player) {
            return true;
          }
        })
      ) {
        return;
      }

      let pool = await this.getPoolByPlayer(player);

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

      let attackers;
      let tanks;
      attackers = pool["top"]["heros"].filter(function(hero) {
        return hero.role === "attack";
      });
      pool["top"]["attackers"] = attackers;
      tanks = pool["top"]["heros"].filter(function(hero) {
        return hero.role === "tank";
      });
      pool["top"]["tanks"] = tanks;
      attackers = pool["mid"]["heros"].filter(function(hero) {
        return hero.role === "attack";
      });
      pool["mid"]["attackers"] = attackers;
      tanks = pool["mid"]["heros"].filter(function(hero) {
        return hero.role === "tank";
      });
      pool["mid"]["tanks"] = tanks;
      attackers = pool["bot"]["heros"].filter(function(hero) {
        return hero.role === "attack";
      });
      pool["bot"]["attackers"] = attackers;
      tanks = pool["bot"]["heros"].filter(function(hero) {
        return hero.role === "tank";
      });
      pool["bot"]["tanks"] = tanks;

      this.pools.push(pool);
      this.$set(this.showSearchMenu, player, false);
      this.$set(this.showTopLane, player, true);
      this.$set(this.showMidLane, player, true);
      this.$set(this.showBotLane, player, true);
      this.$set(this.showAttacker, player, true);
      this.$set(this.showTank, player, true);

      this.$ga.event("pool_list", "show", player);
    },
    removePoolListByPlayer: function(player) {
      for (let i = 0; i < this.pools.length; i++) {
        const pool = this.pools[i];
        if (pool.player === player) {
          this.pools.splice(i, 1);
          return;
        }
      }
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
  background: url("/img/icons/star-icon.svg") no-repeat;
  background-size: 1.2em;
  background-position: 5% 50%;
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
