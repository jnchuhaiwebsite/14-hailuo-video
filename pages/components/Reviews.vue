<template>
  <div class="py-24 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          User Reviews
        </h2>
        <p class="mt-4 text-lg text-gray-300">
          Discover how Seedance 1.0 Pro is revolutionizing video creation with professional-grade AI technology
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
            "The multi-shot narrative capability of Seedance is truly impressive! With just simple text prompts, it generates coherent multi-shot videos. The 1080P HD quality and smooth motion performance perfectly meet professional production needs."
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
            "As a short-form video creator, I'm amazed by Seedance's instruction-following capabilities. Whether it's multi-subject scenes or complex camera movements, it delivers exactly what I need. The support for various aspect ratios makes creation much more flexible."
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
            "The image-to-video feature is incredibly useful, generating videos with natural motion and rich details. The 5-second and 10-second duration options are perfect for short-form content. My only suggestion would be to support longer video generation."
          </p>
        </div>
      </div>

      <!-- 添加开始创建按钮 -->
      <div class="text-center mt-16">
        <button
          @click="scrollToHero"
          class="inline-flex items-center px-8 py-4 bg-[#00ffd1] hover:bg-[#00e6bc] text-black rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
        >
          <span class="mr-2">🎬</span>
          Try Seedance Pro Now
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