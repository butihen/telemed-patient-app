<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useAppointmentStore } from '@/stores/appointment.js'

const appointmentStore = useAppointmentStore()

const refVForm = ref()

const isEditing = computed(() => {
  return appointmentStore.current_appointment.uid ? true : false
})

watchEffect(() => {
  if(appointmentStore.drawer.value === false) {
    appointmentStore.current_appointment = {
      date: '',
      time: '',
      type: '',
      description: '',
    }
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
      prepend-icon="tabler-plus"
      class="mb-4"
      @click="appointmentStore.drawer = true"
    >
      Request New Appointment
    </VBtn>

    <VNavigationDrawer
      v-model="appointmentStore.drawer"
      temporary
      :width="400"
      :location="$vuetify.display.smAndDown ? 'bottom' : 'right'"
      class="scrollable-content"
      style="height: 100vh"
    >
      <!-- 👉 Title -->
      <div class="d-flex align-center pa-6 pb-1">
        <h6 class="text-h6">
          {{ isEditing ? 'Edit' : 'New' }} Appointment
        </h6>

        <VSpacer />

        <!-- 👉 Close btn -->
        <VBtn
          variant="tonal"
          color="default"
          icon
          size="32"
          class="rounded"
          @click="appointmentStore.drawer = false"
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
                <VCol
                  v-for="(item, index) in appointmentStore.appointmentLabels"
                  :key="index"
                  cols="12"
                >
                  <VTextField
                    v-if="item.type == 'text' || item.type == 'date' || item.type == 'time'"
                    v-model="appointmentStore.current_appointment[item.value]"
                    :type="item.type"
                    :label="item.text"
                    :rules="item.rules"
                    :disabled="appointmentStore.loading || (item.noEdit && isEditing)"
                  />

                  <VSelect
                    v-else-if="item.type == 'select'"
                    v-model="appointmentStore.current_appointment[item.value]"
                    :label="item.text"
                    :items="item.items"
                    :rules="item.rules"
                    :disabled="appointmentStore.loading || (item.noEdit && isEditing)"
                  />

                  <VTextarea
                    v-else-if="item.type == 'textarea'"
                    v-model="appointmentStore.current_appointment[item.value]"
                    :label="item.text"
                    :rules="item.rules"
                    :disabled="appointmentStore.loading || (item.noEdit && isEditing)"
                  />
                </VCol>

                <!-- 👉 Submit and Cancel -->
                <VCol cols="12">
                  <VBtn
                    type="submit"
                    class="me-3"
                    :loading="appointmentStore.loading"
                  >
                    Submit
                  </VBtn>
                  <VBtn
                    type="reset"
                    variant="tonal"
                    color="secondary"
                    :disabled="appointmentStore.loading"
                    @click="appointmentStore.drawer = false"
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
