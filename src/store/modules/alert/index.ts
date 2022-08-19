import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

export interface AlertState {
  alerts: object[];
}

export const getters: GetterTree<AlertState, any> = {
  ALERTS: (state) => state.alerts,
};

export const mutations: MutationTree<AlertState> = {
  SET_ALERT(state, payload: object) {
    state.alerts.push(payload);
    setTimeout(() => {
      state.alerts.shift();
    }, 5000);
  },
};

export const actions: ActionTree<AlertState, any> = {
  CREATE_ALERT({ commit }, payload: object) {
    commit('SET_ALERT', payload);
  },
};

export const alert: Module<AlertState, any> = {
  state: {
    alerts: [],
  },
  getters,
  mutations,
  actions,
};
