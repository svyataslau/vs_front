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
          <v-icon dark> mdi-plus-thick</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Create a challenge</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-radio-group v-model="promise" column>
            <v-radio
              v-for="promise in promises"
              :key="promise.id"
              :label="promise.title"
              :value="promise"
            ></v-radio>
          </v-radio-group>
          <v-textarea
            outlined
            label="Description"
            placeholder="Provide a reason or description for your challenge"
            v-model="description"
            :rules="validationRules.description"
          ></v-textarea>
          <v-text-field
            label="Days timer"
            outlined
            type="number"
            :rules="validationRules.dayTimerRules"
            v-model.number="number"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="hideDialog"> Close</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submitPromise"
            :disabled="!isValidCreatedPromise"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import validationRules from '@/helpers/validationRules';

export default {
  name: 'PromiseDialog',
  data() {
    return {
      promise: null,
      isDialogVisible: false,
      description: '',
      number: null,
      validationRules,
    };
  },
  computed: {
    ...mapGetters({
      promises: 'PROMISES',
      userData: 'USER_DATA',
    }),
    ...mapActions(['LOAD_FULL_CHALLENGES']),
    isValidCreatedPromise() {
      return this.promise?.id != undefined && !!this.description.length;
    },
  },
  methods: {
    hideDialog() {
      this.isDialogVisible = false;
    },
    submitPromise() {
      this.$store.dispatch('CREATE_FULL_CHALLENGE', {
        user_id: this.userData.id,
        promise_id: this.promise.id,
        description: this.description,
        start_date: new Date(Date.now()).toISOString(),
        days_number: this.number,
        title: this.promise.title,
      });
      this.hideDialog();
    },
  },
  mounted() {
    this.$store.dispatch('LOAD_PROMISES');
  },
};
</script>

<style scoped></style>
