<template>
  <v-card class="my-4 d-flex flex-row col-12" elevation="2" outlined shaped>
    <v-col cols="7" md="8" lg="9" class="pa-0">
      <h5 class="text-h5 my-4 text-truncate">
        {{ challenge.title }}
      </h5>
      <h6 class="text-body-2 my-4 challenge-description">
        {{ challenge.description }}
      </h6>
    </v-col>
    <v-col cols="4" md="3" lg="2" class="d-flex justify-center align-center">
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="10"
        :value="progressPercent"
        color="primary"
      >
        <v-icon x-large color="primary" v-if="progressPercent >= 100">
          mdi-check-bold
        </v-icon>
        <span v-else class="text-body-2">{{ progressMessage }}</span>
      </v-progress-circular>
    </v-col>
    <v-col cols="1" class="d-flex justify-center align-center">
      <v-card-actions class="d-flex flex-column">
        <ChallengeDialog :challenge="challenge" :actionType="'edit'">
          <v-icon>mdi-pencil-outline</v-icon>
        </ChallengeDialog>
        <ApproveDialog
          @callback="deleteChallenge"
          message="Would you like to delete this challenge?"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </ApproveDialog>
      </v-card-actions>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ChallengeDialog from '@/components/ChallengeDialog.vue';
import ApproveDialog from '@/components/ApproveDialog.vue';
import { UserChallenge } from '@/store/types';
import {
  calculatePercentOfСhallenge,
  generateTimerObject,
} from '@/helpers/time';

export default defineComponent({
  name: 'Challenge',
  components: { ChallengeDialog, ApproveDialog },
  props: {
    challenge: {
      type: Object as PropType<UserChallenge>,
      required: true,
    },
  },
  data() {
    return {
      intervalId: 0,
      progressPercent: 0,
      progressMessage: '',
      repeatIntervalIn: 1000,
    };
  },
  watch: {
    repeatIntervalIn() {
      clearInterval(this.intervalId);
      this.runInterval();
    },
  },
  created() {
    this.generateTimerObject();
    this.runInterval();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    calculatePercent(): void {
      this.progresProcent = calculatePercentOfСhallenge(this.challenge);
    },

    runInterval(): void {
      this.intervalId = setInterval(() => {
        this.generateTimerObject();
        if (this.progressPercent >= 100) {
          clearInterval(this.intervalId);
        }
      }, this.repeatIntervalIn);
    },

    generateTimerObject(): void {
      const timer = generateTimerObject(this.challenge.start_date);
      if (timer) {
        this.progressMessage = timer.progressMessage;
        this.repeatIntervalIn = timer.repeatIntervalIn;
        this.calculatePercent();
      }
    },

    deleteChallenge(): void {
      this.$store.dispatch('DELETE_USER_CHALLENGE', this.challenge);
    },
  },
});
</script>

<style scoped>
.challenge-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 60px;
}
</style>
