<template>
  <div class="py-24 bg-blue-pale">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          User Reviews
        </h2>
        <p class="mt-4 text-lg text-gray-300">
          Discover how Hailuo 02 is revolutionizing video creation with breakthrough AI technology and exceptional cost-effectiveness
        </p>
      </div>

      <div class="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- Testimonial 1 -->
        <div class="bg-gray-800 rounded-lg p-8 shadow-xl">
          <div class="mb-6">
            <h3 class="text-lg font-bold text-white">David Chen - Video Producer</h3>
            <p class="text-gray-400">Beijing</p>
            <div class="flex items-center mt-2">
              <span class="text-yellow-400">★★★★★</span>
            </div>
          </div>
          <p class="text-gray-300">
            "Hailuo 02's complex instruction response capability is truly impressive! With 85% response rate, it generates exactly what I need. The 768P and 1080P quality options with 6-10 second durations perfectly meet my production needs."
          </p>
        </div>

        <!-- Testimonial 2 -->
        <div class="bg-gray-800 rounded-lg p-8 shadow-xl">
          <div class="mb-6">
            <h4 class="text-lg font-bold text-white">Sarah Lee - Content Creator</h4>
            <p class="text-gray-400">Shanghai</p>
            <div class="flex items-center mt-2">
              <span class="text-yellow-400">★★★★★</span>
            </div>
          </div>
          <p class="text-gray-300">
            "As a content creator, I'm amazed by Hailuo 02's ability to handle extreme physical scenarios like acrobatics. The image-to-video feature with specific format requirements ensures consistent quality. The cost-effectiveness is unbeatable!"
          </p>
        </div>

        <!-- Testimonial 3 -->
        <div class="bg-gray-800 rounded-lg p-8 shadow-xl">
          <div class="mb-6">
            <h4 class="text-lg font-bold text-white">Michael Wang - Post-Production Specialist</h4>
            <p class="text-gray-400">Guangzhou</p>
            <div class="flex items-center mt-2">
              <span class="text-yellow-400">★★★★☆</span>
            </div>
          </div>
          <p class="text-gray-300">
            "The revolutionary architecture improvements are noticeable - the 7-10 minute processing time is reasonable for high-quality output! The 6-second and 10-second duration options with 768P/1080P quality are perfect for short-form content. My only suggestion would be to support longer video generation."
          </p>
        </div>
      </div>

      <!-- 添加开始创建按钮 -->
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
  </div>
</template>

<script setup lang="ts">
// 跳转到首页
const scrollToHero = () => {
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script> 