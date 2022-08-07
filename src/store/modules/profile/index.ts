import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { ProfileState } from '@/store/modules/profile/types';
import { getters } from '@/store/modules/profile/getters';
import { mutations } from '@/store/modules/profile/mutations';
import { actions } from '@/store/modules/profile/actions';

const state: ProfileState = {
  isAuthorized: false,
};

export const profile: Module<ProfileState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
