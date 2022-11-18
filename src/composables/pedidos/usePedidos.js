import { ref } from 'vue'
import { useModelo } from '@/composables/model/useModelo.js'

export function usePedido (dialogoMsg) {
  const formId = ref({ id: 0 })
  const form = ref({ descripcion: '', estado_id: 1 })

  const { fnValidar, fnMensajes, fnAll, fnCustomers, modelos, modelo, myForm } = useModelo('pedidos', dialogoMsg, formId, form)

  const fnPorFecha = (fecha) => {
    fnCustomers('GET', 'pedidos_fecha/' + fecha, null)
  }

  return { fnValidar, fnMensajes, fnAll, fnPorFecha, modelos, modelo, myForm, formId, form }
}
// ----------------------------------------------------------------------------------------------------
