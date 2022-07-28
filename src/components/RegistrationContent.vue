<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="credentials.nickname"
      :rules="nicknameRules"
      label="Nickname"
      required
    ></v-text-field>

    <v-text-field
      v-model="credentials.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="blue lighten-1"
      class="mr-4"
      @click="submit"
    >
      Submit
    </v-btn>

    <v-btn color="pink lighten-1" class="mr-4" @click="$refs.form.reset()">
      Reset Form
    </v-btn>

    <v-btn color="pink lighten-1" @click="$refs.form.resetValidation()">
      Reset Validation
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RegistrationContent',
  data: () => ({
    valid: true,
    credentials: {
      nickname: '',
      email: '',
    },
    nicknameRules: [
      (v: string) => !!v || 'Nickname is required',
      (v: string) =>
        (v && v.length <= 10) || 'Nickname must be less than 10 characters',
    ],
    emailRules: [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),

  methods: {
    submit() {
      console.log(JSON.stringify(this.credentials));
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
