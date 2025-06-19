<template>
  <div id="faq" class="relative w-full py-16 bg-gradient-to-b from-gray-900 to-gray-800" aria-labelledby="faq-heading">
    <!-- 标题 -->
    <div class="max-w-7xl mx-auto px-4">
      <h2 id="faq-heading" class="text-3xl font-bold text-center mb-12 text-[#00ffd1]">Frequently Asked Questions</h2>
      
      <!-- 问题列表 -->
      <div class="max-w-4xl mx-auto">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index"
          class="border-b border-[#00ffd1]/20 py-6 hover:bg-[#00ffd1]/5 transition-colors duration-200 rounded-lg px-4"
        >
          <!-- 问题标题（可点击切换展开/折叠） -->
          <div 
            class="w-full text-left flex justify-between items-center cursor-pointer" 
            @click="toggleItem(index)"
            :aria-expanded="openItems[index]"
            :aria-controls="`faq-answer-${index}`"
          >
            <h3 class="text-lg text-white font-medium flex items-center">
              <svg class="w-5 h-5 mr-2 text-[#00ffd1]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              {{ item.question }}
            </h3>
            <!-- 箭头图标（根据展开状态旋转） -->
            <svg 
              class="w-5 h-5 text-[#00ffd1] transform transition-transform duration-200" 
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
      
      <!-- 查看更多按钮 -->
      <div class="text-center mt-10">
        <div 
          @click="showMore"
          v-if="hasMoreItems"
          class="bg-[#00ffd1] hover:bg-[#00ffd1]/90 text-gray-900 font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer inline-block"
        >
          Show More
        </div>
        <div 
          @click="showLess"
          v-else-if="visibleCount > initialVisibleCount"
          class="bg-[#00ffd1] hover:bg-[#00ffd1]/90 text-gray-900 font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer inline-block"
        >
          Show Less
        </div>
      </div>
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
    question: 'What is Hailuo 02?',
    answer: 'Hailuo 02 is MiniMax\'s latest AI video generation model, representing a significant upgrade from Hailuo 01. It currently ranks second in both image-to-video and text-to-video leaderboards, featuring breakthrough technological innovations and exceptional cost-effectiveness.'
  },
  {
    question: 'What are the key advantages of Hailuo 02?',
    answer: '1. Revolutionary Architecture: Complete reconstruction of the underlying architecture, improving training and inference efficiency by 2.5x.\n2. Complex Instruction Response: Achieves 85% complex instruction response rate, significantly higher than competitors.\n3. Extreme Scene Processing: Can generate videos with extremely complex physical scenarios, such as acrobatics and other high-difficulty content.\n4. Cost Efficiency: Offers the lowest price among first-tier models with exceptional value for money.'
  },
  {
    question: 'What video generation methods are supported?',
    answer: 'We support two main video generation methods:\n1. Text-to-Video: Generate videos from text descriptions\n2. Image-to-Video: Generate videos based on input images with specific format requirements'
  },
  {
    question: 'What video resolutions and durations are supported?',
    answer: 'We support the following parameters:\n- 6-second videos: 768P or 1080P resolution\n- 10-second videos: 768P resolution\n- Image upload requirements: JPG/JPEG/PNG format, aspect ratio between 2:5 and 5:2, shortest side minimum 300px, file size maximum 5MB'
  },
  {
    question: 'How is video quality ensured?',
    answer: 'Hailuo 02 is rigorously trained and optimized to generate videos with cinematic quality. The model features top-tier instruction-following capabilities and can handle extreme physical scenarios, ensuring professional-level output for each generated video.'
  },
  {
    question: 'What types of video content can be generated?',
    answer: 'Our system can generate various types of video content, including but not limited to: character actions, scene transitions, multi-subject interactions, extreme physical scenarios like acrobatics, and complex narrative sequences. The system accurately understands and executes complex video generation instructions.'
  },
  {
    question: 'How to achieve the best video generation results?',
    answer: 'For optimal results, we recommend:\n1. Provide clear and specific text descriptions\n2. Ensure uploaded images meet format requirements (JPG/JPEG/PNG, proper aspect ratio, size limits)\n3. Choose appropriate video duration (6 or 10 seconds) and quality (768P or 1080P)\n4. Start with 6-second videos for higher quality options'
  },
  {
    question: 'What are the system requirements?',
    answer: 'Our service is web-based and accessible through modern browsers. We recommend using Chrome, Firefox, or Safari with a stable internet connection. No special hardware is required as all processing is done on our servers.'
  },
  {
    question: 'Can I customize the video style?',
    answer: 'Yes, you can customize various aspects of the generated video including:\n- Visual style and aesthetics\n- Motion details and effects\n- Scene complexity and physical scenarios\n- Color grading and atmosphere'
  },
  {
    question: 'What file formats are supported for input and output?',
    answer: 'Input formats:\n- Images: JPG, JPEG, PNG (max 5MB, aspect ratio 2:5 to 5:2, shortest side ≥300px)\n- Text: Plain text or structured prompts\nOutput format:\n- Video: MP4 (H.264 codec)'
  },
  {
    question: 'Is there a limit to the number of videos I can generate?',
    answer: 'The number of videos you can generate depends on your subscription plan. We offer various packages to suit different usage needs, from basic to professional levels. Please check our pricing page for detailed information.'
  }
];

// 初始显示的FAQ数量
const initialVisibleCount = 4;
const visibleCount = ref(initialVisibleCount);

// 跟踪每个FAQ项的展开状态
const openItems = ref(Array(faqs.length).fill(false));

// 当前显示的FAQ项目
const faqItems = computed(() => {
  return faqs.slice(0, visibleCount.value);
});

// 是否还有更多FAQ可显示
const hasMoreItems = computed(() => {
  return visibleCount.value < faqs.length;
});

// 切换FAQ项的展开/折叠状态
const toggleItem = (index: number) => {
  openItems.value[index] = !openItems.value[index];
};

// 显示更多FAQ
const showMore = () => {
  visibleCount.value = faqs.length;
};

// 显示较少FAQ
const showLess = () => {
  visibleCount.value = initialVisibleCount;
  // 直接跳转到 FAQ 模块
  const faqSection = document.getElementById('faq');
  if (faqSection) {
    faqSection.scrollIntoView();
  }
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
  box-shadow: 0 10px 15px -3px rgba(0, 255, 209, 0.3), 0 4px 6px -2px rgba(0, 255, 209, 0.2);
}

/* 添加发光效果 */
.bg-\[\#00ffd1\] {
  box-shadow: 0 0 15px rgba(0, 255, 209, 0.3);
}

.bg-\[\#00ffd1\]:hover {
  box-shadow: 0 0 20px rgba(0, 255, 209, 0.5);
}
</style> 