<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue';
</script>

<template>

 <div class='w-full min-h-screen h-fit bg-[#F5F6FA] flex flex-col items-center'>
  <div class='xl:max-w-[1240px] w-full'>
   <header class="fixed xl:max-w-[1240px] w-full bg-white border-b border-zinc-300  z-50">
    <Navbar />
   </header>

  <main class="mt-10">
    <RouterView/>
  </main>

  <footer></footer>
 </div>
 </div>

</template>

<style scoped></style>
