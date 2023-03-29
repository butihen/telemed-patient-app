<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <VDialog
    :model-value="props.loading"
    width="300"
  >
    <VCard
      color="primary"
      width="300"
    >
      <VCardText class="pt-3">
        Please stand by
        <VProgressLinear
          indeterminate
          color="white"
          class="mb-0"
        />
      </VCardText>
    </VCard>
  </VDialog>
</template>
