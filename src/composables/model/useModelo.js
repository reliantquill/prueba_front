import { ref, watch } from 'vue'
import { useRequest } from '@/composables/useRequest.js'
import { useNotificacion } from '@/composables/useNotificaciones.js'

export function useModelo (resourceRouter, dialogoMsg, formId, form, items) {
  const myForm = ref(null)
  const modelos = ref({ data: [], loading: false })
  const modelo = ref({ data: null, loading: false })
  const objectoForm = ref({ data: null, loading: false, tipo: '' })
  const resultado = ref({ data: null })
  const { fnHttpToken, fnInicializarRequest, fnHttpTokenObj, fnHttpTokenOps, request } = useRequest()
  const { fnError, fnSuccess } = useNotificacion()

  const fnAll = () => {
    request.value.tipo = 'MODELOS'
    fnHttpToken('GET', resourceRouter, null, modelos)
  }

  // ARREGLAR
  const fnId = (id) => {
    request.value.tipo = 'MODELO'
    if (id !== '') {
      modelo.value.data = null
      fnHttpToken('GET', resourceRouter + '/' + id, null, modelo)
    }
  }

  const fnCustomer = (metodo, resourceRouterm, data) => {
    request.value.tipo = 'MODELO'
    modelo.value.data = null
    fnHttpToken(metodo, resourceRouterm, data, modelo)
  }

  const fnCustomers = (metodo, resourceRouterm, data) => {
    request.value.tipo = 'MODELOS'
    modelos.value.data = []
    fnHttpToken(metodo, resourceRouterm, data, modelos)
  }

  // ARREGLAR
  const fnForms = (metodo, resourceRouterm, data) => {
    request.value.tipo = 'INICIO MODELOS'
    modelos.value.data = []
    fnHttpToken(metodo, resourceRouterm, data, modelos)
  }

  const fnCustomerObj = (metodo, resourceRouterm, data, obj, loading) => {
    fnHttpTokenObj(metodo, resourceRouterm, data, obj, loading)
  }

  const fnCustomerOps = (metodo, resourceRouterm, data, items1, items2, loading) => {
    fnHttpTokenOps(metodo, resourceRouterm, data, items1, items2, loading)
  }

  // ARREGLAR
  const fnCustomerObjectoForm = (metodo, resourceRouterm, data) => {
    objectoForm.value.data = null
    request.value.tipo = 'OBJECTO FORM'
    fnHttpToken(metodo, resourceRouterm, data, modelo)
  }

  const fnValidar = async () => {
    myForm.value.validate().then(success => {
      if (success) {
        dialogoMsg.value.preguntar = true
      } else {
        fnError('DEBE DILIGENCIAR LOS DATOS OBLIGATORIOS', 'top')
      }
    })
  }

  const fnMensajes = (accion, dialogoMsg) => {
    if (accion === 'PREGUNTAR ACEPTAR') {
      dialogoMsg.value.preguntar = false
      if (formId.value.id === 0) {
        guardar(dialogoMsg)
      } else {
        modificar(dialogoMsg)
      }
    } else if (accion === 'PREGUNTAR CANCELAR') {
      dialogoMsg.value.preguntar = false
    } else if (accion === 'ELIMINAR ACEPTAR') {
      anular(dialogoMsg)
      dialogoMsg.value.anular = false
    } else if (accion === 'ELIMINAR CANCELAR') {
      dialogoMsg.value.anular = false
    } else if (accion === 'VALIDACION ACEPTAR') {
      dialogoMsg.value.validacion = false
    }
  }

  const guardar = (dialogoMsg) => {
    resultado.value.data = null
    request.value.tipo = 'GUARDAR'
    fnHttpToken('POST', resourceRouter, { form: form.value }, dialogoMsg)
  }

  const modificar = (dialogoMsg) => {
    resultado.value.data = null
    request.value.tipo = 'GUARDAR'
    fnHttpToken('PUT', resourceRouter + '/' + formId.value.id, { form: form.value }, dialogoMsg)
  }

  const anular = (dialogoMsg) => {
    resultado.value.data = null
    request.value.tipo = 'ANULAR'
    fnHttpToken('DELETE', resourceRouter + '/' + formId.value.id, null, dialogoMsg)
  }

  watch(request.value, (newValue, preValue) => {
    if (request.value.status === 3 && request.value.data !== null) {
      if (request.value.tipo === 'MODELOS') {
        modelos.value.data = request.value.data
      }

      if (request.value.tipo === 'MODELO') {
        modelos.value.data = request.value.data
      }

      if (request.value.tipo === 'OBJECTO FORM') {
        objectoForm.value.data = request.value.data
      }

      if (request.value.tipo === 'INICIO MODELOS') {
        items.value.data = request.value.data.items
        modelos.value.data = request.value.data.data
      }

      if (request.value.tipo === 'GUARDAR') {
        if (request.value.data.status === 1) {
          resultado.value.data = request.value.data.data
          fnSuccess('DATOS GUARDADOS', 'top')
        } else {
          fnError('ERROR AL GUARDAR', 'top')
        }
      }

      if (request.value.tipo === 'ANULAR') {
        if (request.value.data.status === 1) {
          resultado.value.data = request.value.data.data
          fnSuccess('DATOS ANULADOS', 'top')
        } else {
          fnError('ERROR NO SE PUDO ANUALAR', 'top')
        }
      }
      fnInicializarRequest()
    }
  })

  return { fnAll, fnId, fnCustomer, fnCustomers, fnForms, fnCustomerObj, fnCustomerObjectoForm, fnCustomerOps, fnValidar, fnMensajes, myForm, modelos, modelo, objectoForm, resultado }
}
