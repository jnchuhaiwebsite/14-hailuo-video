<template>
    <section class="py-20 bg-blue-pale/80 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            Hailuo AI Video Inspiration Community
          </h2>
          <p class="mt-4 text-xl text-gray-300">
            From cinematic sci-fi flights to fantasy warrior animations, these videos are created entirely by Hailuo02 Video users using only text or image prompts. Explore their imagination, get inspired, and start crafting your own AI-powered stories.
          </p>
        </div>
        <div v-if="pending" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C3AED]"></div>
        </div>
        <div v-else class="mt-16 columns-1 sm:columns-2 md:columns-3 gap-6">
          <div
            v-for="(item, idx) in portfolioItems"
            :key="idx"
            class="mb-6 break-inside-avoid bg-gray-800 rounded-lg overflow-hidden shadow-xl flex flex-col relative"
            style="width:auto;"
            @mouseenter="handleMouseEnter(idx)"
            @mouseleave="handleMouseLeave(idx)"
          >
            <div class="relative flex items-center justify-center bg-black"
                 @click="goToDetail(item)">
              <video
                :src="item.generate"
                :poster="item.origin"
                class="w-full h-auto min-h-[200px] object-cover max-h-[500px]"
                :preload="item.origin?'none':'metadata'"
                @loadstart="onLoadStart(idx)"
                @canplay="onCanPlay(idx)"
                @error="onVideoError(idx)"
                @waiting="onVideoWaiting(idx)"
                @playing="onVideoPlaying(idx)"
                ref="videoRefs"
                playsinline
                webkit-playsinline
                x5-playsinline
                x5-video-player-type="h5"
                x5-video-player-fullscreen="false"
                muted
                loop
              ></video>
              <div
                v-if="videoLoading[idx]"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10"
              >
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C3AED]"></div>
              </div>
            </div>
            <div
                v-if="hoveredIndex === idx"
                class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
            >
                <p class="text-white text-sm" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                    {{ item.prompt }}
                </p>
                <div class="mt-2 flex justify-end items-center gap-2">
                    <button
                        @click="copyDesc(idx)"
                        class="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded transition-colors focus:outline-none"
                    >
                        Copy Prompt
                    </button>
                    <button
                        @click="goToCreate(idx)"
                        class="bg-[#7C3AED] hover:bg-[#8B5CF6] text-white text-sm px-3 py-1 rounded transition-colors focus:outline-none"
                    >
                        Create Similar
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getUserOpus } from '~/api';
  import { useAsyncData } from 'nuxt/app';
  import { useNuxtApp } from 'nuxt/app'
  import { useSeo } from '~/composables/useSeo';


  useSeo({
    // title: "Explore AI Video Creations | Inspiration & Showcase - Hailuo 02 AI",
    title: "Hailuo AI Video Inspiration |  Inspiration & Showcase",
    description: "Discover cinematic AI videos made by Hailuo AI Video users. Get inspired and create your own from text or images—fast, creative, and free to try."
  });


  const { $toast } = useNuxtApp() as any
  
  interface PortfolioItem {
    generate: string;
    origin: string;
    prompt: string;
    userName: string;
    task_id?: string; // Added task_id to the interface
  }
  
  const router = useRouter();
  
  const { data: portfolioItems, pending } = await useAsyncData(
    'portfolioItems',
    async () => {
      const res = await getUserOpus();
      if (res.code === 200) {
        return res.data as PortfolioItem[];
      }
      return [];
    }
  );
  
  const hoveredIndex = ref<number|null>(null);
  const videoLoading = ref<{ [key: number]: boolean }>({});
  const videoRefs = ref<HTMLVideoElement[]>([]);

  const handleMouseEnter = (idx: number) => {
    hoveredIndex.value = idx;
    const video = videoRefs.value[idx];
    if (video) {
        video.play().catch(e => console.error("Video play error:", e));
    }
  };

  const handleMouseLeave = (idx: number) => {
    hoveredIndex.value = null;
    const video = videoRefs.value[idx];
    if (video) {
        video.pause();
    }
  };
  
  // 视频开始加载
  function onLoadStart(idx: number) {
    if (hoveredIndex.value === idx) {
      videoLoading.value[idx] = true;
    }
  }
  
  // 视频可以播放
  function onCanPlay(idx: number) {
    if (hoveredIndex.value === idx) {
      videoLoading.value[idx] = false;
    }
  }
  
  // 视频等待缓冲
  function onVideoWaiting(idx: number) {
    if (hoveredIndex.value === idx) {
      videoLoading.value[idx] = true;
    }
  }
  
  // 视频开始播放
  function onVideoPlaying(idx: number) {
    if (hoveredIndex.value === idx) {
      videoLoading.value[idx] = false;
    }
  }
  
  // 视频加载错误
  function onVideoError(idx: number) {
    videoLoading.value[idx] = false;
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
    hoveredIndex.value = null;
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
      path: '/hailuo-ai-video-generator',
      query: {
        mode: origin ? 'image' : 'text',
        prompt: prompt,
        origin: origin || undefined
      }
    });
  }

  function goToDetail(item: PortfolioItem) {
    if (item.task_id) {
      router.push({
        path: `/portfolio/${item.task_id}`,
      });
    }
  }
  </script>
  
  <style>
  .break-inside-avoid {
    break-inside: avoid;
  }
  </style> 