<template>
  <v-card color="grey darken-3" flat tile>
    <v-toolbar dense>
      <v-img
        class="mx-2"
        src="../assets/logo.png"
        max-height="40"
        max-width="40"
        contain
        @click="redirectToRoute('/')"
      ></v-img>
      <v-toolbar-title>The Challenge</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text @click="redirectToRoute('/')">Home</v-btn>
        <v-btn text @click="redirectToRoute('/about')">About</v-btn>
        <v-btn text @click="redirectToRoute('/registration')"
          >Registration</v-btn
        >
        <v-btn icon @click="signOut()">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'HeaderBar',
  methods: {
    redirectToRoute(route) {
      this.$router.push(route);
    },
    signOut() {
      console.log('sign out');
    },
  },
};
</script>

<style scoped></style>
