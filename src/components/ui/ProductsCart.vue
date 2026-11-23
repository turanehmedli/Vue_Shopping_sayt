<script setup lang="ts">
import { useBasketStore } from "@/store/useBasket";
import type { Product } from "@/types/Products";
import { useRouter } from "vue-router";

defineProps<{
  products: Product[];
}>();

const router = useRouter()
const basket = useBasketStore()

const addToBasket = (e:any,item:Product)=>{
  e.stopPropagation();
  basket.addItem(item)
  
}

const navigate = (id:any)=> {
    router.push(`/products/${id}`)
}

</script>

<template>
  <div
    v-for="items in products"
    :key="items.id"
    
    @click='navigate(items.id)'
    class="relative max-w-[274px] w-full max-h-[443px] h-full overflow-hidden border border-zinc-300 shadow-md rounded-lg group cursor-pointer hover:scale-105 ease-in-out duration-300"
  >
    
    <div
      class="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-12"
    >
      <img class="bg-zinc-200 " :src="items.thumbnail" />

      <div class="gap-3 p-3.5  flex items-center justify-between">
        <h2 class="text-sm font-semibold w-full truncate">{{ items.title }}</h2>
        
        <p class="font-semibold tracking-tighter">${{items.price}}</p>
      </div>
    </div>

    
    <button
      @click="(e)=> addToBasket(e, items)"
      class="absolute inset-x-5 bottom-4 border p-2 translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 rounded-lg bg-black text-white cursor-pointer hover:bg-black/60 hover:scale-105 active:scale-100"
    >
      Add to basket
    </button>
  </div>
</template>

<style lang=""></style>
