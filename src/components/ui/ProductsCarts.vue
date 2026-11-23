<script setup lang="ts">
import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue";

import ProductsCart from "./ProductsCart.vue";

const limit = ref(20);

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["products", limit],
  queryFn: async () => {
    const res = await api.get(`/products?limit=${limit.value}`);
    console.log(res.data);
    return res.data;
  },
});

const viewMore = () => {
    if (data.value && limit.value < data.value.total) {
    limit.value += 20;
  }
};

const hasMore = computed(() =>
  data.value ? limit.value < data.value.total : false
);
</script>

<template>
  <p
    v-if="isLoading"
    class="flex w-full h-screen items-center text-center justify-center"
  >
    Loading...
  </p>

  <p
    v-else-if="isError"
    class="flex items-center justify-center w-full h-screen text-red-500"
  >
    Error:{{ error }}
  </p>

  <div v-if="data" id="home" class="p-10">
    <div class="flex justify-between items-center">
      <p class="my-4 font-bold text-3xl">Products</p>
    </div>
    <div class="w-full items-center justify-center">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-10 w-full">
        <ProductsCart  :products="data?.products ?? []" />
      </div>
    </div>
    <div class="w-full items-center justify-center flex my-10">
      <button
      v-if='hasMore'
        @click="viewMore"
        class="border gap-5 rounded-lg flex font-semibold cursor-pointer px-5 py-3 hover:bg-blue-400 duration-300 ease-in-out hover:scale-105 active:scale-100 hover:border-blue-400"
      >
        View More
      </button>
    </div>
  </div>
</template>

<style lang=""></style>
