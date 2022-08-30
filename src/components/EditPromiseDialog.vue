<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogVisible" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fab
          dark
          large
          color="blue lighten-1"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark> mdi-clipboard-edit-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Edit Promise Categories</v-card-title>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="hideDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submitPromise">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EditPromiseDialog',
  data() {
    return {
      isDialogVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      promises: 'PROMISES',
      userData: 'USER_DATA',
    }),
  },
  methods: {
    hideDialog() {
      this.isDialogVisible = false;
    },
    submitPromise() {
      console.log('hi');
    },
  },
  mounted() {
    this.$store.dispatch('LOAD_PROMISES');
  },
};
</script>

<style scoped></style>
