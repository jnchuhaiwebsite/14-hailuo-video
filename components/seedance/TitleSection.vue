<template>
  <!-- 标题区 -->
  <div class=" w-full max-w-[1360px] mx-auto flex flex-col items-center relative z-10 px-2 sm:px-3 lg:px-4 mt-[64px] mb-10 bg-blue-pale/80 backdrop-blur-sm">
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#db2777] bg-clip-text text-transparent drop-shadow-2xl tracking-tight animate-gradient-x">
      Seedance 1.0 Pro: Next-Gen AI Video Creator
    </h1>
    <!-- 注册送积分提示 -->
    <!-- <div class="mt-3 sm:mt-4 px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 bg-gradient-to-r from-[#7C3AED]/20 to-[#7C3AED]/10 rounded-full border border-[#7C3AED]/30 backdrop-blur-sm inline-flex items-center max-w-full">
      <span class="text-[#7C3AED] font-semibold flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base text-center">
        <FireIcon class="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 text-orange-500 flex-shrink-0" />
        <span class="whitespace-normal">Limited-time offer: New users get 9 Credits upon registration.</span>
      </span>
    </div> -->
    <p class="mt-4 text-base text-gray-200 text-center max-w-2xl font-medium">
      Transform text prompts and images into cinematic multi-shot videos with Seedance 1.0 Pro. Create professional-grade narratives with seamless scene transitions and stunning 1080p HD quality - no video editing skills required.
    </p>
  </div>
</template>

<script setup lang="ts">
// import { FireIcon } from '@heroicons/vue/24/solid'
</script>

<style scoped>
@keyframes gradient-x {
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

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

@keyframes smooth-in {
  0% {
    opacity: 0;
    transform: scale(0.98) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes smooth-out {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.98) translateY(-20px);
  }
}
</style>