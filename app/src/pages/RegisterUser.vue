<template>
  <div class="max-w-7xl mx-auto w-full min-h-screen py-32">
    <div class="flex flex-col flex-wrap flex-grow min-h-[100%] my-auto w-full">
      <q-card class="min-h-fit !bg-[#10151D] text-white">
        <q-card-section>
          <div class="flex flex-row flex-wrap items-center justify-between">
            <span class="mx-4 text-3xl">Cadastrar usuário</span>
            <q-btn no-caps color="teal-9" label="Voltar" @click="router.push('/')" />
          </div>
        </q-card-section>
        <q-separator inset />

        <q-card-section>
          <div class="grid grid-cols-12 gap-x-6 gap-y-8 px-4 py-6">
            <q-input
              dark
              v-model="form.name"
              class="col-span-6"
              dense
              stack-label
              label-slot
              outlined
              type="text"
              required
            >
              <template #label> Nome<span class="require">*</span> </template>
            </q-input>
            <q-input
              dark
              v-model="form.role"
              class="col-span-6"
              dense
              stack-label
              label-slot
              outlined
              type="text"
            >
              <template #label> Profissão<span class="require">*</span> </template>
            </q-input>
            <q-input
              dark
              v-model="form.email"
              class="col-span-6"
              dense
              stack-label
              label-slot
              outlined
              type="email"
            >
              <template #label> E-mail<span class="require">*</span> </template>
            </q-input>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="flex px-4 w-full items-center justify-end">
            <q-btn no-caps color="primary" label="Salvar" @click="save" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUsersStore } from "../stores/users";
import { useRouter } from "vue-router";
import { Notify } from "quasar";

const router = useRouter();
const usersStore = useUsersStore();

onMounted(async () => {
  await usersStore.get();
});

const form = ref({
  name: "",
  role: "",
  email: "",
});

const save = async () => {
  if (!validForm()) {
    Notify.create({
      position: "top",
      color: "warning",
      message: "Formulário incompleto",
    });
    return;
  }

  await usersStore.post(form.value);
  resetForm();
};

const validForm = () => {
  return form.value.name.length > 0 && form.value.email.length > 0;
};

const resetForm = () => {
  form.value = {
    name: "",
    role: "",
    email: "",
  };
};
</script>
