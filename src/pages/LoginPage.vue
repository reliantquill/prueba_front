<template>
<q-page-container>
  <q-page class="row" :style="[{'background': `linear-gradient(${colores.gradiente1}, ${colores.gradiente2})`}]">
    <div class="row justify-center items-center full-width">
      <div class="col-md-5 col-sm-6">
      <q-card square class="shadow-2">
        <q-card-section class="q-pa-none">
          <div class="row">
            <div class="col-12">
              <logeoComponent></logeoComponent>
            </div>
          </div>
        </q-card-section>
      </q-card>
      </div>
    </div>
  </q-page>
</q-page-container>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import { useStore } from '@/composables/store/useStore.js'

export default defineComponent({
  name: 'LoginPage',
  components: {
    logeoComponent: defineAsyncComponent(() => import('@/components/login/LogeoComponent.vue'))
  },
  setup (props, context) {
    const store = useStore()
    const colores = store.getColores
    return { colores }
  }
})
</script>
