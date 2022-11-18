<template>
<div style="width:100%">
{{ tiempo }}
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'horaComponent',
  setup (props, context) {
    const tiempo = ref('00:00:00')
    const h = ref('')
    const m = ref('')
    const s = ref('')
    const hora = ref(0)
    const minuto = ref(0)
    const segundos = ref(0)
    const total = ref(0)

    const startInterval = () => {
      setInterval(() => {
        total.value = total.value + 1
        segundos.value = segundos.value + 1
        if (segundos.value >= 60) {
          segundos.value = 0
          minuto.value = minuto.value + 1
          if (minuto.value >= 60) {
            minuto.value = 0
            hora.value = hora.value + 1
          }
        }

        if (segundos.value <= 9) {
          s.value = '0' + segundos.value
        } else {
          s.value = segundos.value
        }

        if (minuto.value <= 9) {
          m.value = '0' + minuto.value
        } else {
          m.value = minuto.value
        }

        if (hora.value <= 9) {
          h.value = '0' + hora.value
        } else {
          h.value = hora.value
        }

        tiempo.value = h.value + ':' + m.value + ':' + s.value
        context.emit('refreshTiempo', tiempo)
      }, 1000)
    }
    startInterval()
    return { tiempo }
  }
}
</script>
