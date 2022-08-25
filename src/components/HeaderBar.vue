<template>
  <v-card color="grey darken-3" flat tile>
    <v-toolbar dense>
      <v-img
        class="mx-2"
        src="../assets/logo.png"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-toolbar-title>The Challenge</v-toolbar-title>

      <v-spacer></v-spacer>
      <span class="font-weight-bold">{{ userData.nickname }}</span>
      <v-toolbar-items>
        <v-btn icon @click="signOut">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderBar',
  computed: {
    ...mapGetters({
      userData: 'USER_DATA',
    }),
  },
  methods: {
    signOut() {
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('login'));
    },
  },
};
</script>

<style scoped></style>
