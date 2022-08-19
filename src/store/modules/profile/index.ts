import axios from 'axios';
import { vm } from '@/main';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store/index';

const apiUrl = axios.create({
  baseURL: process.env.VUE_APP_API_DEFAULT_URL,
});

export interface ProfileState {
  isAuthorized: boolean;
}

const state: ProfileState = {
  isAuthorized: false,
};

export const getters: GetterTree<ProfileState, RootState> = {
  getAuthorized(state): boolean {
    return state.isAuthorized;
  },
};

export enum ProfileMutations {
  SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED',
}

export const mutations: MutationTree<ProfileState> = {
  [ProfileMutations.SET_IS_AUTHORIZED](state, payload: boolean) {
    state.isAuthorized = payload;
  },
};

export enum ProfileActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
}

export const actions: ActionTree<ProfileState, RootState> = {
  [ProfileActions.REGISTER]({ commit, dispatch }, payload) {
    apiUrl
      .post('/users', payload)
      .then((res) => {
        if (res.status === 201) {
          commit(ProfileMutations.SET_IS_AUTHORIZED, true);
          localStorage.setItem('userData', JSON.stringify(res.data.data));
          vm.$router.push('/');
        }
      })
      .catch((e) => {
        dispatch('SHOW_ALERT', e.response.data.message, {
          root: true,
        });
      });
  },
  [ProfileActions.LOGIN]({ commit, dispatch }, payload) {
    apiUrl
      .post('/users/login', payload)
      .then((res) => {
        if (res.status === 200) {
          commit(ProfileMutations.SET_IS_AUTHORIZED, true);
          localStorage.setItem('userData', JSON.stringify(res.data.data));
          vm.$router.push('/');
        }
      })
      .catch((e) => {
        dispatch('SHOW_ALERT', e.response.data.message, {
          root: true,
        });
      });
  },
  [ProfileActions.LOGOUT]({ commit }) {
    try {
      commit(ProfileMutations.SET_IS_AUTHORIZED, false);
      localStorage.removeItem('userData');
    } catch (e) {
      console.log(e);
    }
  },
};

export const profile: Module<ProfileState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
