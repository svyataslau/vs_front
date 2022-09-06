<template>
  <v-snackbar shaped color="warning" v-model="isVisible">
    <v-icon>mdi-alert-circle-outline</v-icon>
    {{ alert.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="isVisible = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { Alert } from '@/store/types';

export default defineComponent({
  name: 'CustomAlert',
  props: {
    alert: {
      type: Object as PropType<Alert>,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
});
</script>
