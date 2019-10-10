import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'bulmaswatch/darkly/bulmaswatch.min.css'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Axios from "axios";
import VueAnalytics from 'vue-analytics'

Vue.use(Buefy)

Vue.use(VueAnalytics, {
  id: 'UA-148912327-1',
  router
})

const axios = Axios.create({
  baseURL: "https://api.myjson.com/bins"
})

const myjson = {
  "heros": "15kw8r",
  "players": "10ois7",
};

Vue.prototype.$http = axios;
Vue.prototype.$myjson = myjson;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
