<template>
  <div class="relative w-full flex flex-col items-center justify-start overflow-x-hidden">
    <!-- 标题区 -->
    <div class="mt-[64px] mb-10 flex flex-col items-center relative z-10">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#db2777] bg-clip-text text-transparent drop-shadow-2xl tracking-tight animate-gradient-x">
        With Hailuo2 Video AI, creative moments instantly turn into blockbusters.
      </h1>
      <p class="mt-4 text-base text-gray-200 text-center max-w-2xl font-medium">
        Create stunning AI videos in minutes using text or images with Hailuo02 Video. No editing needed. Perfect for creators, brands, and educators. Generate smooth, cinematic videos in 1080P quality—perfect for storytelling, marketing, and creative expression.
      </p>
    </div>
    <!-- 主体区 -->
    <div class="w-full max-w-[1360px] flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center items-stretch px-2 sm:px-3 lg:px-4 pb-12 lg:pb-20">
      <!-- 左侧表单 -->
      <div :class="[
        'w-full mx-auto lg:mx-0 lg:w-[35%] xl:w-[40%] 2xl:w-[42%] lg:min-w-[304px] xl:min-w-[336px] max-w-[576px] lg:max-w-none bg-blue-pale/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 xl:p-8 flex flex-col gap-2 sm:gap-3 lg:gap-4',
        containerHeight.base,
        containerHeight.sm,
        containerHeight.lg
      ]">
        <!-- 切换tab -->
        <div class="flex gap-2 mb-1">
          <div class="flex w-full bg-gray-700/50 p-1 rounded-xl">
            <button 
              @click="handleAction('switchTab', 'text')"
              class="tab-button flex-1 flex items-center justify-center gap-1 px-0 py-0 h-8 sm:h-10 rounded-lg transition-all duration-300 font-bold text-sm lg:text-base shadow group"
              :class="activeTab === 'text' ? 'active bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 text-white shadow-lg ring-2 ring-[#7C3AED]' : 'text-gray-300 hover:bg-[#7C3AED]/20 hover:text-[#7C3AED]'"
            >
              <span class="whitespace-nowrap">Text to Video</span>
              <PlusIcon class="h-3 w-3 lg:h-4 lg:w-4" :class="activeTab === 'text' ? 'text-gray-900' : 'text-gray-300 group-hover:text-gray-900'" />
            </button>
            <button 
              @click="handleAction('switchTab', 'image')"
              class="tab-button flex-1 flex items-center justify-center gap-1 px-0 py-0 h-8 sm:h-10 rounded-lg transition-all duration-300 font-bold text-sm lg:text-base shadow group"
              :class="activeTab === 'image' ? 'active bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 text-white shadow-lg ring-2 ring-[#7C3AED]' : 'text-gray-300 hover:bg-[#7C3AED]/20 hover:text-[#7C3AED]'"
            >
              <span class="whitespace-nowrap">Image to Video</span>
              <PhotoIcon class="h-3 w-3 lg:h-4 lg:w-4" :class="activeTab === 'image' ? 'text-gray-900' : 'text-gray-300 group-hover:text-gray-900'" />
            </button>
          </div>
        </div>
        <!-- 图片上传区域 -->
        <Transition
          enter-active-class="animate-smooth-in"
          leave-active-class="animate-smooth-out"
        >
          <div v-if="activeTab === 'image'" class="w-full border-2 border-dashed border-gray-700 rounded-lg p-3 hover:border-[#7C3AED] transition-colors cursor-pointer mb-3 relative bg-blue-pale">
            <input 
              type="file" 
              accept="image/jpeg,image/png" 
              class="hidden" 
              ref="fileInput"
              @change="handleImageUpload"
            />
            <div 
              v-if="!imagePreview" 
              class="flex flex-col items-center justify-center gap-1.5"
              @click="handleImageUploadClick"
            >
              <ArrowUpOnSquareIcon class="h-6 w-6 text-gray-400" />
              <div class="text-center">
                <p class="text-sm text-gray-300">Click or drag image here</p>
                <p class="text-xs text-gray-500 mt-0.5">Supports JPG, PNG format, up to 5MB</p>
              </div>
            </div>
            <div v-else class="relative w-full h-[160px]">
              <img 
                :src="imagePreview" 
                class="w-full h-full object-contain rounded-lg"
                alt="Preview"
              />
              <button 
                @click="removeSelectedImage"
                class="absolute -top-1.5 -right-1.5 p-0.5 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                <XMarkIcon class="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </Transition>
        <!-- 提示词 -->
        <div :class="{'space-y-2': activeTab === 'text'}">
          <label class="block text-sm lg:text-base font-semibold text-gray-300" :class="{'mb-1.5': activeTab === 'text', 'mb-1': activeTab === 'image'}">
            Prompt
          </label>
          <textarea 
            v-model="prompt"
            class="w-full rounded-lg bg-blue-pale border border-gray-700 text-gray-200 px-2 py-1.5 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition placeholder-gray-500 text-sm lg:text-base h-16 sm:h-20 resize-none" 
            :placeholder="activeTab === 'text' ? 'Describe the video you want to create...' : 'Describe how to transform your image into video...'"
            @click="handleAction('prompt')"
          ></textarea>
        </div>
        <!-- 灵感 -->
        <div v-if="activeTab === 'text'" class="flex items-center flex-wrap gap-1.5 mt-1.5 mb-1.5">
          <span class="text-gray-400 text-xs lg:text-sm flex items-center gap-1 whitespace-nowrap"><SparklesIcon class="h-2.5 w-2.5 lg:h-3 lg:w-3 text-yellow-300" />Inspiration:</span>
          <div class="flex gap-1 pb-1 flex-wrap">
            <button 
              v-for="item in inspirationPrompts" 
              :key="item.label"
              class="px-1.5 py-0.5 rounded-lg bg-gray-700 text-gray-100 hover:bg-[#7C3AED] hover:text-white transition text-xs font-medium shadow whitespace-nowrap" 
              @click="handleAction('inspiration', item.prompt)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
        <!-- 各个下拉选项 -->
        <div class="mt-3">
          <!-- 时长和分辨率选择 -->
          <div class="flex items-center gap-4">
            <div class="flex items-center">
              <label class="text-xs text-gray-400 mr-2">Video Duration:</label>
              <div class="flex gap-1.5">
                <button 
                  v-for="opt in durationOptions" 
                  :key="opt.value"
                  @click="handleAction('selectDuration', opt.value)"
                  class="px-2 py-1 rounded-lg border border-dashed transition-all text-sm"
                  :class="duration === opt.value ? 'border-[#7C3AED] text-[#7C3AED] bg-[#7C3AED]/10' : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>
            <div class="flex items-center">
              <label class="text-xs text-gray-400 mr-2">Resolution:</label>
              <div class="flex gap-1.5">
                <button 
                  v-for="opt in availableResolutions" 
                  :key="opt.value"
                  @click="handleAction('selectResolution', opt.value)"
                  class="px-2 py-1 rounded-lg border border-dashed transition-all text-sm"
                  :class="resolution === opt.value ? 'border-[#7C3AED] text-[#7C3AED] bg-[#7C3AED]/10' : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 分享到作品展示选项 -->
        <div class="flex items-center gap-1.5 mt-3">
          <div class="flex items-center gap-1.5">
            <input 
              type="checkbox" 
              id="showInGallery" 
              v-model="isShow"
              class="w-3 h-3 rounded border-gray-600 bg-gray-700 text-[#7C3AED] focus:ring-[#7C3AED] focus:ring-offset-gray-800"
            />
            <label for="showInGallery" class="text-sm text-gray-300">Share to Gallery</label>
          </div>
          <div class="group relative">
            <InformationCircleIcon class="h-4 w-4 text-gray-400 cursor-help" />
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1.5 bg-blue-pale text-gray-200 text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
              Your work will be displayed in the gallery when checked
            </div>
          </div>
        </div>
        <!-- 生成按钮 -->
        <button 
          class="w-full flex items-center justify-center gap-1.5 px-3 mt-3 lg:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 hover:from-[#7C3AED]/90 hover:to-[#7C3AED]/70 text-white rounded-lg font-extrabold text-base sm:text-lg lg:text-xl shadow-xl transition relative" 
          @click="handleAction('generate')"
          :disabled="isGenerating"
        >
          <ArrowUpTrayIcon class="h-4 w-4 lg:h-5 lg:w-5" />
          <span class="whitespace-nowrap">{{ isGenerating ? 'Generating...' : 'Generate Video' }}</span>
          <span class="absolute -top-1.5 -right-1.5 bg-[#00b8ff] text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow border-2 border-white/50 shadow-[0_0_15px_rgba(0,184,255,0.3)]">{{ needCredits }} credits</span>
        </button>
      </div>
      <!-- 右侧视频预览 -->
      <div :class="[
        'w-full mx-auto lg:mx-0 lg:w-[65%] xl:w-[60%] 2xl:w-[58%] max-w-[576px] lg:max-w-none flex flex-col items-center p-2 sm:p-3 lg:p-4 xl:p-6 bg-blue-pale/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50',
        containerHeight.base.replace('min-', ''),
        containerHeight.sm.replace('sm:min-', 'sm:'),
        containerHeight.lg.replace('lg:min-', 'lg:')
      ]">
        <div class="flex flex-col justify-center items-center w-full h-full bg-gradient-to-br from-blue-pale/50 via-blue-pale/50 to-blue-pale/50 rounded-[16px]">
          <div class="relative w-full aspect-[4/3] flex items-center justify-center h-full">
            <!-- 进度条 -->
            <div v-if="isGenerating" class="absolute inset-0 flex items-center justify-center">
              <div v-if="progress > 0" class="relative w-24 h-24">
                <svg class="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    class="text-gray-700"
                    stroke-width="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    class="text-[#7C3AED]"
                    stroke-width="8"
                    stroke-dasharray="251.2"
                    stroke-dashoffset="251.2"
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    :style="{
                      strokeDashoffset: 251.2 - (251.2 * progress) / 100
                    }"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-[#7C3AED] font-bold text-lg">
                  {{ progress.toFixed(0) }}%
                </div>
              </div>
              <div v-else class="flex flex-col items-center justify-center">
                <div class="animate-spin rounded-full h-10 w-10 border-4 border-[#7C3AED] border-t-transparent"></div>
                <p class="text-[#7C3AED] text-xs mt-2">Processing...</p>
              </div>
            </div>
            <!-- 预览视频 -->
            <div v-else-if="!generatedVideoUrl" class="w-full h-full relative">
              <div class="w-full h-full flex items-center justify-center relative">
                <video 
                  :src="previewVideoUrl" 
                  :poster="previewVideoPoster"
                  class="w-full h-full object-cover rounded-xl" 
                  autoplay 
                  loop 
                  muted
                  preload="none"
                  playsinline
                  @loadstart="handleVideoLoadStart($event.target as HTMLVideoElement)"
                  @canplay="handleVideoCanPlay($event.target as HTMLVideoElement)"
                ></video>
                <!-- 视频加载状态 -->
                <div 
                  v-if="previewVideoLoading[previewVideoUrl]" 
                  class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl"
                >
                  <div class="animate-spin rounded-full h-10 w-10 border-4 border-[#7C3AED] border-t-transparent"></div>
                </div>
              </div>
              <div class="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white/90 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-sm sm:text-base font-semibold shadow-lg pointer-events-none select-none whitespace-nowrap z-10">
                AI Video Generation Demo
              </div>
            </div>
            <!-- 结果视频 -->
            <div v-else-if="generatedVideoUrl" class="w-full h-full relative">
              <video 
                :src="generatedVideoUrl" 
                class="w-full h-full object-contain rounded-xl" 
                autoplay 
                loop 
                muted
                controls
                preload="none"
                @loadeddata="videoLoading = false"
              ></video>
              <button 
                @click="handleDownload"
                class="absolute top-0 right-0 bg-black/60 text-[#7C3AED] px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg flex items-center gap-1.5 transition-all duration-300 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm hover:shadow-[#7C3AED]"
                :disabled="isDownloading"
              >
                <ArrowDownTrayIcon v-if="!isDownloading" class="w-4 h-4" />
                <ArrowPathIcon v-else class="w-4 h-4 animate-spin" />
                {{ isDownloading ? 'Downloading...' : 'Download' }}
              </button>
              <!-- 添加提示文本 -->
              <div class="absolute top-0 left-0 bg-black/60 text-white/90 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap">
                <span>Video has been generated, visit</span>
                <NuxtLink to="/profile" class="text-[#7C3AED] hover:text-[#7C3AED]/80 transition-colors">
                  profile-My Works
                </NuxtLink>
                <span>to view</span>
              </div>
            </div>
            <!-- 视频加载中 -->
            <div v-else class="absolute inset-0 flex items-center justify-center">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-[#7C3AED] border-t-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, PhotoIcon, ChevronDownIcon, ArrowUpTrayIcon, SparklesIcon, ArrowUpOnSquareIcon, XMarkIcon, InformationCircleIcon, ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { FireIcon } from '@heroicons/vue/24/solid'
import { ref, computed, watch, onUnmounted, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRoute } from 'vue-router'
import { useNuxtApp } from 'nuxt/app'
import { useVideoTaskStore } from '~/stores/videoTask'
import { useNotificationStore } from '~/stores/notification'

// 图片方向纠正
import { correctImageOrientation } from '~/utils/imageOrientation'

// 接口
import { createTaskImgVideo, createTaskTextVideo,checkTask,getScore,upload } from '~/api'

const { $toast } = useNuxtApp() as any

const route = useRoute()
const activeTab = ref('text') // 'text' 或 'image'
const prompt = ref('')
const isGenerating = ref(false)//是否正在生成
const selectedImage = ref<File | null>(null)//选择的图片
const imagePreview = ref<string>('')//图片预览
const fileInput = ref<HTMLInputElement | null>(null)
const isShow = ref(false) // 是否分享到作品展示
const progress = ref(0) // 进度条进度
const videoLoading = ref(false) // 视频加载状态
const generatedVideoUrl = ref('') // 生成的视频URL
const isDownloading = ref(false) // 下载状态
const previewVideoLoading = ref<{ [key: string]: boolean }>({}) // 预览视频加载状态
let progressInterval: number | null = null // 进度条定时器
let checkTaskInterval: NodeJS.Timeout | null = null // 检查任务状态定时器

// 分辨率选项
const resolution = ref('768p')

// 时长选项
const duration = ref('6')
const durationOptions = [
  { value: '6', label: '6s' },
  { value: '10', label: '10s' }
]

// 根据选择的时长计算可用的分辨率选项
const availableResolutions = computed(() => {
  if (duration.value === '6') {
    return [
      { value: '768p', label: '768p' },
      { value: '1080p', label: '1080p' }
    ]
  } else {
    return [
      { value: '768p', label: '768p' }
    ]
  }
})

// 监听时长变化，自动调整分辨率
watch(duration, (newDuration) => {
  if (newDuration === '10' && resolution.value === '1080p') {
    resolution.value = '768p'
  }
})

// 监听标签页变化，确保容器高度更新
watch(activeTab, () => {
  // 容器高度会通过计算属性自动更新
  // 这里可以添加其他需要在标签切换时执行的逻辑
})

// 积分配置
interface ScoreItem {
  id: number
  resolution: string
  duration: number
  score: number
}

const scoreConfig = ref<ScoreItem[]>([])

// 获取积分配置
const getScoreConfig = async () => {
  try {
    console.log('正在获取积分配置...')
    const response = await getScore() as any
    if (response.code === 200) {
      console.log('积分配置获取成功:', response.data)
      scoreConfig.value = response.data
      // 立即更新积分显示
      const credits = calculateCredits()
      console.log('计算得到的积分:', credits, '当前分辨率:', resolution.value, '当前时长:', duration.value)
      needCredits.value = credits
    } else {
      console.error('获取积分配置失败:', response)
    }
  } catch (error) {
    console.error('获取积分配置失败:', error)
  }
}

// 计算所需积分
const calculateCredits = () => {
  if (!scoreConfig.value || scoreConfig.value.length === 0) {
    console.warn('积分配置为空，无法计算积分')
    return 0
  }
  
  const durationInt = parseInt(duration.value)
  console.log('查找积分配置:', '分辨率=', resolution.value, '时长=', durationInt, '原始时长值=', duration.value, '类型=', typeof duration.value)
  
  // 详细打印每个积分配置项
  console.log('所有可用配置:')
  scoreConfig.value.forEach((item, index) => {
    console.log(`配置项 ${index}:`, {
      resolution: item.resolution,
      duration: item.duration,
      score: item.score,
      resolutionMatch: item.resolution === resolution.value,
      durationMatch: item.duration === durationInt,
      durationTypeCheck: typeof item.duration
    })
  })
  
  // 尝试直接匹配
  let config = scoreConfig.value.find((item: any) => 
    item.resolution === resolution.value && 
    item.duration === durationInt
  )
  
  // 如果没有找到匹配，尝试字符串比较
  if (!config) {
    console.log('尝试使用字符串比较查找匹配')
    config = scoreConfig.value.find((item: any) => 
      item.resolution === resolution.value && 
      String(item.duration) === duration.value
    )
  }
  
  if (config) {
    console.log('找到匹配的积分配置:', config)
    return config.score
  } else {
    console.warn('未找到匹配的积分配置，尝试查找相似配置')
    
    // 尝试只匹配分辨率
    const resolutionMatch = scoreConfig.value.find(item => item.resolution === resolution.value)
    if (resolutionMatch) {
      console.log('找到分辨率匹配的配置:', resolutionMatch)
      return resolutionMatch.score
    }
    
    // 尝试只匹配时长
    const durationMatch = scoreConfig.value.find(item => item.duration === durationInt)
    if (durationMatch) {
      console.log('找到时长匹配的配置:', durationMatch)
      return durationMatch.score
    }
    
    // 如果还是没找到，使用第一个配置项
    console.warn('没有找到任何匹配，使用默认配置')
    return scoreConfig.value[0]?.score || 0
  }
}

// 强制刷新积分配置和计算
const refreshCredits = async () => {
  console.log('强制刷新积分配置')
  try {
    // 先尝试重新获取积分配置
    await getScoreConfig()
    
    // 然后重新计算积分
    const credits = calculateCredits()
    console.log('刷新后的积分:', credits)
    needCredits.value = credits
    return credits
  } catch (error) {
    console.error('刷新积分失败:', error)
    return needCredits.value
  }
}

// 需要消耗的积分数量
const needCredits = ref(0)

// 监听分辨率和时长变化
watch([resolution, duration], () => {
  console.log('分辨率或时长变化:', '分辨率=', resolution.value, '时长=', duration.value)
  const credits = calculateCredits()
  console.log('重新计算的积分:', credits)
  needCredits.value = credits
}, { immediate: true })

// 在 setup 中添加
const videoTaskStore = useVideoTaskStore()
const notificationStore = useNotificationStore()

// 添加表单状态管理
const formState = ref({
  activeTab: 'text',
  prompt: '',
  imagePreview: '',
  selectedImage: null as File | string | null,
  resolution: '768p',
  duration: '6',
  isShow: false
})

// 保存表单状态（用于页面切换）
const saveFormState = () => {
  formState.value = {
    activeTab: activeTab.value,
    prompt: prompt.value,
    imagePreview: imagePreview.value,
    selectedImage: selectedImage.value,
    resolution: resolution.value,
    duration: duration.value,
    isShow: isShow.value
  }
  localStorage.setItem('seedanceFormState', JSON.stringify(formState.value))
}

// 恢复表单状态（用于页面切换）
const restoreFormState = () => {
  const savedState = localStorage.getItem('seedanceFormState')
  if (savedState) {
    const state = JSON.parse(savedState)
    activeTab.value = state.activeTab
    prompt.value = state.prompt
    imagePreview.value = state.imagePreview
    selectedImage.value = state.selectedImage
    duration.value = state.duration
    isShow.value = state.isShow
    resolution.value = state.resolution
  }
}

// 修改 onMounted
onMounted(async () => {
  // 获取积分配置并等待完成
  await getScoreConfig()
  console.log('组件挂载完成，当前积分值:', needCredits.value)

  // 检查是否有未完成的任务
  const storedTask = videoTaskStore.getStoredTask()
  if (storedTask && storedTask.isGenerating) {
    isGenerating.value = true
    prompt.value = storedTask.prompt
    activeTab.value = storedTask.type
    
    // 重新开始检查任务状态
    checkTaskInterval = setInterval(() => {
      checkTaskStatus(storedTask.taskId)
    }, 2000)
    // 恢复表单状态（页面切换时）
    restoreFormState()
  } else {
    // 如果没有未完成的任务，清空表单缓存
    localStorage.removeItem('seedanceFormCache')
    // 清空表单状态
    localStorage.removeItem('seedanceFormState')
  }
  
  // 处理URL参数
  const { mode, prompt: urlPrompt, origin: urlOrigin } = route.query
  
  if(mode){
    // 清空 URL 中的查询参数
    const url = new URL(window.location.href)
    url.search = ''
    window.history.replaceState({}, '', url.toString())
  }
  if (urlPrompt) {
    prompt.value = urlPrompt as string
  }

  if (mode === 'image' && urlOrigin) {
    activeTab.value = 'image'
    selectedImage.value = urlOrigin as any;
    imagePreview.value = urlOrigin as any;
  } else if (mode === 'text') {
    activeTab.value = 'text'
  }
})

// 修改 onUnmounted
onUnmounted(() => {
  // 保存表单状态（页面切换时）
  saveFormState()
  
  stopProgressAnimation()
  stopCheckTask()
  // 清理视频资源
  if (generatedVideoUrl.value) {
    URL.revokeObjectURL(generatedVideoUrl.value)
  }
  // 清理预览视频资源
  if (previewVideoUrl) {
    URL.revokeObjectURL(previewVideoUrl)
  }
  // 暂停所有视频
  const videos = document.querySelectorAll('video')
  videos.forEach(video => {
    video.pause()
  })
})

// 灵感提示词
const inspirationPrompts = [
  {
    label: 'Superhero',
    prompt: 'Spider-Man hangs clothes with web in laundromat, logo stained with detergent foam'
  },
  {
    label: 'Interstellar',
    prompt: 'Modified pickup truck tows UFO trailer on Route 66, alien on roof takes burger selfie'
  },
  {
    label: 'Dinosaur',
    prompt: 'T-Rex in delivery helmet sends packages, clutching Amazon box with claws through dinosaur skeleton tunnel'
  }
]

// 预览视频URL
const previewVideoUrl = 'https://resource.hailuo2.com/hailuo/video/hailuo2-demo.mp4'
const previewVideoPoster = '/img/1.webp'

// 处理视频加载事件
const handleVideoLoadStart = (video: HTMLVideoElement) => {
  previewVideoLoading.value[video.src] = true
}

const handleVideoCanPlay = (video: HTMLVideoElement) => {
  previewVideoLoading.value[video.src] = false
}

// 处理图片上传区域点击
const handleImageUploadClick = async () => {
  if (!await checkLoginStatus()) return
  fileInput.value?.click()
}

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  
  const file = input.files[0]
  if (file.size > 5 * 1024 * 1024) { // 5MB
    $toast.error('Image size should be less than 5MB')
    return
  }
  
  if (!['image/jpeg', 'image/png','image/webp'].includes(file.type)) {
    $toast.error('Only JPG, PNG and WebP images are supported')
    return
  }

  selectedImage.value = file
  // 创建预览URL
  imagePreview.value = URL.createObjectURL(file)
}

