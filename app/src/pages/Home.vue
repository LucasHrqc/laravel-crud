<template>
  <div class="max-w-7xl mx-auto w-full min-h-screen py-32">
    <div class="flex flex-col flex-wrap flex-grow min-h-[100%] my-auto w-full">
      <q-card class="min-h-fit">
        <q-card-section>
          <div class="flex flex-row flex-wrap items-center justify-between">
            <span class="mx-4 text-3xl">Usuários</span>
            <q-btn
              no-caps
              color="teal-9"
              label="Novo usuário"
              @click="router.push('/register/user')"
            />
          </div>
        </q-card-section>
        <q-separator dark inset />
        <q-card-section>
          <Table
            :rows="data"
            :columns="columns"
            :pagination="table.pagination"
            :loading="loading.table"
            @delete="handleDeleteUser"
            @update="handleUpdateUser"
            @update-pagination="(val) => updateRowsPerPage(val)"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useUsersStore } from "../stores/users";
import Table from "@/components/Table.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const usersStore = useUsersStore();
const { data, loading, table } = storeToRefs(usersStore);

const updateRowsPerPage = async (val = false) => {
  if (val) usersStore.table.pagination.rowsPerPage = val;
  usersStore.table.currentPage = 1;
  await usersStore.get();
};

const handleDeleteUser = async (id) => {
  await usersStore.delete(id);
  await updateRowsPerPage();
};

const handleUpdateUser = async (id) => {
  router.push(`/edit/user/${id}`);
};

const columns = [
  {
    name: "id",
    field: "id",
    label: "#",
  },
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "left",
    field: (row) => row.name,
    format: (val) => val,
    sortable: true,
  },
  {
    name: "role",
    required: true,
    label: "Cargo",
    align: "left",
    field: (row) => row.role,
    sortable: true,
  },
  {
    name: "actions",
    required: true,
    label: "Ações",
    align: "left",
    sortable: true,
  },
];
</script>
