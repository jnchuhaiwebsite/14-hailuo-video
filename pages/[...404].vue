<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-white mb-4">404</h1>
      <p class="text-xl text-gray-400 mb-8">Page not found</p>
      <NuxtLink to="/" class="inline-block px-6 py-3 bg-[#7C3AED] text-white rounded-lg font-medium hover:bg-[#8B5CF6]">Return to Homepage</NuxtLink>
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