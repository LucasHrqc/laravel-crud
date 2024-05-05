<template>
  <div class="max-w-7xl mx-auto w-full min-h-screen py-32">
    <div class="flex flex-col flex-wrap flex-grow min-h-[100%] my-auto w-full">
      <q-card class="min-h-fit">
        <q-card-section>
          <div class="flex flex-row flex-wrap items-center justify-between">
            <q-skeleton type="rect" animation="wave" class="w-[20%] h-[35px]"></q-skeleton>
            <q-skeleton type="rect" animation="wave" class="w-[6%] h-[35px]"></q-skeleton>
          </div>
        </q-card-section>
        <q-separator inset />

        <q-card-section>
          <div class="grid grid-cols-12 gap-x-6 gap-y-8 px-8 py-8">
            <q-skeleton class="col-span-6 h-[35px]" type="rect" animation="wave"></q-skeleton>
            <q-skeleton class="col-span-6 h-[35px]" type="rect" animation="wave"></q-skeleton>
            <q-skeleton class="col-span-6 h-[35px]" type="rect" animation="wave"></q-skeleton>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="flex px-4 w-full items-center justify-end">
            <q-skeleton type="rect" animation="wave" class="w-[6%] h-[35px]"></q-skeleton>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup></script>
