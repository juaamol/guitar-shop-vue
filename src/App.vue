<script setup>
import { ref, onMounted, watch } from 'vue';
import { BASE_URL } from './config/constants';
import { db } from './data/instruments';
import Instrument from './components/Instrument.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const instruments = ref([]);
const shoppingCart = ref([]);

const addToCart = (id) => {
  const hasId = (instrument) => instrument.id === id;
  const instrument = instruments.value.find(hasId);
  const positionInCart = shoppingCart.value.findIndex(hasId);

  if (positionInCart < 0) {
    instrument.quantity = 1;
    shoppingCart.value.push(instrument);
  }
};

const removeFromCart = (id) => {
  const hasId = (instrument) => instrument.id === id;
  const items = shoppingCart.value.filter((item) => !hasId(item));
  shoppingCart.value = items;
};

const increaseQuantity = (id) => {
  const hasId = (instrument) => instrument.id === id;
  const positionInCart = shoppingCart.value.findIndex(hasId);

  shoppingCart.value[positionInCart].quantity++;
};

const decreaseQuantity = (id) => {
  const hasId = (instrument) => instrument.id === id;
  const positionInCart = shoppingCart.value.findIndex(hasId);
  const instrument = shoppingCart.value[positionInCart];
  instrument.quantity--;

  if (instrument.quantity === 0) {
    const items = shoppingCart.value.filter((item) => !hasId(item));
    shoppingCart.value = items;
  }
};

const emptyShoppingCart = () => {
  shoppingCart.value = [];
};

const saveShoppingCart = () => {
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart.value));
};

const getShoppingCart = () => {
  const shoppingCartJSON = localStorage.getItem('shoppingCart');
  
  return shoppingCartJSON ? JSON.parse(shoppingCartJSON) : [];
};

onMounted(() => {
  instruments.value = db;
  shoppingCart.value = getShoppingCart();
});

watch(shoppingCart, saveShoppingCart, { deep: true });
</script>

<template>
  <Header
    :shoppingCart="shoppingCart"
    @add-to-cart="addToCart"
    @increase-quantity="increaseQuantity"
    @decrease-quantity="decreaseQuantity"
    @remove-from-cart="removeFromCart"
    @empty-cart="emptyShoppingCart"
  ></Header>

  <main class="container-xl mt-5">
    <h2 class="text-center">Our collection</h2>

    <div class="row mt-5">
      <Instrument
        v-for="instrument in instruments"
        :id="instrument.id"
        :key="instrument.id"
        :image="`${BASE_URL}/img/${instrument.image}.jpg`"
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
