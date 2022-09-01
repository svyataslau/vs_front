<template>
  <v-main>
    <HeaderBar />
    <v-row class="mt-2" no-gutters>
      <v-col cols="12" sm="10" md="8" lg="6" class="mx-auto">
        <v-row align="center" class="px-4 px-md-11 mx-0 my-4" no-gutters>
          <v-col cols="12" md="6" class="text-center text-md-left my-4"
            ><h4 class="text-h4">My Challenges</h4></v-col
          >
          <v-col cols="12" md="6" class="text-center text-md-end">
            <ChallengeDialog large color="primary" :actionType="'create'">
              <v-icon>mdi-plus-thick</v-icon>
            </ChallengeDialog>
            <PromiseListDialog v-if="isAdmin" class="ma-4" />
          </v-col>
        </v-row>
        <v-sheet class="ma-0 px-4 transparent" height="550">
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
import { defineComponent } from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
import ChallengeDialog from '@/components/ChallengeDialog.vue';
import PromiseListDialog from '@/components/PromiseListDialog.vue';
import Challenge from '@/components/Challenge.vue';
import { mapGetters } from 'vuex';

interface ChallengeType {
  id: number;
  user_id: number;
  promise_id: number;
  start_date: string;
  days_number: number;
  title: string;
  description: string;
}

export default defineComponent({
  name: 'App',
  components: { PromiseListDialog, HeaderBar, Challenge, ChallengeDialog },
  data: () => {
    return {
      page: 1,
      pageSize: 3,
      pageChallengeList: [] as ChallengeType[],
      isOverlayVisible: false,
      challenges: [] as ChallengeType[],
    };
  },
  computed: {
    ...mapGetters({
      userData: 'USER_DATA',
      isAdmin: 'IS_ADMIN',
    }),
    pages(): number {
      if (this.pageSize == null || this.challenges.length == null) return 0;
      return Math.ceil(this.challenges.length / this.pageSize);
    },
  },
  watch: {
    userData: {
      handler(newUserData) {
        if (newUserData.challenges?.length) {
          this.challenges = [...newUserData.challenges].reverse();
          this.initPage();
          this.updatePage(this.page);
        }
      },
      immediate: true,
    },
    pageChallengeList(newList) {
      if (newList.length == 0) {
        --this.page;
        this.updatePage(this.page);
      }
    },
  },
  methods: {
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
