import { defineStore } from 'pinia'
import { requiredValidator } from '@validators'

export const useAppointmentStore = defineStore('appointmentStore', {
  state: () => ({
    appointmentLabels: [
      {
        text: 'Type of Consultation',
        value: 'type',
        type: 'select',
        rules: [requiredValidator],
        items: ['Face to Face', 'Teleconsultation'],
        noEdit: true,
      },
      {
        text: 'Date',
        value: 'date',
        type: 'date',
        rules: [requiredValidator],
        noEdit: false,
      },
      {
        text: 'Time',
        value: 'time',
        type: 'time',
        rules: [requiredValidator],
        noEdit: true,
      },
      {
        text: 'Reason for Consultation',
        value: 'description',
        type: 'textarea',
        rules: [requiredValidator],
        noEdit: true,
      },
    ],

    current_appointment: {},
    drawer: false,
    loading: false,
    error: null,
    appointments: [],
    unsubscribe: null,
    showConfirm: false,
  }),

  actions: {
    startLoading() {
      this.loading = true
      this.error = null
    },
  },
})
