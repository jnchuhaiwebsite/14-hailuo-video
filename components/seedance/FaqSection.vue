<template>
  <div id="faq" class="relative w-full py-16 bg-blue-pale/80 backdrop-blur-sm" aria-labelledby="faq-heading">
    <!-- 标题 -->
    <div class="max-w-7xl mx-auto px-4">
      <h2 id="faq-heading" class="text-4xl font-bricolage-grotesque lg:text-5xl xl:text-6xl 2xl:text-[4rem] bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 bg-clip-text text-transparent whitespace-nowrap lg:whitespace-normal text-center mb-8 leading-loose mobile-large-title">Seedance 1.0 Pro - FAQ</h2>
      
      <!-- 问题列表 -->
      <div class="max-w-4xl mx-auto">
        <div 
          v-for="(item, index) in faqs" 
          :key="index"
          class="border-b border-[#7C3AED]/20 py-6 hover:bg-[#7C3AED]/5 transition-colors duration-200 rounded-lg px-4"
        >
          <!-- 问题标题（可点击切换展开/折叠） -->
          <div 
            class="w-full text-left flex justify-between items-center cursor-pointer" 
            @click="toggleItem(index)"
            :aria-expanded="openItems[index]"
            :aria-controls="`faq-answer-${index}`"
          >
            <h3 class="text-lg text-white font-medium flex items-center">
              <svg class="w-5 h-5 mr-2 text-[#7C3AED]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              {{ item.question }}
            </h3>
            <!-- 箭头图标（根据展开状态旋转） -->
            <svg 
              class="w-5 h-5 text-[#7C3AED] transform transition-transform duration-200" 
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
            class="mt-3 text-gray-300 overflow-hidden transition-all duration-300"
            :id="`faq-answer-${index}`"
          >
            <p class="leading-relaxed">{{ item.answer }}</p>
          </div>
        </div>
      </div>
      
      <!-- 添加一个跳转按钮 -->
      <!-- <div class="text-center mt-10">
        <NuxtLink
          to="/seedance/faq"
          class="bg-[#7C3AED]/50 text-white hover:bg-[#7C3AED]/90 text-gray-900 font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer inline-block"
        >
          Show More
        </NuxtLink>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

defineOptions({
  name: 'FaqSection'
})

// FAQ数据
const faqs = [
  {
    question: 'What makes Seedance 1.0 Pro different from other AI video tools?',
    answer: 'Seedance 1.0 Pro is the only AI video platform that delivers true multi-shot narrative capabilities with professional cinematography. Our proprietary motion engine creates fluid, physically accurate movements while maintaining perfect subject consistency across scenes. Unlike basic tools that generate single clips, Seedance 1.0 Pro creates complete visual stories with multiple camera angles and seamless transitions.'
  },
  {
    question: 'Who benefits most from using Seedance 1.0 Pro?',
    answer: 'Seedance 1.0 Pro serves diverse professional needs: marketers create high-converting product videos in minutes instead of days; content creators produce consistent, high-quality videos at scale; filmmakers rapidly prototype complex scenes; and educators develop engaging visual learning materials. Whether you\'re a solo entrepreneur or part of a creative team, Seedance 1.0 Pro dramatically reduces production time while maintaining professional quality standards.'
  },
  {
    question: 'What specific video types can I create with Seedance 1.0 Pro?',
    answer: 'Seedance 1.0 Pro excels at creating diverse professional content: product demonstrations with multiple angles and perfect lighting, conceptual marketing videos with seamless scene transitions, educational explainers with visual metaphors, dynamic social media content, cinematic narratives with proper storytelling structure, and custom style animations from photorealistic to stylized. Our platform interprets complex prompts to create coherent visual stories across multiple shots.'
  },
  {
    question: 'What technical specifications do Seedance 1.0 Pro videos offer?',
    answer: 'Seedance 1.0 Pro generates studio-quality 1080p HD video with professional color grading and lighting. Videos feature cinema-grade stability with our proprietary motion smoothing technology, supporting multiple aspect ratios (1:1, 16:9, 4:3, 21:9, 9:16, 3:4) for any platform requirement. Our advanced rendering engine maintains perfect subject consistency across multiple shots while supporting diverse visual styles from photorealistic to artistic interpretations.'
  },
];

// 初始显示的FAQ数量
const initialVisibleCount = 4;
const visibleCount = ref(initialVisibleCount);

// 跟踪每个FAQ项的展开状态
const openItems = ref(Array(faqs.length).fill(false));

// 切换FAQ项的展开/折叠状态
const toggleItem = (index: number) => {
  openItems.value[index] = !openItems.value[index];
};
</script>

<style scoped>
/* 旋转动画 */
.rotate-180 {
  transform: rotate(180deg);
}

/* 滑动过渡效果 */
.transition-all {
  transition-property: all;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

/* 按钮悬浮效果 */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.3), 0 4px 6px -2px rgba(124, 58, 237, 0.2);
}

/* 添加发光效果 */
.bg-\[\#7C3AED\] {
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);
}

.bg-\[\#7C3AED\]:hover {
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
}
</style> 