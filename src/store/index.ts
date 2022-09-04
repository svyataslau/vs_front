import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

import { profile } from '@/store/modules/profile';
import { RootState, UserChallenge, Promise } from '@/store/types';
import { apiUrl } from '@/store/api';

Vue.use(Vuex);

export const getters: GetterTree<RootState, RootState> = {
  ALERTS: (state) => state.alerts,
  USER_CHALLENGES: (state) => state.userChallenges,
  PROMISES: (state) => state.promises,
};

export const mutations: MutationTree<RootState> = {
  SET_ALERT(state, payload: object) {
    state.alerts.push(payload);
    setTimeout(() => {
      state.alerts.shift();
    }, 5000);
  },
  SET_USER_CHALLENGES(state, payload: UserChallenge[]) {
    state.userChallenges = payload;
  },
  SET_PROMISES(state, payload: Promise[]) {
    state.promises = payload;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  CREATE_ALERT({ commit }, payload: object) {
    commit('SET_ALERT', payload);
  },
  CREATE_FULL_CHALLENGE({ commit, dispatch }, payload) {
    apiUrl
      .post('/challenges', payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch('REFRESH_USER_DATA', {
            root: true,
          });
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
  UPDATE_FULL_CHALLENGE({ commit, dispatch }, payload) {
    apiUrl
      .put(`/challenges/${payload.id}`, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch('REFRESH_USER_DATA', {
            root: true,
          });
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
  DELETE_FULL_CHALLENGE({ commit, dispatch }, payload) {
    apiUrl
      .delete(`/challenges/${payload.id}`, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch('REFRESH_USER_DATA', {
            root: true,
          });
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
  CREATE_PROMISE({ commit, dispatch }, payload) {
    apiUrl
      .post('/promises', payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch('LOAD_PROMISES', {
            root: true,
          });
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
  UPDATE_PROMISE({ commit, dispatch }, payload) {
    apiUrl
      .put(`/promises/${payload.id}`, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch('LOAD_PROMISES', {
            root: true,
          });
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
  DELETE_PROMISE({ commit, dispatch }, payload) {
    apiUrl
      .delete(`/promises/${payload.id}`, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch('LOAD_PROMISES', {
            root: true,
          });
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

export default new Vuex.Store<RootState>({
  state: {
    promises: [],
    alerts: [],
    userChallenges: [],
  },
  getters,
  mutations,
  actions,
  modules: {
    profile,
  },
});
