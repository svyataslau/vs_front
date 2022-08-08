import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ProfileState } from '@/store/modules/profile/types';
import axios from 'axios';
import { ProfileMutations } from '@/store/modules/profile/mutations';

const apiUrl = 'http://localhost:8090/api';

const authAxios = axios.create({
  baseURL: apiUrl,
});

export enum ProfileActions {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export const actions: ActionTree<ProfileState, RootState> = {
  [ProfileActions.LOGIN]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      authAxios
        .post('/login', payload)
        .then(({ data, status }) => {
          if (status === 200) {
            commit(ProfileMutations.SET_IS_AUTHORIZED, true);
            localStorage.setItem('userData', JSON.stringify(payload));
            resolve(true);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  [ProfileActions.LOGOUT]({ commit }) {
    commit(ProfileMutations.SET_IS_AUTHORIZED, false);
    localStorage.removeItem('userData');
  },
};
