<template>
  <div class="min-h-screen bg-blue-pale/80 backdrop-blur-sm pt-[80px]">
    <div class="max-w-7xl mx-auto p-4 sm:p-6">
      <!-- 页面标题 -->
      <div class="mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-white">User Center</h1>
        <p class="text-gray-300 mt-2">Manage your account information and content</p>
      </div>

      <!-- 主要内容区域 -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- 左侧导航栏 -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <nav class="p-4">
              <ul class="space-y-2">
                <li v-for="item in navigationItems" :key="item.key">
                  <NuxtLink
                    :to="item.route"
                    :class="[
                      'w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                      $route.path === item.route
                        ? 'bg-[#7C3AED] text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    ]"
                  >
                    <component :is="item.icon" class="h-5 w-5" />
                    <span class="font-medium">{{ item.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- 右侧内容区域 -->
        <div class="flex-1">
          <div class="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
            <!-- 页面内容将通过路由动态加载 -->
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "nuxt/app";
useHead({
  title: 'User Center - Hailuo02 Video',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
// 导航项配置
const navigationItems = [
  {
    key: 'videos',
    label: 'My Videos',
    route: '/user-center/videos',
    icon: 'VideoCameraIcon'
  },
  {
    key: 'credits',
    label: 'My Credits',
    route: '/user-center/credits',
    icon: 'CreditCardIcon'
  },
  {
    key: 'orders',
    label: 'My Orders',
    route: '/user-center/orders',
    icon: 'ShoppingCartIcon'
  },

  {
    key: 'invitedUsers',
    label: 'My Invited Users',
    route: '/user-center/invited-users',
    icon: 'ShareIcon'
  }
]
</script>

<style scoped>
/* 可以添加自定义样式 */
</style> 