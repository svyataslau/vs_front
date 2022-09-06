<template>
  <v-card
    shaped
    outlined
    max-height="60"
    elevation="2"
    class="ma-4 pa-0 d-flex flex-row"
  >
    <v-col cols="8" sm="9" class="d-flex align-center pa-0">
      <h6 class="text-body-2 text-md-subtitle-1 ma-4">
        {{ promise.title }}
      </h6>
    </v-col>
    <v-col cols="4" sm="3" class="d-flex justify-center align-center">
      <v-card-actions class="d-flex flex-row ml-n4">
        <PromiseDialog :promise="promise" :actionType="'edit'">
          <v-icon>mdi-pencil-outline</v-icon>
        </PromiseDialog>
        <ApproveDialog
          message="Would you like to delete this category?"
          @callback="deletePromise"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </ApproveDialog>
      </v-card-actions>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import ApproveDialog from '@/components/ApproveDialog.vue';
import PromiseDialog from '@/components/PromiseDialog.vue';
import { Promise } from '@/store/types';

export default defineComponent({
  name: 'PromiseItem',
  components: { ApproveDialog, PromiseDialog },
  props: {
    promise: {
      type: Object as PropType<Promise>,
      required: true,
    },
  },
  methods: {
    deletePromise(): void {
      this.$store.dispatch('DELETE_PROMISE', this.promise);
    },
  },
});
</script>

<style scoped></style>
