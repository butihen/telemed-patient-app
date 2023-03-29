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
    Registration Form 🚀
  </h5>
</template>
