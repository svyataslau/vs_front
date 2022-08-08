<template>
  <v-container fluid>
    <h1 class="text-h4">{{ this.title }}</h1>
    <v-form ref="form" v-model="valid">
      <v-alert color="error" :value="userExists" icon="warning">
        This user exists, try a different
      </v-alert>

      <v-text-field
        v-if="isRegistrationPage"
        color="black"
        v-model="credentials.nickname"
        :rules="nicknameRules"
        label="Nickname"
        required
      ></v-text-field>

      <v-text-field
        color="black"
        v-model="credentials.email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        color="black"
        v-model="credentials.password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>

      <div>
        <h4>letsgo763@gmail.com</h4>
        <h4>somePass32</h4>
      </div>

      <v-btn
        :disabled="!valid"
        color="blue lighten-1"
        class="mr-4 white--text"
        @click="submit"
      >
        Submit
      </v-btn>

      <v-btn
        color="pink lighten-1"
        class="mr-4 white--text"
        @click="$refs.form.reset()"
      >
        Reset Form
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { ProfileActions } from '@/store/modules/profile/actions';

export default Vue.extend({
  name: 'RegistrationContent',
  props: {
    title: String,
  },
  data: () => ({
    userExists: false,
    valid: true,
    credentials: {
      nickname: '',
      email: '',
      password: '',
    },
    nicknameRules: [
      (v: string) => !!v || 'Password is required',
      (v: string) =>
        /^[a-z0-9](?:[-_.]?[a-z0-9])*$/.test(v) ||
        'Nickname can contain lowercase letters, numbers, -_.',
    ],
    emailRules: [
      (v: string) => !!v || 'Email is required',
      (v: string) =>
        /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(v) ||
        'Invalid email. The email must be valid! Example: some_email-1990@work.old.com',
    ],
    passwordRules: [
      (v: string) => !!v || 'Password is required',
      (v: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
        'Invalid password. The password must consist of uppercase and lowercase Latin letters and be at least 8 characters long!',
    ],
  }),
  computed: {
    isRegistrationPage(): boolean {
      return this.$route.name === 'registration' ? true : false;
    },
  },
  methods: {
    submit() {
      if (this.$route.name === 'login') {
        this.$store
          .dispatch(ProfileActions.LOGIN, {
            email: this.credentials.email,
            password: this.credentials.password,
          })
          .then(() => this.$router.push('/'));
      } else if (this.$route.name === 'registration') {
        this.$store
          .dispatch('REGISTER', {
            nickname: this.credentials.nickname,
            email: this.credentials.email,
            password: this.credentials.password,
          })
          .then(() => this.$router.push('/'));
      }
    },
  },
});
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
