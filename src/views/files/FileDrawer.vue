<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useFileStore } from '@/stores/file.js'
import { arrayLengthValidator, requiredValidator } from '@validators'
import { formatFileSize } from '@core/utils/formatters'

const fileStore = useFileStore()

const refVForm = ref()
const file = ref()
const description = ref()

watchEffect(() => {
  if (fileStore.drawer === false) {
    file.value = []
    description.value = ''
  }
})

const onSubmit = () => {
  refVForm.value?.validate().then( async ({ valid: isValid }) => {
    if (isValid) {
      // do something
    }
  })
}
</script>

<template>
  <div>
    <VBtn
      prepend-icon="tabler-upload"
      class="mb-4"
      @click="fileStore.drawer = true"
    >
      Upload
    </VBtn>

    <VNavigationDrawer
      v-model="fileStore.drawer"
      temporary
      :width="400"
      :location="$vuetify.display.smAndDown ? 'bottom' : 'right'"
      class="scrollable-content"
      style="height: 100vh"
    >
      <!-- 👉 Title -->
      <div class="d-flex align-center pa-6 pb-1">
        <h6 class="text-h6">
          Upload New File
        </h6>

        <VSpacer />

        <!-- 👉 Close btn -->
        <VBtn
          variant="tonal"
          color="default"
          icon
          size="32"
          class="rounded"
          @click="fileStore.drawer = false"
        >
          <VIcon
            size="18"
            icon="tabler-x"
          />
        </VBTn>
      </div>

      <PerfectScrollbar :options="{ wheelPropagation: false }">
        <VCard flat>
          <VCardText>
            <VForm
              ref="refVForm"
              @submit.prevent="onSubmit"
            >
              <VRow>
                <!-- 👉 Type -->
                <VCol cols="12">
                  <VFileInput
                    v-model="file"
                    label="Type"
                    :rules="[arrayLengthValidator]"
                    :hint="file.length > 0 ? formatFileSize(file[0].size) : 'No file selected'"
                    persistent-hint
                    :disabled="fileStore.loading"
                  />
                </VCol>

                <!-- 👉 Description -->
                <VCol cols="12">
                  <VTextarea
                    v-model="description"
                    label="Description"
                    :rules="[requiredValidator]"
                    :disabled="fileStore.loading"
                  />
                </VCol>

                <VCol cols="12">
                  <VProgressLinear
                    v-if="fileStore.upload_progress > 0 && fileStore.upload_progress < 100"
                    v-model="fileStore.upload_progress"
                    color="primary"
                    height="25"
                  >
                    <template #default="{ value }">
                      <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                  </VProgressLinear>
                </VCol>

                <!-- 👉 Submit and Cancel -->
                <VCol cols="12">
                  <VBtn
                    type="submit"
                    class="me-3"
                    :loading="fileStore.loading"
                  >
                    Submit
                  </VBtn>
                  <VBtn
                    type="reset"
                    variant="tonal"
                    color="secondary"
                    :disabled="fileStore.loading"
                    @click="fileStore.drawer = false"
                  >
                    Cancel
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </PerfectScrollbar>
    </VNavigationDrawer>
  </div>
</template>
