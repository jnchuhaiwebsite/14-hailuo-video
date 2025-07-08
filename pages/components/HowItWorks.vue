<template>
  <section class="py-20 bg-blue-pale">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 sm:text-5xl animate-fade-in">
          How To Use Hailuo 02 Video
        </h2>
        <p class="mt-4 text-xl text-gray-300 animate-slide-up">
          Create Stunning AI Videos in 3 Simple Steps – Fast, Easy, and No Editing Required.
        </p>
      </div>

      <div class="relative">
        <!-- 时间轴连接线 -->
        <div class="absolute top-[1.25rem] left-[2.5rem] right-[2.5rem] h-[1px] bg-[#333] hidden md:block">
          <div 
            class="absolute top-0 left-0 h-full bg-[#7C3AED] transition-all duration-500"
            :style="{ width: `${(activeStep + 1) * (100/3)}%` }"
          ></div>
        </div>
        
        <div class="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-24 relative">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="relative flex-1 pt-10 group cursor-pointer w-full"
            @click="activeStep = index"
          >
            
            <!-- 步骤圆点 -->
            <div 
              class="absolute top-0 left-1/2 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#333] bg-[#111111] flex items-center justify-center text-[#666] font-medium z-10 transition-all duration-300"
              :class="{
                '!border-[#7C3AED] !bg-[#7C3AED] !text-white': index <= activeStep,
                'group-hover:border-[#7C3AED] group-hover:text-[#7C3AED]': index > activeStep
              }"
            >
              {{ index + 1 }}
            </div>
            
            <div 
              class="mt-6 bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-700/30 hover:border-[#7C3AED]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#7C3AED]/10 transform-gpu"
            >
              <h3 class="text-lg font-semibold text-white mb-3 whitespace-nowrap overflow-hidden text-ellipsis">{{ step.title }}</h3>
              <p class="text-[#999] text-sm leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeStep = ref(0)

const steps = [
  {
    title: "Choose Your Video Creation Method",
    description: "Select how you'd like to create your video. You can either generate a video from text prompts or upload an image to create a video.",
  },
  // {
  //   title: "Customize Your Video Settings",
  //   list: [
  //     {
  //       title: "Text-to-Video",
  //       content: "For text-to-video, just enter your prompts and choose the video length and resolution for the best results."
  //     },
  //     {
  //       title: "Image-to-Video",
  //       content: "For image-to-video, upload your image, then select the video length and resolution to set up your video."
  //     }
  //   ]
  // },
  {
    title: "Enter Prompts or Upload an Image",
    description: "Enter your prompts or upload an image, then select the video length and resolution to create your video.",
  },
  {
    title: "Generate and Download Your Video",
    description: "Click the 'Generate' button and let the AI create your video. Once it's ready, preview it in the preview area. Click 'Download' to save the video and share it with friends.",
  },
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

@media (max-width: 768px) {
  .timeline-progress {
    display: none;
  }
}
</style> 