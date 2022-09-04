<template>
  <v-dialog
    scrollable
    v-model="isDialogVisible"
    :max-width="responsiveDialogWidth"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        v-blur
        v-bind="attrs"
        v-on="on"
        :color="color"
        :small="!isLarge"
        :large="isLarge"
      >
        <slot></slot>
      </v-btn>
    </template>
    <v-form ref="form" v-model="isValid">
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            outlined
            label="Title"
            placeholder="Provide a title"
            v-model="title"
            :rules="validationRules.title"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="hideDialog">Close</v-btn>
          <v-btn
            text
            color="primary"
            :disabled="!isValid"
            @click="submitPromise"
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
import { mapActions } from 'vuex';
import validationRules from '@/helpers/validationRules';
import { Promise } from '@/store/types';

export default defineComponent({
  name: 'PromiseDialog',
  props: {
    isLarge: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'textSecondaryColor',
    },
    promise: {
      type: Object as PropType<Promise>,
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
      isValid: false,
      isDialogVisible: false,
      title: this.promise.title || null,
      validationRules,
    };
  },
  computed: {
    dialogTitle(): string {
      if (this.actionType === 'edit') {
        return 'Edit a promise';
      } else if (this.actionType === 'create') {
        return 'Create a promise';
      }
      return '';
    },
    responsiveDialogWidth(): number {
      return this.$vuetify.breakpoint.mdAndUp ? 800 : 400;
    },
  },
  methods: {
    ...mapActions({
      updatePromise: 'UPDATE_PROMISE',
      createPromise: 'CREATE_PROMISE',
    }),
    resetForm() {
      (this.$refs.form as HTMLFormElement).reset();
    },
    hideDialog() {
      if (this.actionType === 'create') {
        this.resetForm();
      }
      this.isDialogVisible = false;
    },
    submitPromise() {
      if (this.actionType === 'edit') {
        this.updatePromise({
          ...this.promise,
          title: this.title,
        });
      } else if (this.actionType === 'create') {
        this.createPromise({
          title: this.title,
        });
      }
      this.hideDialog();
    },
  },
});
</script>
