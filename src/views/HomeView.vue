<template>
  <v-main>
    <HeaderBar />
    <v-container class="text-center" fluid>
      <img alt="website logotype" src="../assets/logo.png" />
      <h2>{{ helloMessage }}</h2>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: { HeaderBar },
  computed: {
    ...mapState({
      helloMessage: 'helloMessage',
    }),
  },
  data: () => ({}),
});
</script>

<style scoped lang="scss">
img {
  height: 100px;
  width: 100px;
}
</style>
