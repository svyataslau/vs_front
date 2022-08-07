<template>
  <v-main class="d-flex align-center fill-height">
    <v-container class="d-flex flex-column align-center" fluid>
      <img alt="website logotype" src="../assets/logo.png" />
      <Form class="col-12 col-sm-10 col-md-6" :title="this.title" />
      <v-btn text @click="redirectToRoute"
        >{{ this.redirectButtonName }}
      </v-btn>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import Form from '@/components/Form.vue';

export default Vue.extend({
  name: 'LoginView',
  components: {
    Form,
  },
  computed: {
    title() {
      switch (this.$route.name) {
        case 'login':
          return 'Login';
        case 'registration':
          return 'Registration';
        default:
          return '';
      }
    },
    redirectButtonName() {
      switch (this.$route.name) {
        case 'login':
          return 'Registration page';
        case 'registration':
          return 'Login page';
        default:
          return '';
      }
    },
  },
  methods: {
    redirectToRoute() {
      if (this.$route.name === 'registration') {
        this.$router.push('/login');
      } else if (this.$route.name === 'login') {
        this.$router.push('/registration');
      }
    },
  },
});
</script>

<style scoped lang="scss">
img {
  height: 100px;
  width: 100px;
}
</style>
