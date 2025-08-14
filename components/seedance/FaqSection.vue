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
      <!-- 问题列表 -->
      <div class="mt-16 max-w-4xl mx-auto">
        <div 
          v-for="(item, index) in faqs" 
          :key="index"
          class="bg-gray-800 mb-4 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <!-- 问题标题（可点击切换展开/折叠） -->
          <div 
            class="p-6 w-full text-left flex justify-between items-center cursor-pointer bg-gray-800" 
            @click="toggleItem(index)"
            :aria-expanded="openItems[index]"
            :aria-controls="`faq-answer-${index}`"
          >
            <h3 class="text-xl font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-3 text-[#7C3AED]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              {{ item.question }}
            </h3>
            <!-- 箭头图标（根据展开状态旋转） -->
            <svg 
              class="w-6 h-6 text-[#7C3AED] transform transition-transform duration-200" 
              :class="{'rotate-180': openItems[index]}"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          
          <!-- 问题答案（展开时显示） -->
          <div 
            v-show="openItems[index]"
            class="px-6 pb-6 bg-gray-800 text-gray-300 overflow-hidden transition-all duration-300"
            :id="`faq-answer-${index}`"
          >
            <p class="leading-relaxed whitespace-pre-line">{{ item.answer }}</p>
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
    "answer": "Using Seedance 1.0 Pro is a straightforward three-step process designed for ease and efficiency. First, select your creation method by choosing either a detailed text prompt or an image as your starting point. Next, customize your video parameters, including resolution, aspect ratio, and duration, to align with your creative vision. Finally, generate your video and watch as Seedance 1.0 Pro transforms your input into a cinema-quality production with seamless narratives and fluid motion transitions. This intuitive process ensures professional results without the need for technical expertise."
  },
  {
    "question": "What are the requirements for uploading images?",
    "answer": "To ensure optimal video quality, images should be in JPEG, PNG, WEBP, BMP, TIFF, or GIF format, with a maximum size of 10MB. The dimensions must be between 300px and 6000px, and the aspect ratio should range from 0.4 to 2.5."
  },
  {
    "question": "How long does it take to generate a video?",
    "answer": "Seedance 1.0 Pro delivers results with impressive speed. Most high-quality videos are ready in just 1–2 minutes, enabling you to quickly test ideas, refine your vision, and create without long production delays."
  },
  {
    "question": "How does Seedance 1.0 Pro pricing work?",
    "answer": "Our pricing is simple and transparent—no subscriptions, no hidden fees. Seedance 1.0 Pro uses a pay-as-you-go credit system, letting you purchase the right credit pack for your needs. Credits never expire, giving you complete flexibility."
  },
  {
    "question": "How are credits calculated and used?",
    "answer": `Credits are based on video resolution and duration. Higher resolution or longer videos require more processing power, which means more credits. For example:

• 5-second 480p video – 4 credits
• 10-second 480p video – 8 credits
• 5-second 720p video – 10 credits
• 10-second 720p video – 20 credits
• 5-second 1080p video – 20 credits
• 10-second 1080p video – 400 credits`
  },
  {
    "question": "Can I use the videos I make for my business or YouTube channel?",
    "answer": "Yes. Every video created with purchased credits includes full commercial rights. You can use them in marketing, advertising, social media, YouTube, and more—royalty-free. You own 100% of what you create."
  },
  {
    "question": "Are there any restrictions on what I can create?",
    "answer": "We encourage creativity but strictly prohibit harmful content. Seedance 1.0 Pro cannot be used to produce hateful, dangerous, or explicit adult material. Our commitment is to maintain a safe and responsible creative platform."
  },

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
</style> 