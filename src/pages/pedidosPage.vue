<template>
<div class="q-pa-md">
  <q-card>
    <q-toolbar class="text-white" :class="`bg-${colores.principal}`">
        <q-icon size="25px" name="mdi-cards-outline"></q-icon>
        <q-toolbar-title>PEDIDOS</q-toolbar-title>
        <q-btn @click="fnAll" :color="colores.principal" icon="mdi-refresh" />
      </q-toolbar>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input readonly v-model="fecha">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="fecha" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-1"></div>
          <div class="col-12 col-md-5 self-center">
            <q-btn @click="fnBuscar" :color="colores.principal" icon="mdi-magnify" />
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-pa-sm">
            <tableComponent :modelos="modelos" @edit="fnEditar"></tableComponent>
          </div>
        </div>
      </q-card-section>
  </q-card>
  <dialogoComponent :objDialogo="objDialogo" @close="fnCerrar"></dialogoComponent>
</div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { useStore } from '@/composables/store/useStore.js'
import { useDialogo } from '@/composables/useDialogos.js'
import { usePedido } from '@/composables/pedidos/usePedidos.js'
import { useFunciones } from '@/composables/useFunciones.js'

export default defineComponent({
  name: 'pedidosPage',
  components: {
    tableComponent: defineAsyncComponent(() => import('@/components/pedidos/tableComponent.vue')),
    dialogoComponent: defineAsyncComponent(() => import('@/components/pedidos/dialogoComponent.vue'))
  },
  setup (props, context) {
    const store = useStore()
    const colores = store.getColores
    const { dialogoMsg } = useDialogo()
    const { fnDate } = useFunciones()
    const { fnAll, fnPorFecha, modelos } = usePedido(dialogoMsg)
    const objDialogo = ref({ show: false, token: 0, data: null })
    const fecha = ref('')
    fecha.value = fnDate()

    fnAll()

    const fnBuscar = () => {
      fnPorFecha(fecha.value)
    }

    const fnEditar = (item) => {
      objDialogo.value.token = objDialogo.value.token + 1
      objDialogo.value.data = item
      objDialogo.value.show = true
    }

    const fnCerrar = () => {
      objDialogo.value.show = false
    }

    return { fnAll, fnBuscar, fnEditar, fnCerrar, colores, fecha, modelos, objDialogo }
  }
})
</script>
