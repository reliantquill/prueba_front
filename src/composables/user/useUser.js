import { ref, watch } from 'vue'
import router from '@/router'
import { useStore } from '@/composables/store/useStore.js'
import { useRequest } from '@/composables/useRequest.js'
import { useModelo } from '@/composables/model/useModelo.js'
import { useFunciones } from '@/composables/useFunciones.js'
import { useNotificacion } from '@/composables/useNotificaciones.js'

export function useUserLogin (dialogoMsg) {
  const { fnMinusculas } = useFunciones()
  const myForm = ref(null)
  const form = ref({ email: '', password: '' })
  const { fnHttp, request } = useRequest()
  const { fnError } = useNotificacion()

  const fnValidar = () => {
    myForm.value.validate().then(success => {
      if (success) {
        transformTexto(form)
        fnHttp('POST', 'user_login', { login: (form.value) }, dialogoMsg)
      }
    })
  }

  const transformTexto = (pForm) => {
    pForm.value.email = fnMinusculas(pForm.value.email)
  }

  watch(request.value, (newValue, preValue) => {
    const store = useStore()
    if (request.value.status === 3) {
      if (request.value.data.data.user !== null) {
        console.log(request.value.data.data)
        const { user, token, menus } = request.value.data.data
        store.setUser(user)
        store.setToken(token)
        store.setMenus(menus)
        router.push({ path: 'menus', replace: true })
      } else {
        fnError('DATOS INCORRECTOS', 'top')
      }
    }
  })

  return { fnValidar, myForm, form }
}

// MODELO DE USER
// ----------------------------------------------------------------------------------------------------
export function useUser (dialogoMsg) {
  const { fnMayuscula, fnMinusculas } = useFunciones()
  const formId = ref({ id: 0 })
  const form = ref({ identificacion: '', nombres: '', apellidos: '', email: '', password: '', estado_id: 1 })

  const { fnValidar, fnMensajes, fnAll, fnId, fnCustomer, modelos, modelo, myForm, resultado } = useModelo('user', dialogoMsg, formId, form)

  const fnIdentificacion = (identificacion) => {
    fnCustomer('GET', 'user_identificacion/' + identificacion, null)
  }

  const fnObjecto = (data, pFormId, pForm) => {
    pFormId.value.id = 0
    pForm.value.estado_id = 1
    if (data !== null) {
      pFormId.value.id = data.id
      pForm.value.identificacion = data.identificacion
      pForm.value.nombres = data.nombres
      pForm.value.apellidos = data.apellidos
      pForm.value.email = data.email
      pForm.value.estado_id = data.estado_id
      transformTexto(pForm)
    }
  }

  const transformTexto = (pForm) => {
    if (pForm !== undefined) {
      pForm.value.nombres = fnMayuscula(pForm.value.nombres)
      pForm.value.apellidos = fnMayuscula(pForm.value.apellidos)
      pForm.value.email = fnMinusculas(pForm.value.email)
    }
  }

  const fnInicializar = () => {
    formId.value.id = 0
    form.value.identificacion = ''
    form.value.nombres = ''
    form.value.apellidos = ''
    form.value.email = ''
    form.value.estado_id = 1
  }

  const fnAcciones = (accion, dialogoMsg, emit) => {
    transformTexto(form)
    fnMensajes(accion, dialogoMsg)
    watch(resultado.value, (newValue, preValue) => {
      if (resultado.value.data !== null) {
        fnObjecto(resultado.value.data.registro, formId, form)
        modelos.value.data = resultado.value.data.registros
        emit('fnRefreshForm', resultado.value.data.registros)
      }
    })
  }

  return { fnValidar, fnAcciones, fnAll, fnId, fnIdentificacion, fnObjecto, fnInicializar, modelos, modelo, myForm, formId, form }
}
// ----------------------------------------------------------------------------------------------------
