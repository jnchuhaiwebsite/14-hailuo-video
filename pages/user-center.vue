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
import { useSeo } from '~/composables/useSeo'

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

// 图标组件
const CreditCardIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>`
}

const ShoppingCartIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>`
}

const VideoCameraIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>`
}

const ShareIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>`
}

// SEO配置
useSeo({
  title: 'User Center - Hailuo2 AI Video Generator',
  description: 'Manage your account information, credits, orders, videos and sharing records. Hailuo2 provides professional AI video generation services.',
  ogTitle: 'User Center - Hailuo2 AI Video Generator',
  ogDescription: 'Manage your account information, credits, orders, videos and sharing records.',
  ogType: 'website'
})
</script>

<style scoped>
/* 可以添加自定义样式 */
</style> 