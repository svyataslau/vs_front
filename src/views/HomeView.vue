<template>
  <v-main>
    <HeaderBar />
    <v-container class="text-center" fluid>
      <img alt="website logotype" src="../assets/logo.png" />
      <h2>{{ this.helloMessage }}</h2>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';

export default Vue.extend({
  name: 'App',
  components: { HeaderBar },
  computed: {
    helloMessage() {
      return this.$store.state.helloMessage;
    },
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
