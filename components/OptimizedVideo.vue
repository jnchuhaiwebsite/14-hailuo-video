<template>
  <video
    ref="videoRef"
    :class="videoClass"
    :style="videoStyle"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :playsinline="playsinline"
    :preload="preload"
    :fetchpriority="fetchpriority"
    :src="src"
    :poster="poster"
    :controls="controls"
    :width="width"
    :height="height"
    @canplay="handleCanPlay"
    @loadeddata="handleLoadedData"
    @loadstart="handleLoadStart"
    @error="handleError"
    @waiting="handleWaiting"
    @playing="handlePlaying"
    @pause="handlePause"
    @timeupdate="handleTimeUpdate"
    @ended="handleEnded"
  ></video>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  src: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  playsinline?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  fetchpriority?: 'high' | 'low' | 'auto'
  controls?: boolean
  width?: number | string
  height?: number | string
  videoClass?: string
  videoStyle?: string | Record<string, string>
}

interface Emits {
  (e: 'canplay'): void
  (e: 'loadeddata'): void
  (e: 'loadstart'): void
  (e: 'error', error: Event): void
  (e: 'waiting'): void
  (e: 'playing'): void
  (e: 'pause'): void
  (e: 'timeupdate', currentTime: number): void
  (e: 'ended'): void
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  loop: false,
  muted: true,
  playsinline: true,
  preload: 'metadata',
  fetchpriority: 'auto',
  controls: false
})

const emit = defineEmits<Emits>()

const videoRef = ref<HTMLVideoElement | null>(null)

// 事件处理函数
const handleCanPlay = () => {
  emit('canplay')
}

const handleLoadedData = () => {
  emit('loadeddata')
}

const handleLoadStart = () => {
  emit('loadstart')
}

const handleError = (error: Event) => {
  emit('error', error)
}

const handleWaiting = () => {
  emit('waiting')
}

const handlePlaying = () => {
  emit('playing')
}

const handlePause = () => {
  emit('pause')
}

const handleTimeUpdate = () => {
  if (videoRef.value) {
    emit('timeupdate', videoRef.value.currentTime)
  }
}

const handleEnded = () => {
  emit('ended')
}

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

// 处理页面可见性变化
const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    tryPlayVideo()
  }
}

onMounted(() => {
  // 如果设置了自动播放，立即尝试播放
  if (props.autoplay) {
    tryPlayVideo()
  }
  
  // 添加可见性变化监听
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // 添加页面焦点监听
  window.addEventListener('focus', tryPlayVideo)
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('focus', tryPlayVideo)
})

// 暴露方法给父组件
defineExpose({
  play: () => videoRef.value?.play(),
  pause: () => videoRef.value?.pause(),
  currentTime: () => videoRef.value?.currentTime || 0,
  duration: () => videoRef.value?.duration || 0,
  videoElement: videoRef
})
</script> 