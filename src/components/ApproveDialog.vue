<template>
  <v-dialog
    v-model="isDialogVisible"
    scrollable
    :max-width="$vuetify.breakpoint.mdAndUp ? 600 : 400"
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
        class="ma-2"
      >
        <slot></slot>
      </v-btn>
    </template>
    <v-card>
      <v-card-title
        class="justify-center text-break"
        :class="$vuetify.breakpoint.mdAndUp ? 'text-h6' : 'text-body-1'"
        >{{ message }}
      </v-card-title>
      <v-card-actions class="justify-space-between">
        <v-btn color="warning" text @click="hideDialog">No</v-btn>
        <v-btn color="primary" text @click="approveHandler">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ApproveDialog',
  props: {
    large: {
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
  methods: {
    hideDialog() {
      this.isDialogVisible = false;
    },
    approveHandler() {
      this.$emit('callback');
      this.hideDialog();
    },
  },
};
</script>
