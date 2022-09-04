<template>
  <v-dialog
    v-model="isDialogVisible"
    scrollable
    :max-width="responsiveDialogWidth"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        :color="color"
        :small="!isLarge"
        :large="isLarge"
        v-bind="attrs"
        v-on="on"
        v-blur
        class="ma-2"
      >
        <slot></slot>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="justify-center text-break" :class="responsiveText"
        >{{ message }}
      </v-card-title>
      <v-card-actions class="justify-space-between">
        <v-btn color="warning" text @click="hideDialog">No</v-btn>
        <v-btn color="primary" text @click="approveHandler">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ApproveDialog',
  props: {
    isLarge: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'textSecondaryColor',
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDialogVisible: false,
    };
  },
  computed: {
    responsiveText(): string {
      return this.$vuetify.breakpoint.mdAndUp ? 'text-h6' : 'text-body-1';
    },
    responsiveDialogWidth(): number {
      return this.$vuetify.breakpoint.mdAndUp ? 600 : 400;
    },
  },
  methods: {
    hideDialog() {
      this.isDialogVisible = false;
    },
    approveHandler() {
      this.$emit('callback');
      this.hideDialog();
    },
  },
});
</script>
