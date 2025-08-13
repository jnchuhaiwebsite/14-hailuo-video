<template>
  <!-- 主体区 -->
  <div class="w-full max-w-[1600px] flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-stretch px-3 sm:px-4 lg:px-6 pb-8 sm:pb-12 lg:pb-16 xl:pb-24 min-h-[500px] sm:min-h-[550px] lg:min-h-[600px]">
    <!-- 左侧表单 -->
    <div class="w-full mx-auto lg:mx-0 lg:w-[45%] max-w-[720px] lg:max-w-[560px] bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50 p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col gap-3 sm:gap-4 lg:gap-5">
      <!-- 切换tab -->
      <div class="flex gap-2 mb-1 sm:mb-2">
        <div class="flex w-full bg-gray-700/50 p-1 rounded-2xl">
          <button 
            @click="handleAction('switchTab', 'text')"
            class="tab-button flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-0 py-0 h-10 sm:h-12 rounded-xl transition-all duration-300 font-bold text-xs sm:text-sm lg:text-base shadow group touch-manipulation"
            :class="activeTab === 'text' ? 'active bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 text-white shadow-lg ring-2 ring-[#7C3AED]' : 'text-gray-300 hover:bg-[#7C3AED]/20 hover:text-[#7C3AED]'"
          >
            <span class="whitespace-nowrap text-center">Text to Video</span>
            <PlusIcon class="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 flex-shrink-0" :class="activeTab === 'text' ? 'text-gray-900' : 'text-gray-300 group-hover:text-gray-900'" />
          </button>
          <button 
            @click="handleAction('switchTab', 'image')"
            class="tab-button flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-0 py-0 h-10 sm:h-12 rounded-xl transition-all duration-300 font-bold text-xs sm:text-sm lg:text-base shadow group touch-manipulation"
            :class="activeTab === 'image' ? 'active bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 text-white shadow-lg ring-2 ring-[#7C3AED]' : 'text-gray-300 hover:bg-[#7C3AED]/20 hover:text-[#7C3AED]'"
          >
            <span class="whitespace-nowrap text-center">Image to Video</span>
            <PhotoIcon class="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 flex-shrink-0" :class="activeTab === 'image' ? 'text-gray-900' : 'text-gray-300 group-hover:text-gray-900'" />
          </button>
        </div>
      </div>
      <!-- 图片上传区域 -->
      <Transition
        enter-active-class="animate-smooth-in"
        leave-active-class="animate-smooth-out"
      >
        <div v-if="activeTab === 'image'">
          <div class="w-full h-[150px] sm:h-[180px] md:h-[200px] border-2 border-dashed border-gray-700 rounded-xl p-3 sm:p-4 hover:border-[#7C3AED] transition-colors cursor-pointer mb-2 relative bg-gray-800">
            <input 
              type="file" 
              accept="image/jpeg,image/png" 
              class="hidden" 
              ref="fileInput"
              @change="handleImageUpload"
            />
            <div 
              v-if="!imagePreview" 
              class="flex flex-col items-center justify-center gap-2 h-full"
              @click="handleImageUploadClick"
            >
              <ArrowUpOnSquareIcon class="h-8 w-8 text-gray-400" />
              <div class="text-center">
                <p class="text-sm text-gray-300">Click or drag image here</p>
                <p class="text-xs text-gray-500 mt-1">Supports JPG, PNG, WEBP, GIF, etc. Max 10MB. Dims: 300-6000px. Ratio: 0.4-2.5.</p>
              </div>
            </div>
            <div v-else class="relative w-full h-full">
              <img 
                :src="imagePreview" 
                class="w-full h-full object-contain rounded-lg"
                alt="Preview"
              />
              <button 
                @click="removeSelectedImage"
                class="absolute -top-2 -right-2 p-1 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                <XMarkIcon class="h-6 w-6text-white" />
              </button>
            </div>
          </div>
          <div class="text-center text-sm text-gray-400 my-2">
              <span>Want to create an image with AI first? Try our </span>
              <NuxtLink to="/ai-image" class="text-[#7C3AED] hover:underline font-semibold">AI Image Generator</NuxtLink>
          </div>
        </div>
      </Transition>
      <!-- 提示词 -->
      <div :class="{'space-y-3': activeTab === 'text'}">
        <div class="flex items-baseline" :class="{'mb-2': activeTab === 'text', 'mb-1': activeTab === 'image'}">
          <label class="block text-sm lg:text-base font-semibold text-gray-300">
            Enter Prompt
          </label>
          <NuxtLink to="/seedance/prompt-guide" class="ml-2 text-xs lg:text-sm text-theme-accent hover:underline">
            (prompt-guide)
          </NuxtLink>
        </div>
        <textarea 
          v-model="prompt"
          class="w-full rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 text-gray-200 px-3 py-2 focus:ring-2 focus:ring-theme-accent focus:border-transparent transition placeholder-gray-500 text-sm lg:text-base h-16 sm:h-20 md:h-24 resize-none touch-manipulation" 
          :placeholder="activeTab === 'text' ? 'Please enter your prompt here... For optimal results, please keep prompts concise and use either English or Chinese.' : 'Please enter your prompt here... For optimal results, please keep prompts concise and use either English or Chinese.'"
          @click="handleAction('prompt')"
        ></textarea>
      </div>
      <!-- 灵感 -->
      <div v-if="activeTab === 'text'" class="flex items-center flex-wrap gap-2 mt-2 mb-2">
        <span class="text-gray-400 text-xs lg:text-sm flex items-center gap-1 whitespace-nowrap"><SparklesIcon class="h-3 w-3 lg:h-4 lg:w-4 text-yellow-300" />Inspiration:</span>
        <div class="flex gap-1.5 pb-1 flex-wrap">
          <button 
            v-for="item in inspirationPrompts" 
            :key="item.label"
            class="inspiration-btn px-2 py-1 rounded-lg bg-gray-700 text-gray-100 hover:bg-[#7C3AED] hover:text-gray-900 transition text-xs font-medium shadow whitespace-nowrap" 
            @click="handleAction('inspiration', item.prompt)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
      <!-- 各个下拉选项 -->
      <div class="w-full mt-1 space-y-2 lg:space-y-3">
        <!-- 宽高比 -->
        <div v-if="activeTab === 'text'" ref="aspectRatioContainer" class="relative min-w-0">
          <label class="block text-xs text-gray-400 mb-1">Aspect Ratio</label>
          <button
            type="button"
            @click="isAspectRatioOpen = !isAspectRatioOpen"
            class="relative w-full cursor-pointer rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 text-gray-200 px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-xs lg:text-sm"
          >
            <span class="block truncate">{{ selectedAspectRatio.label }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon class="h-4 w-4 text-gray-400 transition-transform" :class="{ 'rotate-180': isAspectRatioOpen }" />
            </span>
          </button>
          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-if="isAspectRatioOpen"
              class="absolute z-20 mt-1 w-full rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2 border border-gray-700"
            >
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="opt in aspectRatioOptions"
                  :key="opt.value"
                  @click="selectAspectRatio(opt.value)"
                  class="relative flex flex-col items-center justify-center gap-1 p-2 rounded-lg cursor-pointer transition-all duration-200 border h-[70px]"
                  :class="aspectRatio === opt.value
                    ? 'bg-gray-700/80 border-[#7C3AED]'
                    : 'bg-gray-800 border-gray-700 hover:border-[#7C3AED]/50'"
                >
                  <CheckIcon
                    v-if="aspectRatio === opt.value"
                    class="absolute top-1.5 left-1.5 h-3.5 w-3.5 text-[#7C3AED]"
                  />
                  <div class="flex-grow flex items-center justify-center w-full">
                    <div
                      class="bg-gray-500 rounded-sm transition-colors"
                      :class="{ 'bg-[#7C3AED]': aspectRatio === opt.value }"
                      :style="opt.icon_style"
                    ></div>
                  </div>
                  <span
                    class="text-xs text-center"
                    :class="aspectRatio === opt.value ? 'text-white' : 'text-gray-400'"
                  >
                    {{ opt.label }}
                  </span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <div class="flex gap-2 lg:gap-3 w-full">
          <!-- 分辨率 -->
          <div class="flex-1 min-w-0">
            <label class="block text-xs text-gray-400 mb-2">Resolution</label>
            <div class="flex items-center gap-3">
              <button
                v-for="opt in resolutionOptions"
                :key="opt.value"
                @click="selectResolution(opt.value)"
                class="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative focus:outline-none"
                :class="[
                  resolution === opt.value
                    ? 'ring-2 ring-[#7C3AED] text-white bg-gray-700/80'
                    : 'ring-1 ring-gray-600 text-gray-300 bg-gray-800 hover:ring-[#7C3AED]/50'
                ]"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- 时长 -->
          <div class="flex-1 min-w-0">
            <label class="block text-xs text-gray-400 mb-2">Duration</label>
            <div class="flex items-center gap-3">
              <button
                v-for="opt in durationOptions"
                :key="opt.value"
                @click="selectDuration(opt.value)"
                class="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative focus:outline-none"
                :class="[
                  duration === opt.value
                    ? 'ring-2 ring-[#7C3AED] text-white bg-gray-700/80'
                    : 'ring-1 ring-gray-600 text-gray-300 bg-gray-800 hover:ring-[#7C3AED]/50'
                ]"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 分享到作品展示选项 -->
      <div class="flex items-center gap-2 mt-4">
        <div class="flex items-center gap-2">
          <!-- 开关样式 - 使用自定义样式 -->
          <div 
            @click="isShow = !isShow"
            class="relative inline-block cursor-pointer select-none"
            :style="{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              backgroundColor: isShow ? '#7C3AED' : '#4b5563',
              transition: 'background-color 0.2s ease-in-out'
            }"
          >
            <div
              class="absolute top-0.5 bg-white shadow-md transition-transform duration-200 ease-in-out"
              :style="{
                width: '16px',
                height: '16px',
                borderRadius: '8px',
                transform: isShow ? 'translateX(20px)' : 'translateX(2px)'
              }"
            />
          </div>
          <label @click="isShow = !isShow" class="text-sm text-gray-300 cursor-pointer">Share to Gallery</label>
        </div>
        <div class="group relative">
          <InformationCircleIcon class="h-5 w-5 text-gray-400 cursor-help" />
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
            Your work will be displayed in the gallery when enabled
          </div>
        </div>
      </div>
      <!-- 生成按钮 -->
      <button 
        class="w-full flex items-center  text-white justify-center gap-2 px-4 mt-4 lg:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 hover:from-[#7C3AED]/90 hover:to-[#7C3AED]/70 text-gray-900 rounded-xl font-extrabold text-base sm:text-lg lg:text-xl shadow-xl transition relative" 
        @click="handleAction('generate')"
        :disabled="isGenerating"
      >
        <ArrowUpTrayIcon class="h-5 w-5 lg:h-6 lg:w-6" />
        <span class="whitespace-nowrap">{{ isGenerating ? 'Generating...' : 'Generate Video' }}</span>
        <span class="absolute -top-2 -right-2 bg-[#8B5CF6] text-white text-sm font-bold px-2 py-1 rounded-full shadow border-2 border-white/50 shadow-[0_0_15px_rgba(124,58,237,0.3)]">{{ needCredits }} credits</span>
      </button>
    </div>
    <!-- 右侧视频预览 -->
    <div class="video-preview-container w-full mx-auto lg:mx-0 lg:w-[55%] max-w-[720px] lg:max-w-[720px] flex flex-col items-center p-3 sm:p-4 lg:p-6 xl:p-8 bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50">
      <div class="flex flex-col justify-center items-center w-full h-full bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 rounded-[20px]">
        <div class="relative w-full h-[500px] md:h-[550px] lg:h-[600px] flex items-center justify-center">
          <!-- 进度条 -->
          <div v-if="isGenerating" class="absolute inset-0 flex items-center justify-center z-10">
            <div v-if="progress > 0" class="relative w-32 h-32">
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
              <div class="absolute inset-0 flex items-center justify-center text-[#7C3AED] font-bold text-xl">
                {{ progress.toFixed(0) }}%
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#7C3AED] border-t-transparent"></div>
              <p class="text-[#7C3AED] text-sm mt-3">Processing...</p>
            </div>
          </div>
          <!-- 预览视频 -->
          <div v-else-if="!generatedVideoUrl" class="w-full h-full relative">
            <div class="w-full h-full flex items-center justify-center relative">
              <!-- 页面加载中状态 -->
              <div 
                v-if="!pageLoaded" 
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl z-10"
              >
                <div class="flex flex-col items-center gap-3">
                  <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#7C3AED] border-t-transparent"></div>
                  <p class="text-[#7C3AED] text-sm">Loading page...</p>
                </div>
              </div>
              <!-- 视频加载状态 -->
              <div 
                v-else-if="previewVideoLoading && !videoStartedPlaying" 
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl z-10"
              >
                <div class="flex flex-col items-center gap-3">
                  <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#7C3AED] border-t-transparent"></div>
                  <p class="text-[#7C3AED] text-sm">Loading preview...</p>
                </div>
              </div>
              <!-- 等待视口检测提示 -->
              <div 
                v-else-if="pageLoaded && !videoLoadTriggered && !videoInViewport" 
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl z-10"
              >
                <div class="flex flex-col items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                    <svg class="w-6 h-6 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                  <p class="text-[#7C3AED] text-sm">Scroll to view preview</p>
                  <p class="text-gray-400 text-xs">Video will load when visible</p>
                </div>
              </div>
              <!-- 预览视频 -->
              <video 
                v-if="pageLoaded && videoLoadTriggered"
                ref="previewVideo"
                src="https://resp.seedancepro.net/seedance/sendance/sendance-1.0-pro-video.mp4"
                :poster="posterUrl"
                class="w-full h-full max-h-full object-contain rounded-2xl" 
                autoplay 
                loop 
                muted
                preload="none"
                playsinline
                @loadeddata="handlePreviewVideoLoaded"
                @playing="handleVideoPlaying"
              ></video>
            </div>
            <div class="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 text-white/90 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-base sm:text-lg font-semibold shadow-lg pointer-events-none select-none whitespace-nowrap z-10">
              AI Video Generation Demo
            </div>
          </div>
          <!-- 结果视频 -->
          <div v-else-if="generatedVideoUrl" class="w-full h-full flex flex-col">
            <!-- 下载按钮和提示文本 - 独立于视频容器 -->
            <div class="flex justify-between items-center mb-4 px-2">
              <div class="bg-black/60 text-white/90 px-4 py-2 rounded-xl text-sm font-medium shadow-lg flex items-center justify-center gap-2">
                <span>Video has been generated, visit</span>
                <NuxtLink to="/profile" class="text-[#7C3AED] hover:text-[#7C3AED]/80 transition-colors">
                  profile-My Works
                </NuxtLink>
                <span>to view</span>
              </div>
              <button 
                @click="handleDownload"
                class="bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/80 hover:from-[#7C3AED]/90 hover:to-[#7C3AED]/70 text-gray-900 text-white/90 px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 transition-all duration-300 hover:from-[#7C3AED]/90 hover:to-[#7C3AED]/70 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
                :disabled="isDownloading"
              >
                <ArrowDownTrayIcon v-if="!isDownloading" class="w-5 h-5" />
                <ArrowPathIcon v-else class="w-5 h-5 animate-spin" />
                {{ isDownloading ? 'Downloading...' : 'Download' }}
              </button>
            </div>
            
            <!-- 视频容器 - 独立显示 -->
            <div class="flex-1 relative overflow-hidden">
              <video 
                :src="generatedVideoUrl" 
                class="w-full h-full max-w-full max-h-full object-contain rounded-2xl" 
                autoplay 
                loop 
                muted
                controls
                preload="none"
                loading="lazy"
                @loadeddata="videoLoading = false"
              ></video>
            </div>
          </div>
          <!-- 视频加载中 -->
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#7C3AED] border-t-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, PhotoIcon, ChevronDownIcon, ArrowUpTrayIcon, SparklesIcon, ArrowUpOnSquareIcon, XMarkIcon, InformationCircleIcon, ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { FireIcon, CheckIcon } from '@heroicons/vue/24/solid'
import { ref, computed, watch, onUnmounted, onMounted, nextTick, triggerRef } from 'vue'

