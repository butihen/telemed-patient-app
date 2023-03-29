<script setup>
import { useChatStore } from '@/stores/chat.js'
import { avatarText } from '@core/utils/formatters.js'

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
})

const chatStore = useChatStore()

const user = JSON.parse(localStorage.getItem('user'))

const getFormattedDate = date => {
  const today = new Date()
  const yesterday = new Date(today)

  yesterday.setDate(yesterday.getDate() - 1)

  const messageDate = new Date(date)

  if (messageDate.toDateString() === today.toDateString()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (messageDate.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else if (messageDate.getFullYear() === today.getFullYear()) {
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' })
  } else {
    return messageDate.getFullYear()
  }
}

const unreadMessagesCount = computed(() => props.chat.messages.filter(message => message.read.includes(user.uid)).length)

const lastMessage = computed(() => {
  let messages = Object.assign([], props.chat.messages)

  if(messages.length === 0) return null

  // sort messages by timestamp
  messages.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp)
  })

  return messages[messages.length - 1]
})

const isLastMessageRead = computed(() => !!lastMessage.value && lastMessage.value.read.includes(user.uid))

const isChatActive = computed(() => chatStore.currentChatId === props.chat.uid)
</script>

<template>
  <VListItem
    class="chat-contact pa-3 mx-3"
    :class="{ 'chat-contact-active': isChatActive }"
    :active="isChatActive"
    @click="chatStore.currentChatId = props.chat.uid"
  >
    <template #title>
      <span :class="isChatActive ? 'font-weight-bold text-white' : ''">
        {{ chatStore.getTitle(props.chat) }}
      </span>
    </template>    
          
    <template
      v-if="lastMessage"
      #subtitle
    >
      <span :class="isChatActive ? 'text-white' : (isLastMessageRead ? 'text-secondary' : 'text-primary')">
        {{ lastMessage.message }}
      </span>
    </template>  
        
    <template #prepend>
      <VAvatar color="primary">
        {{ avatarText(chatStore.getTitle(props.chat)) }}
      </VAvatar>
    </template>

    <template #append>
      <div class="d-flex flex-column">
        <span
          v-if="!isChatActive && unreadMessagesCount > 0"
          class="text-right"
        >
          <VChip
            color="error"
            size="x-small"
          >
            {{ unreadMessagesCount }}
          </VChip>
        </span>
              
        <small
          v-if="lastMessage"
          :class="isChatActive ? 'text-white' : 'text-secondary'"
        >
          {{ getFormattedDate(lastMessage.timestamp) }}
        </small>
      </div>
    </template>
  </VListItem>
</template>

<style lang="scss">
@use "@styles/variables/_vuetify.scss";
@use "@core/scss/base/mixins";
@use "vuetify/lib/styles/tools/states" as vuetifyStates;

.chat-contact {
  border-radius: vuetify.$card-border-radius;
  padding-block: 10px;
  padding-inline: var(--chat-content-spacing-x);

  @include mixins.before-pseudo;
  @include vuetifyStates.states($active: false);

  &.chat-contact-active {
    .v-avatar {
      background: #fff;
    }
  }

  .v-badge--bordered .v-badge__badge::after {
    color: #fff;
  }

  &.chat-contact-active {
    background: linear-gradient(270deg, rgb(var(--v-theme-primary)) 0%, #fff 300%);
    color: #fff;

    --v-theme-on-background: #fff;
  }
}
</style>
