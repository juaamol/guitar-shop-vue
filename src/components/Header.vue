<script setup>
import { computed, onMounted, ref } from 'vue';
import { db } from '../data/instruments';
import { BASE_URL } from '../config/constants';

const props = defineProps({
  shoppingCart: {
    type: Array,
    required: true,
  },
});

const mainInstrument = ref({});

defineEmits([
  'add-to-cart',
  'increase-quantity',
  'decrease-quantity',
  'remove-from-cart',
  'empty-cart',
]);

const totalPrice = computed(() => {
  return props.shoppingCart.reduce((total, instrument) => {
    return total + instrument.quantity * instrument.price;
  }, 0);
});

onMounted(() => {
  mainInstrument.value = db[0] || {};
});
</script>

<template>
  <header class="py-5 header">
    <div class="container-xl">
      <div class="row justify-content-center justify-content-md-between">
        <div class="col-8 col-md-3">
          <a href="index.html">
            <div class="d-flex flex-column text-white logo">
              <span class="fs-4"
                >Guitar <span class="text-primary">Shop</span></span
              >
              <span class="fs-5">Instruments and courses</span>
            </div>
          </a>
        </div>
        <nav
          class="col-md-6 a mt-5 d-flex align-items-start justify-content-end"
        >
          <div class="carrito">
            <img
              class="img-fluid"
              src="/img/carrito.png"
              alt="imagen carrito"
            />

            <div id="carrito" class="bg-white p-3">
              <p v-if="shoppingCart.length === 0" class="text-center m-0">
                Cart is empty
              </p>
              <div v-else>
                <table class="w-100 table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="instrument in shoppingCart" :key="instrument.id">
                      <td>
                        <img
                          class="img-fluid"
                          :src="`/img/${instrument.image}.jpg`"
                          alt="imagen guitarra"
                        />
                      </td>
                      <td>{{ instrument.name }}</td>
                      <td class="fw-bold">
                        ${{ instrument.quantity * instrument.price }}
                      </td>
                      <td class="flex align-items-start gap-4">
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="$emit('decrease-quantity', instrument.id)"
                        >
                          -
                        </button>
                        {{ instrument.quantity }}
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="$emit('increase-quantity', instrument.id)"
                        >
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger"
                          type="button"
                          @click="$emit('remove-from-cart', instrument.id)"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p class="text-end">
                  Total: <span class="fw-bold">${{ totalPrice }}</span>
                </p>
                <button
                  class="btn btn-dark w-100 mt-3 p-2"
                  @click="$emit('empty-cart')"
                >
                  Empty cart
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!--.row-->

      <div class="row mt-5">
        <div class="col-md-6 text-center text-md-start pt-5">
          <h1 class="display-2 fw-bold">Model {{ mainInstrument.name }}</h1>
          <p class="mt-5 fs-5 text-white">
            {{ mainInstrument.description }}
          </p>
          <p class="text-primary fs-1 fw-black">${{ mainInstrument.price }}</p>
          <button
            type="button"
            class="btn fs-4 bg-primary text-white py-2 px-5"
            @click="$emit('add-to-cart', mainInstrument.id)"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>

    <img
      class="header-guitarra"
      :src="`${BASE_URL}/img/header_guitarra.png`"
      alt="imagen header"
    />
  </header>
</template>

<style scoped>
.logo {
  text-align: center;
}

@media (min-width: 768px) {
  .logo {
    text-align: left;
  }
}
</style>
