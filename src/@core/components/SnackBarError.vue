<script setup>
const props = defineProps({
  error: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <VSnackbar
    v-if="!!error"
    model-value
    multi-line
    color="error"
    position="fixed"
  >
    {{ error }}
  </VSnackbar>
</template>
