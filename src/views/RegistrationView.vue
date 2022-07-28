<template>
  <v-container class="d-flex flex-column align-center" fluid>
    <img alt="website logotype" src="../assets/logo.png" />
    <RegistrationContent class="col-12 col-sm-10 col-md-6" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RegistrationContent from '@/components/RegistrationContent.vue';

@Component({
  components: {
    RegistrationContent,
  },
})
export default class RegistrationView extends Vue {}
</script>

<style scoped lang="scss">
img {
  height: 100px;
  width: 100px;
}
</style>
