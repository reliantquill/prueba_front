<template>
  <q-layout view="lHh Lpr fff">
    <loginPage></loginPage>
  </q-layout>
  </template>
<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import { useStore } from '@/composables/store/useStore.js'

export default defineComponent({
  name: 'LoginView',
  components: {
    loginPage: defineAsyncComponent(() => import('@/pages/LoginPage.vue'))
  },
  setup (props, context) {
    // VARIABLES GLOBALES
    const colores = { principal: 'indigo-10', secundario: 'indigo-10', tercero: 'grey-6', cuarto: '#FFFFFF', fondo: 'grey-3', gradiente1: '#0A1E78', gradiente2: '#0A1E78', white: 'white', black: 'black', red: 'red', pink: 'pink', purple: 'purple', deepPurple: 'deep-purple', indigo: 'indigo', blue: 'blue', lightBlue: 'light-blue', cyan: 'cyan', teal: 'teal', green: 'green', lightGreen: 'light-green', lime: 'lime', yellow: 'yellow', amber: 'amber', orange: 'orange', deepOrange: 'deep-orange', brown: 'brown', grey: 'grey', blueGrey: 'blue-grey' }
    const rules = { requerido: v => !!v || 'Requerido', email: v => (v && /.+@.+\..+/.test(v)) || 'E-mail invalido', len7: v => (v === null || v.length === 0 || v.length === 7) || 'Debe ser igual a 7 digitos', len10: v => (v === null || v.length === 0 || v.length === 10) || 'Debe ser igual a 10 digitos', miles: v => (!isNaN(Number(v.toString().split(',').join('')))) || 'Numero invalido', numerico: v => (v.length === 0 || (!isNaN(parseFloat(v)) && v >= 0)) || 'Numero invalido', cero: v => (v && v !== 0 && v !== '0') || 'Requerido', iva: v => (v >= 1 && v <= 100) || 'Debe ser entre 1 a 100', array: v => (v.length > 0) || 'Requerido' }
    const store = useStore()
    store.setColores(colores)
    store.setRules(rules)
    return { colores }
  }
})
</script>
