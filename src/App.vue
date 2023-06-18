<script setup>
import { ref, onMounted } from 'vue';
import { db } from './data/instruments';
import Instrument from './components/Instrument.vue';
import Header from './components/Header.vue';

const instruments = ref([]);

onMounted(() => {
  instruments.value = db;
});
</script>

<template>
  <Header></Header>

  <main class="container-xl mt-5">
    <h2 class="text-center">Our collection</h2>

    <div class="row mt-5">
      <Instrument
        v-for="instrument in instruments"
        :image="`/img/${instrument.image}.jpg`"
        :name="instrument.name"
        :description="instrument.description"
        :price="instrument.price"
      />
    </div>
  </main>

  <footer class="bg-dark mt-5 py-5">
    <div class="container-xl">
      <p class="text-white text-center fs-4 mt-4 m-md-0">
        Guitar Shop - All rights reserved
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
