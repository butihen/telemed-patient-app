<script setup>
import { useChatStore } from '@/stores/chat.js'
import { avatarText } from '@core/utils/formatters.js'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})

const chatStore = useChatStore()

const user = JSON.parse(localStorage.getItem('user'))

const isToday = date => {
  const today = new Date()
  const messageDate = new Date(date)

  return messageDate.toDateString() === today.toDateString()
}

const isReadByOtherUsers = computed(() => {
  const readByOtherUsers = props.message.read.filter(uid => uid !== user.uid)

  return readByOtherUsers.length > 0
})
</script>

<template>
  <div
    class="chat-avatar"
    :class="message.sender_uid == user.uid ? 'ms-4' : 'me-4'"
  >
    <VAvatar
      size="38"
      color="primary"
    >
      {{ avatarText(message.sender_uid === user.uid ? user.displayName : chatStore.activeChat.users.find(u => u.uid == message.sender_uid).name ) }}
    </VAvatar>
  </div>

  <div
    class="chat-body d-inline-flex flex-column"
    :class="message.sender_uid === user.uid ? 'align-end' : 'align-start'"
  >
    <p
      class="chat-content text-sm py-3 px-4 elevation-1 mb-0"
      :class="[
        message.sender_uid != user.uid ? 'bg-surface chat-left' : 'bg-primary text-white chat-right',
      ]"
    >
      {{ message.message }}
    </p>

    <div v-if="message.isSending">
      <VProgressCircular
        indeterminate
        size="16"
        color="primary"
        class="me-1"
      />
    </div>
                
    <div v-else>
      <span
        v-if="!isToday(message.timestamp)"
        class="text-xs me-1 text-disabled"
      >{{ new Date(message.timestamp).toLocaleDateString() }}</span>
      <span class="text-xs me-1 text-disabled">{{ new Date(message.timestamp).toLocaleTimeString() }}</span>
      <VIcon
        v-if="message.sender_uid == user.uid"
        color="success"
        size="16"
        :icon="isReadByOtherUsers ? 'tabler-checks' : 'tabler-check'"
      />
    </div>
  </div>
</template>

<style lang="scss">
.chat-content {
  border-end-end-radius: 6px;
  border-end-start-radius: 6px;

  &.chat-left {
    border-start-end-radius: 6px;
  }

  &.chat-right {
    border-start-start-radius: 6px;
  }
}
</style>
