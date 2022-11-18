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
      <q-td key="cliente" :props="props">
        <span style="font-size: 11px;">{{ props.row.cliente.descripcion }}</span>
      </q-td>
      <q-td key="fecha" :props="props">
        <span style="font-size: 11px;">{{ props.row.fecha }}</span>
      </q-td>
      <q-td key="ventas" :props="props">
        <q-avatar size="24px" :color="colores.principal" class="text-white"> {{props.row.ventas.length }} </q-avatar>
      </q-td>
      <q-td auto-width>
        <q-btn @click="$emit('edit', props.row)" size="8px" :color="colores.principal" round icon="mdi-pencil"/>
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
      { label: 'CLIENTE', name: 'cliente', field: row => row.cliente.descripcion, align: 'left', sortable: true },
      { label: 'FECHA', name: 'fecha', field: row => row.fecha, align: 'left', sortable: true },
      { label: 'CANTIDAD', name: 'ventas', field: row => row.ventas, align: 'center', sortable: true }
    ]
    const pagination = { rowsPerPage: 50 }
    return { colores, columns, pagination }
  }
})
</script>
