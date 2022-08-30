<template>
  <v-card
    class="mx-auto my-4 d-flex flex-row"
    max-width="700"
    max-height="150"
    elevation="2"
    outlined
    shaped
  >
    <v-col class="col-7 col-md-8 col-lg-9 pa-0 text-left">
      <h5 class="text-h5 ma-4 text-truncate">
        {{ challenge.title }}
      </h5>
      <h6
        class="text-body-2 ma-4"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 60px;
        "
      >
        {{ challenge.description }}
      </h6>
    </v-col>
    <v-col class="col-4 col-md-3 col-lg-2 d-flex justify-center align-center">
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="10"
        :value="procent"
        :color="color"
      >
        <v-icon x-large :color="color" v-if="this.procent >= 100">
          mdi-check-bold
        </v-icon>
        <span v-else>{{ message }}</span>
      </v-progress-circular>
    </v-col>
    <v-col class="col-1 d-flex justify-center align-center">
      <v-card-actions class="d-flex flex-column">
        <v-btn
          elevation="2"
          icon
          outlined
          text
          class="ma-2"
          @click="openEditDialog"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn
          elevation="2"
          icon
          outlined
          text
          class="ma-2"
          @click="openDeleteDialog"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: 'Challenge',
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
      color: 'blue lighten-1',
      timerObject: {},
      repeatIntervalIn: 0,
    };
  },
  mounted() {
    this.runInterval();
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
        console.log('run');
        this.generateTimerObject();
        if (this.procent >= 100) {
          this.color = 'green lighten-1';
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
      this.timerObject = timeArray.find((element) => element.days > 0);
      this.timerObject.descriptionString = this.timerObject.description();
      this.repeatIntervalIn = this.timerObject.repeatIntervalIn;
      this.countProcent();
    },

    openEditDialog() {
      const newChallenge = {
        ...this.challenge,
        description:
          'Lorem Ipsum has been the standard dummy text ever since the 1500,',
      };
      this.$store.dispatch('UPDATE_FULL_CHALLENGE', newChallenge);
    },

    openDeleteDialog() {
      this.$store.dispatch('DELETE_FULL_CHALLENGE', this.challenge);
    },
  },
  computed: {
    message() {
      return `${this.timerObject?.days} ${this.timerObject?.descriptionString}`;
    },
  },
};
</script>

<style scoped></style>
