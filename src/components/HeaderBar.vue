<template>
  <v-card flat tile>
    <v-toolbar dense>
      <v-img
        contain
        src="../assets/logo.png"
        max-height="40"
        max-width="40"
        class="mx-2"
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

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'HeaderBar',
  computed: {
    ...mapGetters({
      userData: 'USER_DATA',
    }),
  },
  methods: {
    ...mapActions({
      signOut: 'LOGOUT',
    }),
  },
});
</script>

<style scoped></style>
