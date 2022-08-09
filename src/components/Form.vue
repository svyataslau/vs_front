<template>
  <v-container fluid>
    <h1 class="text-h4">{{ this.title }}</h1>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-if="isRegistrationPage"
        color="black"
        v-model="credentials.nickname"
        :rules="validationRules.nicknameRules"
        label="Nickname"
        required
        @input="$emit('hideWarnings')"
      ></v-text-field>

      <v-text-field
        color="black"
        v-model="credentials.email"
        :rules="validationRules.emailRules"
        label="Email"
        required
        @input="$emit('hideWarnings')"
      ></v-text-field>

      <v-text-field
        color="black"
        v-model="credentials.password"
        :rules="validationRules.passwordRules"
        label="Password"
        required
        @input="$emit('hideWarnings')"
      ></v-text-field>

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
import validationRules from '@/helpers/validationRules';

export default Vue.extend({
  name: 'FormContent',
  props: {
    title: String,
  },
  data: () => ({
    valid: true,
    credentials: {
      nickname: '',
      email: 'letsgo763@gmail.com', //mocked
      password: 'somePass32', //mocked
    },
    validationRules,
  }),
  computed: {
    isRegistrationPage(): boolean {
      return !!(this.$route.name === 'registration');
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
          .then(() => this.$router.push('/'))
          .catch((e) => {
            this.$emit('showWarning', e.response.status);
          });
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
