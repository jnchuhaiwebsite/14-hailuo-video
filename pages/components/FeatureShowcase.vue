<template>
  <section class="py-20 bg-blue-pale">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-[#7C3AED] sm:text-5xl">
          Hailuo 02 Core Features
        </h2>
        <p class="mt-4 text-xl text-gray-300">
          Revolutionary AI Video Generation Capabilities
        </p>
      </div>

      <!-- Feature showcase list -->
      <div class="space-y-24 mb-24">
        <div v-for="(feature, index) in mainFeatures" :key="index" 
             class="flex flex-col md:flex-row gap-12 items-center"
             :class="{ 'md:flex-row-reverse': index % 2 !== 0 }">
          <!-- Text content -->
          <div class="w-full md:w-1/2 space-y-6">
            <div class="inline-block p-3 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-lg">
              <component :is="feature.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-[#7C3AED]">{{ feature.title }}</h3>
            <p class="text-gray-300 text-lg">{{ feature.description }}</p>
            <ul class="space-y-3">
              <li v-for="(point, pIndex) in feature.points" :key="pIndex" 
                  class="flex items-center text-gray-300">
                <span class="mr-2 text-[#7C3AED]">✓</span>
                {{ point }}
              </li>
            </ul>
          </div>

          <!-- Video showcase -->
          <div class="w-full md:w-1/2">
            <div class="relative bg-blue-pale/80 shadow-xl w-full max-w-md mx-auto rounded-xl overflow-hidden aspect-video">
              <div v-if="!showVideo[index]" class="absolute inset-0 w-full h-full flex items-center justify-center bg-blue-pale" :style="`background-image: url('${feature.poster}'); background-size: cover; background-position: center;`">
                <button 
                  class="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors focus:outline-none"
                  @click="playVideo(index)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              <video
                v-if="showVideo[index]"
                :src="feature.video" 
                class="w-full h-full object-cover rounded-xl"
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
              <div v-if="videoLoading[index]" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
                <svg class="animate-spin h-12 w-12 text-[#00ffd1]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <svg class="animate-spin h-12 w-12 text-[#7C3AED]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Technical specifications -->
      <div class="mt-16">
        <h3 class="text-3xl font-bold text-[#7C3AED] text-center mb-12">Technical Specifications</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <div v-for="feature in techFeatures" :key="feature.title" 
               class="bg-blue-pale/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-[#7C3AED] w-full max-w-sm">
            <div class="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-lg flex items-center justify-center">
              <component :is="feature.icon" class="w-6 h-6 text-white" />
            </div>
            <h4 class="text-lg font-semibold text-white mt-4 mb-2">{{ feature.title }}</h4>
            <p class="text-gray-300 text-sm mb-2">{{ feature.description }}</p>
            <p class="text-sm text-[#7C3AED]">{{ feature.specs }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-16">
        <button
          @click="scrollToHero"
          class="inline-flex items-center px-8 py-4 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
        >
          Start Creating Now
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
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
  ClockIcon,
  BoltIcon
} from '@heroicons/vue/24/outline'

defineOptions({
  name: 'FeatureShowcase'
})

// Main feature data with video demonstrations - keeping only 3 features
const mainFeatures = [
  {
    title: "Revolutionary Architecture Performance",
    description: "Hailuo 02 features a complete reconstruction of the underlying architecture, achieving 2.5x improvements in both training and inference efficiency. This breakthrough technology enables faster processing and higher quality video generation.",
    icon: BoltIcon,
    video: "https://resource.hailuo2.com/seedance/video/seedancepro-smooth-and-stable-athletic-performance.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/seedancepro-smooth-and-stable-athletic-performance.jpg",
    points: [
      "2.5x efficiency improvement",
      "Complete architecture reconstruction",
      "Faster processing speed",
      "Enhanced model performance"
    ]
  },
  {
    title: "Complex Instruction Response",
    description: "Hailuo 02 achieves an 85% complex instruction response rate, significantly outperforming competitors. The model can handle extreme physical scenarios and generate videos with complex multi-subject interactions and detailed motion sequences.",
    icon: CommandLineIcon,
    video: "https://resource.hailuo2.com/seedance/video/seedancepro-accurate-semantic-understanding-and-instruction-adherence.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/seedancepro-accurate-semantic-understanding-and-instruction-adherence.jpg",
    points: [
      "85% instruction response rate",
      "Extreme physical scenarios",
      "Complex multi-subject interactions",
      "Detailed motion sequences"
    ]
  },
  {
    title: "Exceptional Cost Efficiency",
    description: "Hailuo 02 offers the lowest price among first-tier models while maintaining exceptional quality. With support for 6-second and 10-second videos at 768P and 1080P resolutions, it provides unmatched value for professional video creation.",
    icon: SparklesIcon,
    video: "https://resource.hailuo2.com/seedance/video/seedancepro-diverse-stylized-expression.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/seedancepro-diverse-stylized-expression.jpg",
    points: [
      "Lowest price in first-tier",
      "768P and 1080P quality",
      "6s and 10s duration options",
      "Professional-grade output"
    ]
  }
];

// Technical features grid - removed aspect ratio feature
const techFeatures = [
  {
    title: "High Resolution Output",
    description: "Generate stunning 768P and 1080P videos with cinematic quality and rich details",
    icon: ArrowsPointingOutIcon,
    specs: "768P, 1080P resolution"
  },
  {
    title: "Dual Generation Modes",
    description: "Create videos from text prompts or transform images into dynamic video content",
    icon: ClockIcon,
    specs: "Text-to-video & Image-to-video"
  },
  {
    title: "Fast Processing",
    description: "Advanced AI processing with 1-2 minute generation time and 85% instruction response rate",
    icon: ArrowPathIcon,
    specs: "7-10 minutes processing time"
  }
];

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