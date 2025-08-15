<template>
  <section id="faq" class="py-20 bg-blue-pale/80 backdrop-blur-sm" aria-labelledby="faq-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 id="faq-heading" class="text-3xl font-extrabold text-white sm:text-4xl">Seedance 1.0 Pro - FAQ</h2>
        <p class="mt-4 text-xl text-gray-300">
          Get answers to the most frequently asked questions about Seedance 1.0 Pro. 
          <span class="block mt-2">If you need further assistance, don't hesitate to reach out to us at 
            <a href="mailto:support@hailuo2.com" class="faq-support-link">
              support@hailuo2.com
            </a>
          </span>
        </p>
      </div>
      <!-- 问题列表 - 两列布局 -->
      <div class="mt-16 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                                 <div 
              v-for="(item, index) in faqs" 
              :key="index"
              class="border border-gray-600 rounded-lg overflow-hidden hover:border-[#7C3AED] transition-colors duration-300"
            >
              <div class="p-6">
                <!-- 问题标题 -->
                <div class="w-full text-left flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-white flex items-center">
                     <!-- 序列号 -->
                     <span class="w-8 h-8 border-2 border-[#7C3AED] rounded-full flex items-center justify-center text-[#7C3AED] font-bold text-sm mr-4 flex-shrink-0">
                       {{ index + 1 }}
                     </span>
                     <span class="line-clamp-2">{{ item.question }}</span>
                  </h3>
                </div>
                
                <!-- 问题答案 -->
                <div class="text-gray-300  pt-4">
                  <p class="leading-relaxed whitespace-pre-line text-sm">{{ item.answer }}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      
      <div class="mt-16 text-center">
        <div class="text-2xl text-gray-400 mb-6">
          Ready to create professional videos with Seedance 1.0 Pro?
        </div>
        <button
          @click="scrollToTop"
          class="bg-[#7C3AED]/50 text-white hover:bg-[#7C3AED]/90 font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none text-xl"
        >
          Generate with Seedance 1.0 Pro
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

defineOptions({
  name: 'FaqSection'
})

// FAQ数据
const faqs = [
  {
    "question": "How do I use Seedance 1.0 Pro?",
    "answer": "Using Seedance 1.0 Pro is a quick three-step process. First, choose a creation method—write a detailed text prompt or upload an image. Next, set your video resolution, aspect ratio, and duration to match your vision. Finally, click generate and watch as Seedance 1.0 Pro turns your input into a cinematic video with smooth motion and a cohesive story, no technical skills needed."
  },
  {
    "question": "What are the requirements for uploading images?",
    "answer": "Upload images in JPEG, PNG, WEBP, BMP, TIFF, or GIF format under 10MB. Dimensions should be between 300px and 6000px, with an aspect ratio from 0.4 to 2.5. Meeting these ensures accurate scaling and optimal video quality."
  },
  {
    "question": "How long does it take to generate a video?",
    "answer": "Seedance 1.0 Pro is designed for speed. Most videos are ready in just 1–2 minutes, allowing you to quickly test ideas, refine your vision, and produce professional results without long waits."
  },
  {
    "question": "How are credits calculated and used?",
    "answer": "Credits are based on resolution and duration. Higher resolution or longer videos require more processing power. For example: • 480p (5s) – 4 credits 、 480p (10s) – 8 credits 、 720p (5s) – 10 credits 、 720p (10s) – 20 credits 、 1080p (5s) – 20 credits 、 1080p (10s) – 40 credits."
  },
  {
    "question": "Can I use the videos I make for my business or YouTube channel?",
    "answer": "Yes. All videos created with purchased credits include full commercial rights. You can use them in marketing, advertising, social media, YouTube, and more—royalty-free, with 100% ownership."
  },
  {
    "question": "Are there any restrictions on what I can create?",
    "answer": "Yes. While creativity is encouraged, Seedance 1.0 Pro cannot be used to produce hateful, dangerous, or explicit adult content. This ensures a safe and positive creative environment."
  }
]



// 初始显示的FAQ数量
const initialVisibleCount = 4;
const visibleCount = ref(initialVisibleCount);

// 跟踪每个FAQ项的展开状态
const openItems = ref(Array(faqs.length).fill(true));

// 切换FAQ项的展开/折叠状态
const toggleItem = (index: number) => {
  openItems.value[index] = !openItems.value[index];
};

// 滚动到页面顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>

<style scoped>
/* 旋转动画 */
.rotate-180 {
  transform: rotate(180deg);
}

/* 添加过渡效果 */
.transition-all {
  transition-property: all;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

/* 增强卡片阴影效果 */
.shadow-xl {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.15), 0 10px 10px -5px rgba(124, 58, 237, 0.1);
}

/* 自定义支持邮箱链接样式 */
.faq-support-link {
  color: #7C3AED !important;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.faq-support-link:hover {
  color: #9461F7 !important;
}

/* 两列布局相关样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 确保在小屏幕上单列显示 */
@media (max-width: 1023px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* 优化两列布局的间距 */
@media (min-width: 1024px) {
  .gap-6 {
    gap: 1.5rem;
  }
}
</style> 