<template>
  <v-main class="d-flex align-center fill-height">
    <v-container class="d-flex flex-column align-center" fluid>
      <img alt="website logotype" src="../assets/logo.png" />
      <Form
        :title="titles.headingName"
        @showWarning="showWarning"
        @hideWarnings="hideWarnings"
        class="col-12 col-sm-10 col-md-6"
      />
      <v-btn text @click="redirectToRoute"
        >{{ titles.redirectButtonName }}
      </v-btn>
      <v-overlay
        :absolute="true"
        :opacity="0.9"
        :value="isAlertVisible"
        @click="isAlertVisible = false"
        color="grey lighten-5"
      >
        <CustomAlert :value="isAlertVisible" :message="alertMessage" />
      </v-overlay>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import Form from '@/components/Form.vue';
import CustomAlert from '@/components/CustomAlert.vue';

export default Vue.extend({
  name: 'LoginView',
  components: {
    CustomAlert,
    Form,
  },
  data: function () {
    return {
      userExists: false,
      noUserInSystem: false,
      isAlertVisible: false,
      alertMessage: '',
    };
  },
  computed: {
    titles() {
      return {
        headingName: this.$route.name == 'login' ? 'Login' : 'Registration',
        redirectButtonName:
          this.$route.name == 'login' ? 'Registration page' : 'Login page',
      };
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
    showWarning(responseErrorMessage: string) {
      this.alertMessage = responseErrorMessage;
      this.isAlertVisible = true;
      setTimeout(this.hideWarnings, 2000);
    },
    hideWarnings() {
      if (this.isAlertVisible) this.isAlertVisible = false;
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
