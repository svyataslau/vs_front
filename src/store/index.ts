import Vue from 'vue';
import Vuex from 'vuex';

import { RootState } from '@/store/types';
import { profile } from '@/store/modules/profile';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    helloMessage: 'Overcome your laziness with us! Set a goal and follow it!',
  },
  modules: {
    profile,
  },
});
