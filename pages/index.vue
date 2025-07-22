<template>
  <div class="w-full mx-auto bg-blue-pale">
    <main class="max-w-24xl mx-auto min-h-screen">
      <!-- 首屏区块 -->
      <section
        id="hero"
        class="min-h-[700px] relative pt-[64px]"
      >
        <KeepAlive>
          <HomeHero />
        </KeepAlive>
      </section>

      
      <!-- 操作步骤 -->
      <section id="how-it-works">
        <KeepAlive>
          <HowItWorks />
        </KeepAlive>
      </section>

  

      <section id="hailuo-key-features">
        <KeepAlive>
          <HailuoKeyFeatures />
        </KeepAlive>
      </section>

      <section id="hailuo-use-cases">
        <KeepAlive>
          <LazyHailuoUseCases />
        </KeepAlive>
      </section>
      
      <!-- 用户评论 -->
      <section id="reviews">
        <KeepAlive>
          <Reviews />
        </KeepAlive>
      </section>


      <!-- 常见问题模块 -->
      <section id="faq">
        <KeepAlive>
          <FaqSection />
        </KeepAlive>
      </section>

      <section id="cta">
        <KeepAlive>
          <Cta />
        </KeepAlive>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, defineAsyncComponent, onMounted } from "vue";
import { useSeo } from '~/composables/useSeo';


const HomeHero = defineAsyncComponent(() => import('~/pages/components/HomeHero.vue'));
const FaqSection = defineAsyncComponent(() => import('~/pages/components/FaqSection.vue'));
const HowItWorks = defineAsyncComponent(() => import('~/pages/components/HowItWorks.vue'));
const Reviews = defineAsyncComponent(() => import('~/pages/components/Reviews.vue'));

import { useNuxtApp } from 'nuxt/app'
const { $toast } = useNuxtApp() as any

useSeo({
  title: "Hailuo 02 AI Video Generator | Online & Free Trial | Hailuo2",
  description: "Create stunning AI videos in seconds using text or images with Hailuo 02. No editing needed. Perfect for creators, brands, and educators. Try it free today!"
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
    name: "Hailuo 02 Video",
    description: "Create stunning AI videos in 3-5minutes using text or images with Hailuo02. No editing needed. Perfect for creators, brands, and educators.",
    applicationCategory: "VideoGenerationApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "AI video generation from text",
      "AI video generation from images",
      "No editing required",
      "Perfect for creators",
      "Perfect for brands",
      "Perfect for educators",
      "1080P HD video output",
      "Multiple aspect ratios",
      "Flexible video duration",
      "Fast generation"
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