// 添加 requestIdleCallback 类型声明
declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
      opts?: { timeout: number }
    ) => number;
  }
}
import { useUserStore } from '~/stores/user'
import { useRoute } from 'vue-router'
import { useNuxtApp } from 'nuxt/app'
import { useVideoTaskStore } from '~/stores/videoTask'
import { useNotificationStore } from '~/stores/notification'
import { useImage } from '#imports'
const posterUrl = useImage({
  src: 'https://resp.seedancepro.net/seedance/image_case/1.webp',
  width: 600,
  quality: 80,
  format: 'webp'
})

// 图片方向纠正
import { correctImageOrientation } from '~/utils/imageOrientation'

// 接口
import { createTaskImgVideo, createTaskTextVideo,checkTask,getScore,upload } from '~/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const notificationStore = useNotificationStore()

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
const previewVideoLoading = ref(false) // 预览视频加载状态
let progressInterval: number | null = null // 进度条定时器
let checkTaskInterval: NodeJS.Timeout | null = null // 检查任务状态定时器
const previewVideo = ref<HTMLVideoElement | null>(null)
const videoHasLoaded = ref(false) // 标记视频是否已经加载过
const videoStartedPlaying = ref(false) // 标记视频是否已经开始播放
const isAspectRatioOpen = ref(false)
const aspectRatioContainer = ref<HTMLElement | null>(null)
const pageLoaded = ref(false) // 新增：页面加载完成状态
const previewVideoReady = ref(false) // 新增：预览视频准备就绪状态
const videoInViewport = ref(false) // 新增：视频是否在视口内
const videoLoadTriggered = ref(false) // 新增：视频加载是否已触发

