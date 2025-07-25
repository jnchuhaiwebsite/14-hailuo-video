<template>
  <nav aria-label="Breadcrumb" class="text-sm pt-6">
    <div class="max-w-7xl mx-auto px-4">
      <ol class="inline-flex items-center space-x-1 md:space-x-2">
        <li class="inline-flex items-center">
          <NuxtLink to="/" class="inline-flex items-center font-medium text-gray-400 hover:text-white">
            <svg class="w-4 h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Hailuo Ai
          </NuxtLink>
        </li>
        <li v-for="(item, index) in items" :key="index" aria-current="page">
          <div class="flex items-center">
            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <NuxtLink v-if="item.to" :to="item.to" class="ms-1 font-medium text-gray-400 hover:text-white md:ms-2">{{ item.text }}</NuxtLink>
            <span v-else class="ms-1 font-medium text-gray-500 md:ms-2">{{ item.text }}</span>
          </div>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  text: string;
  to?: string; // `to` 对于最后一项是可选的
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script> 