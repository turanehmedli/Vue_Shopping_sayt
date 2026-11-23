<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { Search, ShoppingCart, X } from "@lucide/vue";
import { useBasketStore } from "@/store/useBasket";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import api from "@/api/axios";
import type { Product } from "@/types/Products";

const router = useRouter();
const route = useRoute();
const basket = useBasketStore();

const search = ref("");
const debounced = ref("");
const open = ref(false);
const wrapper = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout>;

const enabled = computed(() => debounced.value.length >= 2);
const isDropdownVisible = computed(()=> open.value && enabled.value)

const { data, isFetching } = useQuery({
  queryKey: ["search", debounced],
  queryFn: async () => {
    const res = await api.get("/products/search", {
      params: { q: debounced.value, limit: 6 },
    });
    console.log(res.data)
    return res.data.products as Product[];
  },
});

const results = computed(() => (enabled.value ? (data.value ?? []) : []));

watch(search, (value) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    debounced.value = value.trim();
  }, 500);
});

watch( isDropdownVisible, (visible)=>{
 document.body.style.overflow = visible ?'hidden':''
})

console.log(results)

const clear = () => {
  search.value = "";
  debounced.value = "";
};

watch(
  () => route.fullPath,
  () => {
    open.value = false;
    clear();
  },
);

const closeModal = (e: MouseEvent) => {
  if (wrapper.value && !wrapper.value.contains(e.target as Node)) {
    open.value = false;
  }
};

onMounted(() => document.addEventListener("click", closeModal));

onBeforeUnmount(() => {
  document.removeEventListener("click", closeModal);
  document.body.style.overflow = ""
});
</script>

<template>
  <div class="w-full items-center justify-between sm:px-10 px-4 py-3 flex">
    <h2 @click="router.push('/')" class="font-bold text-2xl cursor-pointer">
      Kil
    </h2>

    <div class="flex items-center gap-3 md:gap-5">
      <div ref="wrapper" class="relative w-44 sm:w-60 md:w-75">
        <Search
          class="pointer-events-none absolute left-3 size-4 top-1/3 text-zinc-400"
        />
        <input
          v-model="search"
          @focus="open = true"
          @keydown.esc="open = false"
          class="w-full rounded-full border border-zinc-300 py-2 pl-9 pr-9 text-sm outline-none transition-colors focus:border-zinc-800"
          placeholder="Search..."
        />
        <button
          v-if="search"
          @click="clear"
          aria-label="Clear search"
          class="absolute right-2 top-1/5 flex size-6 cursor-pointer items-center justify-center rounded-full text-black hover:bg-black/30"
        >
          <X class="size-4" />
        </button>

        <div
          class="absolute right-0 top-full z-50 mt-2 w-70 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg"
          v-if="open && enabled"
        >
          <p
            v-if="isFetching && !results.length"
            class="p-4 text-sm text-zinc-500"
          >
            Searching...
          </p>

          <p v-else-if="!results.length" class="p-4 text-sm text-zinc-500">
            No results for "{{ debounced }}"
          </p>

          <div v-else class="max-h-96 overflow-y-auto scrollbar-none py-1">
            <div
              v-for="item in results"
              :key="item.id"
              @click="router.push(`/products/${item.id}`)"
              class="flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors hover:bg-zinc-100"
            >
              <img
                :src="item.thumbnail"
                class="size-12 shrink-0 rounded-lg bg-zinc-100 object-cover"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold">{{ item.title }}</p>
                <p class="text-xs text-zinc-500">{{ item.category }}</p>
              </div>
              <p class="text-sm font-bold ">
                ${{ Number(item.price).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="route.path !== '/basket'"
        @click="router.push('/basket')"
        class="relative hover:bg-zinc-500/30 transition-all duration-300 p-2 rounded-full"
      >
        <ShoppingCart class="cursor-pointer"></ShoppingCart>

        <span
          v-if="basket.totalCount"
          class="absolute border bg-red-500 top-1 right-1 size-3 rounded-full"
        ></span>
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
