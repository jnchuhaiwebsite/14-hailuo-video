<template>
  <div class="w-full mx-auto bg-blue-pale/80 backdrop-blur-sm mt-[64px]">
    <main class="max-w-24xl mx-auto min-h-screen">
      <!-- 首屏区块 -->
      <section
        id="hero"
        class="min-h-[600px] sm:min-h-[650px] md:min-h-[700px] relative "
      >
        <keep-alive>
          <div class="flex flex-col items-center">
            <TitleSection />
            <MainSection />
          </div>
        </keep-alive>
      </section>

      <!-- 案例展示1 -->
      <CaseStudies />
      
      <!-- Seedance 1.0 Pro 介绍模块 -->
      <WhatIsSeedance />

      <!-- Seedance 1.0 核心优势 -->
      <SeedanceAdvantages />

      <!-- 常见问题模块 -->
      <FaqSection />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, defineAsyncComponent, onMounted } from "vue";
import { useSeo } from '~/composables/useSeo';

import TitleSection from '~/components/seedance/TitleSection.vue';
import MainSection from '~/components/seedance/MainSection.vue';
import WhatIsSeedance from '~/components/seedance/WhatIsSeedance.vue';
import SeedanceAdvantages from '~/components/seedance/SeedanceAdvantages.vue';

// const PricingPlans = defineAsyncComponent(() => import('~/components/PricingPlans.vue'));
// const HomeHero = defineAsyncComponent(() => import('~/components/seedance/seedanceHero.vue'));
const FaqSection = defineAsyncComponent(() => import('~/components/seedance/FaqSection.vue'));
const CaseStudies = defineAsyncComponent(() => import('~/components/seedance/CaseStudies.vue'));



import { useNotificationStore } from '~/stores/notification';
const notificationStore = useNotificationStore();
useSeo({
  title: "Seedance 1.0 Pro AI Video Generator | Create Pro Videos",
  description: "Seedance 1.0 Pro AI Video Generator lets you create cinematic multi-shot videos in 1080p with style control and smooth motion. Perfect for creators and marketers"
});

// 处理支付回调
onBeforeMount(() => {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const paySuccess = urlParams.get("paysuccess");

  if (paySuccess == "1") {
    window.history.replaceState({}, "", window.location.pathname);
    setTimeout(() => {
      notificationStore.addNotification({
        taskId: `payment-success-${Date.now()}`,
        status: 'success',
        message: 'Thank you for your support! Your membership benefits are now activated.'
      });
    }, 500);
  } else if (urlParams.get("payfail") == "1") {
    window.history.replaceState({}, "", window.location.pathname);
  }
});

// 设置页面元数据
onMounted(() => {
  // 结构化数据标记以提高SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Seedance 1.0 Pro",
    description: "Professional multi-camera video generation platform with advanced narrative capabilities. Create cinema-quality 1080P HD videos with seamless transitions and fluid motion.",
    applicationCategory: "VideoGenerationApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Multi-shot cinematic storytelling",
      "Advanced motion physics engine",
      "Professional cinematography controls",
      "Studio-quality 1080P HD output",
      "Six professional aspect ratios",
      "Customizable duration settings",
      "Text-to-video generation",
      "Image-to-video transformation"
    ],
    screenshot: "/logo.png",
    applicationSubCategory: "AI Video Generation",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0.0"
  };
  // 添加结构化数据到页面头部
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
</script>
<style scoped>
html {
  font-size: 18px;
}
</style>
