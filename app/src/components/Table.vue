<template>
  <q-table
    style="height: 500px"
    flat
    dark
    bordered
    card-class="!bg-[#18202C] text-white"
    table-class="text-white"
    table-header-class="text-white"
    :title="title"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :loading="loading"
    :pagination="pagination"
    @update:pagination="updatePagination"
    :rows-per-page-options="[5, 10, 20, 50, 100]"
    no-data-label="Não há dados disponíveis"
    no-results-label="Nenhum dado encontrado"
    rows-per-page-label="Por página"
    :pagination-label="paginationLabel"
  >
    <!-- <template #header-selection="scope">
      <q-checkbox dark v-model="scope.selected" />
    </template>

    <template #body-selection="scope">
      <q-checkbox
        dark
        :model-value="scope.selected"
        @update:model-value="
          (val, evt) => {
            Object.getOwnPropertyDescriptor(scope, 'selected').set(val, evt);
          }
        "
      />
    </template> -->
    <template #body-cell-actions="scope">
      <q-icon name="delete" color="negative" padding="5px" size="20px"></q-icon>
    </template>
    <template #no-data> Nenhum dado disponível </template>
    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script setup>
import { toRefs, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: null,
  },
  rows: {
    type: Object,
    required: true,
  },
  columns: {
    type: Object,
    required: true,
  },
  pagination: {
    type: Object,
    required: true,
    default: {
      page: 1,
      rowsPerPage: 15,
    },
  },
  loading: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const { title, rows, columns, pagination, loading } = toRefs(props);
const selected = ref([]);

const emit = defineEmits(["update-pagination"]);

const paginationLabel = (start, end, total) => {
  return `${start} - ${end}. ${total}`;
};

const updatePagination = (tablePagination) => {
  emit("update-pagination", tablePagination.rowsPerPage);
};
</script>

<style>
.my-sticky-dynamic {
  /* height or max-height is important */
  height: 410px;
}

.my-sticky-dynamic .q-table__top,
.my-sticky-dynamic .q-table__bottom,
.my-sticky-dynamic thead tr:first-child th /* bg color is important for th; just specify one */ {
  background-color: #00b4ff;
}

.my-sticky-dynamic thead tr th {
  position: sticky;
  z-index: 1;
}

/* this will be the loading indicator */
.my-sticky-dynamic thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}

.my-sticky-dynamic thead tr:first-child th {
  top: 0;
}

/* prevent scrolling behind sticky top row on focus */
.my-sticky-dynamic tbody {
  /* height of all previous header rows */
  scroll-margin-top: 48px;
}
</style>
