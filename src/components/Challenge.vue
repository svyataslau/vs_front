<template>
  <v-card
    class="my-4 d-flex flex-row col-12"
    max-height="250"
    elevation="2"
    outlined
    shaped
  >
    <v-col cols="7" md="8" lg="9" class="pa-0">
      <h5 class="text-h5 ma-4 text-truncate">
        {{ challenge.title }}
      </h5>
      <h6 class="text-body-2 ma-4 challenge-description">
        {{ challenge.description }}
      </h6>
    </v-col>
    <v-col cols="4" md="3" lg="2" class="d-flex justify-center align-center">
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="10"
        :value="procent"
        color="primary"
      >
        <v-icon x-large color="primary" v-if="procent >= 100">
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
        <v-btn
          elevation="2"
          icon
          outlined
          text
          class="ma-2"
          @click="deleteChallenge"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-card>
</template>

<script>
import ChallengeDialog from '@/components/ChallengeDialog.vue';

export default {
  name: 'Challenge',
  components: { ChallengeDialog },
  props: {
    challenge: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      interval: {},
      procent: 0,
      progressMessage: '',
      repeatIntervalIn: 1000,
    };
  },
  created() {
    this.generateTimerObject();
    this.runInterval();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  watch: {
    repeatIntervalIn() {
      clearInterval(this.interval);
      this.runInterval();
    },
  },
  methods: {
    countProcent() {
      const oneDayInMiliseconds = 86400000;
      const daysNumberInMiliseconds =
        this.challenge.days_number * oneDayInMiliseconds;
      let startTime = new Date(this.challenge.start_date);
      startTime = new Date(
        startTime.getTime() + startTime.getTimezoneOffset() * 60000
      );
      const pastMiliseconds = Date.now() - Date.parse(startTime);
      this.procent = (pastMiliseconds / daysNumberInMiliseconds) * 100;
    },

    runInterval() {
      this.interval = setInterval(() => {
        this.generateTimerObject();
        if (this.procent >= 100) {
          clearInterval(this.interval);
        }
      }, this.repeatIntervalIn);
    },

    generateTimerObject() {
      const oneDayInMiliseconds = 86400000;
      const oneHourInMiliseconds = 3600000;
      const oneMinuteInMiliseconds = 60000;
      const oneSecondInMiliseconds = 1000;
      let startTime = new Date(this.challenge.start_date);
      startTime = new Date(
        startTime.getTime() + startTime.getTimezoneOffset() * 60000
      );
      const pastMiliseconds = Date.now() - Date.parse(startTime);
      const countDays = Math.trunc(pastMiliseconds / oneDayInMiliseconds);
      const countHours = Math.trunc(pastMiliseconds / oneHourInMiliseconds);
      const countMinutes = Math.trunc(pastMiliseconds / oneMinuteInMiliseconds);
      const countSeconds = Math.trunc(pastMiliseconds / oneSecondInMiliseconds);
      const timeArray = [
        {
          days: countDays,
          description: () => (countDays > 1 ? 'days' : 'day'),
          repeatIntervalIn: oneDayInMiliseconds,
        },
        {
          days: countHours,
          description: () => (countHours > 1 ? 'hours' : 'hour'),
          repeatIntervalIn: oneHourInMiliseconds,
        },
        {
          days: countMinutes,
          description: () => (countMinutes > 1 ? 'minutes' : 'minute'),
          repeatIntervalIn: oneMinuteInMiliseconds,
        },
        {
          days: countSeconds,
          description: () => (countSeconds > 1 ? 'seconds' : 'second'),
          repeatIntervalIn: oneSecondInMiliseconds,
        },
      ];
      const founded = timeArray.find((element) => element.days > 0);
      if (founded) {
        this.progressMessage = `${founded.days} ${founded.description()}`;
        this.repeatIntervalIn = founded.repeatIntervalIn;
        this.countProcent();
      }
    },

    deleteChallenge() {
      this.$store.dispatch('DELETE_FULL_CHALLENGE', this.challenge);
    },
  },
};
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
