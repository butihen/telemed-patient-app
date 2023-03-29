<script setup>
const refVForm = ref()
const message = ref('')

const sendMessage = () => {
  // do something
}
</script>

<template>
  <VForm
    ref="refVForm"
    class="chat-log-message-form"
    @submit.prevent="sendMessage"
  >
    <div class="d-flex">
      <VTextField
        v-model="message"
        variant="solo"
        class="chat-message-input"
        placeholder="Type your message..."
        density="compact"
        autofocus
      />

      <VBtn type="submit">
        Send
      </VBtn>
    </div>
  </VForm>
</template>
