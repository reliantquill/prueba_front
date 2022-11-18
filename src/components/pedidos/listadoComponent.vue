<template>
<div class="row q-pa-xs">
  <div class="col-12 col-md-6">
    FECHA
  </div>
  <div class="col-12 col-md-6">
    CLIENTE
  </div>
</div>
<div class="row q-pa-xs">
  <div class="col-12 col-md-6">
    {{ objDialogo.data.fecha }}
  </div>
  <div class="col-12 col-md-6">
    {{ objDialogo.data.cliente.identificacion }}  {{ objDialogo.data.cliente.descripcion }}
  </div>
</div>
<div class="q-pa-md"></div>
<div v-for="(venta, index) in objDialogo.data.ventas" :key="index">
  <div class="row" >
    <div class="col-12 col-md-1">
      <q-avatar size="24px" class="text-white" :color="colores.principal">{{ (index + 1) }}</q-avatar>
    </div>
    <div class="col-12 col-md-11">
      {{ venta.inventario.producto.descripcion }}
    </div>
  </div>
  <q-separator></q-separator>
  <div class="q-pa-xs"></div>
</div>
</template>

<script>
import { defineComponent, watch, ref } from 'vue'
import { useStore } from '@/composables/store/useStore.js'
import { useDialogo } from '@/composables/useDialogos.js'

export default defineComponent({
  name: 'formComponent',
  components: {

  },
  props: ['objDialogo'],
  setup (props, context) {
    const store = useStore()
    const { dialogoMsg } = useDialogo()
    const colores = store.getColores
    const rules = store.getRules
    const token = ref(props.objDialogo.token)

    watch(token, (newValue, preValue) => {

    }, { immediate: true, deep: false })

    return { colores, rules, dialogoMsg }
  }
})
</script>
