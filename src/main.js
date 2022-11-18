import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(Quasar, quasarUserOptions).use(router).use(VueAxios, axios).use(createPinia()).mount('#app')
