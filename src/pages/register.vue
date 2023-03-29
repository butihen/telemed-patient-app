<script setup>
import Illustration from '@/views/register/Illustration.vue'
import RegistrationForm from '@/views/register/RegistrationForm.vue'
import Welcome from '@/views/register/Welcome.vue'
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <Illustration />
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <Welcome />
        </VCardText>
        <VCardText>
          <RegistrationForm />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  title: Register
  layout: blank
  requiresAuth: false
</route>
