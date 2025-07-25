<template>
  <div class="flex flex-col min-h-screen justify-between">
    <Navbar/>
    <slot />
    <Footer />
    <BackToTop />
    <DelayedAnalytics />
  </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent } from 'vue'
import Navbar from '~/components/Navbar.vue'

const Footer = defineAsyncComponent(() => import('~/components/Footer.vue'))
// 异步组件
const BackToTop = defineAsyncComponent(() => import('~/components/BackToTop.vue'))
// 延迟加载分析组件
const DelayedAnalytics = defineAsyncComponent(() => import('~/components/DelayedAnalytics.vue'))

</script>