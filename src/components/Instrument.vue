<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

defineEmits(['add-to-cart']);
</script>

<template>
  <div class="col-md-6 col-lg-4 my-4 row align-items-center">
    <div class="col-4">
      <img class="img-fluid" :src="image" alt="imagen guitarra" />
    </div>
    <div class="col-8">
      <h3 class="text-black fs-4 fw-bold text-uppercase">
        {{ name }}
      </h3>
      <p>
        {{ description }}
      </p>
      <p class="fw-black text-primary fs-3">${{ price }}</p>
      <button
        type="button"
        class="btn btn-dark w-100"
        @click="$emit('add-to-cart', id)"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<style scoped></style>
