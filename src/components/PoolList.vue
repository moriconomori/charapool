<template>
  <div class="pool-list">
    <transition-group name="fade" tag="div">
      <article class="message is-small" v-for="pool in pools" :key="pool.player">
        <div class="message-header">
          <span>{{ pool.player }}</span>
          <div class="message-header-menu">
            <div class="message-header-menu-item">
              <img
                src="img/icons/search-icon.svg"
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
                </ul>
              </div>
            </div>
          </transition>

          <div class="panel">
            <transition name="fade">
              <div class="pool-item-lane" v-show="showTopLane[pool.player]">
                <div class="hero-list-wrapper">
                  <div class="hero-list-header">
                    <p class="hero-list-header-content">TOP</p>
                  </div>
                  <div class="hero-list-body" v-if="pool.top">
                    <transition name="fade">
                      <div class="attacker-wrapper" v-show="showAttacker[pool.player]">
                        <div v-for="hero in pool.top.heros" :key="hero.name">
                          <span class="tag is-danger" v-show="hero.role == 'attack'">{{ hero.name }}</span>
                        </div>
                      </div>
                    </transition>
                    <transition name="fade">
                      <div class="tank-wrapper" v-show="showTank[pool.player]">
                        <div v-for="hero in pool.top.heros" :key="hero.name">
                          <span class="tag is-info" v-show="hero.role == 'tank'">{{ hero.name }}</span>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div class="pool-item-lane" v-show="showMidLane[pool.player]">
                <div class="hero-list-wrapper">
                  <div class="hero-list-header">
                    <div class="hero-list-header-content">MID</div>
                  </div>
                  <div class="hero-list-body" v-if="pool.mid">
                    <transition name="fade">
                      <div class="attacker-wrapper" v-show="showAttacker[pool.player]">
                        <div v-for="hero in pool.mid.heros" :key="hero.name">
                          <span class="tag is-danger" v-show="hero.role == 'attack'">{{ hero.name }}</span>
                        </div>
                      </div>
                    </transition>
                    <transition name="fade">
                      <div class="tank-wrapper" v-show="showTank[pool.player]">
                        <div v-for="hero in pool.mid.heros" :key="hero.name">
                          <span class="tag is-info" v-show="hero.role == 'tank'">{{ hero.name }}</span>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div class="pool-item-lane" v-show="showBotLane[pool.player]">
                <div class="hero-list-wrapper">
                  <div class="hero-list-header">
                    <div class="hero-list-header-content">BOT</div>
                  </div>
                  <div class="hero-list-body" v-if="pool.bot">
                    <transition name="fade">
                      <div class="attacker-wrapper" v-show="showAttacker[pool.player]">
                        <div v-for="hero in pool.bot.heros" :key="hero.name">
                          <span class="tag is-danger" v-show="hero.role == 'attack'">{{ hero.name }}</span>
                        </div>
                      </div>
                    </transition>
                    <transition name="fade">
                      <div class="tank-wrapper" v-show="showTank[pool.player]">
                        <div v-for="hero in pool.bot.heros" :key="hero.name">
                          <span class="tag is-info" v-show="hero.role == 'tank'">{{ hero.name }}</span>
                        </div>
                      </div>
                    </transition>
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
      if (this.showAttacker[player]) {
        this.$delete(this.showAttacker, player);
        return;
      }
      this.$set(this.showAttacker, player, true);
    },
    toggleTank: function(player) {
      if (this.showTank[player]) {
        this.$delete(this.showTank, player);
        return;
      }
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
      this.players = players;
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
      if (
        this.pools.find(pool => {
          if (pool.player === player) {
            return true;
          }
        })
      ) {
        return;
      }

      const pool = await this.getPoolByPlayer(player);
      this.pools.push(pool);
      this.$set(this.showSearchMenu, player, false);
      this.$set(this.showTopLane, player, true);
      this.$set(this.showMidLane, player, true);
      this.$set(this.showBotLane, player, true);
      this.$set(this.showAttacker, player, true);
      this.$set(this.showTank, player, true);
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
  created: function() {
    this.getPlayers();
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

.hero-list-wrapper {
  display: flex;
}

.hero-list-header {
  margin-right: 0.5rem;
  width: 7%;
}

.hero-list-header-content {
  margin: 0.3rem 0;
}

.hero-list-body {
  display: flex;
  flex-wrap: wrap;
  width: 92%;
}

.hero-list-body .tag {
  margin: 0.2em;
}

.pool-item-lane {
  padding: 0.2rem 0;
}

.pool-item-lane:not(:last-child) {
  border-bottom: 1px solid hsl(0, 0%, 48%);
}

.attacker-wrapper,
.tank-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.show-filter {
  margin-top: 0.4em;
}

.show-filter .tabs:not(:last-child) {
  margin-bottom: 0.4em;
}

.tabs a {
  text-decoration: none !important;
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
