<template>
  <div class="home">
    <div class="container">
      <div class="register-form">
        <form onsubmit="return false;">
          <p class="title is-4">登録</p>

          <div class="field">
            <label class="label">Player name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="プレイヤー名を入力"
                v-model="formData.player"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Hero</label>
            <div class="control">
              <div class="select">
                <select v-model="formData.hero" required>
                  <option disabled value>ヒーローを選択</option>
                  <option v-for="hero in heroList" :key="hero.id">{{ hero.name_ja }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Lane</label>
            <div class="control">
              <label class="radio">
                <input type="radio" name="lane" value="top" required v-model="formData.lane" />
                <span>Top</span>
              </label>
              <label class="radio">
                <input type="radio" name="lane" value="mid" required v-model="formData.lane" />
                <span>Mid</span>
              </label>
              <label class="radio">
                <input type="radio" name="lane" value="bot" required v-model="formData.lane" />
                <span>Bot</span>
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">Role</label>
            <div class="control">
              <label class="radio">
                <input type="radio" name="role" value="attack" required v-model="formData.role" />
                <span>火力</span>
              </label>
              <label class="radio">
                <input type="radio" name="role" value="tank" required v-model="formData.role" />
                <span>タンク/サポート</span>
              </label>
            </div>
          </div>

          <div class="field">
            <label class="label">Specialist</label>
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" name="specialist" v-model="formData.specialist" />
                <span>得意(</span>
                <img src="../assets/icons/star-icon.svg" alt="star" width="16" />
                <span>が表示されます)</span>
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input type="submit" value="登録する" class="button is-link" @click="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data: function() {
    return {
      heroList: [],
      playerList: [],
      formData: {
        player: "",
        hero: "",
        lane: "",
        role: "",
        specialist: false
      },
      pool: {}
    };
  },
  methods: {
    validation: function(formData) {
      if (
        !formData.player ||
        !formData.hero ||
        !formData.lane ||
        !formData.role
      ) {
        return false;
      }
      return true;
    },
    submit: async function() {
      const formData = this.formData;
      let restIsSuccess;

      if (!this.validation(formData)) {
        return;
      }

      const inputEntry = {
        name: formData.hero,
        role: formData.role,
        specialist: formData.specialist
      };

      let isNewPlayer = true;
      let targetId = null;

      this.playerList.find(player => {
        if (player.name === formData.player) {
          isNewPlayer = false;
          targetId = player.pool;
          return;
        }
      });

      if (isNewPlayer) {
        const id = await this.createNewMyjsonId();
        this.addNewPlayer(formData.player, id);
        targetId = id;
      }

      let pool = {};
      await this.$http
        .get(targetId)
        .then(function(res) {
          pool = res.data;
        })
        .catch(function() {});
      this.pool = pool;

      const updateIndex = this.pool[formData.lane]["heros"].findIndex(
        v => v.name === formData.hero
      );

      if (updateIndex != -1) {
        this.updateEntry(inputEntry, updateIndex);
      } else {
        this.pool[formData.lane]["heros"].push({
          name: formData.hero,
          role: formData.role,
          specialist: formData.specialist
        });
      }

      await this.$http
        .put(targetId, this.pool)
        .then(function() {
          restIsSuccess = true;
        })
        .catch(function() {
          restIsSuccess = false;
        });

      if (restIsSuccess) {
        this.$ga.event("register", "submit", formData.player);
      }
    },
    updateEntry: function(entry, index) {
      this.pool[this.formData.lane]["heros"].splice(index, 1, entry);
    },
    createNewMyjsonId: async function() {
      let response = {};

      await this.$http
        .post("", {
          player: this.formData.player,
          top: { heros: [] },
          mid: { heros: [] },
          bot: { heros: [] }
        })
        .then(function(res) {
          response = res.data;
        })
        .catch(function() {});

      const id = response.uri.split("/").pop();
      return id;
    },
    addNewPlayer: async function(player, id) {
      this.playerList.push({
        name: player,
        pool: id
      });

      await this.$http
        .put(this.$myjson.players, this.playerList)
        .catch(function() {});
    }
  },
  created: async function() {
    let data = [];
    await this.$http
      .get(this.$myjson.heros)
      .then(function(res) {
        data = res.data;
      })
      .catch(function() {});
    this.heroList = data;

    let players = [];
    await this.$http
      .get(this.$myjson.players)
      .then(function(res) {
        players = res.data;
      })
      .catch(function() {});
    this.playerList = players;
  }
};
</script>

<style scoped>
.register-form {
  margin-top: 1.5em;
}

.register-form .field {
  margin: 1.2rem 0;
}

.register-form .input,
.register-form .select {
  font-size: 16px;
}

.register-form .input {
  padding-left: 8px;
  padding-right: 8px;
}

.register-form input[type="radio"],
.register-form input[type="checkbox"] {
  vertical-align: middle;
  margin-bottom: 2px;
}

.register-form input[type="radio"] + span,
.register-form input[type="checkbox"] + span {
  margin-left: 0.2rem;
}

label.radio + label.radio {
  margin-left: 1rem;
}
</style>
