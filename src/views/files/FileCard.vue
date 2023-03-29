<script setup>
import { useFileStore } from '@/stores/file.js'

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
})

const fileStore = useFileStore()

const getFileIcon = type => {
  switch (type) {
  case 'image':
    return 'tabler-photo'
  case 'video':
    return 'tabler-video'
  case 'audio':
    return 'tabler-volume'
  case 'text':
    return 'tabler-file-text'
  case 'application':
    return 'tabler-box'
  default:
    return 'tabler-file'
  }
}

const viewFile = async () => {
  fileStore.selected_file = Object.assign({}, props.file)
  fileStore.viewer = true
}

const downloadFile = async () => {
  window.open(props.file.url, '_blank').focus()
}

const deleteFile = async () => {
  // do something
}
</script>

<template>
  <VCard :loading="fileStore.selected_file && fileStore.loading && fileStore.selected_file.name == props.file.name">
    <div class="d-flex flex-column-reverse flex-md-row">
      <div>
        <VCardItem>
          <VCardTitle>
            <VIcon
              :icon="getFileIcon(props.file.contentType.split('/')[0])"
            />
            {{ props.file.name }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="d-flex align-center flex-wrap text-body-1">
          Uploaded {{ new Date(props.file.timeCreated).toDateString() }}
        </VCardText>

        <VCardText>
          {{ props.file.customMetadata?.description }}
        </VCardText>
      </div>

      <VSpacer />

      <div
        v-if="props.file.contentType.includes('image') && props.file.url"
        class="ma-auto pa-5"
      >
        <VImg
          :width="176"
          :src="props.file.url"
          class="rounded"
          @click="viewFile"
        />
      </div>
    </div>

    <VCardActions>
      <VBtn @click="downloadFile">
        Download
      </VBtn>
      <VBtn
        color="error"
        @click="deleteFile"
      >
        Delete
      </VBtn>
    </VCardActions>
  </VCard>
</template>

