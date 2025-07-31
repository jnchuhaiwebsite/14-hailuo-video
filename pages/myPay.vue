<template>
  <div
    class="py-16 bg-gradient-to-b from-gray-900 to-gray-800"
    aria-labelledby="pricing-heading"
  >
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h2
        class="text-white text-center text-4xl font-bold mb-4 font-medium"
      >
        Special Trial Offer
      </h2>
      <p class="text-gray-400 text-center max-w-2xl mx-auto mb-12">
        Try our Al video generator with this special $1 trialplan
      </p>

      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#04dcb7]"
          aria-label="Loading pricing plans"
        ></div>
      </div>

      <!-- 定价卡片 -->
      <div
        v-else
        class="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto"
      >
        <!-- 循环渲染套餐卡片 -->
        <article
          v-for="(plan, index) in planData "
          :key="index"
          :class="[
            'bg-gray-800 rounded-xl p-8 flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md',
            plan.is_popular
              ? 'border-2 border-theme shadow-lg relative'
              : 'border border-gray-700 shadow-sm hover:shadow-md transition-shadow',
            plan.price === 0 ? 'hidden md:flex' : 'flex'
          ]"
        >
          <div
            v-if="plan.is_popular"
            class="absolute -top-3 right-6 px-3 py-1 bg-theme text-black text-sm rounded-full"
          >
            Trial Offer
          </div>
          <h3 class="text-2xl font-bold text-white mb-2 font-medium">
            {{ plan.name }}
          </h3>
          <p class="text-gray-400 mb-6">{{ plan.description }}</p>
          <div class="text-3xl font-bold text-white mb-6">
            ${{ plan.price }}
            <span class="text-gray-400 text-base font-normal"></span>
          </div>
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
            <button
              @click="plan.code ? handleUpgradePlan(plan) : null"
              :disabled="upgradingPlanId === plan.code"
              :class="[
                'w-full py-3 px-4 rounded-lg flex items-center justify-center hover-theme',
                getButtonClass(plan),
              ]"
            >
              <div v-if="upgradingPlanId === plan.code" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              {{ plan.button_text }}
            </button>
          </div>
        </article>
      </div>
      <div class="flex justify-center mt-10">
        <NuxtLink to="/" class="text-gray-400 hover:text-white flex items-center">
          <ArrowLeftIcon class="w-6 h-6 mr-2" />
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";
import { getSubplansTest, payOrder } from "~/api/index";
import { useClerkAuth } from '~/utils/auth';
import { useNotificationStore } from '~/stores/notification';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { useHead } from "nuxt/app";


useHead({
  title: 'My Pay - Hailuo02 Video',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
// 引入auth认证
const {
  isSignedIn
} = useClerkAuth();

const pending = ref(true);
const planData = ref([] as any);
// 用户状态
const upgradingPlanId = ref<string | null>(null);
const notificationStore = useNotificationStore();

// 使用useAsyncData获取套餐数据
onMounted(async () => {
  const res = await getSubplansTest() as any;
  if (res.code === 200 && res.data) {
    res.data.is_popular = true;
    planData.value[0] = res.data;
  }
  pending.value = false;
})

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
    return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  } else if (plan.is_popular) {
    return "bg-theme text-black hover:bg-theme-hover";
  } else {
    return "bg-theme text-black hover:bg-theme-hover";
  }
};

// 处理升级计划
const handleUpgradePlan = async (plan: any) => {
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
    const response = (await payOrder({ price_id: plan.code })) as any;
    if (response.code === 200 && response.data?.url) {
      window.location.href = response.data.url;
    } else {
      notificationStore.addNotification({
        taskId: `payment-error-${Date.now()}`,
        status: 'error',
        message: response.msg || "Failed to create payment order"
      });
      throw new Error(response.msg || "Failed to create payment order");
    }
  } catch (error) {
    console.error("Payment failed:", error);
  } finally {
    upgradingPlanId.value = null;
  }
};
</script>

<style scoped>
.hover-theme:hover {
  background-color: var(--theme-primary-hover) !important;
  color: #fff !important;
}
</style> 