<script setup lang="ts">
import { useBasketStore } from "@/store/useBasket";
import { Plus, Minus, Trash2 } from "@lucide/vue";

const basket = useBasketStore();
</script>

<template>
  <div
    class="w-full h-full flex md:flex-row flex-col md:py-[56px] md:px-[48px] py-[20px] px-[20px] gap-[32px] md:my-0 my-17"
  >
    <div class="flex w-full flex-col gap-5">
      <div>
        <h2 class="font-bold text-[52px]">My Cart</h2>
      </div>

      <div class="w-full flex md:flex-row flex-col gap-3">
        <div class="flex w-full flex-col gap-4">
          <div
            v-if="basket.items.length === 0"
            class="rounded-2xl border border-zinc-300 py-16 text-center text-zinc-500"
          >
            Your cart is empty
          </div>
          <div
            v-for="items in basket.items"
            :key="items.id"
            class="grid grid-cols-4  items-center gap-4 rounded-2xl lg:grid-cols-6 border border-zinc-200 bg-white p-4
          transition-shadow duration-300 hover:shadow-md shadow-sm"
          >
            <img
              class="size-[88px] rounded-lg bg-zinc-200  object-cover"
              :src="items.thumbnail"
              alt=""
            />
            <div class="col-span-3 lg:col-span-2 min-w-0">
              <h3 class="font-semibold">
                {{ items.title }}
              </h3>
              <span class="mt-1 text-sm text-zinc-500">${{ items.price }}</span>
            </div>

            <div
              class="col-span-2 lg:col-span-1 justify-self-start lg:justify-self-center flex h-11 w-32 items-center justify-between rounded-full border border-zinc-300 px-1.5"
            >
              <button
                @click="basket.decrease(items.id)"
                class="size-8 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors cursor-pointer active:scale-95"
              >
                <Minus class="size-4" />
              </button>
              <span class="w-6 text-center font-semibold">{{
                items.quantity
              }}</span>
              <button
                @click="basket.increase(items.id)"
                class="size-8 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors cursor-pointer active:scale-95"
              >
                <Plus class="size-4" />
              </button>
            </div>

            <div
              class="col-span-2 lg:col-span-2 min-w-0 flex items-center justify-end gap-3"
            >
              <p class="font-bold md:text-lg">
                ${{ (items.price * items.quantity).toFixed(2) }}
              </p>
              <button
                @click="basket.removeItem(items.id)"
                class="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 class="size-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="w-full md:w-[420px] md:top-6 h-fit rounded-2xl border border-zinc-200 bg-zinc-50 p-6 lg:p-8 shadow-sm"
        >
          <h5 class="text-xl lg:text-2xl font-bold">Order summary</h5>

          <div class="mt-6 flex flex-col gap-3 text-sm lg:text-base">
            <div class="flex items-center justify-between text-zinc-600">
              <span>Items ({{ basket.totalCount }})</span>
              <span>${{ basket.totalPrice.toFixed(2) }}</span>
            </div>

            <div class="flex items-center justify-between text-zinc-600">
              <span>Shipping</span>
              <span class="font-medium text-emerald-600">Free</span>
            </div>
          </div>

          <div class="my-5 border-t border border-zinc-300"></div>

          <div class="flex items-end justify-between">
            <span class="font-semibold text-zinc-700">Total</span>
            <span class="text-xl font-bold tracking-tight">
              ${{ basket.totalPrice.toFixed(2) }}
            </span>
          </div>

          <button
            @click="basket.clearBasket"
            :disabled="basket.items.length === 0"
            class="mt-6 w-full rounded-xl bg-black disabled:cursor-not-allowed py-3.5 font-semibold text-white transition-all duration-200 cursor-pointer hover:bg-zinc-800 active:scale-95 disabled:bg-zinc-300"
          >
            Place the order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
