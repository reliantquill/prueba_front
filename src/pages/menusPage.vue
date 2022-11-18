<template>
<div class="q-pa-md">
  <q-header bordered elevated  class="text-white shadow-2" :class="`bg-${colores.principal}`">
      <q-toolbar><q-btn flat round icon="mdi-menu"/>
        <q-toolbar-title> MENUS </q-toolbar-title>
        <sessionComponent :colores="colores" :user="user"></sessionComponent>
      </q-toolbar>
  </q-header>

  <q-drawer :width="250" show-if-above side="left" bordered>
    <drawerLetfComponent></drawerLetfComponent>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</div>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import { useStore } from '@/composables/store/useStore.js'

export default defineComponent({
  name: 'menusPage',
  components: {
    drawerLetfComponent: defineAsyncComponent(() => import('@/components/menus/drawerLetfComponent.vue')),
    sessionComponent: defineAsyncComponent(() => import('@/components/menus/sessionComponent.vue'))
  },
  setup () {
    const store = useStore()
    const colores = store.getColores
    const user = store.getUser
    return { colores, user }
  }
})
</script>