// 宽高比选项
const aspectRatio = ref('16:9')
const aspectRatioOptions = [
  { value: '1:1', label: 'Square (1:1)', icon_style: { width: '22px', height: '22px' } },
  { value: '4:3', label: 'Standard (4:3)', icon_style: { width: '24px', height: '18px' } },
  { value: '16:9', label: 'Landscape (16:9)', icon_style: { width: '25px', height: '14px' } },
  { value: '21:9', label: 'Ultra Wide (21:9)', icon_style: { width: '28px', height: '12px' } },
  { value: '3:4', label: 'Portrait (3:4)', icon_style: { width: '18px', height: '24px' } },
  { value: '9:16', label: 'Mobile (9:16)', icon_style: { width: '14px', height: '25px' } },

]

const selectedAspectRatio = computed(() => {
  return aspectRatioOptions.find(opt => opt.value === aspectRatio.value) || aspectRatioOptions[0]
})

const selectAspectRatio = (value: string) => {
  aspectRatio.value = value
  isAspectRatioOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (aspectRatioContainer.value && !aspectRatioContainer.value.contains(event.target as Node)) {
    isAspectRatioOpen.value = false
  }
}

interface Option {
  value: string
  label: string
}

// 分辨率配置
const resolutionConfig = [
  { value: "480p", label: "480p" },
  { value: "720p", label: "720p" },
  { value: "1080p", label: "1080p" }
]

