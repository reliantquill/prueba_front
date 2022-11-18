<template>
<div class="row q-pa-xs">
  <div class="col-12 col-md-6">
    <q-input v-model="formId.id" filled label="ID" :color="colores.principal"/>
  </div>
</div>
<div class="q-pa-sm"></div>
<q-form ref="myForm" greedy>
  <div class="row q-col-gutter-xs">
      <div class="col-12">
        <q-input v-model="form.descripcion" autofocus label="* DESCRIPCION" :ref="refDescripcion" v-on:keyup.enter="fnEnterProductos('descripcion')" :rules="[rules.requerido]" lazy-rules outlined :color="colores.principal" clearable />
      </div>
    </div>
    <div class="q-pa-xs"></div>
    <div class="row q-col-gutter-xs">
      <div class="col-12 col-md-6">
        <q-select v-model="form.estado_id" ref="refEstado" :readonly="items.loading" v-on:keyup.enter="fnValidar"  :rules="[rules.requerido]" lazy-rules outlined label="* ESTADO" :color="colores.principal" clearable :options="items.data.estados" map-options emit-value option-label="descripcion" option-value="id">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">No results</q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="q-pa-xs"></div>
    <div class="row q-col-gutter-xs">
      <div class="col-12 col-md-6">
        <q-btn @click="fnInicializar" dense :color="colores.secundario" class="full-width" label="NUEVO" />
      </div>
      <div class="col-12 col-md-6">
        <q-btn @click="fnValidar" :readonly="modelo.loading" dense :color="colores.secundario" class="full-width" label="GUARDAR" />
      </div>
    </div>
    <mensajesComponent :dialogMsg="dialogoMsg" @fnMessage="fnMensaje"></mensajesComponent>
</q-form>
</template>

<script>
import { defineComponent, defineAsyncComponent, watch, ref } from 'vue'
import { useStore } from '@/composables/store/useStore.js'
import { useProducto } from '@/composables/productos/useProductos.js'
import { useProductoFocus } from '@/composables/productos/useProductosFocus.js'
import { useDialogo } from '@/composables/useDialogos.js'

export default defineComponent({
  name: 'formComponent',
  components: {
    mensajesComponent: defineAsyncComponent(() => import('@/components/widgets/mensajesComponent.vue'))
  },
  emits: ['fnRefreshForm'],
  props: ['items', 'objDialogo'],
  setup (props, context) {
    const store = useStore()
    const { dialogoMsg } = useDialogo()
    const { fnAcciones, fnValidar, fnObjecto, fnInicializar, myForm, formId, form, modelo } = useProducto(dialogoMsg)
    const colores = store.getColores
    const rules = store.getRules
    const token = ref(props.objDialogo.token)
    const { fnEnterProductos, refDescripcion, refEstado } = useProductoFocus()

    watch(token, (newValue, preValue) => {
      fnObjecto(props.objDialogo.data, formId, form)
    }, { immediate: true, deep: false })

    const fnMensaje = (accion) => {
      fnAcciones(accion, dialogoMsg, context.emit)
    }

    return { fnMensaje, fnValidar, fnEnterProductos, fnInicializar, myForm, colores, rules, formId, form, dialogoMsg, modelo, refDescripcion, refEstado }
  }
})
</script>
