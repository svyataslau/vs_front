<template>
  <v-main>
    <HeaderBar />
    <v-container class="text-center" fluid>
      <PromiseDialog class="ma-4" />
      <v-row>
        <v-col
          class="col-12 col-md-6"
          style="width: 500px; height: 800px; overflow: auto"
        >
          <h4 class="text-h4">My Challenges</h4>

          <Challenge
            v-for="fullChallengeOfUser in challenges"
            :key="fullChallengeOfUser.id"
            :challenge="fullChallengeOfUser"
          />
        </v-col>
        <v-col
          class="col-12 col-md-6"
          style="width: 500px; height: 800px; overflow: auto"
        >
          <h4 class="text-h4">All Challenges</h4>

          <Challenge
            v-for="fullChallenge in fullChallenges"
            :key="fullChallenge.id"
            :challenge="fullChallenge"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
import PromiseDialog from '@/components/PromiseDialog.vue';
import Challenge from '@/components/Challenge.vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: { PromiseDialog, HeaderBar, Challenge },
  data: () => {
    return {
      isOverlayVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      fullChallenges: 'FULL_CHALLENGES',
      fullChallengesOfUser: 'FULL_CHALLENGES_OF_USER',
      userData: 'USER_DATA',
    }),
    ...mapActions(['LOAD_FULL_CHALLENGES']),
    challenges() {
      return this.userData?.challenges;
    },
  },
  mounted() {
    this.$store.dispatch('LOAD_FULL_CHALLENGES');
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
