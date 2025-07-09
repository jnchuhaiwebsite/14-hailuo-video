<template>
  <section id="faq" class="py-20 bg-gradient-to-b from-blue-pale">
    
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-[64px] mb-10 flex flex-col items-center relative z-10 w-full max-w-[1360px] mx-auto px-2 sm:px-3 lg:px-4">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#db2777] bg-clip-text text-transparent drop-shadow-2xl tracking-tight animate-gradient-x">
        Hailuo AI Video FAQ – Your Questions Answered
        <!-- - Transform Your Creative Moments into Blockbuster Videos Instantly. -->
      </h1>
      <p class="mt-4 text-base text-gray-200 text-center max-w-2xl font-medium">
        Explore Frequently Asked Questions About Using Hailuo AI Video for Video Creation, Pricing, Features, and More.
      </p>
    </div>

      <div class="mt-12 space-y-6">
        <div 
          v-for="(faq, index) in faqItems" 
          :key="index"
          class="bg-[#1E293B]/40 backdrop-blur-sm rounded-xl border border-[#7C3AED]/20 hover:border-[#7C3AED]/40 transition-all duration-300"
        >
          <button
            @click="toggleFaq(index)"
            class="flex justify-between items-center w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:ring-offset-2 focus:ring-offset-[#0F172A] rounded-xl"
          >
            <div class="flex items-center space-x-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-[#7C3AED]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
              </span>
              <h3 class="text-lg font-medium text-white">{{ faq.question }}</h3>
            </div>
            <svg 
              :class="[
                'w-6 h-6 text-[#7C3AED] transform transition-transform duration-300 ease-in-out',
                openFaqs[index] ? 'rotate-180' : ''
              ]"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div 
            v-show="openFaqs[index]"
            class="px-6 pb-6 text-gray-300/90 leading-relaxed"
          >
            <div class="pt-4 border-t border-[#7C3AED]/10">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- CTA Buttons -->
      <div class="text-center mt-12 space-x-4"> 
        <button
          @click="scrollToTop"
          class="bg-gradient-to-r from-[#7C3AED] to-[#9F7AEA] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#7C3AED]/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:ring-offset-2 focus:ring-offset-[#0F172A]"
        >
          Back to Top
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useSeo } from '~/composables/useSeo';

const router = useRouter()
defineOptions({
  name: 'FaqSection'
})

// FAQ数据
const faqs = [
  {
    question: 'What is Hailuo 02 AI?',
    answer: 'Hailuo 02 AI is an advanced video generation model developed by MiniMax. It transforms text prompts or images into high-quality, cinematic 1080p videos, featuring realistic physics simulations and director-level camera controls.'
  },
  {
    question: 'How do I use Hailuo 02 AI?',
    answer: 'Simply upload an image or enter a descriptive text prompt on the Hailuo 02 platform. Customize your video settings, such as resolution and duration, and let the AI generate your video in just a few minutes.'
  },
  {
    question: 'How long does it take to generate a video with Hailuo 02 AI?',
    answer: 'The generation time for a video with Hailuo 02 AI typically ranges from 3 to 5 minutes. The exact duration may vary depending on the complexity of the prompt and the selected video settings.'
  },
  {
    question: 'What happens if I run out of credits?',
    answer: 'If you run out of credits, you can subscribe to a plan to purchase additional credits. Simply choose a subscription package that fits your needs and replenish your credits to continue generating videos with Hailuo 02 AI.'
  },
  {
    question: 'Can I use Hailuo 02 AI for commercial projects?',
    answer: 'Yes, Hailuo 02 AI allows commercial use. Users retain ownership of their generated content and can utilize it for business purposes.'
  },
  {
    question: 'Is there a free trial available for Hailuo 02 AI?',
    answer: 'Yes, Hailuo 02 AI offers a free trial with limited credits, allowing you to generate a few videos at no cost. Additional credits can be purchased through various subscription plans.'
  },
  {
    question: 'How are credits calculated and consumed in Hailuo 02 AI?',
    answer: 'Credits are consumed based on the video resolution and duration. For instance, a 6-second 768p video may cost around 10 credits. Subscription plans provide a set number of credits per month, with options to purchase additional credits as needed.'
  },
  {
    question: 'Do credits in Hailuo 02 AI expire?',
    answer: 'Yes, credits typically expire after 30 days if not used. It\'s advisable to utilize your credits within this period to avoid loss.'
  },
  {
    question: 'What happens if a video generation request is canceled or interrupted?',
    answer: 'If your network connection is interrupted during the video generation process, the task will continue running. Once the network is restored, you can go to the Personal Center to view and complete the video generation. Please note that any credits consumed up to the point of interruption are non-refundable.'
  },
  {
    question: 'How can I manage my credits and projects in Hailuo 02 AI?',
    answer: 'You can manage your credits and projects by accessing the Personal Center on the Hailuo 02 platform. Here, you can view your credit balance, track usage, and access your generated videos.'
  },
  {
    question: 'Does Hailuo 02 AI support multiple languages for video generation?',
    answer: 'Yes, Hailuo 02 AI supports multiple languages, including English, Chinese, Japanese, and Spanish. This allows users from different linguistic backgrounds to create videos using their preferred language.'
  }
];

// 初始显示的FAQ数量
const initialVisibleCount = 4;
const visibleCount = ref(initialVisibleCount);

// 跟踪每个FAQ项的展开状态
const openFaqs = ref(Array(faqs.length).fill(true));

// 当前显示的FAQ项目
const faqItems = computed(() => {
  return faqs;
});

// 是否还有更多FAQ可显示
const hasMoreItems = computed(() => {
  return visibleCount.value < faqs.length;
});

// 切换FAQ项的展开/折叠状态
const toggleFaq = (index: number) => {
  openFaqs.value[index] = !openFaqs.value[index];
};

// 显示更多FAQ
const showMore = () => {
  visibleCount.value = faqs.length;
};

// 显示较少FAQ
const showLess = () => {
  router.push('/Faq')
};

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 滚动到底部
const scrollToContact = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

  //设置页面元数据
  useSeo({
    title: `Hailuo AI Video FAQ – Answers to Common Questions About AI Video Creation`,
    description: `Find answers to all your questions about Hailuo AI Video, from video generation to pricing plans. Learn how to use AI to create high-quality videos for social media, branding, and education.`,
  });
</script>

<style scoped>
/* 基础过渡效果 */
.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

/* 渐变背景 */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* 按钮悬浮效果 */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 25px -3px rgba(124, 58, 237, 0.3);
}

/* 卡片悬浮效果 */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* 聚焦状态 */
.focus\:ring:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
</style> 