// 时长配置
const durationConfig = [
  { value: "5", label: "5s" },
  { value: "10", label: "10s" }
]

// 分辨率选项
const resolution = ref('480p')
const resolutionOptions = ref<Option[]>(resolutionConfig)

// 时长选项
const duration = ref('5')
const durationOptions = ref<Option[]>(durationConfig)

// 积分配置
interface ScoreItem {
  id: number
  resolution: string
  duration: number
  score: number
}

const scoreConfig = ref<ScoreItem[]>([])

// 积分配置数据
const scoreConfigData = {
  "code": 200,
  "msg": "Success",
  "data": [
    {
      "id": 1,
      "resolution": "480p",
      "duration": 5,
      "score": 2
    },
    {
      "id": 2,
      "resolution": "480p",
      "duration": 10,
      "score": 4
    },
    {
      "id": 3,
      "resolution": "1080p",
      "duration": 5,
      "score": 10
    },
    {
      "id": 4,
      "resolution": "1080p",
      "duration": 10,
      "score": 20
    },
    {
      "id": 5,
      "resolution": "720p",
      "duration": 5,
      "score": 5
    },
    {
      "id": 6,
      "resolution": "720p",
      "duration": 10,
      "score": 10
    }
  ],
  "success": true
}

// 获取积分配置
const getScoreConfig = () => {
  try {
    const response = scoreConfigData
    if (response.code === 200) {
      scoreConfig.value = response.data
      
      // 使用预定义的分辨率和时长配置
      resolutionOptions.value = resolutionConfig
      durationOptions.value = durationConfig
      
      // 设置默认分辨率（如果没有保存的状态）
      if (!localStorage.getItem('seedanceFormState')) {
        resolution.value = resolutionOptions.value[0].value
        duration.value = durationOptions.value[0].value
      }
      
      // 确保有默认值
      if (!resolution.value && resolutionOptions.value.length > 0) {
        resolution.value = resolutionOptions.value[0].value
      }
      if (!duration.value && durationOptions.value.length > 0) {
        duration.value = durationOptions.value[0].value
      }
      
      // 更新积分显示
      needCredits.value = calculateCredits()
    }
  } catch (error) {
    console.error('获取积分配置失败：', error)
  }
}

