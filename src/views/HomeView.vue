<template>
  <div class="home">
    <img alt="website logotype" src="../assets/logo.png" />
    <MainContent msg="Some message" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainContent from "@/components/MainContent.vue";

@Component({
  components: {
    MainContent,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="scss">
img {
  height: 100px;
  width: 100px;
}
</style>
