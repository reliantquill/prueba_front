<template>
<div style="width:100%">
  <q-dialog v-model="dialogo.loading" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 300px">
        <q-card-section>
          <q-linear-progress size="10px" indeterminate :color="colores.principal" class="q-mt-sm" />
          <div class="text-center">UN MOMENTO</div>
        </q-card-section>
      </q-card>
  </q-dialog>

  <q-dialog v-model="dialogo.preguntar" persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section :class="`bg-${colores.principal}`" class="text-white">GUARDAR</q-card-section>
        <q-card-section class="text-h6 text-weight-bold">¿DESEA GUARDAR LOS DATOS?</q-card-section>
        <q-separator inset></q-separator>
        <q-card-actions align="right">
          <q-btn flat :color="colores.principal" @click="fnAccion('PREGUNTAR ACEPTAR')" label="ACEPTAR"/>
          <span class="q-pr-xs"></span>
          <q-btn flat :color="colores.principal" v-close-popup label="CANCELAR"/>
        </q-card-actions>
      </q-card>
  </q-dialog>

  <q-dialog v-model="dialogo.anular" persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section :class="`bg-${colores.red}`" class="text-white">ANULAR</q-card-section>
        <q-card-section class="text-h6 text-weight-bold">
          ¿DESEA ANULAR EL REGISTRO?
          <div class="text-center">{{ dialogo.data.id }}</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-actions align="right" :class="`text-${colores.red}`">
          <q-btn flat @click="fnAccion('ELIMINAR ACEPTAR')" label="ACEPTAR"/>
          <span class="q-pr-xs"></span>
          <q-btn flat v-close-popup label="CANCELAR"/>
        </q-card-actions>
      </q-card>
  </q-dialog>

  <q-dialog v-model="dialogo.validacion" persistent transition-show="scale" transition-hide="scale">
      <q-card class="">
        <q-card-section class="bg-red text-white text-subtitle2 text-weight-bold">
          REQUEST VALIDACION
        </q-card-section>
        <q-card-section>
          <pre>{{ dialogo.validate }}</pre>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat label="ACEPTAR" v-close-popup />
        </q-card-actions>
      </q-card>
  </q-dialog>
</div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from '@/composables/store/useStore.js'
export default {
  name: 'mensajesComponent',
  components: {
  },
  props: ['dialogMsg'],
  setup (props, context) {
    const store = useStore()
    const colores = store.getColores
    const dialogo = ref(props.dialogMsg)
    const fnAccion = (accion) => {
      context.emit('fnMessage', accion)
    }
    return { fnAccion, colores, dialogo }
  }
}
</script>
