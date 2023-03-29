<script setup>
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
</script>

<template>
  <VNodeRenderer
    :nodes="themeConfig.app.logo"
    class="mb-6"
  />

  <h5 class="text-h5 font-weight-semibold mb-1">
    Welcome to {{ themeConfig.app.title }}! 👋🏻
  </h5>
  <p class="mb-0">
    Please sign-in to your account and start the adventure
  </p>
</template>
