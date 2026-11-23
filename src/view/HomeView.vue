<script setup lang='ts'>
import ProductsCarts from '@/components/ui/ProductsCarts.vue';
import HomeImage from '@/asset/HomeImage.png'

const scrollToHome = (id:string)=>{
    document.getElementById(id)?.scrollIntoView({
        behavior:'smooth'
    })
}

</script>

<template>
    <div class='w-full h-full flex flex-col'>
        <div class='w-full flex flex-col md:flex-row'>
            <div class='px-[48px] pt-10'>
                <h2 class='lg:text-[76px] md:text-[40px] text-4xl font-bold'>A handmade touch for your home.</h2>
                <p class='sm:text-[20px] text-[#101828] mt-6'>Mugs, vases and bowls. Each piece is shaped one by one in our small studio and sent to you with care.</p>
                <button @click="scrollToHome('home')" class='rounded-full bg-black font-bold text-white cursor-pointer hover:bg-black/60 ease-in-out duration-300 hover:scale-105 active:scale-100 px-[32px] py-3 mt-6'>Start Shopping</button>
            </div>
            <div class='w-full p-9'>
                <img class='w-full h-full object-cover' :src='HomeImage'/>
            </div>


        </div>

        <ProductsCarts ></ProductsCarts>
    </div>
</template>

<style lang="">
    
</style>