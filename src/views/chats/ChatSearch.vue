<script setup>
import { useChatStore } from '@/stores/chat.js'

const chatStore = useChatStore()
</script>

<template>
  <div class="pa-3 d-flex">
    <VTextField
      v-model="chatStore.search"
      density="compact"
      placeholder="Search..."
    >
      <template #prepend-inner>
        <VIcon
          size="22"
          icon="tabler-search"
        />
      </template>
    </VTextField>

    <VBtn
      v-if="$vuetify.display.smAndDown && !!chatStore.activeChat"
      variant="text"
      color="default"
      icon
      size="small"
      @click="chatStore.chatListDrawer = false"
    >
      <VIcon
        size="24"
        icon="tabler-x"
        class="text-medium-emphasis"
      />
    </VBtn>
  </div>
</template>