// 计算所需积分
const calculateCredits = () => {
  const config = scoreConfig.value.find((item: any) => 
    item.resolution === resolution.value && 
    item.duration === parseInt(duration.value)
  )
  return config ? config.score : 0
}

// 需要消耗的积分数量
const needCredits = ref(0)

// 监听分辨率和时长变化
watch([resolution, duration], () => {
  needCredits.value = calculateCredits()
})

// 分辨率选择函数
const selectResolution = (value: string) => {
  resolution.value = value
  // 强制触发响应式更新
  nextTick(() => {
    triggerRef(resolution)
    needCredits.value = calculateCredits()
  })
}

// 时长选择函数
const selectDuration = (value: string) => {
  duration.value = value
  // 强制触发响应式更新
  nextTick(() => {
    triggerRef(duration)
    needCredits.value = calculateCredits()
  })
}

// 分辨率按钮样式函数
const getResolutionButtonClass = (value: string) => {
  return resolution.value === value
    ? 'outline outline-[3px] outline-[#7C3AED] text-white bg-gray-700/80 z-20'
    : 'outline outline-[2px] outline-gray-600 text-gray-300 bg-gray-800 hover:outline-[#7C3AED]/50'
}

// 时长按钮样式函数
const getDurationButtonClass = (value: string) => {
  return duration.value === value
    ? 'outline outline-[3px] outline-[#7C3AED] text-white bg-gray-700/80 z-30'
    : 'outline outline-[2px] outline-gray-600 text-gray-300 bg-gray-800 hover:outline-[#7C3AED]/50'
}

