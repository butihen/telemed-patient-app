import { defineStore } from 'pinia'
import { emailValidator, requiredValidator } from '@validators'
import {register } from '@/firebase/firebase-register.js'
import {addPatient, getPatientByUserId } from '@/firebase/firestore-patient.js'
import router from '@/router/index.js'
import   loginUsingFirebase  from '@/firebase/firebase-login.js'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userLabels: [
      {
        text: 'First Name',
        value: 'firstName',
        type: 'text',
        rules: [requiredValidator],
      },
      {
        text: 'Last Name',
        value: 'lastName',
        type: 'text',
        rules: [requiredValidator],
      },
      {
        text: 'Sex',
        value: 'sex',
        type: 'select',
        rules: [requiredValidator],
        items: ['Male', 'Female'],
      },
      {
        text: 'Birthdate',
        value: 'birthDate',
        type: 'date',
        rules: [requiredValidator],
      },
      {
        text: 'Contact',
        value: 'contact',
        type: 'text',
        rules: [requiredValidator],
      },
      {
        text: 'Email Address',
        value: 'email',
        type: 'text',
        rules: [requiredValidator, emailValidator],
      },
    ],

    patient: {},
    loading: false,
    error: null,
  }),

  actions: {
    startLoading() {
      this.loading = true
      this.error = null
    },
    async registeruser(data) {
      this.startLoading()


      try {
        const user = await register(data)
        await addPatient({
          user_uid: user.uid,
          firstName: data.firstName,
          lastName: data.lastName,
          sex: data.sex,
          birthDate: data.birthDate,
          contact: data.contact,
          email: data.email,
        })
        router.push('/')
      } catch (err) {
        this.fetchPatientData()
        this.error = err
      } finally {
        this.loading = false
      }

      
    },

    async fetchPatientData() {
      const user = JSON.parse(localStorage.getItem('user'))

      if(user) {
        this.patient = await getPatientByUserId(user.uid)
      }
    },
    async login(data) {
      this.startLoading()

      try {
        await loginUsingFirebase(data)
        this.fetchPatientData()
        router.push("/")
      
      } catch (error) {
        this.error = err

      }
      finally {
        this.loading = false
      }
    }


  }
})
