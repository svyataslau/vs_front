<template>
  <v-app>
    <v-main>
      <HeaderBar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderBar from "@/components/HeaderBar.vue";

export default Vue.extend({
  name: "App",
  components: { HeaderBar },
  data: () => ({}),
});
</script>
