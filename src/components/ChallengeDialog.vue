<template>
  <v-dialog
    v-model="isDialogVisible"
    scrollable
    :max-width="responsiveDialogWidth"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        v-blur
        :color="color"
        :small="!isLarge"
        :large="isLarge"
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
            @input="resetSelectErrors"
          ></v-select>
          <v-textarea
            outlined
            label="Description"
            placeholder="Provide a reason or description for your challenge"
            v-model="description"
            :rules="validationRules.descriptionRules"
          ></v-textarea>
          <v-text-field
            outlined
            label="Days timer"
            type="number"
            v-model="daysNumber"
            :rules="validationRules.dayTimerRules"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="hideDialog"> Close</v-btn>
          <v-btn
            text
            color="primary"
            @click="checkPromiseSelection"
            :disabled="!isValid"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import validationRules from '@/helpers/validationRules';
import { UserChallenge, Promise } from '@/store/types';
import { dateNowIsoString } from '@/helpers/time';

export default defineComponent({
  name: 'ChallengeDialog',
  props: {
    isLarge: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'textSecondaryColor',
    },
    challenge: {
      type: Object as PropType<UserChallenge>,
      default() {
        return {};
      },
    },
    actionType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectErrors: [] as string[],
      isValid: false,
      promise: { id: 0, title: '' } as Promise,
      isDialogVisible: false,
      description: this.challenge.description || null,
      daysNumber: this.challenge.daysNumber || null,
      validationRules,
    };
  },
  computed: {
    ...mapGetters({
      promises: 'PROMISES',
      userData: 'USER_DATA',
    }),
    dialogTitle() {
      if (this.actionType === 'edit') {
        return 'Edit a challenge';
      } else if (this.actionType === 'create') {
        return 'Create a challenge';
      }
      return '';
    },
    responsiveDialogWidth(): number {
      return this.$vuetify.breakpoint.mdAndUp ? 800 : 300;
    },
  },
  watch: {
    promises() {
      this.promise = [...this.promises].find(
        (promise) => promise.id === this.challenge?.promiseId
      );
    },
  },
  mounted() {
    this.$store.dispatch('LOAD_PROMISES');
  },
  methods: {
    ...mapActions({
      updateUserChallenge: 'UPDATE_USER_CHALLENGE',
      createUserChallenge: 'CREATE_USER_CHALLENGE',
    }),
    resetForm() {
      (this.$refs.form as HTMLFormElement).reset();
    },
    resetSelectErrors() {
      this.selectErrors = [];
    },
    hideDialog() {
      if (this.actionType === 'create') {
        this.resetForm();
      }
      this.isDialogVisible = false;
    },
    checkPromiseSelection() {
      if (this.promise?.id) {
        this.submitChallenge();
      } else {
        this.selectErrors.push('Choose a promise!');
      }
    },
    submitChallenge() {
      const generalFields = {
        promiseId: this.promise.id,
        title: this.promise.title,
        description: this.description,
        daysNumber: this.daysNumber,
      };
      if (this.actionType === 'edit') {
        this.updateUserChallenge({
          ...this.challenge,
          ...generalFields,
          startDate: this.challenge.startDate,
        });
      } else if (this.actionType === 'create') {
        this.createUserChallenge({
          startDate: dateNowIsoString(),
          ...generalFields,
          userId: this.userData.id,
        });
      }
      this.hideDialog();
    },
  },
});
</script>
