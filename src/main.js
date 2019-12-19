// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from "../src/store/index.js"
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { NavBar } from 'vant';
import { Icon } from 'vant';





Vue.use(Swipe).use(SwipeItem).use(Lazyload).use(NavBar).use(Icon);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
