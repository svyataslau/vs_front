import Vue from 'vue';
import Vuex from 'vuex';

import { profile } from '@/store/modules/profile';

Vue.use(Vuex);

export interface RootState {
  helloMessage: string;
}

export default new Vuex.Store<RootState>({
  state: {
    helloMessage: 'Overcome your laziness with us! Set a goal and follow it!',
  },
  modules: {
    profile,
  },
});