// 在 setup 中添加
const videoTaskStore = useVideoTaskStore()

// 添加表单状态管理
const formState = ref({
  activeTab: 'text',
  prompt: '',
  imagePreview: '',
  selectedImage: null as File | string | null,
  aspectRatio: '16:9',
  resolution: '480p',
  duration: '5',
  isShow: false
})

// 保存表单状态（用于页面切换）
const saveFormState = () => {
  formState.value = {
    activeTab: activeTab.value,
    prompt: prompt.value,
    imagePreview: imagePreview.value,
    selectedImage: selectedImage.value,
    aspectRatio: aspectRatio.value,
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
    aspectRatio.value = state.aspectRatio
    duration.value = state.duration
    isShow.value = state.isShow
    resolution.value = state.resolution
    
    // 确保分辨率和时长值在有效范围内
    if (resolution.value && !resolutionOptions.value.find(opt => opt.value === resolution.value)) {
      resolution.value = resolutionOptions.value[0]?.value || '480p'
    }
    if (duration.value && !durationOptions.value.find(opt => opt.value === duration.value)) {
      duration.value = durationOptions.value[0]?.value || '5'
    }
  }
}

// 处理预览视频加载完成
const handlePreviewVideoLoaded = () => {
  previewVideoLoading.value = false
  videoHasLoaded.value = true // 标记视频已加载
  previewVideoReady.value = true // 标记预览视频准备就绪
}

// 处理视频开始播放
const handleVideoPlaying = () => {
  previewVideoLoading.value = false
  videoStartedPlaying.value = true // 标记视频已开始播放
  // 确保永久关闭loading状态
  localStorage.setItem('videoHasPlayed', 'true')
}

// 新增：检查是否为移动设备
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768
}

// 新增：检查视频加载条件
const checkVideoLoadCondition = () => {
  if (videoLoadTriggered.value || generatedVideoUrl.value) return
  
  // 当视频在视口内时加载视频
  if (pageLoaded.value && videoInViewport.value) {
    // 移动端额外延迟，确保用户真正需要时才加载
    if (isMobileDevice()) {
      setTimeout(() => {
        if (videoInViewport.value) {
          loadVideo()
        }
      }, 500) // 移动端额外延迟500ms
    } else {
      loadVideo()
    }
  }
}

// 新增：加载视频
const loadVideo = () => {
  if (videoLoadTriggered.value) return
  videoLoadTriggered.value = true
  
  // 重置视频状态
  previewVideoLoading.value = true
  videoStartedPlaying.value = false
  videoHasLoaded.value = false
  previewVideoReady.value = false
  
  // 使用 requestIdleCallback 在浏览器空闲时加载视频
  const loadVideoInIdle = () => {
    nextTick(() => {
      if (previewVideo.value) {
        previewVideo.value.currentTime = 0
        previewVideo.value.load()
        previewVideo.value.play().catch(error => {
          console.log('Auto-play prevented:', error)
          // 如果自动播放被阻止，仍然标记为已加载
          previewVideoLoading.value = false
          videoHasLoaded.value = true
          previewVideoReady.value = true
        })
      }
    })
  }
  
  // 优先使用 requestIdleCallback，否则使用 setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadVideoInIdle, { timeout: 2000 })
  } else {
    setTimeout(loadVideoInIdle, 500)
  }
}

// 新增：初始化预览视频
const initPreviewVideo = () => {
  if (!pageLoaded.value) return
  
  // 重置视频状态
  videoLoadTriggered.value = false
  
  // 检查是否满足加载条件
  checkVideoLoadCondition()
}

// 监听页面加载状态变化
watch(pageLoaded, (newValue) => {
  if (newValue && !generatedVideoUrl.value) {
    // 页面加载完成后初始化预览视频
    initPreviewVideo()
  }
})

// 监听视口状态变化
watch(videoInViewport, (newValue) => {
  if (newValue) {
    checkVideoLoadCondition()
  }
})

// 监听路由变化时重置视频状态
watch(() => route.fullPath, () => {
  // 路由切换时重置视频
  if (previewVideo.value) {
    previewVideo.value.pause()
    previewVideo.value.currentTime = 0
    previewVideo.value.load()
    // 不再移除 src
  }
  previewVideoLoading.value = true
  videoStartedPlaying.value = false
  videoHasLoaded.value = false
  previewVideoReady.value = false
  
  // 如果页面已加载完成，重新初始化预览视频
  if (pageLoaded.value) {
    initPreviewVideo()
  }
})

