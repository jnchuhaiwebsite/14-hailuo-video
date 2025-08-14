<template>
  <header>
    <nav
      class="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-md"
      style="background: rgba(25, 23, 28, 0.8)"
    >
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center h-16">
          <!-- Logo -->
          <div class="flex items-center gap-2 mr-8">
            <NuxtLink to="/">
              <span class="bg-gradient-to-r from-[#db2777]  to-[#7C3AED] bg-clip-text text-transparent font-black text-3xl" style="font-weight: 900; -webkit-text-stroke: 1px transparent;">
                Hailuo2
              </span>
            </NuxtLink>
          </div>

          <!-- PC端导航 -->
          <div class="hidden lg:flex items-center flex-grow">
            <div class="flex items-center space-x-8">
              <template v-for="(section, index) in sections" :key="index">
                <!-- 有子菜单的导航项 -->
                <div v-if="section.children && section.children.length > 0" class="relative group">
                  <button
                    @click="toggleDropdown(index)"
                    @mouseenter="openDropdown = index"
                    class="text-gray-300 hover:text-[#7C3AED] transition-colors whitespace-nowrap flex items-center gap-1"
                  >
                    {{ section.name }}
                    <svg
                      class="w-4 h-4 transition-transform duration-200"
                      :class="{ 'rotate-180': openDropdown === index }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <!-- 下拉菜单 -->
                  <div
                    v-show="openDropdown === index"
                    @mouseenter="openDropdown = index"
                    @mouseleave="openDropdown = null"
                    class="absolute top-full left-0 mt-2 backdrop-blur-md shadow-lg z-50 border border-gray-600/30 rounded-lg overflow-hidden"
                    :class="{'whitespace-nowrap': getSubNavStyle().noWrap}"
                    style="background: rgba(25, 23, 28, 0.95); min-width: 160px;"
                  >
                    <template v-for="(child, childIndex) in section.children" :key="childIndex">
                      <!-- 外部链接使用a标签 -->
                      <a
                        v-if="child.href && (child.href.startsWith('http') || shouldOpenInNewTab(child))"
                        :href="child.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-[#7C3AED] transition-colors flex items-center justify-between"
                      >
                        <span>{{ child.name }}</span>
                        <div class="flex items-center">
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'hot'" class="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'new'" class="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="shouldShowBeta(child)" class="text-xs bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full ml-2">Beta</span>
                        </div>
                      </a>
                      
                      <!-- 内部链接使用NuxtLink -->
                      <NuxtLink
                        v-else-if="child.href"
                        :to="child.href"
                        class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-[#7C3AED] transition-colors flex items-center justify-between"
                      >
                        <span>{{ child.name }}</span>
                        <div class="flex items-center">
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'hot'" class="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'new'" class="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="shouldShowBeta(child)" class="text-xs bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full ml-2">Beta</span>
                        </div>
                      </NuxtLink>
                      <div
                        v-else-if="child.id"
                        @click="handleNavClick(child.id)"
                        class="block px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-[#7C3AED] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>{{ child.name }}</span>
                        <div class="flex items-center">
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'hot'" class="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'new'" class="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="shouldShowBeta(child)" class="text-xs bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full ml-2">Beta</span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                
                <!-- 普通导航项 -->
                <NuxtLink
                  v-else-if="section.href"
                  :to="section.href"
                  class="text-gray-300 hover:text-[#7C3AED] transition-colors whitespace-nowrap"
                >
                  {{ section.name }}
                </NuxtLink>
                <div
                  v-else-if="section.id"
                  @click="handleNavClick(section.id)"
                  class="text-gray-300 hover:text-[#7C3AED] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {{ section.name }}
                </div>
              </template>
            </div>
          </div>

          <!-- 用户信息区域 - PC端 -->
          <div class="ml-auto">
            <UserMenu />
          </div>

          <!-- 移动端菜单按钮 -->
          <button
            @click="isOpen = !isOpen"
            class="lg:hidden text-[#7C3AED] p-2 rounded-md hover:bg-[#7C3AED]/20 transition-colors"
          >
            <svg
              v-if="!isOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单，使用懒加载 -->
      <Transition name="slide-fade">
        <div
          v-if="isOpen"
          class="lg:hidden fixed top-0 left-0 w-full h-screen overflow-y-auto bg-blue-pale/95 backdrop-blur-sm z-[100]"
        >
          <!-- 关闭按钮 -->
          <button
            @click="isOpen = false"
            class="fixed top-4 right-4 text-[#7C3AED] p-2 rounded-full hover:bg-[#7C3AED]/20 transition-colors z-[101]"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- 滚动内容区域 -->
          <div class="pt-16 px-4 pb-8">
            <!-- 导航链接 -->
            <div class="space-y-2 mb-6">
              <template v-for="(section, index) in sections" :key="index">
                <!-- 有子菜单的导航项 -->
                <div v-if="section.children && section.children.length > 0" class="space-y-1">
                  <button
                    @click="toggleMobileDropdown(index)"
                    class="w-full text-left text-gray-300 hover:text-[#7C3AED] text-base py-2 transition-colors flex items-center justify-between"
                  >
                    {{ section.name }}
                    <svg
                      class="w-4 h-4 transition-transform duration-200"
                      :class="{ 'rotate-180': openMobileDropdown === index }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <!-- 移动端子菜单 -->
                  <div
                    v-show="openMobileDropdown === index"
                    class="pl-4 space-y-1"
                    :class="{'whitespace-nowrap overflow-x-auto': getSubNavStyle().noWrap}"
                  >
                    <template v-for="(child, childIndex) in section.children" :key="childIndex">
                      <!-- 外部链接使用a标签 -->
                      <a
                        v-if="child.href && (child.href.startsWith('http') || shouldOpenInNewTab(child))"
                        :href="child.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block text-gray-400 hover:text-[#7C3AED] text-sm py-1 transition-colors flex items-center justify-between"
                        @click="() => { isOpen = false; }"
                      >
                        <span>{{ child.name }}</span>
                        <div class="flex items-center">
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'hot'" class="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'new'" class="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="shouldShowBeta(child)" class="text-xs bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full ml-2">Beta</span>
                        </div>
                      </a>
                      
                      <!-- 内部链接使用NuxtLink -->
                      <NuxtLink
                        v-else-if="child.href"
                        :to="child.href"
                        class="block text-gray-400 hover:text-[#7C3AED] text-sm py-1 transition-colors flex items-center justify-between"
                        @click="() => { isOpen = false; }"
                      >
                        <span>{{ child.name }}</span>
                        <div class="flex items-center">
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'hot'" class="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'new'" class="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="shouldShowBeta(child)" class="text-xs bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full ml-2">Beta</span>
                        </div>
                      </NuxtLink>
                      <div
                        v-else-if="child.id"
                        @click="() => { handleNavClick(child.id); isOpen = false; }"
                        class="block text-gray-400 hover:text-[#7C3AED] text-sm py-1 transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>{{ child.name }}</span>
                        <div class="flex items-center">
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'hot'" class="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="getBadgeInfo(child) && getBadgeInfo(child)?.type === 'new'" class="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full ml-2">{{ getBadgeInfo(child)?.text }}</span>
                          <span v-if="shouldShowBeta(child)" class="text-xs bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full ml-2">Beta</span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                
                <!-- 普通导航项 -->
                <NuxtLink
                  v-else-if="section.href"
                  :to="section.href"
                  class="block text-gray-300 hover:text-[#7C3AED] text-base py-2 transition-colors"
                  @click="() => { isOpen = false; }"
                >
                  {{ section.name }}
                </NuxtLink>
                <div
                  v-else-if="section.id"
                  @click="() => { handleNavClick(section.id); isOpen = false; }"
                  class="block text-gray-300 hover:text-[#7C3AED] text-base py-2 transition-colors"
                >
                  {{ section.name }}
                </div>
              </template>
              <NuxtLink
                v-if="isSignedIn"
                to="/user-center/videos"
                class="block text-gray-300 hover:text-[#7C3AED] text-base py-2 transition-colors"
                @click="() => { isOpen = false; }"
              >
                My Videos
              </NuxtLink>
              <NuxtLink
                v-if="isSignedIn"
                to="/user-center/credits"
                class="block text-gray-300 hover:text-[#7C3AED] text-base py-2 transition-colors"
                @click="() => { isOpen = false; }"
              >
                My Credits
              </NuxtLink>
              <NuxtLink
                v-if="isSignedIn"
                to="/user-center/orders"
                class="block text-gray-300 hover:text-[#7C3AED] text-base py-2 transition-colors"
                @click="() => { isOpen = false; }"
              >
                My Orders
              </NuxtLink>
            </div>

            <!-- 移动端用户菜单 -->
            <UserMenu :isMobile="true" />
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, onMounted, onBeforeUnmount } from "vue";
import { useNavigation } from "~/utils/navigation";
import { useClerkAuth } from '~/utils/auth';
import { useRouter, useRoute } from 'vue-router';

