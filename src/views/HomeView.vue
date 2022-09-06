<template>
  <v-main>
    <HeaderBar />
    <v-row class="mt-2" no-gutters>
      <v-col cols="12" sm="10" md="8" lg="6" class="mx-auto">
        <v-row align="center" class="px-4 px-md-11 mx-0 my-4" no-gutters>
          <v-col v-if="isChallengesEmpty" cols="12" class="text-center">
            <h4 class="text-h5 ma-4 font-weight-light">
              Nice to see you, {{ userNickname }}.
            </h4>
            <h4 class="text-h6 ma-4 font-weight-light">
              You don't have any challenges yet. Just click on the plus button!
            </h4>
            <h4 v-if="isAdmin" class="text-h6 ma-4 font-weight-light">
              To edit promises, click on the notepad button!
            </h4>
          </v-col>
          <v-col v-else cols="12" md="6" class="text-center text-md-left my-4">
            <h4 class="text-h4">My Challenges</h4>
          </v-col>

          <v-col
            cols="12"
            :md="isChallengesEmpty ? 12 : 6"
            class="text-center"
            :class="{ 'text-md-end': !isChallengesEmpty }"
          >
            <ChallengeDialog isLarge color="primary" :actionType="'create'">
              <v-icon>mdi-plus-thick</v-icon>
            </ChallengeDialog>
            <PromiseListDialog v-if="isAdmin" class="ma-4" />
          </v-col>
        </v-row>

        <v-sheet
          v-if="!isChallengesEmpty"
          class="ma-0 px-4 transparent"
          height="550"
        >
          <Challenge
            v-for="challenge in pageChallengeList"
            :key="challenge.id"
            :challenge="challenge"
          />
        </v-sheet>
        <v-pagination
          v-if="challenges.length > pageSize"
          v-model="page"
          circle
          class="mb-2"
          :length="pages"
          @input="updatePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
import ChallengeDialog from '@/components/ChallengeDialog.vue';
import PromiseListDialog from '@/components/PromiseListDialog.vue';
import Challenge from '@/components/Challenge.vue';
import { mapGetters } from 'vuex';
import { UserChallenge } from '@/store/types';

export default Vue.extend({
  name: 'HomeView',
  components: { PromiseListDialog, HeaderBar, Challenge, ChallengeDialog },
  data: () => {
    return {
      page: 1,
      pageSize: 3,
      pageChallengeList: [] as UserChallenge[],
      isOverlayVisible: false,
      isChallengesEmpty: true,
      challenges: [] as UserChallenge[],
    };
  },
  computed: {
    ...mapGetters({
      userData: 'USER_DATA',
      isAdmin: 'IS_ADMIN',
      userChallenges: 'USER_CHALLENGES',
    }),
    pages(): number {
      return Math.ceil(this.challenges.length / this.pageSize);
    },
    userNickname(): string {
      return this.userData.nickname;
    },
  },
  watch: {
    userChallenges(newVal) {
      this.challenges = [...newVal].reverse();
      this.updateView();
    },
  },
  created() {
    this.challenges = [...this.userChallenges].reverse();
    this.updateView();
  },
  methods: {
    updateView() {
      this.updatePage(this.page);
      this.initPage();
      if (this.pageChallengeList.length === 0) {
        --this.page;
        this.updatePage(this.page);
      }
      if (this.challenges.length === 0) {
        this.isChallengesEmpty = true;
      } else {
        this.isChallengesEmpty = false;
      }
    },
    initPage() {
      if (this.challenges.length < this.pageSize) {
        this.pageChallengeList = this.challenges;
      } else {
        this.pageChallengeList = this.challenges.slice(0, this.pageSize);
      }
    },
    updatePage(pageIndex: number) {
      const start = (pageIndex - 1) * this.pageSize;
      const end = pageIndex * this.pageSize;
      this.pageChallengeList = this.challenges.slice(start, end);
      this.page = pageIndex;
    },
  },
});
</script>
