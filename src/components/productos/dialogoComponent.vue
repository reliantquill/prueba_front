<template>
<q-dialog v-model="dialogo.show" persistent maximized transition-show="slide-up" transition-hide="slide-down">
  <q-card :class="`bg-${colores.fondo}`">
    <q-bar :class="`bg-${colores.principal}`" class="text-white">
      <q-icon size="22px" name="mdi-xmpp"></q-icon>
      <span class="q-pl-md">PRODUCTO</span>
      <q-space/>
      <q-btn @click="dialogo.show = false" dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>
    <q-card-section>
      <q-card :class="`bg-${colores.white}`">
        <q-card-section>
          <formComponent :objDialogo="dialogo" :items="items" @fnRefreshForm="fnRefrescarForm"></formComponent>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</q-dialog>
</template>

<script>
import { defineComponent, ref, defineAsyncComponent } from 'vue'
import { useStore } from '@/composables/store/useStore.js'
export default defineComponent({
  name: 'dialogoComponent',
  components: {
    formComponent: defineAsyncComponent(() => import('@/components/productos/formComponent.vue'))
  },
  emits: ['fnRefresh'],
  props: ['objDialogo', 'items'],
  setup (props, context) {
    const store = useStore()
    const colores = store.getColores
    const dialogo = ref(props.objDialogo)
    dialogo.value.token = dialogo.value.token + 1

    const fnRefrescarForm = (data) => {
      context.emit('fnRefresh', data)
    }
    return { fnRefrescarForm, colores, dialogo }
  }
})
</script>
