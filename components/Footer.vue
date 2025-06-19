<template>
  <footer class="relative bg-blue-pale text-gray-300 py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4">
      
      <!-- 主要内容区域 -->
      <div class="flex flex-col md:flex-row gap-8 md:gap-12 mb-8 md:mb-12">
        <!-- 友情链接区域 -->
        <div class="md:w-1/3">
          <h3 class="text-[#7C3AED] font-medium mb-4 text-left text-sm md:text-lg">Partner Sites</h3>
          <div class="flex flex-wrap gap-3">
            <a v-for="(item,index) in partnerSites" :key="index" 
               :href="item.url" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="text-gray-400 hover:text-[#7C3AED] transition-colors text-sm">
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- 导航链接和法律条款 -->
        <div class="md:w-2/3 grid grid-cols-2 sm:grid-cols-2 gap-6 md:gap-8">
          <!-- 导航链接 -->
          <div>
            <h3 class="text-[#7C3AED] font-medium mb-4 text-sm md:text-lg">Navigation</h3>
            <div class="flex flex-col gap-2">
              <template v-for="(section, index) in sections" :key="index">
                <NuxtLink v-if="section.href" :to="section.href" 
                  class="text-gray-400 hover:text-[#7C3AED] transition-colors">
                  {{ section.name }}
                </NuxtLink>
                <div v-else @click.prevent="handleNavClick(section.id)" 
                  class="text-gray-400 hover:text-[#7C3AED] transition-colors cursor-pointer">
                  {{ section.name }}
                </div>
              </template>
            </div>
          </div>

          <!-- 法律条款 -->
          <div>
            <h3 class="text-[#7C3AED] font-medium mb-4 text-sm md:text-lg">Legal</h3>
            <div class="flex flex-col gap-2">
              <NuxtLink to="/subsidiary/privacy-policy" class="text-gray-400 hover:text-[#7C3AED] transition-colors">Privacy Policy</NuxtLink>
              <NuxtLink to="/subsidiary/terms-of-service" class="text-gray-400 hover:text-[#7C3AED] transition-colors">Terms of Service</NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Logo 和描述 -->
      <div class="py-6 border-t border-gray-700">
        <div class="flex flex-col items-center text-center">
          <img src="/logo.png" alt="Hailuo02 Video - AI Video from Text or Image in Minutes" loading="lazy" class="h-16 md:h-24 mb-4">
          <p class="text-sm text-gray-400 max-w-xl mb-4">
            Create stunning AI videos in 3-5minutes using text or images with Hailuo02 Video. No editing needed. Perfect for creators, brands, and educators.
          </p>
          <div class="flex flex-col items-center gap-2 text-sm text-gray-500">
            <p>© 2025 Hailuo02 Video. All rights reserved.</p>
            <div class="text-center">
              <p class="text-gray-400 text-sm">
                Need help? Contact us at 
                <a href="mailto:support@hailuo2.com" class=" transition-colors">support@hailuo2.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNavigation } from '~/utils/navigation'
import { getFriendLinkList } from '~/api'
import { useAsyncData } from 'nuxt/app'

interface PartnerSite {
  url: string
  name: string
}

const { activeSection, sections, handleNavClick, handleScroll } = useNavigation()

// 服务端请求友情链接
const { data: partnerSites, error } = await useAsyncData('partnerSites', async () => {
  const res = await getFriendLinkList()
  if (res.code === 200) {
    return res.data as PartnerSite[]
  }
  return []
})
</script>

<style scoped>
/* 导航链接悬停效果 */
a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #7C3AED;  /* theme color */
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}
</style> 