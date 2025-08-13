<template>
  <section class="py-20 bg-blue-pale/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bricolage-grotesque lg:text-5xl xl:text-6xl 2xl:text-[4rem] bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 bg-clip-text text-transparent whitespace-nowrap lg:whitespace-normal text-center mb-8 leading-loose mobile-large-title">
          Seedance 1.0 Pro Advanced Features
        </h2>
        <p class="mt-4 max-w-3xl mx-auto text-lg text-gray-400 sm:text-xl">
          Experience the proprietary technology that makes Seedance 1.0 Pro the industry-leading platform for professional AI video creation.
        </p>
      </div>

      <!-- Advantages Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div v-for="(feature, index) in mainFeatures" :key="index"
            class="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#7C3AED]/20 hover:border-[#7C3AED]/40">
          
          <div class="p-10 pb-4">
            <!-- Video Showcase -->
            <div class="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <div v-if="!showVideo[index]" class="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center" :style="{ backgroundImage: `url('${feature.poster}')` }">
                <button @click="playVideo(index)" class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white/20 transition-colors focus:outline-none ring-2 ring-white/20 hover:ring-white/40">
                  <svg class="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </button>
            </div>
            <video
              v-if="showVideo[index]"
              :src="feature.video" 
              class="w-full h-full object-cover"
              :poster="feature.poster"
              autoplay
              preload="auto"
              @click="pauseAndShowCover(index, $event)"
              @playing="onVideoPlaying(index)"
              playsinline
              webkit-playsinline
              x5-playsinline
              x5-video-player-type="h5"
              x5-video-player-fullscreen="false"
            ></video>
            <div v-if="videoLoading[index]" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <svg class="animate-spin h-12 w-12 text-[#7C3AED]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          </div>
          </div>

          <!-- Content -->
          <div class="px-10 pt-0 pb-10">
            <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- 添加开始创建按钮 -->
      <div class="text-center mt-16">
        <button
          @click="scrollToHero"
          class="inline-flex items-center px-8 py-4 bg-[#7C3AED]/50 text-white hover:bg-[#7C3AED]/90  rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
        >
          <span class="mr-2">🎬</span>
          Start Creating With Seedance 1.0 Pro
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  SparklesIcon,
  VideoCameraIcon,
  CursorArrowRaysIcon,
  ArrowPathIcon,
  FilmIcon,
  CommandLineIcon,
  ArrowsPointingOutIcon,
  ViewfinderCircleIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

defineOptions({
  name: 'FeatureShowcase'
})

// Main feature data with video demonstrations
const mainFeatures = [
  {
    title: "Industry-Leading Motion Fluidity",
    description: "Seedance 1.0 Pro delivers exceptional dynamic range with our proprietary physics engine, producing natural motion and cinematic stability even in complex action sequences.",
    icon: ArrowPathIcon,
    video: "https://resp.seedancepro.net/seedance/advantages/video/Performance.mp4",
    poster: "https://resp.seedancepro.net/seedance/advantages/images/Performance.webp",
  },
  {
    title: "Advanced Multi-Shot Storytelling",
    description: "Unlike basic AI generators, Seedance 1.0 Pro creates true narrative sequences with multiple camera angles while maintaining perfect consistency in subject identity, style, and atmosphere.",
    icon: FilmIcon,
    video: "https://resp.seedancepro.net/seedance/advantages/video/Multi-Camera.mp4",
    poster: "https://resp.seedancepro.net/seedance/advantages/images/Multi-Camera.webp",
  },
  {
    title: "Professional Style Control",
    description: "Seedance 1.0 Pro interprets sophisticated style directives with precision, rendering everything from photorealistic cinematography to cyberpunk aesthetics and hand-drawn animation with remarkable accuracy.",
    icon: SparklesIcon,
    video: "https://resp.seedancepro.net/seedance/advantages/video/Diverse-Stylized.mp4",
    poster: "https://resp.seedancepro.net/seedance/seedance/advantages/image/Diverse-Stylized.webp",
  },
  {
    title: "Director-Level Prompt Processing",
    description: "Seedance 1.0 Pro understands complex directorial instructions, translating detailed prompts into precise multi-subject interactions, sequential actions, and sophisticated camera movements.",
    icon: CommandLineIcon,
    video: "https://resp.seedancepro.net/seedance/advantages/video/Precise-Instruction.mp4",
    poster: "https://resp.seedancepro.net/seedance/advantages/images/Precise-Instruction.webp",
  }
];

// Technical features grid

// 控制每个视频是否显示
const showVideo = ref(mainFeatures.map(() => false));
const videoLoading = ref(mainFeatures.map(() => false));

function playVideo(idx: number) {
  showVideo.value = showVideo.value.map((_, i) => i === idx);
  videoLoading.value = videoLoading.value.map((_, i) => i === idx);
}

function pauseAndShowCover(idx: number, event: Event) {
  const video = event.target as HTMLVideoElement;
  video.pause();
  showVideo.value[idx] = false;
  videoLoading.value[idx] = false;
}

function onVideoPlaying(idx: number) {
  videoLoading.value[idx] = false;
}

// 跳转到首页
const scrollToHero = () => {
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* 渐变背景动画 */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style> 