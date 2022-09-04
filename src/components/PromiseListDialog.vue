<template>
  <v-dialog scrollable max-width="500" v-model="isDialogVisible">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        large
        v-blur
        class="mx-2"
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>mdi-clipboard-edit-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Promise Categories</v-card-title>
      <v-sheet outlined height="500" class="overflow-auto">
        <v-row justify="center" class="mt-4" no-gutters>
          <PromiseDialog :actionType="'create'">
            <v-icon>mdi-plus-thick</v-icon>
          </PromiseDialog>
        </v-row>
        <PromiseItem
          v-for="promise in promiseList"
          :key="promise.id"
          :promise="promise"
        />
      </v-sheet>
      <v-card-actions class="justify-end">
        <v-btn text color="primary" @click="hideDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import PromiseDialog from '@/components/PromiseDialog.vue';
import PromiseItem from '@/components/PromiseItem.vue';
import { Promise } from '@/store/types';

export default defineComponent({
  name: 'PromiseListDialog',
  components: { PromiseDialog, PromiseItem },
  data() {
    return {
      isDialogVisible: false,
      promiseList: [] as Promise[],
    };
  },
  computed: {
    ...mapGetters({
      promises: 'PROMISES',
      userData: 'USER_DATA',
    }),
  },
  watch: {
    promises: {
      handler(newPromises) {
        if (newPromises?.length) {
          this.promiseList = [...newPromises].reverse();
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.loadPromises();
  },
  methods: {
    ...mapActions({
      loadPromises: 'LOAD_PROMISES',
      refreshUserData: 'REFRESH_USER_DATA',
    }),
    hideDialog() {
      this.isDialogVisible = false;
      this.refreshUserData();
    },
  },
});
</script>
