<template>
    <section class="py-20 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            Discover Creative Works from the SeedancePro Community
          </h2>
          <p class="mt-4 text-xl text-gray-300">
            From cinematic sci-fi flights to fantasy warrior animations, these videos are created entirely by SeedancePro users using only text or image prompts. Explore their imagination, get inspired, and start crafting your own AI-powered stories.
          </p>
        </div>
        <div v-if="isLoading" class="mt-16 flex justify-center items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#04dcb7]"></div>
        </div>
        <div v-else class="mt-16 columns-1 sm:columns-2 md:columns-3 gap-6">
          <div
            v-for="(item, idx) in portfolioItems"
            :key="idx"
            class="mb-6 break-inside-avoid bg-gray-800 rounded-lg overflow-hidden shadow-xl flex flex-col"
            style="width:auto;"
          >
            <div class="relative flex items-center justify-center bg-black">
              <video
                :src="item.generate"
                :poster="item.origin"
                class="w-full h-auto min-h-[200px]"
                :preload="item.origin?'none':'metadata'"
                @ended="onVideoEnded"
                @click="playVideo(idx)"
                @loadstart="onLoadStart(idx)"
                @canplay="onCanPlay(idx)"
                @error="onVideoError(idx)"
                @waiting="onVideoWaiting(idx)"
                @playing="onVideoPlaying(idx)"
                @pause="onVideoPause(idx)"
                ref="videoRefs"
                playsinline
                webkit-playsinline
                x5-playsinline
                x5-video-player-type="h5"
                x5-video-player-fullscreen="false"
              ></video>
              <div
                v-if="videoLoading[idx]"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10"
              >
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#04dcb7]"></div>
              </div>
              <button 
                v-if="playingIndex !== idx"
                class="absolute inset-0 flex items-center justify-center w-full h-full focus:outline-none" 
                @click.stop="playVideo(idx)"
              >
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            </div>
            <div class="p-4 pb-0 text-gray-200 text-left text-base flex items-center" style="display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
              {{ item.prompt }}
            </div>
            <div class="px-4 pb-4 flex justify-end items-center gap-2">
              <button
                @click="goToCreate(idx)"
                class="bg-[#04dcb7] hover:bg-[#03c0a3] text-black text-sm px-3 py-1 mt-3 rounded transition-colors focus:outline-none"
              >
                Create Similar
              </button>
              <button
                @click="goToDetail(idx)"
                class="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 mt-3 rounded transition-colors focus:outline-none"
              >
                View Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-if="detailDialog.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div class="bg-gray-900 rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        <button @click="closeDetail" class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl">&times;</button>
        <div v-if="detailDialog.item">
          <div class="mb-4 flex justify-center">
            <video v-if="detailDialog.item.generate" :src="detailDialog.item.generate" controls class="w-full max-h-64 rounded" />
            <img v-else-if="detailDialog.item.origin" :src="detailDialog.item.origin" class="w-full max-h-64 rounded" />
          </div>
          <div class="mb-2 text-gray-200"><b>Prompt:</b> {{ detailDialog.item.prompt }}</div>
          <div class="mb-2 text-gray-400"><b>User:</b> {{ detailDialog.item.userName }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getUserOpus } from '~/api';
  import { useAsyncData } from 'nuxt/app';
  import { useNuxtApp } from 'nuxt/app'
  import { useSeo } from '~/composables/useSeo';


