<template>
  <v-container fluid>
    <h1 class="text-h4">{{ title }}</h1>
    <v-form ref="form" v-model="isValid">
      <v-text-field
        v-if="isRegistrationPage"
        required
        color="black"
        label="Nickname"
        v-model="user.nickname"
        :rules="validationRules.nicknameRules"
      ></v-text-field>

      <v-text-field
        required
        label="Email"
        color="black"
        v-model="user.email"
        :rules="validationRules.emailRules"
      ></v-text-field>

      <v-text-field
        required
        label="Password"
        color="black"
        v-model="user.password"
        :rules="validationRules.passwordRules"
      ></v-text-field>

      <v-btn
        color="primary"
        class="mr-4 white--text"
        :disabled="!isValid"
        @click="submit"
      >
        Submit
      </v-btn>

      <v-btn
        color="warning"
        class="mr-4 white--text"
        @click="$refs.form.reset()"
      >
        Reset Form
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import validationRules from '@/helpers/validationRules';

export default defineComponent({
  name: 'FormContent',
  props: {
    title: String,
  },
  data() {
    return {
      isValid: true,
      user: {
        nickname: '',
        email: 'letsgo763@gmail.com',
        password: 'somePass32',
      },
      validationRules,
    };
  },
  computed: {
    isRegistrationPage(): boolean {
      return !!(this.$route.name === 'registration');
    },
  },
  methods: {
    submit() {
      if (this.$route.name === 'login') {
        this.$store.dispatch('LOGIN', this.user);
      }
      if (this.$route.name === 'registration') {
        this.$store.dispatch('REGISTER', this.user);
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
