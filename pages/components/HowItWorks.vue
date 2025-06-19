<template>
  <section class="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffd1] to-[#00ffd1]/50 sm:text-5xl animate-fade-in">
          How Seedance Pro AI Video Generator Works
        </h2>
        <p class="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
          Experience the power of AI-driven multi-shot video generation with our advanced model
        </p>
      </div>

      <div class="mt-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div v-for="(step, index) in steps" :key="index" 
               class="relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl border border-gray-700/50 hover:border-[#00ffd1]/50 transition-all duration-300 hover:transform hover:scale-105 group">
            <div class="absolute -top-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#00ffd1] to-[#00ffd1]/50 rounded-full flex items-center justify-center text-gray-900 text-lg sm:text-xl font-bold shadow-lg group-hover:shadow-[#00ffd1]/25 transition-all duration-300">
              {{ index + 1 }}
            </div>
            <div class="mt-4">
              <div class="flex items-center space-x-2 sm:space-x-3">
                <component :is="step.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-[#00ffd1]" />
                <h3 class="text-lg sm:text-xl font-semibold text-white">{{ step.title }}</h3>
              </div>
              <p class="mt-2 text-gray-400 text-sm sm:text-base">{{ step.description }}</p>
              <div v-if="step.specs" class="mt-4 pt-4 border-t border-gray-700/50">
                <p class="text-xs sm:text-sm text-[#00ffd1]">{{ step.specs }}</p>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ffd1] to-[#00ffd1]/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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
  ArrowPathIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'

const steps = [
  {
    title: "Select Input Method",
    description: "Choose between text prompts or image upload to start your video generation journey",
    icon: CommandLineIcon,
    specs: "Text-to-video or Image-to-video"
  },
  {
    title: "Configure Settings",
    description: "Customize your video parameters including resolution, aspect ratio, and duration",
    icon: AdjustmentsHorizontalIcon,
    specs: "480p/1080p, Multiple ratios, 5s/10s"
  },
  {
    title: "AI Processing",
    description: "Our advanced AI model generates multi-shot narrative videos with fluid motion",
    icon: ArrowPathIcon,
    specs: "Multi-shot narrative, Fluid motion"
  },
  {
    title: "Download & Share",
    description: "Get your high-quality video output ready for sharing or further editing",
    icon: ArrowDownTrayIcon,
    specs: "1080P HD quality"
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