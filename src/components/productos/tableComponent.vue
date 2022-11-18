<template>
<q-table :rows="modelos.data" :columns="columns" :loading="modelos.loading" row-key="id" :pagination="pagination">
  <template v-slot:header="props">
    <q-tr :props="props">
      <q-th v-for="col in props.cols" :key="col.name" :props="props"> {{ col.label }}</q-th>
      <q-th  auto-width></q-th>
    </q-tr >
  </template>
  <template v-slot:body="props">
    <q-tr :props="props">
      <q-td key="id" :props="props">
        <span style="font-size: 11px;">{{ props.row.id }}</span>
      </q-td>
      <q-td key="descripcion" :props="props">
        <span style="font-size: 11px;">{{ props.row.descripcion }}</span>
      </q-td>
      <q-td key="estado" :props="props">
          <q-card :class="`bg-${props.row.estado.color}`" class="text-white text-center"><span style="font-size: 11px;">{{  props.row.estado.descripcion }}</span></q-card>
      </q-td>
      <q-td auto-width>
        <q-btn @click="$emit('edit', props.row)" size="8px" :color="colores.principal" round icon="mdi-pencil"/>
        <span class="q-pa-xs"></span>
        <q-btn @click="$emit('delete', props.row)" size="8px" :color="colores.principal" round icon="mdi-delete"/>
      </q-td>
    </q-tr>
  </template>
</q-table>

</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from '@/composables/store/useStore.js'

export default defineComponent({
  name: 'tableComponent',
  components: {
  },
  props: ['modelos'],
  setup () {
    const store = useStore()
    const colores = store.getColores
    const columns = [
      { label: 'ID', name: 'id', align: 'left', field: 'id', sortable: true },
      { label: 'DESCRIPCION', name: 'descripcion', field: 'descripcion', align: 'left' },
      { label: 'ESTADO', name: 'estado', field: row => row.estado.descripcion, align: 'left', sortable: true }
    ]
    const pagination = { rowsPerPage: 50 }
    return { colores, columns, pagination }
  }
})
</script>
