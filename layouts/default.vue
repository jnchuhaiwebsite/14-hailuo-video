<template>
  <div class="flex flex-col min-h-screen justify-between">
    <Navbar/>
    <slot />
    <Footer />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent } from 'vue'
import Navbar from '~/components/Navbar.vue'

const Footer = defineAsyncComponent(() => import('~/components/Footer.vue'))
// 异步组件
const BackToTop = defineAsyncComponent(() => import('~/components/BackToTop.vue'))

</script>