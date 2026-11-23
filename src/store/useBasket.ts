import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { Product } from "@/types/Products";

export interface BasketItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
  quantity: number;
}

function loadBasket(): BasketItem[] {
  try {
    return JSON.parse(localStorage.getItem('basket') ?? "[]");
  } catch {
    return [];
  }
}

export const useBasketStore = defineStore("basket", () => {
  const items = ref<BasketItem[]>(loadBasket());

  watch(
    items,
    (value) => localStorage.setItem('basket', JSON.stringify(value)),
    { deep: true },
  );

  const addItem = (product: Product, quantity = 1) => {
    const existing = items.value.find((i) => i.id === Number(product.id));

    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    } else {
      items.value.push({
        id: Number(product.id),
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity: Math.min(quantity, product.stock)
      });
    }
  };

  const removeItem = (id: number) => {
    items.value = items.value.filter((i) => i.id !== id);
  };

  const clearBasket = () => {
    items.value = [];
  };

  const totalCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0),
  );

  const increase = (id: number) => {
  const item = items.value.find((i) => i.id === id);
  if (item && item.quantity < item.stock) item.quantity++;
};

const decrease = (id: number) => {
  const item = items.value.find((i) => i.id === id);
  if (item && item.quantity > 1) item.quantity--;
};

  return { items, addItem, removeItem, clearBasket, totalCount, totalPrice, increase, decrease };
});