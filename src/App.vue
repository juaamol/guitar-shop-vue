<script setup>
import { ref, onMounted } from 'vue';
import { db } from './data/instruments';
import Instrument from './components/Instrument.vue';
import Header from './components/Header.vue';

const instruments = ref([]);
const shoppingCart = ref([]);

onMounted(() => {
  instruments.value = db;
});

const addToCart = (id) => {
  const hasInstrumentAddedId = (instrument) => instrument.id === id;
  const instrument = instruments.value.find(hasInstrumentAddedId);
  instrument.quantity = 1;
  shoppingCart.value.push(instrument);
};
</script>

<template>
  <Header></Header>

  <main class="container-xl mt-5">
    <h2 class="text-center">Our collection</h2>

    <div class="row mt-5">
      <Instrument
        v-for="instrument in instruments"
        :id="instrument.id"
        :image="`/img/${instrument.image}.jpg`"
        :name="instrument.name"
        :description="instrument.description"
        :price="instrument.price"
        @add-to-cart="addToCart"
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
