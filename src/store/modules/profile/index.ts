import axios from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store/index';

const apiUrl = process.env.VUE_APP_API_DEFAULT_URL;

const authAxios = axios.create({
  baseURL: apiUrl,
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
  async [ProfileActions.REGISTER]({ commit }, payload) {
    try {
      const { data, status } = await authAxios.post('/users', payload);
      if (status === 201) {
        commit(ProfileMutations.SET_IS_AUTHORIZED, true);
        localStorage.setItem('userData', JSON.stringify(data.data));
      }
    } catch (e) {
      console.log(e);
    }
  },
  async [ProfileActions.LOGIN]({ commit }, payload) {
    try {
      const { data, status } = await authAxios.post('/users/login', payload);
      if (status === 200) {
        commit(ProfileMutations.SET_IS_AUTHORIZED, true);
        localStorage.setItem('userData', JSON.stringify(data.data));
      }
    } catch (e) {
      console.log(e);
    }
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
