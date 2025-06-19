<template>
  <footer class="relative bg-blue-pale text-gray-300 py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4">
      
      <!-- 主要内容区域 -->
      <div class="flex flex-col md:flex-row gap-8 md:gap-12 mb-8 md:mb-12">
        <!-- 友情链接区域 -->
        <div class="space-y-4">
          <h3 class="text-[#7C3AED] font-medium mb-4 text-left text-sm md:text-lg">Partner Sites</h3>
          <div class="space-y-2">
            <a 
              href="https://hailuo2.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-[#7C3AED] transition-colors text-sm">
              Hailuo2.com
            </a>
            <a 
              href="https://hailuo.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-[#7C3AED] transition-colors text-sm">
              Hailuo.ai
            </a>
          </div>
        </div>

        <!-- 导航链接和法律条款 -->
        <div class="space-y-4">
          <h3 class="text-[#7C3AED] font-medium mb-4 text-sm md:text-lg">Navigation</h3>
          <div class="space-y-2">
            <NuxtLink to="/" class="text-gray-400 hover:text-[#7C3AED] transition-colors">
              Home
            </NuxtLink>
            <div 
              @click="scrollToSection('features')"
              class="text-gray-400 hover:text-[#7C3AED] transition-colors cursor-pointer">
              Features
            </div>
            <NuxtLink to="/portfolio" class="text-gray-400 hover:text-[#7C3AED] transition-colors">
              Portfolio
            </NuxtLink>
            <NuxtLink to="/blog" class="text-gray-400 hover:text-[#7C3AED] transition-colors">
              Blog
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-[#7C3AED] font-medium mb-4 text-sm md:text-lg">Legal</h3>
          <div class="space-y-2">
            <div>
              <NuxtLink to="/subsidiary/privacy-policy" class="text-gray-400 hover:text-[#7C3AED] transition-colors">Privacy Policy</NuxtLink>
            </div>
            <div>
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
  background-color: #00ffd1;  /* theme color */
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}
</style> 