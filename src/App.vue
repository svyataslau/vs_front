<template>
  <v-app>
    <v-main class="grey lighten-5">
      <router-view />
    </v-main>
    <CustomAlert :value="isAlertVisible" :message="alertMessage" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import CustomAlert from '@/components/CustomAlert.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    CustomAlert,
  },
  computed: {
    ...mapGetters({
      alertMessage: 'getAlertMessage',
      isAlertVisible: 'getIsAlertVisible',
    }),
  },
});
</script>
