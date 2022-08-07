<template>
  <v-app>
    <v-main class="grey lighten-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({}),
});
</script>
