<script setup>
import { useFileStore } from '@/stores/file.js'
import FileCard from '@/views/files/FileCard.vue'
import FileViewer from '@/views/files/FileViewer.vue'
import FileDrawer from '@/views/files/FileDrawer.vue'

const fileStore = useFileStore()

onMounted(async () => {
  // do something
})
</script>

<template>
  <div>
    <FileDrawer />

    <FileCard
      v-for="file in fileStore.files"
      :key="file.fullPath"
      class="mb-4"
      :file="file"
    />

    <FileViewer />

    <SnackBarError :error="fileStore.error" />
  </div>
</template>

<route lang="yaml">
meta:
  title: Files
  layout: default
  requiresAuth: true
  icon: tabler-file-text
</route>
