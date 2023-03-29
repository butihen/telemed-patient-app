<script setup>
import MessageItem from '@/views/chats/MessageItem.vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useChatStore } from '@/stores/chat.js'

const chatStore = useChatStore()

const user = JSON.parse(localStorage.getItem('user'))

const chatLogPS = ref()

const scrollToBottomInChatLog = () => {
  if(chatLogPS.value) {
    chatLogPS.value.$el.scrollTop = chatLogPS.value.$el.scrollHeight
  }
}

watchEffect(() => {
  if (chatStore.messages.length) {
    console.log('scrollToBottomInChatLog')
    nextTick(() => {
      scrollToBottomInChatLog()
    })
  }
})
</script>

<template>
  <PerfectScrollbar
    ref="chatLogPS"
    tag="ul"
    :options="{ wheelPropagation: false }"
    class="flex-grow-1"
  >
    <div
      class="chat-log pa-5"
    >
      <div
        v-for="(msg, index) in chatStore.messages"
        :key="msg.sender_uid + String(index)"
        class="chat-group d-flex align-start"
        :class="[{
          'flex-row-reverse': msg.sender_uid === user.uid,
          'mb-5': chatStore.messages.length - 1 !== index,
        }]"
      >
        <MessageItem :message="msg" />
      </div>
    </div>
  </PerfectScrollbar>
</template>
