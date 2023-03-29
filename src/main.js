/* eslint-disable import/order */
import '@/@iconify/icons-bundle.js'
import App from '@/App.vue'
import i18n from '@/plugins/i18n/index.js'
import layoutsPlugin from '@/plugins/layouts.js'
import vuetify from '@/plugins/vuetify/index.js'
import { loadFonts } from '@/plugins/webfontloader.js'
import router from '@/router/index.js'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

loadFonts()


// Create vue app
const app = createApp(App)


// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)

// Mount vue app
app.mount('#app')