// 修改 onMounted
onMounted(async () => {
  // 获取积分配置
  getScoreConfig()
  document.addEventListener('click', handleClickOutside, true)

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
  
  // 确保分辨率和时长有默认值
  if (!resolution.value && resolutionOptions.value.length > 0) {
    resolution.value = resolutionOptions.value[0].value
  }
  if (!duration.value && durationOptions.value.length > 0) {
    duration.value = durationOptions.value[0].value
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

  // 检查视频是否已经播放过
  const hasPlayed = localStorage.getItem('videoHasPlayed') === 'true'
  videoStartedPlaying.value = hasPlayed
  previewVideoLoading.value = !hasPlayed

  // 等待页面完全加载完成
  await nextTick()
  
  // 使用 setTimeout 确保页面完全渲染完成
  setTimeout(() => {
    pageLoaded.value = true
    
    // 设置 Intersection Observer 检测视频区域是否在视口内
    // 专门针对手机端优化
    const videoContainer = document.querySelector('.video-preview-container')
    if (videoContainer && 'IntersectionObserver' in window) {
      const isMobile = isMobileDevice()
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            videoInViewport.value = entry.isIntersecting
          })
        },
        {
          // 根据设备类型调整配置
          rootMargin: isMobile ? '150px 0px' : '100px 0px', // 移动端提前更多距离
          threshold: isMobile ? 0.5 : 0.3 // 移动端需要更多可见度才触发
        }
      )
      observer.observe(videoContainer)
    }
  }, 200)
})

