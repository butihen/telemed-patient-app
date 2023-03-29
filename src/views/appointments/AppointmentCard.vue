<script setup>
import { useAppointmentStore } from '@/stores/appointment.js'

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
})

const appointmentStore = useAppointmentStore()

const isSelected = computed(() => {
  return appointmentStore.selected_appointment && appointmentStore.selected_appointment.uid === props.appointment.uid
})

const openEdit = () => {
  appointmentStore.drawer = true
  appointmentStore.current_appointment = Object.assign({}, props.appointment)
}

const showDelete = () => {
  appointmentStore.showConfirm = true
  appointmentStore.current_appointment = Object.assign({}, props.appointment)
}
</script>

<template>
  <VCard :loading="isSelected && appointmentStore.loading">
    <div class="d-flex flex-column-reverse flex-md-row">
      <div>
        <VCardItem>
          <VCardTitle>
            <VIcon icon="tabler-calendar" />
            {{ new Date(props.appointment.date).toDateString() }}
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <div class="my-1">
            <VIcon icon="tabler-clock" />
            {{ new Date(props.appointment.date + ' ' +props.appointment.time).toLocaleTimeString() }}
          </div>
          <div class="my-1">
            <VIcon icon="tabler-phone" />
            {{ props.appointment.type }}
          </div>
        </VCardText>

        <VCardText>
          {{ props.appointment.description }}
        </VCardText>

        <VCardActions>
          <VBtn @click="openEdit">
            RESCHEDULE
          </VBtn>
          <VBtn
            class="text-error"
            @click="showDelete"
          >
            DELETE
          </VBtn>
        </VCardActions>
      </div>
    </div>
  </VCard>
</template>