useSeo({
  title: "Explore AI Video Inspiration – | Created with Seedance Pro",
  description: "Discover cinematic AI videos made by Seedance Pro users. Get inspired and create your own from text or images—fast, creative, and free to try."
});


  const { $toast } = useNuxtApp() as any
  
  interface PortfolioItem {
    generate: string;
    origin: string;
    prompt: string;
    userName: string;
  }
  
  const router = useRouter();
  
  const { data: portfolioItems, pending: isLoading, error } = await useAsyncData(
    'portfolioItems',
    async () => {
      const res = await getUserOpus();
      if (res.code === 200) {
        return res.data as PortfolioItem[];
      }
      return [];
    }
  );
  
  const playingIndex = ref<number|null>(null);
  const detailDialog = ref<{ show: boolean; item: PortfolioItem | null }>({ show: false, item: null });
  const videoLoading = ref<{ [key: number]: boolean }>({});
  const videoRefs = ref<HTMLVideoElement[]>([]);
  
  function playVideo(idx: number) {
    try {
      const videoElement = videoRefs.value[idx];
      if (!videoElement) return;

      if (playingIndex.value === idx) {
        // 暂停视频
        videoElement.pause();
        playingIndex.value = null;
        videoLoading.value[idx] = false;
      } else {
        // 暂停其他正在播放的视频
        if (playingIndex.value !== null) {
          const currentVideo = videoRefs.value[playingIndex.value];
          if (currentVideo) {
            currentVideo.pause();
            videoLoading.value[playingIndex.value] = false;
          }
        }

        // 播放新视频
        videoLoading.value[idx] = true;
        playingIndex.value = idx;
        
        // 尝试播放视频
        videoElement.play().catch((error) => {
          console.error('Video playback error:', error);
          videoLoading.value[idx] = false;
          playingIndex.value = null;
        });
      }
    } catch(err) {
      console.error(err);
      videoLoading.value[idx] = false;
      playingIndex.value = null;
    }
  }
  
  // 视频开始加载
  function onLoadStart(idx: number) {
    if (playingIndex.value === idx) {
      videoLoading.value[idx] = true;
    }
  }
  
  // 视频可以播放
  function onCanPlay(idx: number) {
    if (playingIndex.value === idx) {
      videoLoading.value[idx] = false;
    }
  }
  
  // 视频等待缓冲
  function onVideoWaiting(idx: number) {
    if (playingIndex.value === idx) {
      videoLoading.value[idx] = true;
    }
  }
  
  // 视频开始播放
  function onVideoPlaying(idx: number) {
    if (playingIndex.value === idx) {
      videoLoading.value[idx] = false;
    }
  }
  
  // 视频暂停
  function onVideoPause(idx: number) {
    if (playingIndex.value === idx) {
      videoLoading.value[idx] = false;
    }
  }
  
  // 视频播放结束
  function onVideoEnded() {
    playingIndex.value = null;
    // 清除所有视频的 loading 状态
    Object.keys(videoLoading.value).forEach(key => {
      videoLoading.value[Number(key)] = false;
    });
  }
  
  // 视频加载错误
  function onVideoError(idx: number) {
    videoLoading.value[idx] = false;
    playingIndex.value = null;
    console.error(`Video loading error for index ${idx}`);
  }
  
  // 组件卸载时清理
  onUnmounted(() => {
    // 暂停所有视频
    videoRefs.value.forEach(video => {
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    });
    playingIndex.value = null;
    // 清除所有 loading 状态
    Object.keys(videoLoading.value).forEach(key => {
      videoLoading.value[Number(key)] = false;
    });
  });
  
  function copyDesc(idx: number) {
    const items = portfolioItems.value || [];
    navigator.clipboard.writeText(items[idx]?.prompt || '');
    $toast.success('Copied to clipboard');
  }
  
  function goToCreate(idx: number) {
    const items = portfolioItems.value || [];
    const prompt = items[idx]?.prompt || '';
    const origin = items[idx]?.origin || '';
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
  
  function goToDetail(idx: number) {
    const items = portfolioItems.value || [];
    const id = (items[idx] as any)?.task_id;
    if (id) {
      router.push(`/portfolio/${id}`);
    } else {
      $toast.error('Failed to get task ID');
    }
  }
  
  function showDetail(idx: number) {
    const items = portfolioItems.value || [];
    detailDialog.value = { show: true, item: items[idx] };
  }
  
  function closeDetail() {
    detailDialog.value = { show: false, item: null };
  }
  
  // 让模板能访问 videoLoading
  // eslint-disable-next-line no-undef
  defineExpose({ videoLoading });
  </script>
  
  <style scoped>
  .break-inside-avoid {
    break-inside: avoid;
  }
  </style> 