<script setup>
import AppointmentCard from '@/views/appointments/AppointmentCard.vue'
import AppointmentDrawer from '@/views/appointments/AppointmentDrawer.vue'
import { useAppointmentStore } from '@/stores/appointment.js'

const appointmentStore = useAppointmentStore()

const deleteAppointment = value => {
  // do something
}

watchEffect(() => {
  if(appointmentStore.showConfirm === false) {
    appointmentStore.current_appointment = {
      date: '',
      time: '',
      type: '',
      description: '',
    }
  }
})
</script>

<template>
  <div>
    <AppointmentDrawer />

    <AppointmentCard
      v-for="appointment in appointmentStore.appointments"
      :key="appointment.id"
      class="mb-4"
      :appointment="appointment"
    />

    <ConfirmDialog
      v-model:isDialogVisible="appointmentStore.showConfirm"
      confirmation-msg="Delete Appointment?"
      @confirm="deleteAppointment"
    />

    <SnackBarError :error="appointmentStore.error" />
  </div>
</template>

<route lang="yaml">
meta:
  title: Appointments
  layout: default
  requiresAuth: true
  icon: tabler-calendar
</route>
