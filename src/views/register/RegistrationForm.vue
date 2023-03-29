<script setup>
import { VForm } from "vuetify/components"
import { requiredValidator } from "@validators"
import { useUserStore } from "@/stores/user.js"

const userStore = useUserStore()

const refVForm = ref()

const data = ref({})

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      // do something
    }
  })
}
</script>

<template>
  <VForm
    ref="refVForm"
    @submit.prevent="onSubmit"
  >
    <VRow>
      <VCol
        v-for="(item, index) in userStore.userLabels"
        :key="index"
        cols="12"
      >
        <VTextField
          v-if="item.type == 'text' || item.type == 'date'"
          v-model="data[item.value]"
          :type="item.type"
          :label="item.text"
          :rules="item.rules"
          :disabled="userStore.loading"
        />

        <VSelect
          v-else-if="item.type == 'select'"
          v-model="data[item.value]"
          :label="item.text"
          :items="item.items"
          :rules="item.rules"
          :disabled="userStore.loading"
        />
      </VCol>

      <!-- password -->
      <VCol cols="12">
        <VTextField
          v-model="data.password"
          :rules="[requiredValidator]"
          label="Password"
          type="password"
          :disabled="userStore.loading"
        />

        <VBtn
          class="mt-4"
          block
          type="submit"
          :loading="userStore.loading"
        >
          Sign up
        </VBtn>
      </VCol>

      <!-- create account -->
      <VCol
        cols="12"
        class="text-center text-base"
      >
        <span>Already have an account?</span>
        <RouterLink
          class="text-primary ms-2"
          :to="{ name: 'login' }"
        >
          Sign in instead
        </RouterLink>
      </VCol>
    </VRow>
  </VForm>

  <SnackBarError :error="userStore.error" />
</template>
