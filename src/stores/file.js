import { defineStore } from 'pinia'

export const useFileStore = defineStore('fileStore', {
  state: () => ({
    files: [],
    loading: false,
    error: null,
    viewer: false,
    selected_file: null,
    drawer: false,
    upload_progress: 0,
  }),

  actions: {
    startLoading() {
      this.loading = true
      this.error = null
    },
  },
})
