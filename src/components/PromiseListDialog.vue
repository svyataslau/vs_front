<template>
  <v-dialog v-model="isDialogVisible" scrollable max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        fab
        dark
        large
        v-blur
        color="blue lighten-1"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark> mdi-clipboard-edit-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Promise Categories</v-card-title>
      <v-sheet height="500" outlined class="overflow-auto">
        <v-row justify="center" class="mt-4" no-gutters>
          <PromiseDialog :actionType="'create'">
            <v-icon>mdi-plus-thick</v-icon>
          </PromiseDialog>
        </v-row>
        <Promise
          v-for="promise in promiseList"
          :key="promise.id"
          :promise="promise"
        />
      </v-sheet>
      <v-card-actions class="justify-end">
        <v-btn color="primary" text @click="hideDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import PromiseDialog from '@/components/PromiseDialog.vue';
import Promise from '@/components/Promise.vue';

interface PromiseType {
  id: number;
  title: string;
}

export default defineComponent({
  name: 'PromiseListDialog',
  components: { Promise, PromiseDialog },
  data() {
    return {
      isDialogVisible: false,
      promiseList: [] as PromiseType[],
    };
  },
  watch: {
    promises: {
      handler(newVal) {
        if (newVal?.length) {
          this.promiseList = [...newVal].reverse();
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      promises: 'PROMISES',
      userData: 'USER_DATA',
    }),
  },
  methods: {
    hideDialog() {
      this.isDialogVisible = false;
      this.$store.dispatch('REFRESH_USER_DATA');
    },
  },
  mounted() {
    this.$store.dispatch('LOAD_PROMISES');
  },
});
</script>
