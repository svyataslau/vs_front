<template>
  <v-main class="d-flex align-center fill-height">
    <v-container class="d-flex flex-column align-center" fluid>
      <img alt="website logotype" src="../assets/logo.png" />
      <Form
        class="col-12 col-sm-10 col-md-6"
        :title="this.title"
        @showWarning="showWarning"
        @hideWarnings="hideWarnings"
      />
      <v-btn text @click="redirectToRoute"
        >{{ this.redirectButtonName }}
      </v-btn>
      <v-overlay
        :absolute="true"
        :opacity="0.9"
        color="grey lighten-5"
        :value="isAlertVisible"
        @click="isAlertVisible = false"
      >
        <CustomAlert :value="isAlertVisible" :message="this.alertMessage" />
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
    showWarning(responseErrorCode: number) {
      if (responseErrorCode === 401) {
        this.alertMessage = 'This user is not registered';
        this.isAlertVisible = true;
        setTimeout(this.hideWarnings, 2000);
      }
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
