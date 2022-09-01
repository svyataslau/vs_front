<template>
  <v-dialog
    v-model="isDialogVisible"
    scrollable
    :max-width="$vuetify.breakpoint.mdAndUp ? 800 : 400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        :color="color"
        :small="!large"
        :large="large"
        v-bind="attrs"
        v-on="on"
        v-blur
      >
        <slot></slot>
      </v-btn>
    </template>
    <v-form ref="form">
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
            color="primary"
            text
            @click="submitPromise"
            :disabled="!isValidCreatedPromise"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import validationRules from '@/helpers/validationRules';

export default {
  name: 'PromiseDialog',
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'textSecondaryColor',
    },
    promise: {
      type: Object,
    },
    actionType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDialogVisible: false,
      title: this.promise?.title || '',
      validationRules,
    };
  },
  computed: {
    isValidCreatedPromise() {
      return true;
    },
    dialogTitle() {
      if (this.actionType === 'edit') {
        return 'Edit a promise';
      } else if (this.actionType === 'create') {
        return 'Create a promise';
      }
      return '';
    },
  },
  methods: {
    hideDialog() {
      this.isDialogVisible = false;
    },
    submitPromise() {
      if (this.actionType === 'edit') {
        this.$store.dispatch('UPDATE_PROMISE', {
          ...this.promise,
          title: this.title,
        });
      } else if (this.actionType === 'create') {
        this.$store.dispatch('CREATE_PROMISE', {
          title: this.title,
        });
        this.$refs.form.reset();
      }
      this.hideDialog();
    },
  },
};
</script>
