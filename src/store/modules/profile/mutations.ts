import { MutationTree } from 'vuex';
import { ProfileState } from '@/store/modules/profile/types';

export enum ProfileMutations {
  SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED',
}

export const mutations: MutationTree<ProfileState> = {
  [ProfileMutations.SET_IS_AUTHORIZED](state, payload: boolean) {
    state.isAuthorized = payload;
  },
};
