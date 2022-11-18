import { ref, watch } from 'vue'
import { useModelo } from '@/composables/model/useModelo.js'
import { useFunciones } from '@/composables/useFunciones.js'

// ------------------------------------ CRUD ----------------------------------------
// ----------------------------------------------------------------------------------

export function useProducto (dialogoMsg) {
  const { fnMayuscula } = useFunciones()
  const formId = ref({ id: 0 })
  const form = ref({ descripcion: '', estado_id: 1 })

  const { fnValidar, fnMensajes, fnAll, fnId, modelos, modelo, myForm, resultado } = useModelo('productos', dialogoMsg, formId, form)

  const fnObjecto = (data, pFormId, pForm) => {
    pFormId.value.id = 0
    pForm.value.estado_id = 1
    if (data !== null) {
      pFormId.value.id = data.id
      pForm.value.descripcion = data.descripcion
      pForm.value.estado_id = data.estado_id
      transformTexto(pForm)
    }
  }

  const transformTexto = (pForm) => {
    if (pForm !== undefined) {
      pForm.value.descripcion = fnMayuscula(pForm.value.descripcion)
    }
  }

  const fnAcciones = (accion, dialogoMsg, emit) => {
    transformTexto(form)
    fnMensajes(accion, dialogoMsg, emit)
    watch(resultado.value, (newValue, preValue) => {
      if (resultado.value.data !== null) {
        fnObjecto(resultado.value.data.registro, formId, form)
        modelos.value.data = resultado.value.data.registros
        emit('fnRefreshForm', resultado.value.data.registros)
      }
    })
  }

  const fnInicializar = () => {
    formId.value.id = 0
    form.value.descripcion = ''
    form.value.estado_id = 1
  }

  return { fnValidar, fnAcciones, fnMensajes, fnAll, fnId, fnObjecto, fnInicializar, modelos, modelo, myForm, formId, form }
}
// ----------------------------------------------------------------------------------------------------
