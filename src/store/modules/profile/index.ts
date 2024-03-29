import router from '@/router';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { ProfileState, RootState } from '@/store/types';
import { apiUrl } from '@/store/api';

export const getters: GetterTree<ProfileState, RootState> = {
  IS_AUTHORIZED: (state) => state.isAuthorized,
  USER_DATA: (state) => state.userData,
  IS_ADMIN: (state) => state.isAdmin,
};

export const mutations: MutationTree<ProfileState> = {
  SET_IS_AUTHORIZED(state, payload) {
    state.isAuthorized = payload;
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
};

export const actions: ActionTree<ProfileState, RootState> = {
  REGISTER({ commit, dispatch }, { nickname, email, password }) {
    apiUrl
      .post('/users', { nickname, email, password })
      .then((res) => {
        if (res.status === 200) {
          commit('SET_IS_AUTHORIZED', true);
          commit('SET_USER_DATA', res.data);
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
  LOGIN({ commit, dispatch }, { email, password }) {
    apiUrl
      .post('/users/login', {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          commit('SET_IS_AUTHORIZED', true);
          commit('SET_USER_DATA', res.data);
          commit('SET_USER_CHALLENGES', res.data?.challenges);
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
      router.push('login');
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
          commit('SET_USER_DATA', res.data);
          commit('SET_USER_CHALLENGES', res.data?.challenges);
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

export const profile: Module<ProfileState, RootState> = {
  state: {
    isAuthorized: false,
    userData: {},
    isAdmin: true,
  },
  getters,
  mutations,
  actions,
};
