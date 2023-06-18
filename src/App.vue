<script setup>
import { ref, onMounted } from 'vue';
import { db } from './data/instruments';
import Instrument from './components/Instrument.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const instruments = ref([]);
const shoppingCart = ref([]);

onMounted(() => {
  instruments.value = db;
});

const addToCart = (id) => {
  const hasInstrumentAddedId = (instrument) => instrument.id === id;
  const positionInCart = shoppingCart.value.findIndex(hasInstrumentAddedId);

  if (positionInCart >= 0) {
    shoppingCart.value[positionInCart].quantity++;
  } else {
    const instrument = instruments.value.find(hasInstrumentAddedId);
    instrument.quantity = 1;
    shoppingCart.value.push(instrument);
  }
};
</script>

<template>
  <Header :shoppingCart="shoppingCart"></Header>

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

  <Footer></Footer>
</template>

<style scoped></style>
