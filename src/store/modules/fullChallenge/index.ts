import axios from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const apiUrl = axios.create({
  baseURL: process.env.VUE_APP_API_DEFAULT_URL,
});

export interface FullChallengeState {
  fullChallenges: object[];
  fullChallengesOfUser: object[];
}

export const getters: GetterTree<FullChallengeState, any> = {
  FULL_CHALLENGES: (state) => state.fullChallenges,
  FULL_CHALLENGES_OF_USER: (state) => state.fullChallengesOfUser,
};

export const mutations: MutationTree<FullChallengeState> = {
  SET_FULL_CHALLENGES(state, payload: any) {
    state.fullChallenges = payload;
  },
  SET_FULL_CHALLENGES_OF_USER(state, payload: any) {
    state.fullChallengesOfUser = payload;
  },
};

export const actions: ActionTree<FullChallengeState, any> = {
  LOAD_FULL_CHALLENGES({ commit, dispatch }) {
    apiUrl
      .get('/full_challenges')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_FULL_CHALLENGES', res.data.data);
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
  CREATE_FULL_CHALLENGE({ commit, dispatch }, payload) {
    apiUrl
      .post('/full_challenges', payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch('REFRESH_USER_DATA', {
            root: true,
          });
          dispatch('LOAD_FULL_CHALLENGES', {
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
      .put(`/full_challenges/${payload.id}`, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch('REFRESH_USER_DATA', {
            root: true,
          });
          dispatch('LOAD_FULL_CHALLENGES', {
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
    fullChallenges: [],
    fullChallengesOfUser: [],
  },
  getters,
  mutations,
  actions,
};
