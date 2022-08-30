<template>
  <v-dialog
    v-model="isDialogVisible"
    scrollable
    :max-width="$vuetify.breakpoint.mdAndUp ? 800 : 300"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        fab
        dark
        large
        color="primary"
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
        <v-select
          class="mt-4"
          v-model="promise"
          :items="promises"
          item-text="title"
          return-object
          label="Promise category"
          outlined
        ></v-select>
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
        <v-btn color="primary" text @click="hideDialog"> Close</v-btn>
        <v-btn
          color="primary"
          text
          @click="submitPromise"
          :disabled="!isValidCreatedPromise"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import validationRules from '@/helpers/validationRules';

export default {
  name: 'ChallengeDialog',
  data() {
    return {
      promise: null,
      isDialogVisible: false,
      description: '',
      number: null,
      validationRules,
    };
  },
  mounted() {
    this.$store.dispatch('LOAD_PROMISES');
  },
  computed: {
    ...mapGetters({
      promises: 'PROMISES',
      userData: 'USER_DATA',
    }),
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
};
</script>

<style scoped></style>
