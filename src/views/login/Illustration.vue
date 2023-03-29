<script setup>
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

const imageVariant = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
</script>


<template>
  <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
    <div class="d-flex align-center justify-center w-100 h-100">
      <VImg
        max-width="441"
        :src="imageVariant"
        class="auth-illustration mt-16 mb-2"
      />
    </div>

    <VImg
      class="auth-footer-mask"
      :src="authThemeMask"
    />
  </div>
</template>
