<script setup>
import ChatContent from '@/views/chats/ChatContent.vue'
import ChatDrawer from '@/views/chats/ChatDrawer.vue'
</script>

<template>
  <VLayout class="bg-surface">
    <ChatDrawer />
    <ChatContent />
  </VLayout>
</template>

<route lang="yaml">
meta:
  title: Chats
  layout: default
  requiresAuth: true
  icon: tabler-messages
  layoutWrapperClasses: layout-content-height-fixed
</route>
