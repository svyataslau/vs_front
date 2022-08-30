import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';

axios.defaults.baseURL = 'http://localhost:8090/api';

Vue.config.productionTip = false;

Vue.directive('blur', {
  inserted: function (el) {
    el.onfocus = (ev: any) => ev.target.blur();
  },
});

const vm = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

export { vm };
