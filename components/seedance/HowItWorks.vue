<template>
  <section class="py-20 bg-blue-pale/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-4xl font-bricolage-grotesque lg:text-5xl xl:text-6xl 2xl:text-[4rem] bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 bg-clip-text text-transparent whitespace-nowrap lg:whitespace-normal text-center mb-8 leading-loose mobile-large-title">
         How Seedance 1.0 Pro Works
        </h2>
        <p class="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
          Create professional multi-shot videos in minutes with Seedance 1.0 Pro's intuitive three-step process - no technical expertise required.
        </p>
      </div>

      <div class="mt-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div v-for="(step, index) in steps" :key="index" 
               class="relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl border border-gray-700/50 hover:border-[#7C3AED]/40 transition-all duration-300 hover:transform hover:scale-105 group">
            <div class="absolute -top-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-full flex items-center justify-center text-gray-900 text-lg sm:text-xl font-bold shadow-lg group-hover:shadow-[#7C3AED]/25 transition-all duration-300">
              {{ index + 1 }}
            </div>
            <div class="mt-4">
              <div class="flex items-center space-x-2 sm:space-x-3">
                <component :is="step.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-[#7C3AED]" />
                <h3 class="text-lg sm:text-xl font-semibold text-white">{{ step.title }}</h3>
              </div>
              <p class="mt-2 text-gray-400 text-sm sm:text-base">{{ step.description }}</p>
              <div v-if="step.specs" class="mt-4 pt-4 border-t border-gray-700/50">
                <p class="text-xs sm:text-sm text-[#7C3AED]">{{ step.specs }}</p>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { 
  CommandLineIcon, 
  PhotoIcon, 
  VideoCameraIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'

const steps = [
  {
    title: "Select Your Creation Method",
    description: "Begin with either a detailed text prompt or your own image as the foundation for Seedance 1.0 Pro's advanced video generation",
    icon: CommandLineIcon,
    specs: "Text-to-video & Image-to-video capabilities"
  },
  {
    title: "Customize Video Parameters",
    description: "Fine-tune your production with professional settings for resolution, aspect ratio, and duration to match your exact creative vision",
    icon: AdjustmentsHorizontalIcon,
    specs: "1080p HD quality, 6 aspect ratios, flexible duration options"
  },
  {
    title: "Generate Professional Results",
    description: "Watch as Seedance 1.0 Pro transforms your input into cinema-quality video with seamless multi-shot narratives and fluid motion transitions",
    icon: ArrowDownTrayIcon,
    specs: "Coherent storytelling, professional cinematography, instant downloads"
  }
];
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 