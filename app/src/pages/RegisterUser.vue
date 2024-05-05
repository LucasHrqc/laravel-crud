<template>
  <RegisterSkeleton v-if="loadingUsers.page || loadingUsers.request"></RegisterSkeleton>
  <div v-else class="max-w-7xl mx-auto w-full min-h-screen py-32">
    <div class="flex flex-col flex-wrap flex-grow min-h-[100%] my-auto w-full">
      <q-card class="min-h-fit">
        <q-card-section>
          <div class="flex flex-row flex-wrap items-center justify-between">
            <span class="mx-4 text-3xl">Cadastrar usuário</span>
            <q-btn no-caps color="teal-9" label="Voltar" @click="router.push('/')" />
          </div>
        </q-card-section>
        <q-separator inset />

        <q-card-section>
          <div class="grid grid-cols-12 gap-x-6 gap-y-8 px-8 py-8">
            <q-input
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
import RegisterSkeleton from "../skeletons/RegisterSkeleton.vue";
import { useRoute, useRouter } from "vue-router";
import { Notify } from "quasar";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const usersStore = useUsersStore();
const { loading: loadingUsers } = storeToRefs(usersStore);
const isEditingId = ref(route.params?.id ?? false);

const form = ref({
  name: "",
  role: "",
  email: "",
});

onMounted(async () => {
  if (isEditingId.value) {
    const response = await usersStore.get(isEditingId.value);
    form.value = response.data?.[0];
  }
});

const save = async () => {
  const payload = form.value;
  if (!validForm()) {
    Notify.create({
      position: "top",
      color: "warning",
      message: "Formulário incompleto",
    });
    return;
  }

  if (isEditingId.value) {
    await usersStore.put(payload.id, payload);
  } else {
    await usersStore.post(payload);
  }

  resetForm();
  router.push("/");
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
