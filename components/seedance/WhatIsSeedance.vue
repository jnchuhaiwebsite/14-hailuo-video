<template>
  <section id="what-is-seedance" class="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-[#8B5CF6]/10 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#7C3AED]/5 to-[#8B5CF6]/5 rounded-full blur-3xl"></div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- 标题区域 -->
      <div class="text-center mb-16">
        <div class="inline-block mb-6">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#db2777] bg-clip-text text-transparent drop-shadow-2xl tracking-tight animate-gradient-x">
            What is Seedance 1.0 Pro
          </h2>
        </div>
        
        <!-- 优化展示内容 -->
        <div class="max-w-6xl mx-auto bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700/50 hover:border-[#7C3AED]/50 transition-all duration-300 relative overflow-hidden">
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#db2777]/10 to-transparent rounded-full blur-3xl"></div>
          
          <div class="relative z-10 space-y-8">
            <!-- 主要描述段落 -->
            <div class="prose prose-xl prose-invert max-w-none">
              <p class="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium animate-fadeIn">
                Seedance 1.0 Pro is a revolutionary next-generation AI video generation platform that transforms your creative ideas into cinematic masterpieces.
              </p>
              
              <p class="text-lg md:text-xl text-gray-300 leading-relaxed mt-6 animate-fadeIn animation-delay-100">
                Featuring breakthrough multi-shot technology with seamless transitions, professional cinematography, and narrative coherence, it supports multiple professional aspect ratios (16:9, 9:16, 1:1, 4:3, 3:4, 21:9) with stunning 1080P HD output.
              </p>
              
              <p class="text-lg md:text-xl text-gray-300 leading-relaxed mt-6 animate-fadeIn animation-delay-200">
                Our proprietary motion physics engine ensures realistic movements, fluid transitions, and natural camera movements—every frame meets professional video production standards.
              </p>
              
              <p class="text-lg md:text-xl text-gray-300 leading-relaxed mt-6 animate-fadeIn animation-delay-300">
                Designed for content creators, marketers, educators, and businesses, Seedance 1.0 Pro eliminates the need for expensive equipment and time-consuming post-production work.
              </p>
              

            </div>
            
            <!-- 主要特性标签 -->
            <div class="flex flex-wrap justify-center gap-4 mt-8 animate-fadeIn animation-delay-500">
              <span class="px-6 py-2 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-full text-white font-semibold shadow-lg">
                Multi-Shot Technology
              </span>
              <span class="px-6 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#db2777] rounded-full text-white font-semibold shadow-lg">
                AI Motion Physics
              </span>
              <span class="px-6 py-2 bg-gradient-to-r from-[#db2777] to-[#7C3AED] rounded-full text-white font-semibold shadow-lg">
                Professional Quality
              </span>

            </div>
            
            <!-- CTA 按钮 -->
            <div class="flex justify-center mt-10 animate-fadeIn animation-delay-600">
              <a href="#hero" class="px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#db2777] text-white font-bold rounded-xl text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out">
                Experience Seedance 1.0 Pro
              </a>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
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

/* 添加进入动画 */
.group {
  animation: fadeInUp 0.8s ease-out forwards;
}

.group:nth-child(1) { animation-delay: 0.1s; }
.group:nth-child(2) { animation-delay: 0.2s; }
.group:nth-child(3) { animation-delay: 0.3s; }
.group:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}
</style>