// 修改 onUnmounted
onUnmounted(() => {
  // 保存表单状态（页面切换时）
  saveFormState()
  document.removeEventListener('click', handleClickOutside, true)
  
  stopProgressAnimation()
  stopCheckTask()
  // 清理视频资源
  if (generatedVideoUrl.value) {
    URL.revokeObjectURL(generatedVideoUrl.value)
  }
  // 暂停所有视频并彻底重置
  const videos = document.querySelectorAll('video')
  videos.forEach(video => {
    video.pause()
    video.currentTime = 0
    video.load()
    // 不再移除 src
  })
  // 关键：重置状态
  previewVideoLoading.value = false
  videoStartedPlaying.value = false
  videoHasLoaded.value = false
  previewVideoReady.value = false
  pageLoaded.value = false
  videoInViewport.value = false
  videoLoadTriggered.value = false
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

  // 在处理完文件后，重置 input 的值
  const cleanup = () => {
    // 重置 input 值，以便可以重新上传相同的文件
    if (input) {
      input.value = ''
    }
  }

  // 1. 检查图片格式
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    notificationStore.addNotification({
      taskId: `image-type-error-${Date.now()}`,
      status: 'error',
      message: 'Unsupported image format. Please use JPEG, PNG, WEBP, BMP, TIFF, or GIF.'
    })
    cleanup()
    return
  }

  // 2. 检查图片大小
  if (file.size > 10 * 1024 * 1024) { // 10MB
    notificationStore.addNotification({
      taskId: `image-size-error-${Date.now()}`,
      status: 'error',
      message: 'Image size should be less than 10MB.'
    })
    cleanup()
    return
  }

  // 3. 检查图片尺寸和宽高比
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const { width, height } = img
      
      // 检查宽高长度
      if (width < 300 || width > 6000 || height < 300 || height > 6000) {
        notificationStore.addNotification({
          taskId: `image-dimension-error-${Date.now()}`,
          status: 'error',
          message: 'Image dimensions must be between 300px and 6000px.'
        })
        cleanup()
        return
      }

      // 检查宽高比
      const aspectRatio = width / height
      if (aspectRatio < 0.4 || aspectRatio > 2.5) {
        notificationStore.addNotification({
          taskId: `image-aspect-ratio-error-${Date.now()}`,
          status: 'error',
          message: 'Image aspect ratio must be between 0.4 and 2.5.'
        })
        cleanup()
        return
      }

      // 所有检查通过
      selectedImage.value = file
      imagePreview.value = URL.createObjectURL(file)
      cleanup()
    }
    img.onerror = () => {
        notificationStore.addNotification({
            taskId: `image-load-error-${Date.now()}`,
            status: 'error',
            message: 'Failed to load image, it may be corrupted.'
        })
        cleanup()
    }
    img.src = e.target?.result as string
  }
  reader.onerror = () => {
    notificationStore.addNotification({
        taskId: `image-read-error-${Date.now()}`,
        status: 'error',
        message: 'Failed to read file.'
    })
    cleanup()
  }
  reader.readAsDataURL(file)
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
  const totalDuration = 38000 //总秒数
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
      }else if(response.data.status == '-1' || response.data.status == '-2'){
        // 任务失败
        notificationStore.addNotification({
          taskId: `task-error-${Date.now()}`,
          status: 'error',
          message: response.data.status_msg || 'Video generation failed'
        });
        // 停止进度条动画
        stopProgressAnimation()
        // 停止检查任务状态
        stopCheckTask()
        // 清除任务状态
        videoTaskStore.clearTask()
        // 清除表单缓存
        localStorage.removeItem('seedanceFormCache')
      }
    } else {
      // 任务失败
      notificationStore.addNotification({
        taskId: `task-error-${Date.now()}`,
        status: 'error',
        message: response.msg || 'Video generation failed'
      });
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
    notificationStore.addNotification({
      taskId: `image-upload-warning-${Date.now()}`,
      status: 'info',
      message: 'Please upload an image'
    });
    return
  }
  if (!prompt.value.trim()) {
    notificationStore.addNotification({
      taskId: `prompt-warning-${Date.now()}`,
      status: 'info',
      message: 'Please enter a prompt'
    });
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
      notificationStore.addNotification({
        taskId: `image-upload-error-${Date.now()}`,
        status: 'error',
        message: uploadResponse.msg || 'Failed to upload image'
      });
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
        ratio: aspectRatio.value,
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
        // notificationStore.startCheckingTask(response.data.task_id)
        
        // 开始循环检查任务状态
        checkTaskInterval = setInterval(() => {
          checkTaskStatus(response.data.task_id)
        }, 2000) // 每2秒检查一次
      }
    } else {
      isGenerating.value = false
      notificationStore.addNotification({
        taskId: `video-gen-error-${Date.now()}`,
        status: 'error',
        message: response.msg || 'Video generation failed, please try again'
      });
      stopProgressAnimation()
       // 清除请求缓存
       localStorage.removeItem('seedanceFormCache')
    }
  } catch (error) {
    console.error('创建任务失败！', error)
    isGenerating.value = false
    notificationStore.addNotification({
      taskId: `task-create-error-${Date.now()}`,
      status: 'error',
      message: 'Failed to create video generation task'
    });
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
        //检查是否有次数
        if (!checkUsageLimit()) return
        //检查是否正在生成
        if (isGenerating.value) return
        
        handleVideoRequest()
      })
      break
    case 'inspiration':
      withLoginCheck(() => {
        prompt.value = args[0] || ''
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
  if (remainingTimes.value <= 0) {
    notificationStore.addNotification({
      taskId: `credits-warning-${Date.now()}`,
      status: 'info',
      message: 'Usage limit reached. Please upgrade to premium for more credits'
    });
    router.push('/pricing')
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
    notificationStore.addNotification({
      taskId: `download-error-${Date.now()}`,
      status: 'error',
      message: 'Download failed, please try again later'
    });
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
    aspectRatio: aspectRatio.value,
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
    aspectRatio.value = data.aspectRatio
    resolution.value = data.resolution
    duration.value = data.duration
    isShow.value = data.isShow
    // 清除缓存
    localStorage.removeItem('seedanceFormCache')
  }
}
</script>

<style scoped>
@keyframes gradient-flow {
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
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
  animation: gradient-flow 20s linear infinite;
  background-size: 200% 200%;
  background-image: linear-gradient(
    45deg,
    #1a1a1a 0%,
    #1a1a1a 20%,
    rgba(124, 58, 237, 0.2) 40%,
    rgba(124, 58, 237, 0.3) 50%,
    rgba(124, 58, 237, 0.2) 60%,
    #1a1a1a 80%,
    #1a1a1a 100%
  );
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
  background-size: 200% 200%;
  background-image: linear-gradient(
    90deg,
    #7C3AED 0%,
    #7C3AED 20%,
    #8B5CF6 40%,
    #7C3AED 60%,
    #7C3AED 80%,
    #7C3AED 100%
  );
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
  background: linear-gradient(to right, #7C3AED, #7C3AED/80);
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
  background: linear-gradient(to right, #7C3AED, #7C3AED/80);
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

/* 防止Inspiration按钮被全局移动端样式影响 */
.inspiration-btn {
  min-height: auto !important;
  min-width: auto !important;
  height: auto !important;
  width: auto !important;
}

/* 防止复选框被全局移动端样式影响 */
.gallery-checkbox {
  min-height: auto !important;
  min-width: auto !important;
  height: 1rem !important;
  width: 1rem !important;
}
</style> 