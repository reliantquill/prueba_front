<template>
<q-list v-for="(menu, index) in menus" :key="index">
  <q-item :to="menu.ruta" v-ripple>
    <q-item-section>
      <div class="row">
        <div class="col-12 text-center" >
          <q-icon size="38px" :name="menu.icono" />
        </div>
      </div>
      <div class="row">
          <div class="col-12 text-center" style="font-size: 12px;" >
            {{ menu.menu }}
          </div>
      </div>
    </q-item-section>
  </q-item>
  <q-separator></q-separator>
</q-list>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from '@/composables/store/useStore.js'

export default defineComponent({
  name: 'drawerLetfComponent',
  setup (props, context) {
    const store = useStore()
    const menus = store.getMenus
    return { menus }
  }
})
</script>
