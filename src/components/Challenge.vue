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
        color="primary"
      >
        {{ days }}
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
        <v-btn elevation="2" icon outlined text class="ma-2">
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
      days: '',
      procent: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      this.procent = this.countProcent();
      this.days = this.countDays();
    }, 1000);
  },
  methods: {
    openEditDialog() {
      const newChallenge = {
        ...this.challenge,
        description:
          'Lorem Ipsum has been the industrys standard dummy text ever since the 1500,',
      };
      this.$store.dispatch('UPDATE_FULL_CHALLENGE', newChallenge);
    },
    countProcent() {
      const oneDayInMiliseconds = 86400000;
      const daysNumberInMiliseconds =
        this.challenge.days_number * oneDayInMiliseconds;
      const pastMiliseconds =
        Date.now() - Date.parse(this.challenge.start_date);
      return (pastMiliseconds / daysNumberInMiliseconds) * 100;
    },
    countDays() {
      const oneDayInMiliseconds = 86400000;
      const oneHourInMiliseconds = 3600000;
      const oneMinuteInMiliseconds = 60000;
      const oneSecondInMiliseconds = 1000;
      const pastMiliseconds =
        Date.now() - Date.parse(this.challenge.start_date);
      const countDays = Math.trunc(pastMiliseconds / oneDayInMiliseconds);
      const countHours = Math.trunc(pastMiliseconds / oneHourInMiliseconds);
      const countMinutes = Math.trunc(pastMiliseconds / oneMinuteInMiliseconds);
      const countSeconds = Math.trunc(pastMiliseconds / oneSecondInMiliseconds);
      const timeArray = [
        {
          days: countDays,
          description: () => (countDays > 1 ? 'days' : 'day'),
        },
        {
          days: countHours,
          description: () => (countHours > 1 ? 'hours' : 'hour'),
        },
        {
          days: countMinutes,
          description: () => (countMinutes > 1 ? 'minutes' : 'minute'),
        },
        {
          days: countSeconds,
          description: () => (countSeconds > 1 ? 'seconds' : 'second'),
        },
      ];
      const final = timeArray.find((element) => element.days > 0);
      return `${final?.days} ${final?.description()}`;
    },
  },
};
</script>

<style scoped></style>
