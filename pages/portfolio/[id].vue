<template>
    <div class="min-h-screen bg-gray-900">
      <div class="pt-32 py-10 mx-auto w-11/12 max-w-4xl">
        <NuxtLink
          to="/portfolio"
          class="inline-flex items-center text-gray-300 hover:text-[#7C3AED] transition-colors mb-8 group font-medium"
        >
          <div class="w-3 h-3 border-l-2 border-b-2 border-gray-300 group-hover:border-[#7C3AED] transform rotate-45 mr-2 transition-colors"></div>
          Back to Portfolio
        </NuxtLink>
  
        <div v-if="pending" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C3AED]"></div>
        </div>
  
        <div v-else-if="portfolioItem" class="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <!-- Video Area -->
          <div class="relative aspect-video bg-black">
            <video
              :src="portfolioItem.generate"
              :poster="portfolioItem.origin"
              class="w-full h-full object-contain"
              controls
              @ended="onVideoEnded"
            ></video>
          </div>
  
          <!-- Info Area -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm text-gray-400">{{ formatDate(portfolioItem || {}) }}</p>
              </div>
              <button
                @click="goToCreate"
                class="bg-[#7C3AED] hover:bg-[#8B5CF6] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Create Similar
              </button>
            </div>
  
            <!-- Prompt -->
            <div class="mt-6">
              <h4 class="text-gray-300 font-medium mb-2">Prompt</h4>
              <div class="bg-gray-700 rounded-lg p-4">
                <p class="text-gray-200">{{ portfolioItem.prompt }}</p>
                <button
                  @click="copyPrompt"
                  class="mt-3 text-[#7C3AED] hover:text-[#8B5CF6] text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy Prompt
                </button>
              </div>
            </div>
  
            <!-- Parameters -->
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-gray-700 rounded-lg p-4">
                <h4 class="text-gray-400 text-sm mb-1">Resolution</h4>
                <p class="text-gray-200">{{ portfolioItem.resolution || '1080p' }}</p>
              </div>
              <div class="bg-gray-700 rounded-lg p-4">
                <h4 class="text-gray-400 text-sm mb-1">Duration</h4>
                <p class="text-gray-200">{{ (portfolioItem.duration || '5') + 's' }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div v-else class="text-center py-12">
          <p class="text-gray-400">The work does not exist or has been deleted.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getShareInfo } from '~/api';
  import { useAsyncData,useNuxtApp } from 'nuxt/app';
  const { $toast } = useNuxtApp() as any
  
  interface PortfolioItem {
    id: string;
    generate: string;
    origin: string;
    prompt: string;
    created?: number;
    resolution?: string;
    duration?: string;
    generation_time?: number;
    task_id?: string;
  }
  
  const route = useRoute();
  const router = useRouter();
  
  const id = route.params.id as string;
  
  const { data: portfolioItem, pending } = await useAsyncData(
    'portfolioItem',
    async () => {
      if (!id) {
        router.push('/404');
        return null;
      }
      const res = await getShareInfo(id);
      if (res.code === 200) {
        return res.data as PortfolioItem;
      } else {
        router.push('/404');
        return null;
      }
    }
  );
  
  // Format date to US format
  function formatDate(item: PortfolioItem) {
    if (item.created) {
      const date = new Date(item.created * 1000);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return '';
  }
  
  // Copy prompt with toast
  function copyPrompt() {
    if (!portfolioItem.value?.prompt) return;
    navigator.clipboard.writeText(portfolioItem.value.prompt);
    $toast.success('Copied!');
  }
  
  // Create similar
  function goToCreate() {
    if (!portfolioItem.value) return;
    const prompt = portfolioItem.value.prompt;
    const origin = portfolioItem.value.origin;
    navigator.clipboard.writeText(prompt);
    router.push({
      path: '/',
      query: {
        mode: origin ? 'image' : 'text',
        prompt: prompt,
        origin: origin || undefined
      }
    });
  }
  
  function onVideoEnded() {
    // Add logic if needed
  }
  
  function handleBackToList() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/portfolio');
    }
  }
  </script>
  
  <style scoped>
  .aspect-video {
    aspect-ratio: 16 / 9;
  }
  </style>