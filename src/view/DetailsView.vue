<script setup lang="ts">
import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import type { Product } from "@/types/Products";
import { Plus, ArrowLeft, Minus, ShoppingCart, Check } from "@lucide/vue";
import { computed, ref, watch } from "vue";
import ProductsCart from "@/components/ui/ProductsCart.vue";
import { useBasketStore } from "@/store/useBasket";


const route = useRoute();
const router = useRouter();
const basket = useBasketStore();

const id = computed(() => route.params.id as string);
const count = ref(1);
const selectImage = ref<string | null>(null);
const mainImage = computed(() => selectImage.value ?? data.value?.thumbnail);
const added = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

async function fetchData(id: string): Promise<Product> {
  const res = await api.get(`/products/${id}`);

  console.log(res.data);
  return res.data;
}

const { isLoading, isError, data, error } = useQuery({
  queryKey: ["product-details", id],
  queryFn: () => fetchData(id.value),
});

const category = computed(() => data.value?.category);

const { data: relatedData } = useQuery({
  queryKey: ["related-data", category],
  queryFn: async () => {
    const res = await api.get(`/products/category/${category.value}`);
    return res.data.products as Product[];
  },
  enabled: computed(() => !!category.value),
});

const relatedProducts = computed(() =>
  (relatedData.value ?? []).filter((p) => p.id !== data.value?.id),
);

watch(id, () => {
  count.value = 1;
  added.value = false;
});

const inStock = computed(() => (data.value?.stock ?? 0) > 0);

const addCount = () => {
  if (data.value && count.value < data.value.stock) {
    count.value++;
  }
};

const removeCount = () => {
  if (count.value > 1) {
    count.value--;
  }
};

const addToBasket = () => {
  if (data.value) {
    console.log(count.value);
    basket.addItem(data.value, count.value);
    added.value = true;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => (added.value = false), 1500);
  }
};
</script>

<template>
  <p
    v-if="isLoading"
    class="w-full h-screen flex items-center justify-center text-5xl font-semibold"
  >
    Loading...
  </p>

  <p
    v-else-if="isError"
    class="w-full h-screen flex items-center justify-center text-5xl font-semibold"
  >
    Error:{{ error }}
  </p>
  <div class="w-full h-full flex flex-col lg:px-[98px] py-[48px] px-5">
    <div
      class="hover:bg-zinc-400/40 rounded-full size-8 flex items-center justify-center cursor-pointer ease-in-out duration-300 active:scale-95"
      @click="router.go(-1)"
    >
      <ArrowLeft />
    </div>
    <div
      class="flex w-full h-fit sm:gap-10 md:flex-row flex-col items-center px-2"
    >
      <div class="md:max-w-[580px] w-full sm:mb-5 overflow-hidden">
        <div class="overflow-hidden rounded-2xl bg-zinc-200">
          <img :src="mainImage" class="size-full object-contain" />
        </div>

        <div class="flex gap-4 mt-4">
          <img
            v-for="(img, i) in data?.images"
            :key="i"
            @click="selectImage = img"
            :src="img"
            class="w-24 h-24 object-cover cursor-pointer rounded-lg bg-zinc-200 transition-all"
            \
            :class="
              mainImage === img
                ? 'border-black'
                : ' opacity-70 hover:opacity-100'
            "
          />
        </div>
      </div>

      <div class="flex w-full flex-col sm:gap-6 gap-2 sm:mt-0 mt-5">
        <h2 class="mt-3 text-3xl font-bold leading-tight lg:text-5xl">
          {{ data?.title }}
        </h2>
        <div class="flex flex-col gap-1">
          <span class="text-3xl font-bold">${{ data?.price }} </span>
          <span class="text-zinc-600">{{ data?.category }}</span>
        </div>
        <p class="leading-relaxed text-zinc-600 lg:text-lg">
          {{ data?.description }}
        </p>

        <div class="flex md:flex-row flex-col gap-4">
          <div
            v-if="inStock"
            class="border rounded-full flex sm:px-4 sm:py-3 py-1 md:w-40 justify-between  disabled:cursor-not-allowed h-11 px-3 items-center sm:gap-5 disabled:opacity-55  cursor-pointer"
          >
            <button
              class="cursor-pointer rounded-full hover:bg-zinc-400/40 transition-all duration-300active:scale-95"
              @click="removeCount"
            >
              <Minus />
            </button>
            <h2>{{ count }}</h2>
            <button
              class="cursor-pointer rounded-full hover:bg-zinc-400/40 transition-all duration-300 active:scale-95"
              @click="addCount"
            >
              <Plus />
            </button>
          </div>

          <button
            v-if="inStock"
            :class="added ? 'bg-emerald-600' : 'bg-black hover:bg-black/70'"
            @click="addToBasket"
            class="w-full border sm:py-2 py-1 font-semibold rounded-full cursor-pointer transition-all duration-300 h-11 text-white active:scale-95 flex items-center justify-center gap-2"
          >
            <component :is="added ? Check : ShoppingCart" class="size-5" />
            {{ added ? "Added to basket" : "Add to basket" }}
          </button>

          <div v-else class="w-full border sm:py-2 py-1 font-semibold rounded-full transition-all duration-300 h-11 text-white bg-red-500 flex items-center justify-center mt-3 gap-2">
            Out of stock
          </div>
        </div>
      </div>
    </div>
    <div v-if="relatedProducts.length" class="mt-16 overflow-hidden">
      <h3 class="text-[36px] font-bold">You may also like</h3>

      <div
        class="gap-5 px-2 mt-[32px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductsCart :products="relatedData ?? []" />
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
