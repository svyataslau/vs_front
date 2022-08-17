<template>
  <v-overlay
    :absolute="true"
    :opacity="0.9"
    :value="value"
    color="grey lighten-5"
  >
    <v-alert outlined shaped :type="type" :value="value">
      {{ message }}
    </v-alert>
  </v-overlay>
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
