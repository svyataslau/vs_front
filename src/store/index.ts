import Vue from 'vue';
import Vuex from 'vuex';

import { profile } from '@/store/modules/profile';
import { alert } from '@/store/modules/alert';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    profile,
  },
});
