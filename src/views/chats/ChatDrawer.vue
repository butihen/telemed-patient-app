<script setup>
import ConversationList from '@/views/chats/ConversationList.vue'
import ChatSearch from '@/views/chats/ChatSearch.vue'
import { useChatStore } from '@/stores/chat.js'

const chatStore = useChatStore()
</script>

<template>
  <VNavigationDrawer
    v-model="chatStore.chatListDrawer"
    absolute
    touchless
    width="370"
    :temporary="$vuetify.display.smAndDown"
    :location="$vuetify.display.xs ? 'bottom' : 'start'"
    class="chat-list-sidebar scrollable-content"
    :permanent="$vuetify.display.mdAndUp"
  >
    <ChatSearch />

    <VDivider />

    <ConversationList />
  </VNavigationDrawer>
</template>
