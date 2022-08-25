import Vue from 'vue';
import Vuex from 'vuex';

import { profile } from '@/store/modules/profile';
import { alert } from '@/store/modules/alert';
import { promise } from '@/store/modules/promise';
import { fullChallenge } from '@/store/modules/fullChallenge';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    profile,
    alert,
    promise,
    fullChallenge,
  },
});
