<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar dense>
      <v-img
        class="mx-2"
        src="../assets/logo.png"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-toolbar-title>The Mission</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text><router-link to="/">Home</router-link></v-btn>
        <v-btn text><router-link to="/about">About</router-link></v-btn>
        <v-btn text> Content </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "HeaderBar",
};
</script>

<style scoped></style>
