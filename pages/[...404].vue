<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center px-5 bg-gray-50">
    <h1 class="text-9xl font-bold text-gray-800 mb-5">404</h1>
    <p class="text-2xl text-gray-700 mb-2">Page Not Found</p>
    <p class="text-lg text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved</p>
    <div>
      <NuxtLink to="/" class="inline-block px-6 py-3 bg-[#00ffd1] text-black rounded-lg font-medium hover:bg-[#00e6bc]">Return to Homepage</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '~/composables/useSeo';
useSeo({
  title: 'Page Not Found - 404 Error',
  description: 'The requested page could not be found. Please return to homepage or use navigation menu.'
})
</script>

<style scoped>

</style> 