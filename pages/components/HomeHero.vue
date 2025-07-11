<template>
  <div class="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
    <!-- 背景视频 -->
    <video 
      ref="videoRef"
      class="absolute inset-0 w-full h-full object-cover"
      autoplay 
      loop 
      muted 
      playsinline
      preload="auto"
      :src="previewVideoUrl"
      :poster="previewVideoPoster"
      @canplay="handleVideoCanPlay"
      @loadeddata="handleVideoLoaded"
      defaultMuted
    ></video>
    
    <!-- 半透明蒙版 -->
    <div class="absolute inset-0 bg-black/60"></div>
    
    <!-- 内容区域 -->
    <div class="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center text-[#F0F0F8] drop-shadow-2xl tracking-tight mb-6 hero-title">
        Hailuo 02  AI Video  Generator
      </h1>
      <p class="text-xl sm:text-2xl text-gray-200 max-w-5xl mx-auto mb-8 hero-text">
        Transform Text and Images into Stunning Videos Quickly and Easily for Your Business, Brand, or Educational Content.
      </p>
      <button 
        class="px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 text-white rounded-lg font-bold text-lg hover:from-[#7C3AED]/90 hover:to-[#7C3AED]/70 transition-all duration-300 shadow-xl hover:shadow-[#7C3AED]/20"
        @click="navigateToAiVideo"
      >
      Generate Your Video
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()
const videoRef = ref<HTMLVideoElement | null>(null)

// 预览视频URL
const previewVideoUrl = '/video/haoluo2-home-video.mp4'
const previewVideoPoster = '/img/1.webp'

// 尝试播放视频的函数
const tryPlayVideo = async () => {
  if (videoRef.value) {
    try {
      await videoRef.value.play()
    } catch (error) {
      console.log('视频播放尝试失败:', error)
      // 设置一个短暂延迟后重试
      setTimeout(tryPlayVideo, 1000)
    }
  }
}

// 处理视频可以播放时的事件
const handleVideoCanPlay = () => {
  tryPlayVideo()
}

// 处理视频加载完成的事件
const handleVideoLoaded = () => {
  tryPlayVideo()
}

// 组件挂载时确保视频播放
onMounted(() => {
  // 立即尝试播放
  tryPlayVideo()
  
  // 添加可见性变化监听
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // 添加页面焦点监听
  window.addEventListener('focus', tryPlayVideo)
})

// 处理页面可见性变化
const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    tryPlayVideo()
  }
}

// 组件卸载前清理事件监听
onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('focus', tryPlayVideo)
})

// 导航到 AI Video 页面
const navigateToAiVideo = () => {
  router.push('/hailuo-ai-video-generator')
}
</script>

<style scoped>
@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.hero-title {
  line-height: 1.2;
}

.hero-text {
  line-height: 1.2;
}
</style> 