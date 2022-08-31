import axios from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const apiUrl = axios.create({
  baseURL: process.env.VUE_APP_API_DEFAULT_URL,
});

export interface FullChallengeState {
  fullChallengesOfUser: object[];
}

export const getters: GetterTree<FullChallengeState, any> = {
  FULL_CHALLENGES_OF_USER: (state) => state.fullChallengesOfUser,
};

export const mutations: MutationTree<FullChallengeState> = {
  SET_FULL_CHALLENGES_OF_USER(state, payload: any) {
    state.fullChallengesOfUser = payload;
  },
};

export const actions: ActionTree<FullChallengeState, any> = {
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
};

export const fullChallenge: Module<FullChallengeState, any> = {
  state: {
    fullChallengesOfUser: [],
  },
  getters,
  mutations,
  actions,
};
