<template>
  <v-dialog
    v-model="isDialogVisible"
    scrollable
    :max-width="$vuetify.breakpoint.mdAndUp ? 800 : 300"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        v-blur
        :color="color"
        :small="!large"
        :large="large"
        v-bind="attrs"
        v-on="on"
      >
        <slot></slot>
      </v-btn>
    </template>
    <v-form ref="form" v-model="isValid">
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-select
            outlined
            return-object
            item-text="title"
            label="Challenge category"
            class="mt-4"
            v-model="promise"
            :items="promises"
            :error-messages="selectErrors"
            @input="selectHandler"
          ></v-select>
          <v-textarea
            outlined
            label="Description"
            placeholder="Provide a reason or description for your challenge"
            v-model="description"
            :rules="validationRules.description"
          ></v-textarea>
          <v-text-field
            outlined
            label="Days timer"
            type="number"
            v-model="number"
            :rules="validationRules.dayTimerRules"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="hideDialog"> Close</v-btn>
          <v-btn
            text
            color="primary"
            @click="submitChallenge"
            :disabled="!isValid"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import validationRules from '@/helpers/validationRules';

export default {
  name: 'ChallengeDialog',
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'textSecondaryColor',
    },
    challenge: {
      type: Object,
    },
    actionType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectErrors: [],
      isValid: false,
      promise: null,
      isDialogVisible: false,
      description: this.challenge?.description || '',
      number: this.challenge?.days_number || null,
      validationRules,
    };
  },
  computed: {
    ...mapGetters({
      promises: 'PROMISES',
      userData: 'USER_DATA',
    }),
    isPromiseSelected() {
      return this.promise?.id;
    },
    dialogTitle() {
      if (this.actionType === 'edit') {
        return 'Edit a challenge';
      } else if (this.actionType === 'create') {
        return 'Create a challenge';
      }
      return '';
    },
  },
  watch: {
    promises() {
      this.promise = [...this.promises].find(
        (promise) => promise.id === this.challenge?.promise_id
      );
    },
  },
  mounted() {
    this.$store.dispatch('LOAD_PROMISES');
  },
  methods: {
    selectHandler() {
      this.selectErrors = [];
    },
    hideDialog() {
      this.isDialogVisible = false;
      if (this.actionType === 'create') {
        this.$refs.form.reset();
      }
    },
    submitChallenge() {
      if (this.isPromiseSelected) {
        if (this.actionType === 'edit') {
          let startTime = new Date(this.challenge.start_date);
          startTime = new Date(
            startTime.getTime() + startTime.getTimezoneOffset() * 60000
          );

          this.$store.dispatch('UPDATE_FULL_CHALLENGE', {
            ...this.challenge,
            start_date: new Date(Date.parse(startTime)),
            promise_id: this.promise.id,
            description: this.description,
            days_number: this.number,
            title: this.promise.title,
          });
        } else if (this.actionType === 'create') {
          this.$store.dispatch('CREATE_FULL_CHALLENGE', {
            user_id: this.userData.id,
            promise_id: this.promise.id,
            description: this.description,
            start_date: new Date(Date.now()).toISOString(),
            days_number: this.number,
            title: this.promise.title,
          });
          this.$refs.form.reset();
        }
        this.hideDialog();
      } else {
        this.selectErrors.push('Invalid');
      }
    },
  },
};
</script>
