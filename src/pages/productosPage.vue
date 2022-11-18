<template>
<div class="q-pa-md">
  <q-card>
    <q-toolbar class="text-white" :class="`bg-${colores.principal}`">
        <q-icon size="25px" name="mdi-xmpp"></q-icon>
        <q-toolbar-title>PRODUCTOS</q-toolbar-title>
        <q-btn flat round dense icon="mdi-refresh" class="q-mr-xs" @click="fnRefresh" />
        <q-btn flat round dense icon="mdi-plus" class="q-mr-xs" @click="fnNuevo"/>
      </q-toolbar>
      <q-card-section>
        <div class="row">
          <div class="col-12 q-pa-sm">
            <tableComponent :modelos="modelos" @edit="fnEditar" @delete="fnEliminar"></tableComponent>
          </div>
        </div>
      </q-card-section>
  </q-card>
  <dialogoComponent :objDialogo="objDialogo" :items="items" @close="fnCerrar" @fnRefresh="fnRefrescar"></dialogoComponent>
  <mensajesComponent :dialogMsg="dialogoMsg" @fnMessage="fnMensaje"></mensajesComponent>
</div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { useStore } from '@/composables/store/useStore.js'
import { useProducto } from '@/composables/productos/useProductos.js'
import { useDialogo } from '@/composables/useDialogos.js'
import { useForm } from '@/composables/useForm.js'
export default defineComponent({
  name: 'ProductosPage',
  components: {
    dialogoComponent: defineAsyncComponent(() => import('@/components/productos/dialogoComponent.vue')),
    tableComponent: defineAsyncComponent(() => import('@/components/productos/tableComponent.vue')),
    mensajesComponent: defineAsyncComponent(() => import('@/components/widgets/mensajesComponent.vue'))
  },
  setup (props, context) {
    const store = useStore()
    const colores = store.getColores
    const objDialogo = ref({ show: false, token: 0, data: null })
    const { dialogoMsg } = useDialogo()
    const { fnAcciones, fnAll, modelos, formId } = useProducto(dialogoMsg)
    const items = ref({ loading: true, data: { estados: [] } })
    const { fnProductos } = useForm()
    fnProductos(items)

    const fnNuevo = () => {
      objDialogo.value.token = objDialogo.value.token + 1
      objDialogo.value.data = null
      objDialogo.value.show = true
    }

    const fnEditar = (item) => {
      objDialogo.value.token = objDialogo.value.token + 1
      objDialogo.value.data = item
      objDialogo.value.show = true
    }

    const fnRefresh = () => {
      fnAll()
    }
    fnRefresh()

    const fnRefrescar = (data) => {
      modelos.value.data = data
    }

    const fnMensaje = (accion) => {
      fnAcciones(accion, dialogoMsg, context.emit)
    }
    const fnCerrar = () => { objDialogo.value = false }
    const fnEliminar = (item) => {
      formId.value.id = item.id
      dialogoMsg.value.anular = true
      dialogoMsg.value.data = item
    }
    return { fnNuevo, fnEditar, fnEliminar, fnRefresh, fnRefrescar, fnCerrar, fnMensaje, colores, modelos, objDialogo, dialogoMsg, items }
  }
})
</script>
