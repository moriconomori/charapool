<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <div class="navbar-brand">
              <router-link to="/" class="navbar-item">Charpool</router-link>
            </div>
          </div>
        </div>
        <div class="level-right">
          <p class="level-item">
            <router-link to="register" class="navbar-item">登録</router-link>
          </p>
        </div>
      </div>
    </nav>
    <div class="view-wrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  metaInfo: {
    meta: [
      { name: "description", content: "ヒーロープールを一覧表示するツール" }
    ]
  },
  components: { Footer },
  methods: {},
  created: function() {}
};
</script>

<style>
body {
  font-size: initial;
}

.control,
.button {
  font-size: 1em;
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

.navbar {
  border-radius: 0;
}

.view-wrapper {
  padding: 0 3vw 0;
}
</style>
