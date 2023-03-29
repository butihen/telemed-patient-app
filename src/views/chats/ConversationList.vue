<script setup>
import ConversationListItem from '@/views/chats/ConversationListItem.vue'
import { useChatStore } from '@/stores/chat.js'

const chatStore = useChatStore()
</script>

<template>
  <VList lines="one">
    <ConversationListItem
      v-for="chat in chatStore.computedChats"
      :key="chat.uid"
      :chat="chat"
    />
  </VList>
</template>
