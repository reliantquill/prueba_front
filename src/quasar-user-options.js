
import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import { Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: { notify: { /* look at QuasarConfOptions from the API card */ } },
  plugins: { Notify }
}
