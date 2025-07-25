<template>
  <section class="py-12 sm:py-20 bg-blue-pale/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white sm:text-4xl">
            Why Choose Hailuo 02 AI Video Generator?
        </h2>
        <p class="mt-4 text-base sm:text-xl text-gray-300">
            Go beyond simple generation. We provide tools for true creative control.
        </p>
      </div>

      <!-- 特点卡片 -->
      <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-blue-pale/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-6 transition-all duration-300 hover:shadow-[#7C3AED]/20 hover:border-[#7C3AED]/40 hover:translate-y-[-5px]">
          <img src="/icons/high-quality.svg" alt="High Quality Output" class="w-12 h-12 mb-4" loading="lazy" fetchpriority="high" />
          <h3 class="text-xl font-bold text-white mb-3">High-Quality Video Output</h3>
          <p class="text-gray-300">
            Create stunning videos in 1080p resolution, perfect for social media, ads, and educational content. Hailuo 02 AI Video ensures crisp visuals and rich details, making your videos stand out.
          </p>
        </div>

        <div class="bg-blue-pale/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-6 transition-all duration-300 hover:shadow-[#7C3AED]/20 hover:border-[#7C3AED]/40 hover:translate-y-[-5px]">
          <img src="/icons/multi-language.svg" alt="Multilingual Support" class="w-12 h-12 mb-4" loading="lazy" fetchpriority="high" />
          <h3 class="text-xl font-bold text-white mb-3">Text and Image to Video</h3>
          <p class="text-gray-300">
            Simply input text or upload an image to instantly generate dynamic videos. Whether you're creating a promotional video or educational content, Hailuo 02 AI Video helps bring your ideas to life.
          </p>
        </div>

        <div class="bg-blue-pale/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-6 transition-all duration-300 hover:shadow-[#7C3AED]/20 hover:border-[#7C3AED]/40 hover:translate-y-[-5px]">
          <img src="/icons/scene-understanding.svg" alt="Advanced Scene Understanding" class="w-12 h-12 mb-4" loading="lazy" fetchpriority="high" />
          <h3 class="text-xl font-bold text-white mb-3">Advanced Scene Understanding & Physics Simulation</h3>
          <p class="text-gray-300">
            Hailuo 02 AI Video handles complex scenes, such as acrobatics or group actions, providing smooth, realistic motion. This ensures that your videos feel authentic, no matter the complexity.
          </p>
        </div>

        <div class="bg-blue-pale/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-6 transition-all duration-300 hover:shadow-[#7C3AED]/20 hover:border-[#7C3AED]/40 hover:translate-y-[-5px]">
          <img src="/icons/language-support.svg" alt="Multilingual Support" class="w-12 h-12 mb-4" loading="lazy" fetchpriority="high" />
          <h3 class="text-xl font-bold text-white mb-3">Multilingual Support</h3>
          <p class="text-gray-300">
            Reach a global audience with Hailuo 02 AI Video's multilingual capabilities. The tool supports multiple languages, enabling you to create videos in English, Chinese, and more.
          </p>
        </div>

        <div class="bg-blue-pale/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-6 transition-all duration-300 hover:shadow-[#7C3AED]/20 hover:border-[#7C3AED]/40 hover:translate-y-[-5px]">
          <img src="/icons/cost-effective.svg" alt="Cost-effective" class="w-12 h-12 mb-4" loading="lazy" fetchpriority="high" />
          <h3 class="text-xl font-bold text-white mb-3">Cost-Effective Video Production</h3>
          <p class="text-gray-300">
            Hailuo 02 AI Video offers competitive pricing compared to other tools, making it a cost-effective solution for high-quality video creation. Produce professional-grade videos without breaking the bank.
          </p>
        </div>

        <div class="bg-blue-pale/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-6 transition-all duration-300 hover:shadow-[#7C3AED]/20 hover:border-[#7C3AED]/40 hover:translate-y-[-5px]">
          <img src="/icons/fast-generation.svg" alt="Fast Generation" class="w-12 h-12 mb-4" loading="lazy" fetchpriority="high" />
          <h3 class="text-xl font-bold text-white mb-3">Fast Video Generation</h3>
          <p class="text-gray-300">
            Leverage AI-driven speed and precision to generate videos in just minutes, allowing you to focus on creativity rather than technical details.
          </p>
        </div>
      </div>


      <!-- 行动号召 -->
      <div class="mt-12 text-center">
        <button
          @click="navigateToAiVideo"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 hover:from-[#7C3AED]/90 hover:to-[#7C3AED]/70 shadow-lg transition-all duration-300"
        >
          Start Using Hailuo 02 AI Video Now
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 导航到 AI Video 页面
const navigateToAiVideo = () => {
  router.push('/hailuo-ai-video-generator')
}
</script>

<style scoped>
/* 保留原有样式，如果有需要可以添加额外样式 */
</style>
  