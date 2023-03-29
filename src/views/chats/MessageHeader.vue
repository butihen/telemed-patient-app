<script setup>
import { useChatStore } from '@/stores/chat.js'
import { avatarText } from '@core/utils/formatters.js'

const chatStore = useChatStore()
</script>

<template>
  <div class="d-flex align-center text-medium-emphasis pa-3">
    <VBtn
      variant="text"
      icon
      size="small"
      class="d-md-none me-3"
      @click="chatStore.chatListDrawer = !chatStore.chatListDrawer"
    >
      <VIcon
        size="24"
        icon="tabler-menu-2"
      />
    </VBtn>

    <div class="d-flex align-center">
      <VAvatar
        size="40"
        variant="tonal"
        color="primary"
      >
        <span>{{ avatarText(chatStore.activeChatTitle) }}</span>
      </VAvatar>

      <div class="flex-grow-1 ms-4 overflow-hidden">
        <h6 class="text-base font-weight-regular">
          {{ chatStore.activeChatTitle }}
        </h6>
      </div>
    </div>
  </div>
</template>
