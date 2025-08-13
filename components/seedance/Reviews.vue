<template>
  <div class="py-24 bg-blue-pale/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          Why Creators Love Seedance AI
        </h2>
        <p class="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Read authentic testimonials and reviews for Seedance AI. Discover why content creators, marketers, and studios trust our platform to generate stunning videos quickly and affordably. Real stories, real results.
        </p>
      </div>

      <div class="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- Testimonial 1 -->
        <div class="bg-gray-800 rounded-lg p-8 shadow-xl flex flex-col">
          <div class="text-6xl font-serif text-[#7C3AED] opacity-80 mb-4 h-12">“</div>
          <p class="text-gray-300 flex-grow mb-6">
            Seedance AI has been an absolute game-changer for my workflow. I can now produce a week's worth of high-quality video content in a single afternoon. The speed is just unbelievable, and it frees me up to focus on creativity, not tedious editing.
          </p>
          <div class="flex items-center gap-4 mt-auto border-t border-gray-700 pt-6">
            <img src="https://resp.seedancepro.net/seedance/iamgeAi/sarah.jfif" loading="lazy" alt="Avatar of Sarah L." class="w-12 h-12 rounded-full object-cover">
            <div>
              <div class="font-semibold text-white">Sarah L.</div>
              <div class="text-sm text-gray-400">Social Media Content Creator</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="bg-gray-800 rounded-lg p-8 shadow-xl flex flex-col">
          <div class="text-6xl font-serif text-[#7C3AED] opacity-80 mb-4 h-12">“</div>
          <p class="text-gray-300 flex-grow mb-6">
            As a marketing manager, budget and ROI are everything. Seedance AI has cut our video production costs by over 80% without sacrificing quality. We can now test more ad creatives, faster and more affordably than ever before. It's an essential tool.
          </p>
          <div class="flex items-center gap-4 mt-auto border-t border-gray-700 pt-6">
            <img src="https://resp.seedancepro.net/seedance/iamgeAi/alex.jfif" loading="lazy" alt="Avatar of Mark Chen" class="w-12 h-12 rounded-full object-cover">
            <div>
              <div class="font-semibold text-white">Mark Chen</div>
              <div class="text-sm text-gray-400">Marketing Manager, Tech Startup</div>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="bg-gray-800 rounded-lg p-8 shadow-xl flex flex-col">
          <div class="text-6xl font-serif text-[#7C3AED] opacity-80 mb-4 h-12">“</div>
          <p class="text-gray-300 flex-grow mb-6">
            The multi-shot narrative feature is what sold me. As an indie filmmaker, storyboarding complex sequences is incredibly difficult. With Seedance Pro AI, I can visualize and generate entire narrative scenes in minutes. The cinematic quality is just stunning.
          </p>
          <div class="flex items-center gap-4 mt-auto border-t border-gray-700 pt-6">
            <img src="https://resp.seedancepro.net/seedance/iamgeAi/maria.jfif" loading="lazy" alt="Avatar of Alex Rivera" class="w-12 h-12 rounded-full object-cover">
            <div>
              <div class="font-semibold text-white">Alex Rivera</div>
              <div class="text-sm text-gray-400">Indie Filmmaker & Game Developer</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加开始创建按钮 -->
      <div class="text-center mt-16">
        <button
          @click="scrollToHero"
          class="inline-flex items-center px-8 py-4 bg-[#7C3AED]/50 text-white hover:bg-[#7C3AED]/90 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
        >
          <span class="mr-2">🎬</span>
          Try Seedance AI Now
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