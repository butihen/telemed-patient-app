<script setup>
import { useFileStore } from '@/stores/file.js'

const fileStore = useFileStore()

watchEffect(() => {
  if (fileStore.viewer === false) {
    fileStore.selected_file = null
  }
})
</script>

<template>
  <VDialog v-model="fileStore.viewer">
    <VCard v-if="fileStore.selected_file">
      <VCardTitle class="d-flex align-center">
        <VAvatar
          class="mx-2"
          size="32"
          color="primary"
        >
          <VIcon
            color="white"
            size="24"
            :icon="'tabler-' + fileStore.selected_file.contentType.split('/')[1]"
          />
        </VAvatar>

        <h6 class="mx-2 text-body-1 font-weight-medium text-high-emphasis d-flex flex-column">
          {{ fileStore.selected_file.name }}
        </h6>

        <VSpacer />

        <VBtn
          variant="text"
          color="default"
          icon
          size="small"
          @click="fileStore.viewer = false"
        >
          <VIcon
            size="22"
            icon="tabler-x"
          />
        </VBtn>
      </VCardTitle>

      <VCardText>
        <VImg
          v-if="fileStore.selected_file.contentType.includes('image')"
          :src="fileStore.selected_file.url"
          max-width="100%"
          max-height="80vh"
        />
      </VCardText>
    </VCard>
  </VDialog>
</template>