// 状态管理
const isOpen = ref(false);
const openDropdown = ref<number | null>(null);
const openMobileDropdown = ref<number | null>(null);
const { isSignedIn } = useClerkAuth();
const router = useRouter();
const route = useRoute();

// 使用导航工具
const { 
  activeSection, 
  sections, 
  handleNavClick, 
  handleScroll, 
  executeScroll,
  shouldOpenInNewTab,
  shouldShowBeta,
  getBadgeInfo,
  getSubNavStyle
} = useNavigation();

// 切换PC端下拉菜单
const toggleDropdown = (index: number) => {
  if (openDropdown.value === index) {
    openDropdown.value = null;
  } else {
    openDropdown.value = index;
  }
};

// 切换移动端下拉菜单
const toggleMobileDropdown = (index: number) => {
  if (openMobileDropdown.value === index) {
    openMobileDropdown.value = null;
  } else {
    openMobileDropdown.value = index;
  }
};

onMounted(() => {
  // 仅在移动菜单关闭状态下设置overflow
  if (!isOpen.value) {
    document.body.style.overflow = "";
  }

  // 添加滚动事件监听
  window.addEventListener("scroll", handleScroll);

  // 初始检查 sessionStorage 中是否有目标锚点
  const targetSection = sessionStorage.getItem("targetSection");
  if (targetSection && route.path === '/') {
    // 清除目标锚点
    sessionStorage.removeItem("targetSection");
    // 延迟执行滚动操作，确保DOM已加载完成
    setTimeout(() => {
      executeScroll(targetSection);
    }, 300);
  }
});

