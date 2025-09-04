<template>
  <div
    class="py-16 bg-blue-pale/80 backdrop-blur-sm"
    aria-labelledby="pricing-heading"
  >

      <!-- 标题区 -->
      <div class="mt-[64px] mb-10 flex flex-col items-center relative z-10 w-full max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-4">
      <h1 class="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#db2777] bg-clip-text text-transparent drop-shadow-2xl tracking-tight animate-gradient-x pb-2">
        Hailuo 02 AI Video Generator Pricing
        <!-- - Transform Your Creative Moments into Blockbuster Videos Instantly. -->
      </h1>
      <p class="mt-4 text-base text-gray-200 text-center max-w-4xl font-medium">
        Affordable and Flexible Plans to Meet Your Video Creation Needs – Start Creating Professional Videos Today
      </p>
                 <div class="mt-6 max-w-5xl mx-auto border-2 border-[#7C3AED]/30 rounded-full px-8 py-4 backdrop-blur-sm bg-[#7C3AED]/5">
           <p class="text-lg text-center font-semibold">
             <span>🔥</span>
             <span class="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#db2777] bg-clip-text text-transparent drop-shadow-lg"> Recommendation: Choose higher-tier plans for lower credit costs!</span>
           </p>
         </div>
    </div>

    <div class="max-w-7xl mx-auto px-4">

      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
          aria-label="Loading pricing plans"
        ></div>
      </div>

      <!-- 定价卡片 -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        <!-- 循环渲染套餐卡片 -->
        <article
          v-for="(plan, index) in data as any"
          :key="index"
          :class="[
            'bg-gray-800 rounded-xl p-8 flex flex-col',
            plan.is_popular
              ? 'border-2 border-theme shadow-lg relative'
              : 'border border-gray-700 shadow-sm hover:shadow-md transition-shadow',
            plan.price === 0 ? 'hidden md:flex' : 'flex'
          ]"
        >
          <div
            v-if="plan.is_popular"
            class="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-theme text-white text-sm rounded-full font-medium"
          >
            Most Popular
          </div>
          <h2 class="text-2xl font-bold text-white mb-2 font-medium text-center">
            {{ plan.name }}
          </h2>
          <h3 class="text-gray-400 mb-6 text-center">{{ plan.description }}</h3>
          <div class="text-5xl font-bold text-white mb-6 text-center">
            ${{ plan.price }} <span class="text-gray-400 text-base font-normal">one-time</span>
          </div>
          <button
            @click="plan.code ? handleUpgradePlan(plan) : null"
            :disabled="upgradingPlanId === plan.code"
            :class="[
              'w-full py-3 px-4 rounded-lg flex items-center justify-center mb-6 cursor-pointer hover:bg-none focus:bg-none active:bg-none',
              getButtonClass(plan),
            ]"
          >
            <div v-if="upgradingPlanId === plan.code" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            {{ plan.button_text }}
          </button>
          <div class="w-full h-[1px] bg-gray-700 mb-6"></div>
          <ul class="space-y-3 mb-8" :aria-label="`${plan.name} plan features`">
            <li
              v-for="(feature, fIndex) in getPlanFeatures(plan)"
              :key="fIndex"
              class="flex items-center text-gray-300"
            >
              <span class="mr-2 text-theme" aria-hidden="true">✓</span>
              {{ feature }}
            </li>
          </ul>
          <div class="mt-auto">
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getSubPlans, payOrder } from "~/api/index";
import { useClerkAuth } from '~/utils/auth';
import { useSeo } from '~/composables/useSeo';
import { useAsyncData } from 'nuxt/app';
import { isMobile, detectDeviceType } from '~/utils/platformDetection';
// 引入auth认证
const {
  isSignedIn
} = useClerkAuth();

// 用户状态
const upgradingPlanId = ref<string | null>(null);

// 使用useAsyncData获取套餐数据
const { data, pending } = await useAsyncData('pricingPlans', async () => {
  try {
    const res = await getSubPlans();
    if (res.code === 200 && res.data) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to get plan information:", error);
    return [];
  }
});

// 获取套餐特性列表
const getPlanFeatures = (plan: any): string[] => {
  if (!plan.features) return [];
  // 如果特性是字符串，按逗号分割
  if (typeof plan.features === 'string') {
    return plan.features.split(',').map((feature: string) => feature.trim());
  }
  // 如果已经是数组，直接返回
  return Array.isArray(plan.features) ? plan.features : [];
};

  // 获取按钮样式
const getButtonClass = (plan: any): string => {
      if (plan.price === 0) {
      return "bg-gray-100 text-white hover:bg-gray-200";
    } else if (plan.is_popular) {
      return "bg-theme text-white hover:brightness-110";
    } else {
      return "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20";
    }
};



// 处理升级计划
const handleUpgradePlan = async (plan: any) => {
  // 简单检测当前平台
  const isMobileDevice = isMobile();
  const platform = isMobileDevice ? '1' : '2'; // 1: 移动端 2: PC端
  // console.log(`当前平台: ${platform}`);
  // 详细设备信息（保留用于调试）
  // const deviceInfo = detectDeviceType();
  // console.log('详细设备信息:', deviceInfo);
  // 如果没有登录，则提示登录并触发登录
  if (!isSignedIn.value) {
    try {
      const loginBtn = document.querySelector('#bindLogin') as HTMLElement;
      if (loginBtn) {
        loginBtn.click();
      }
    } catch (error) {
      console.error("Failed to find login:", error);
    }
    return;
  }

  upgradingPlanId.value = plan.code;
  try {
    const response = (await payOrder({ price_id: plan.code, device_type: platform })) as any;
    if (response.code === 200 && response.data?.url) {
      window.location.href = response.data.url;
    } else {
      throw new Error(response.msg || "Failed to create payment order");
    }
  } catch (error) {
    console.error("Payment failed:", error);
  } finally {
    upgradingPlanId.value = null;
  }
};

  //设置页面元数据
  useSeo({
    title: `Hailuo 02 AI Video Generator Pricing`,
    description: `Explore Hailuo 02 AI Video Generator pricing for casual users, creators, and businesses. Affordable, transparent plans with no hidden fees. Start now!`,
  });
</script>



<style scoped>
button {
  transition: all 0.2s ease-in-out;
}

</style> 
