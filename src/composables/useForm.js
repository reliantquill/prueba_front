import { watch } from 'vue'
import { useRequest } from '@/composables/useRequest.js'

export function useForm () {
  const { fnHttpToken, request } = useRequest()

  const fnProductos = (items) => {
    items.value.loading = true
    fnHttpToken('GET', 'form_productos', null, items)
    watch(request.value, (newValue, preValue) => {
      items.value.loading = false
      if (request.value.status === 3) {
        items.value.data = request.value.data
      }
    })
  }

  return { fnProductos }
}
