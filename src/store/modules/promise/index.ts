import axios from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const apiUrl = axios.create({
  baseURL: process.env.VUE_APP_API_DEFAULT_URL,
});

export interface PromiseState {
  promises: object[];
}

export const getters: GetterTree<PromiseState, any> = {
  PROMISES: (state) => state.promises,
};

export const mutations: MutationTree<PromiseState> = {
  SET_PROMISES(state, payload: any) {
    state.promises = payload;
  },
};

export const actions: ActionTree<PromiseState, any> = {
  LOAD_PROMISES({ commit, dispatch }) {
    apiUrl
      .get('/promises')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_PROMISES', res.data.data);
        }
      })
      .catch((e) => {
        dispatch(
          'CREATE_ALERT',
          { message: e.response.data.message },
          {
            root: true,
          }
        );
      });
  },
};

export const promise: Module<PromiseState, any> = {
  state: {
    promises: [],
  },
  getters,
  mutations,
  actions,
};