// 监听菜单打开状态，控制body滚动
watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = "hidden";
  } else {
    // 给一个短暂延迟再恢复滚动，防止布局跳动
    setTimeout(() => {
      if (!isOpen.value) { // 再次检查，防止快速切换导致的问题
        document.body.style.overflow = "";
      }
    }, 50);
  }
});

// 组件卸载时只移除事件监听，不修改overflow
onBeforeUnmount(() => {
  // 只有当移动菜单关闭时才重置overflow，防止错位
  if (!isOpen.value) {
    document.body.style.overflow = "";
  }
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* 导航栏动画 */
.nav-enter-active,
.nav-leave-active {
  transition: all 0.3s ease;
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 覆盖hover效果 */
.hover-text-theme:hover {
  color: var(--baby-coral) !important;
}

/* 子导航样式 */
.whitespace-nowrap {
  white-space: nowrap;
}

.overflow-x-auto {
  overflow-x: auto;
  scrollbar-width: thin;
  -ms-overflow-style: none; /* IE和Edge */
}

/* 隐藏Chrome等浏览器的滚动条 */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

/* 角标动画效果 */
@keyframes pulse-hot {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes pulse-new {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.text-xs.bg-red-500 {
  animation: pulse-hot 2s infinite;
  font-weight: 600;
  box-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
}

.text-xs.bg-green-500 {
  animation: pulse-new 2s infinite;
  font-weight: 600;
  box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
}
</style> 