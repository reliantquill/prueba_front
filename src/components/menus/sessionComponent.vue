<template>
<div class="q-pa-xs">
  <q-btn flat icon="mdi-account" :label="user.nombres + ' ' + user.apellidos">
      <q-menu fit>
        <div class="row">
          <div class="col-12 col-md-4 q-pa-md text-center items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>
          </div>
          <div class="col-12 col-md-8 items-start q-pa-md">
              <div class="text-caption">{{ user.nombres }}</div>
              <div class="text-caption">{{ user.apellidos }}</div>
              <div class="text-caption">{{ user.email }}</div>
              <div class="q-pt-sm"></div>
              <q-btn class="full-width" :color="colores.secundario" label="CERRAR SESSION" push size="sm" v-close-popup/>
            </div>
          </div>
      </q-menu>
    </q-btn>
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'sessionComponent',
  props: ['colores', 'user'],
  setup (props, context) {
  }
})
</script>
