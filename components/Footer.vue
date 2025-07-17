<template>
  <footer class="relative bg-blue-pale text-gray-300 py-8 md:py-12 pt-8 border-t border-gray-700/30">
    <div class="max-w-7xl mx-auto px-4 ">
      
      <!-- 友情链接区域 -->
      <div class="mb-8">
        <h3 class="text-[#7C3AED] font-medium mb-4 text-left text-sm md:text-lg">Partner Sites</h3>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <a v-for="(item,index) in partnerSites" :key="index" 
             :href="item.url" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="text-gray-400 hover:text-[#7C3AED] transition-colors text-sm">
            {{ item.name }}
          </a>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="w-full h-px bg-gray-700/30 mb-8"></div>

      <!-- 主要内容区域 -->
      <div class="flex flex-col md:flex-row gap-8 md:gap-16">
        <!-- Logo 和描述 -->
        <div class="flex-1">
          <div class="flex flex-col items-start text-left">
            <img src="/logo2.png" alt="Hailuo02 Video - AI Video from Text or Image in Minutes" loading="lazy" class="h-12 md:h-8 mb-4">
            <p class="text-sm text-gray-400 max-w-xl mb-4">
              Hailuo 02 is an AI-powered video generation tool that enables users to quickly create high-quality 1080p short videos from text or images, perfect for social media, brand marketing, and educational content.
            </p>
            <div class="flex flex-col items-start gap-2 text-sm text-gray-500">
              <p>© 2025 Hailuo02 Video. All rights reserved.</p>
              <div class="text-left">
                <p class="text-gray-400 text-sm">
            
                  <a href="mailto:support@hailuo2.com" class="transition-colors text-[#7C3AED] font-medium hover:text-[#9461F7] ">support@hailuo2.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 导航链接和法律条款 -->
        <div class="flex-1 grid grid-cols-2 sm:grid-cols-2 gap-6 md:gap-8">
          <!-- 导航链接 -->
          <div>
            <h3 class="text-[#7C3AED] font-medium mb-4 text-sm md:text-lg">Resources</h3>
            <div class="flex flex-col gap-2">
              <template v-for="(section, index) in footerSections" :key="index">
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

const { activeSection, sections, handleNavClick, handleScroll, footerSections } = useNavigation()

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