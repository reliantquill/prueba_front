<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center" :class="`bg-${colores.principal}`" >
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from '@/composables/store/useStore.js'

export default defineComponent({
  name: 'ErrorNotFound',
  setup () {
    const store = useStore()
    const colores = store.getColores
    return { colores }
  }
})
</script>
