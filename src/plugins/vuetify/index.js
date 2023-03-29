import { createVuetify } from 'vuetify'
import defaults from './defaults.js'
import { icons } from './icons.js'
import theme from './theme.js'

// Styles
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

export default createVuetify({
  defaults,
  icons,
  theme,
})
