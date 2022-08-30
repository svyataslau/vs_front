<template>
  <v-main>
    <HeaderBar />
    <v-row class="mt-2" no-gutters>
      <v-col cols="12" md="6" class="mx-auto">
        <v-row align="center" justify="space-between" class="px-11 mx-0 my-4">
          <h4 class="text-h4">My Challenges</h4>
          <ChallengeDialog large color="primary" :actionType="'create'">
            <v-icon dark> mdi-plus-thick</v-icon>
          </ChallengeDialog>
        </v-row>
        <v-sheet class="ma-0 px-4 transparent" height="600">
          <Challenge
            v-for="fullChallengeOfUser in historyList"
            :key="fullChallengeOfUser.id"
            :challenge="fullChallengeOfUser"
          />
        </v-sheet>
        <v-pagination
          v-if="challenges.length > pageSize"
          circle
          class="mb-2"
          v-model="page"
          :length="pages"
          @input="updatePage"
        ></v-pagination>
      </v-col>
      <v-col cols="12" md="6" v-if="$vuetify.breakpoint.mdAndUp && isAdmin">
        <v-row align="center" justify="space-between" class="px-11 ma-0">
          <h4 class="text-h4">Admin</h4>
          <EditPromiseDialog class="ma-4" />
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
import ChallengeDialog from '@/components/ChallengeDialog.vue';
import EditPromiseDialog from '@/components/EditPromiseDialog.vue';
import Challenge from '@/components/Challenge.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: { EditPromiseDialog, HeaderBar, Challenge, ChallengeDialog },
  data: () => {
    return {
      page: 1,
      pageSize: 3,
      historyList: [],
      isOverlayVisible: false,
      challenges: [],
    };
  },
  created() {
    this.challenges = [...this.userData?.challenges].reverse();
    this.initPage();
    this.updatePage(this.page);
  },
  methods: {
    initPage() {
      if (this.challenges.length < this.pageSize) {
        this.historyList = this.challenges;
      } else {
        this.historyList = this.challenges.slice(0, this.pageSize);
      }
    },
    updatePage(pageIndex) {
      let start = (pageIndex - 1) * this.pageSize;
      let end = pageIndex * this.pageSize;
      this.historyList = this.challenges.slice(start, end);
      this.page = pageIndex;
    },
  },
  watch: {
    userData: {
      handler() {
        this.challenges = [...this.userData?.challenges].reverse();
        this.initPage();
        this.updatePage(this.page);
      },
      deep: true,
    },
    historyList(val) {
      if (val.length == 0) {
        --this.page;
        this.updatePage(this.page);
      }
    },
  },
  computed: {
    ...mapGetters({
      fullChallengesOfUser: 'FULL_CHALLENGES_OF_USER',
      userData: 'USER_DATA',
      isAdmin: 'IS_ADMIN',
    }),
    pages() {
      if (this.pageSize == null || this.challenges.length == null) return 0;
      return Math.ceil(this.challenges.length / this.pageSize);
    },
  },
});
</script>
