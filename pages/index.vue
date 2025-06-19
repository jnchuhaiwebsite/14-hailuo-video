<template>
  <div class="w-full mx-auto bg-gray-900">
    <main class="max-w-24xl mx-auto min-h-screen">
      <!-- 首屏区块 -->
      <section
        id="hero"
        class="min-h-[700px] relative pt-[64px]"
      >
        <keep-alive>
          <HomeHero />
        </keep-alive>
      </section>

      <!-- 案例展示 -->
      <section id="cases">
        <keep-alive>
          <CaseStudies />
        </keep-alive>
      </section>
      
      <!-- 操作步骤 -->
      <section id="how-it-works">
        <keep-alive>
          <HowItWorks />
        </keep-alive>
      </section>

      <!-- 特性展示 -->
      <section id="features-showcase">
        <keep-alive>
          <FeatureShowcase />
        </keep-alive>
      </section>

      <!-- 用户评论 -->
      <section id="Reviews">
        <keep-alive>
          <Reviews />
        </keep-alive>
      </section>

      <!-- 定价模块 -->
      <section id="pricing">
        <keep-alive>
          <PricingPlans />
        </keep-alive>
      </section>

      <!-- 常见问题模块 -->
      <section id="faq">
        <keep-alive>
          <FaqSection />
        </keep-alive>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, defineAsyncComponent, onMounted } from "vue";
import { useSeo } from '~/composables/useSeo';

const PricingPlans = defineAsyncComponent(() => import('~/components/PricingPlans.vue'));
const HomeHero = defineAsyncComponent(() => import('~/pages/components/HomeHero.vue'));
const FaqSection = defineAsyncComponent(() => import('~/pages/components/FaqSection.vue'));
const CaseStudies = defineAsyncComponent(() => import('~/pages/components/CaseStudies.vue'));
const HowItWorks = defineAsyncComponent(() => import('~/pages/components/HowItWorks.vue'));
const FeatureShowcase = defineAsyncComponent(() => import('~/pages/components/FeatureShowcase.vue'));
const Reviews = defineAsyncComponent(() => import('~/pages/components/Reviews.vue'));

import { useNuxtApp } from 'nuxt/app'
const { $toast } = useNuxtApp() as any

useSeo({
  title: "Seedance Pro – Fastest Text & Images Video Generator | Free",
  description: "Create cinematic 1080P videos from text or images with Seedance Pro. Experience multi-shot narratives, smooth camera motions, and precise prompt control."
});

// 处理支付回调
onBeforeMount(() => {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const paySuccess = urlParams.get("paysuccess");

  if (paySuccess == "1") {
    window.history.replaceState({}, "", window.location.pathname);
    setTimeout(() => {
      $toast.success("Thank you for your support! Your membership benefits are now activated.",3000);
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
    name: "SeedancePro",
    description: "Advanced multi-camera video generation model that excels in storytelling. Create stunning 1080P HD videos with smooth motion and cinematic aesthetics.",
    applicationCategory: "VideoGenerationApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Multi-camera storytelling",
      "Smooth motion generation",
      "Precise instruction following",
      "1080P HD video output",
      "Multiple aspect ratios",
      "Flexible video duration",
      "Text-to-video generation",
      "Image-to-video generation"
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