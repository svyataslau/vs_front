<template>
  <v-main>
    <HeaderBar />
    <v-row class="mt-2" no-gutters>
      <v-col cols="12" md="6">
        <v-row class="d-flex align-center justify-space-between px-11 ma-0">
          <h4 class="text-h4">My Challenges</h4>
          <EditPromiseDialog class="ma-4" />
          <PromiseDialog />
        </v-row>
        <v-sheet class="ma-0 px-4 transparent" height="500px">
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
    </v-row>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
import PromiseDialog from '@/components/PromiseDialog.vue';
import EditPromiseDialog from '@/components/EditPromiseDialog.vue';
import Challenge from '@/components/Challenge.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: { PromiseDialog, EditPromiseDialog, HeaderBar, Challenge },
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
      handler(newVal, oldVal) {
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
    }),
    pages() {
      if (this.pageSize == null || this.challenges.length == null) return 0;
      return Math.ceil(this.challenges.length / this.pageSize);
    },
  },
});
</script>

<style scoped lang="scss">
img {
  height: 100px;
  width: 100px;
}

.promises-item {
  min-height: 100px;
}
</style>
