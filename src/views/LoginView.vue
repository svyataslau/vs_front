<template>
  <v-main class="d-flex align-center fill-height">
    <v-container class="d-flex flex-column align-center" fluid>
      <v-img src="../assets/logo.png" height="120" width="120" />
      <Form class="col-12 col-sm-10 col-md-6" :title="headingName" />
      <v-btn text @click="redirectToRoute">{{ redirectButtonName }}</v-btn>
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
    headingName(): string {
      return this.$route.name == 'login' ? 'Login' : 'Registration';
    },
    redirectButtonName(): string {
      return this.$route.name == 'login' ? 'Registration page' : 'Login page';
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