// 移除已选择的图片
const removeSelectedImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  selectedImage.value = null
  imagePreview.value = ''
}

// 统一的登录检查方法
const withLoginCheck = async (callback: () => void | Promise<void>) => {
  if (!await checkLoginStatus()) return
  await callback()
}

// 修改 startProgressAnimation 函数
const startProgressAnimation = (startFromProgress = 0) => {
  progress.value = startFromProgress
  const totalDuration = 510000 // 8.5分钟，约7-10分钟的平均值
  const totalSteps = 99 // 总共99步
  const stepDuration = totalDuration / totalSteps
  const remainingSteps = totalSteps - startFromProgress
  const remainingDuration = (remainingSteps / totalSteps) * totalDuration

  let lastTime = Date.now()
  const animate = () => {
    const currentTime = Date.now()
    const deltaTime = currentTime - lastTime
    lastTime = currentTime

    if (progress.value < 99) {
      const increment = (deltaTime / remainingDuration) * remainingSteps
      progress.value = Math.min(99, progress.value + increment)
      // 更新 store 中的进度
      if (videoTaskStore.currentTask) {
        videoTaskStore.setTask({
          ...videoTaskStore.currentTask,
          progress: progress.value
        })
      }
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// 停止进度条动画
const stopProgressAnimation = () => {
  if (progressInterval) {
    cancelAnimationFrame(progressInterval)
    progressInterval = null
  }
  // 添加过渡动画到100
  const animateTo100 = () => {
    if (progress.value < 100) {
      progress.value = Math.min(100, progress.value + 0.5)
      requestAnimationFrame(animateTo100)
    }
  }
  requestAnimationFrame(animateTo100)
}

// 停止检查任务状态
const stopCheckTask = () => {
  isGenerating.value = false
  if (checkTaskInterval) {
    clearInterval(checkTaskInterval)
    checkTaskInterval = null
  }
}

// 检查任务状态
const checkTaskStatus = async (taskId: string) => {
  try {
    const response = await checkTask(taskId) as any
    if (response.code === 200) {
      // 任务完成，获取视频URL
      if(response.data.status == '1' && response.data.video_url){
        // 清理旧的视频URL
        if (generatedVideoUrl.value) {
          URL.revokeObjectURL(generatedVideoUrl.value)
        }
        generatedVideoUrl.value = response.data.video_url
        videoLoading.value = true
        stopProgressAnimation()
        stopCheckTask()
        
        // 清除任务状态
        videoTaskStore.clearTask()
        
        // 清空 URL 中的查询参数
        const url = new URL(window.location.href)
        url.search = ''
        window.history.replaceState({}, '', url.toString())
        
        // 清除表单缓存
        localStorage.removeItem('seedanceFormCache')
      }
    } else {
      // 任务失败
      $toast.error(response.msg || 'Video generation failed')
      // 停止进度条动画
      stopProgressAnimation()
      // 停止检查任务状态
      stopCheckTask()
      // 清除任务状态
      videoTaskStore.clearTask()
      // 清除表单缓存
      localStorage.removeItem('seedanceFormCache')
    }
  } catch (error) {
    console.error('Check task status error:', error)
  }
}

// 视频生成请求
const handleVideoRequest = async () => {
  if (activeTab.value === 'image' && !selectedImage.value) {
    $toast.warning('Please upload an image')
    return
  }
  if (!prompt.value.trim()) {
    $toast.warning('Please enter a prompt')
    return
  }
  // 清理旧的视频URL
  if (generatedVideoUrl.value) {
    URL.revokeObjectURL(generatedVideoUrl.value)
    generatedVideoUrl.value = ''
  }
  isGenerating.value = true

  // 判断是否是文件，如果是文件，则上传获取url
  if(selectedImage.value instanceof File){
    const uploadResponse = await upload({
      file: selectedImage.value
    })
    if (uploadResponse.code === 200) {
      selectedImage.value = uploadResponse.data as any
    } else {
      $toast.error(uploadResponse.msg || 'Failed to upload image')
      isGenerating.value = false
      stopProgressAnimation()
      return
    }
  }
  //开始进度条动画
  startProgressAnimation()
  try {
    let requestData = {} as any;
    let request = null;
    if(activeTab.value == 'text'){
      request = createTaskTextVideo
      requestData = {
        prompt: prompt.value,
        resolution: resolution.value,
        duration: duration.value,
        is_show: isShow.value
      }
    }else{
      request = createTaskImgVideo
      requestData = {
          image_url: selectedImage.value||imagePreview.value,
          prompt: prompt.value,
          resolution: resolution.value,
          duration: duration.value,
          is_show: isShow.value
      }
    }
    const response = await request(requestData) as any;
    // 更新用户信息以刷新使用次数
    await userStore.fetchUserInfo(true)
    if (response.code === 200) {
      // 保存任务信息到 store
      videoTaskStore.setTask({
        taskId: response.data.task_id,
        progress: 0,
        startTime: Date.now(),
        isGenerating: true,
        prompt: prompt.value,
        type: activeTab.value as any
      })
      
      // 开始检查任务状态
      if (response.data?.task_id) {
        // 启动通知系统的任务检查
        notificationStore.startCheckingTask(response.data.task_id)
        
        // 开始循环检查任务状态
        checkTaskInterval = setInterval(() => {
          checkTaskStatus(response.data.task_id)
        }, 2000) // 每2秒检查一次
      }
    } else {
      isGenerating.value = false
      $toast.error(response.msg || 'Video generation failed, please try again')
      stopProgressAnimation()
       // 清除请求缓存
       localStorage.removeItem('seedanceFormCache')
    }
  } catch (error) {
    console.error('创建任务失败！', error)
    isGenerating.value = false
    $toast.error('Failed to create video generation task')
    stopProgressAnimation()
    // 清除请求缓存
    localStorage.removeItem('seedanceFormCache')
  }
}

// 统一的事件处理方法
const handleAction = (action: string, ...args: any[]) => {
  switch (action) {
    case 'switchTab':
      activeTab.value = args[0]
      break
    case 'prompt':
      withLoginCheck(() => {
        // TODO: 处理提示词输入逻辑
      })
      break
    case 'generate':
      withLoginCheck(async () => {
        // 检查是否有足够的次数和积分
        if (!checkUsageLimit()) return
        // 检查是否正在生成
        if (isGenerating.value) return
        
        handleVideoRequest()
      })
      break
    case 'inspiration':
      withLoginCheck(() => {
        prompt.value = args[0] || ''
      })
      break
    case 'selectDuration':
      withLoginCheck(async () => {
        console.log('选择时长:', args[0], '类型:', typeof args[0])
        // 先更新时长
        duration.value = args[0]
        
        // 确保分辨率合法（10s时只能选768p）
        if (args[0] === '10' && resolution.value === '1080p') {
          console.log('10s视频只能选择768p分辨率，自动调整分辨率')
          resolution.value = '768p'
        }
        
        // 强制刷新积分配置并更新积分值
        const credits = await refreshCredits()
        console.log('时长变化后重新计算的积分:', credits)
        
        // 确保UI更新
        setTimeout(() => {
          needCredits.value = credits
        }, 0)
      })
      break
    case 'selectResolution':
      withLoginCheck(async () => {
        console.log('选择分辨率:', args[0])
        resolution.value = args[0]
        
        // 强制刷新积分配置并更新积分值
        const credits = await refreshCredits()
        console.log('分辨率变化后重新计算的积分:', credits)
        
        // 确保UI更新
        setTimeout(() => {
          needCredits.value = credits
        }, 0)
      })
      break
    case 'selectOption':
      withLoginCheck(() => {
        // TODO: 处理下拉选项逻辑
      })
      break
  }
}

// 使用用户信息 store
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const remainingTimes = ref(userStore.userInfo?.free_limit+userStore.userInfo?.remaining_limit|| 0)

// 修改 checkLoginStatus 函数
const checkLoginStatus = async () => {
  if (!userInfo.value) {
    // 缓存当前表单数据（用于请求时）
    cacheFormData()
    const loginButton = document.getElementById('bindLogin')
    if (loginButton) {
      loginButton.click()
    }
    return false
  }
  return true
}

// 监听登录状态变化
watch(
  userInfo,
  (newUserInfo: any) => {
    remainingTimes.value = newUserInfo?.free_limit + newUserInfo?.remaining_limit || 0
  },
  { immediate: true }
)

// 检查使用限制
const checkUsageLimit = () => {

  // 检查是否有可用次数
  if (remainingTimes.value <= 0) {
    $toast.warning('Usage limit reached. Please upgrade to premium for more credits')
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
    return false
  }


  // 检查用户积分是否足够
  // const userCredits = userInfo.value?.free_limit || userInfo.value?.remaining_limit || 0
  if (remainingTimes.value < needCredits.value) {
    $toast.error(`Insufficient credits. The current operation requires ${needCredits.value} credits, and your account only has ${remainingTimes.value} credits`)
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
    return false
  }
  
  return true
}

// 下载视频
const handleDownload = async () => {
  if (!generatedVideoUrl.value) return
  const videoUrl = generatedVideoUrl.value;
  if (!videoUrl || isDownloading.value) return
  isDownloading.value = true
  try {
    const response = await fetch(videoUrl)
    if (!response.ok) {
      throw new Error('Download failed')
    }
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${Date.now()}.mp4`
    
    document.body.appendChild(link)
    link.click()
    
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
    $toast.error('Download failed, please try again later')
  } finally {
    isDownloading.value = false
  }
}

// 缓存表单数据（用于请求时）
const cacheFormData = () => {
  // 将缓存数据存储到 localStorage
  localStorage.setItem('seedanceFormCache', JSON.stringify({
    activeTab: activeTab.value,
    prompt: prompt.value,
    imagePreview: imagePreview.value,
    selectedImage: selectedImage.value,
    resolution: resolution.value,
    duration: duration.value,
    isShow: isShow.value
  }))
}

// 恢复表单数据（用于请求时）
const restoreFormData = () => {
  const cachedData = localStorage.getItem('seedanceFormCache')
  if (cachedData) {
    const data = JSON.parse(cachedData)
    activeTab.value = data.activeTab
    prompt.value = data.prompt
    imagePreview.value = data.imagePreview
    selectedImage.value = data.selectedImage
    duration.value = data.duration
    isShow.value = data.isShow
    resolution.value = data.resolution
    // 清除缓存
    localStorage.removeItem('seedanceFormCache')
  }
}

// 动态计算容器高度
const containerHeight = computed(() => {
  // 图片模式时增加高度
  return activeTab.value === 'image' ? {
    base: 'min-h-[520px]',
    sm: 'sm:min-h-[560px]',
    lg: 'lg:min-h-[600px]'
  } : {
    base: 'min-h-[400px]',
    sm: 'sm:min-h-[440px]',
    lg: 'lg:min-h-[480px]'
  }
})
</script>

<style scoped>
@keyframes gradient-flow {
  0% {
    background: linear-gradient(to right, #0a0a0a, #0a0a0a/80);
  }
  50% {
    background: linear-gradient(to right, #1a1a1a, #0a0a0a/80);
  }
  100% {
    background: linear-gradient(to right, #0a0a0a, #0a0a0a/80);
  }
}

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

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-gradient-flow {
  animation: gradient-flow 4s ease-in-out infinite;
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes smooth-in {
  0% {
    opacity: 0;
    transform: scale(0.98) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes smooth-out {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.98) translateY(-20px);
  }
}

.animate-smooth-in {
  animation: smooth-in 0.25s cubic-bezier(0.2, 0, 0, 1) forwards;
}

.animate-smooth-out {
  animation: smooth-out 0.2s cubic-bezier(0.2, 0, 0, 1) forwards;
}

/* 确保动画在每次显示时都重新播放 */
.v-enter-active {
  animation: smooth-in 0.25s cubic-bezier(0.2, 0, 0, 1) forwards;
}

.v-leave-active {
  animation: smooth-out 0.2s cubic-bezier(0.2, 0, 0, 1) forwards;
}

.tab-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
}

.tab-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #00ffd1, #00ffd1/80);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.tab-button.active::before {
  opacity: 1;
}

.tab-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(to right, #00ffd1, #00ffd1/80);
  transform: translateX(-50%);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-button.active::after {
  width: 80%;
}

.tab-button:hover {
  transform: translateY(-1px);
}

.tab-button.active {
  transform: translateY(-1px);
}

.tab-content {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style> 