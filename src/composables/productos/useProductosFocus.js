import { ref } from 'vue'

export function useProductoFocus () {
  const refDescripcion = ref(null)
  const refEstado = ref(null)

  const fnEnterProductos = (key) => {
    switch (key) {
      case 'descripcion':
        refEstado.value.focus()
        break
    }
  }
  return { fnEnterProductos, refDescripcion, refEstado }
}
