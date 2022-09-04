<template>
  <v-snackbar shaped color="warning" v-model="isVisible">
    <v-icon>mdi-alert-circle-outline</v-icon>
    {{ alert.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="isVisible = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'CustomAlert',
  props: {
    alert: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
};
</script>
