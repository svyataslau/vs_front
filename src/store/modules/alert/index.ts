import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store/index';

export interface AlertState {
  alertMessage: string;
  isAlertVisible: boolean;
}

export enum AlertMutations {
  SET_ALERT_MESSAGE = 'SET_ALERT_MESSAGE',
  SET_ALERT_VISIBILITY = 'SET_ALERT_VISIBILITY',
}

export enum AlertActions {
  SHOW_ALERT = 'SHOW_ALERT',
  HIDE_ALERT = 'HIDE_ALERT',
}

const state: AlertState = {
  alertMessage: '',
  isAlertVisible: false,
};

export const getters: GetterTree<AlertState, RootState> = {
  getAlertMessage(state): string {
    return state.alertMessage;
  },
  getIsAlertVisible(state): boolean {
    return state.isAlertVisible;
  },
};

export const mutations: MutationTree<AlertState> = {
  [AlertMutations.SET_ALERT_MESSAGE](state, payload: string) {
    state.alertMessage = payload;
  },
  [AlertMutations.SET_ALERT_VISIBILITY](state, payload: boolean) {
    state.isAlertVisible = payload;
  },
};

export const actions: ActionTree<AlertState, RootState> = {
  [AlertActions.SHOW_ALERT]({ commit }, payload: string) {
    try {
      commit(AlertMutations.SET_ALERT_MESSAGE, payload);
      commit(AlertMutations.SET_ALERT_VISIBILITY, true);
      setTimeout(() => {
        commit(AlertMutations.SET_ALERT_VISIBILITY, false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  },
  [AlertActions.HIDE_ALERT]({ commit }) {
    try {
      commit(AlertMutations.SET_ALERT_MESSAGE, '');
      commit(AlertMutations.SET_ALERT_VISIBILITY, false);
    } catch (e) {
      console.log(e);
    }
  },
};

export const alert: Module<AlertState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
