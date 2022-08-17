<template>
  <v-alert outlined shaped :type="type" :value="value">
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: 'CustomAlert',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'warning',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
