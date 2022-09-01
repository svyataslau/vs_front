import axios from 'axios';
import router from '@/router';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const apiUrl = axios.create({
  baseURL: process.env.VUE_APP_API_DEFAULT_URL,
});

export interface ProfileState {
  isAuthorized: boolean;
  userData: object;
  isAdmin: boolean;
}

export const getters: GetterTree<ProfileState, any> = {
  IS_AUTHORIZED: (state) => state.isAuthorized,
  USER_DATA: (state) => state.userData,
  IS_ADMIN: (state) => state.isAdmin,
};

export const mutations: MutationTree<ProfileState> = {
  SET_IS_AUTHORIZED(state, payload: boolean) {
    state.isAuthorized = payload;
  },
  SET_USER_DATA(state, payload: object) {
    state.userData = payload;
  },
};

export const actions: ActionTree<ProfileState, any> = {
  REGISTER({ commit, dispatch }, payload) {
    apiUrl
      .post('/users', payload)
      .then((res) => {
        if (res.status === 201) {
          commit('SET_IS_AUTHORIZED', true);
          commit('SET_USER_DATA', res.data.data);
          router.push('/');
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
  LOGIN({ commit, dispatch }, payload) {
    apiUrl
      .post('/users/login', payload)
      .then((res) => {
        if (res.status === 200) {
          commit('SET_IS_AUTHORIZED', true);
          commit('SET_USER_DATA', res.data.data);
          router.push('/');
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
  LOGOUT({ commit, dispatch }) {
    try {
      commit('SET_IS_AUTHORIZED', false);
      commit('SET_USER_DATA', {});
    } catch (e) {
      dispatch(
        'CREATE_ALERT',
        { message: 'Logout failed!' },
        {
          root: true,
        }
      );
    }
  },
  REFRESH_USER_DATA({ commit, getters, dispatch }) {
    const userId = getters.USER_DATA?.id;
    apiUrl
      .get(`/users/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          commit('SET_USER_DATA', res.data.data);
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

export const profile: Module<ProfileState, any> = {
  state: {
    isAuthorized: false,
    userData: {},
    isAdmin: true,
  },
  getters,
  mutations,
  actions,
};
