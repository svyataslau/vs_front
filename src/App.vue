<template>
  <v-app>
    <v-main class="grey lighten-5">
      <router-view />
    </v-main>
    <CustomAlert
      v-for="(alert, index) in alerts"
      :key="index"
      :alert="alert"
      :style="{ 'margin-bottom': calculateMargin(index) }"
    />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import CustomAlert from '@/components/CustomAlert.vue';

export default Vue.extend({
  name: 'App',
  components: {
    CustomAlert,
  },
  computed: {
    ...mapGetters({
      alerts: 'ALERTS',
    }),
  },
  methods: {
    calculateMargin(index: number) {
      return index * 80 + 'px';
    },
  },
});
</script>
