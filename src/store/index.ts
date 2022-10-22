import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';

import { profile } from '@/store/modules/profile';
import { RootState } from '@/store/types';
import { apiUrl } from '@/store/api';

Vue.use(Vuex);

export const getters: GetterTree<RootState, RootState> = {
  ALERTS: (state) => state.alerts,
  USER_CHALLENGES: (state) => state.userChallenges,
  PROMISES: (state) => state.promises,
};

export const mutations: MutationTree<RootState> = {
  SET_ALERT(state, payload) {
    state.alerts.push(payload);
    setTimeout(() => {
      state.alerts.shift();
    }, 5000);
  },
  SET_USER_CHALLENGES(state, payload) {
    state.userChallenges = payload;
  },
  SET_PROMISES(state, payload) {
    state.promises = payload;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  CREATE_ALERT({ commit }, payload) {
    commit('SET_ALERT', payload);
  },
  CREATE_USER_CHALLENGE({ dispatch }, payload) {
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
  UPDATE_USER_CHALLENGE({ dispatch }, payload) {
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
  DELETE_USER_CHALLENGE({ dispatch }, payload) {
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
  CREATE_PROMISE({ dispatch }, payload) {
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
  UPDATE_PROMISE({ dispatch }, payload) {
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
  DELETE_PROMISE({ dispatch }, payload) {
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
          commit('SET_PROMISES', res.data);
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
