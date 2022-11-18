import { ref } from 'vue'

export function useDialogo () {
  const dialogoMsg = ref({ loading: false, preguntar: false, anular: false, data: null, validate: null })

  return { dialogoMsg }
}

export function useDialogoInicializar (dialogoMsg) {
  dialogoMsg.value.loading = false
  dialogoMsg.value.preguntar = false
  dialogoMsg.value.anular = false
  dialogoMsg.value.data = null
  dialogoMsg.value.validate = null
}
