<script setup>
import MessageInput from '@/views/chats/MessageInput.vue'
import MessageList from '@/views/chats/MessageList.vue'
import MessageHeader from '@/views/chats/MessageHeader.vue'
import { useChatStore } from '@/stores/chat.js'

const chatStore = useChatStore()
</script>

<template>
  <VMain class="chat-content-container">
    <div
      v-if="chatStore.activeChat"
      class="d-flex flex-column h-100"
    >
      <MessageHeader />

      <VDivider />

      <!-- Chat log -->
      <MessageList />

      <!-- Message form -->
      <MessageInput />
    </div>

    <div
      v-else
      class="d-flex h-100 align-center justify-center flex-column"
    >
      <VAvatar
        size="109"
        class="elevation-3 mb-6 bg-surface"
      >
        <VIcon
          size="50"
          class="rounded-0 text-high-emphasis"
          icon="tabler-message"
        />
      </VAvatar>
    </div>
  </VMain>
</template>

<style lang="scss">
.chat-content-container {
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));

  // Adjust the padding so text field height stays 48px
  .chat-message-input {
    .v-field__append-inner {
      align-items: center;
      padding-block-start: 0;
    }
  }
}
</style>
