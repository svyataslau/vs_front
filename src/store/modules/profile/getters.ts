import { GetterTree } from 'vuex';
import { ProfileState } from '@/store/modules/profile/types';
import { RootState } from '@/store/types';

export const getters: GetterTree<ProfileState, RootState> = {
  getAuthorized(state): boolean {
    return state.isAuthorized;
  },
};
