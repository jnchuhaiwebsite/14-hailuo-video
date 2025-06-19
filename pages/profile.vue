<template>
  <div class="min-h-screen bg-gray-900 pt-[80px]">
    <!-- 用户信息卡片 -->
    <div class="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
      <!-- 基本信息 -->
      <div class="flex items-center space-x-6">
        <div class="relative">
          <img :src="userInfo.avatar||'/img/default-avatar.png'" alt="avatar" class="w-24 h-24 rounded-full border-4 border-gray-700 shadow-md">
          <div v-if="userInfo.vip_last_time > 0" class="absolute -bottom-2 -right-2 bg-yellow-500 text-gray-900 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <div class="flex items-center space-x-3">
            <h2 class="text-2xl font-bold text-white">{{ userInfo.nickname }}</h2>
            <span v-if="userInfo.vip_last_time > 0" class="px-2 py-1 bg-yellow-900 text-yellow-100 text-sm rounded-full">VIP Member</span>
          </div>
          <p class="text-gray-300 mt-1">{{ userInfo.email }}</p>
          <p class="text-gray-400 text-sm mt-1">Registered: {{ formatDate(userInfo.created_at) }}</p>
          <p class="text-gray-400 text-sm">Login Method: {{ userInfo.from_login === 'google' ? 'Google' : 'Other' }}</p>
        </div>
      </div>
      
      <!-- 使用次数信息 -->
      <div class="mt-8">
        <div class="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="bg-gray-700 p-3 rounded-full">
              <SparklesIcon class="h-8 w-8 text-green-400" />
            </div>
            <div>
              <p class="text-gray-300 text-sm font-medium">Remaining Credits</p>
              <p class="text-3xl font-bold text-green-400 mt-1">{{ userInfo.free_limit + userInfo.remaining_limit }}</p>
            </div>
            <!-- 添加查看记录按钮 -->
            <button 
              @click="openCreditRecords"
              class="ml-auto px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
              </svg>
              View History
            </button>
          </div>
        </div>
      </div>

      <!-- VIP信息 -->
      <div v-if="userInfo.vip_last_time > 0" class="mt-6 bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg border border-gray-700">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p class="text-yellow-100 font-medium">VIP Membership Valid Until: {{ formatDate(userInfo.vip_last_time) }}</p>
        </div>
      </div>
    </div>

    <!-- 积分记录弹框 -->
    <div v-if="showCreditRecords" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click="closeCreditRecords"
    >
      <div class="relative w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] max-w-3xl bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden" 
        @click.stop
      >
        <!-- 弹框头部 -->
        <div class="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h3 class="text-xl font-bold text-white">Credit History</h3>
          <button 
            @click="closeCreditRecords"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 弹框内容 -->
        <div class="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar" @wheel.stop @touchmove.stop>
          <!-- 积分记录列表 -->
          <div class="space-y-4">
            <div v-for="record in creditRecords" :key="record.id" 
              class="flex items-center justify-between p-4 bg-gray-700/50 backdrop-blur-sm rounded-xl hover:bg-gray-700 transition-all duration-300">
              <div class="flex items-center space-x-4">
                <!-- 图标 -->
                <div class="p-3 rounded-xl" :class="{
                  'bg-green-500/10 text-green-400': record.change_type === 'register_give',
                  'bg-blue-500/10 text-blue-400': record.change_type === 'buy_package',
                  'bg-yellow-500/10 text-yellow-400': record.change_type === 'create_task_free',
                  'bg-red-500/10 text-red-400': record.change_type === 'create_task'
                }">
                  <component :is="getCreditTypeIcon(record.change_type)" class="h-6 w-6" />
                </div>
                
                <!-- 记录信息 -->
                <div>
                  <p class="text-white font-medium">{{ getCreditTypeText(record.change_type) }}</p>
                  <p class="text-gray-400 text-sm">{{ formatDate(record.created_at) }}</p>
                </div>
              </div>
              
              <!-- 积分变化 -->
              <div class="text-right">
                <p class="text-lg font-semibold" :class="{
                  'text-green-400': record.use_limit > 0,
                  'text-red-400': record.use_limit < 0
                }">
                  {{ record.use_limit > 0 ? '+' : '' }}{{ record.use_limit }}
                </p>
              </div>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="creditLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-blue-500"></div>
          </div>

          <!-- 空状态 -->
          <div v-if="!creditLoading && creditRecords.length === 0" class="text-center py-12">
            <div class="inline-block p-4 rounded-full bg-gray-700/50 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
              </svg>
            </div>
            <p class="text-gray-400">No credit history yet</p>
          </div>

          <!-- 分页控件 -->
          <div v-if="!creditLoading && creditRecords.length > 0" class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- 每页显示数量选择器 -->
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm">Show</span>
              <select 
                v-model="creditPageSize"
                @change="handlePageSizeChange(Number(creditPageSize))"
                class="bg-gray-700 text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-gray-400 text-sm">entries</span>
            </div>

            <!-- 分页按钮 -->
            <div class="flex items-center gap-2">
              <button 
                @click="handlePageChange(creditPage - 1)"
                :disabled="creditPage === 1"
                class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="[
                  creditPage === 1 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                ]"
              >
                Previous
              </button>
              
              <div class="flex items-center gap-1">
                <button 
                  v-for="page in totalPages" 
                  :key="page"
                  @click="handlePageChange(page)"
                  class="w-8 h-8 rounded-lg text-sm transition-colors"
                  :class="[
                    page === creditPage 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button 
                @click="handlePageChange(creditPage + 1)"
                :disabled="creditPage === totalPages"
                class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="[
                  creditPage === totalPages 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                ]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 作品列表 -->
    <div id="works-section" class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-white">My Works</h3>
        <button 
          @click="handleRefresh"
          class="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-200 hover:bg-gray-700"
          :disabled="loading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'animate-spin': loading}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
        </button>
      </div>

      <!-- 标签选项卡 -->
      <div class="flex space-x-4 mb-6">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          @click="handleTabChange(tab.value)"
          class="px-6 py-2 rounded-full transition-all"
          :class="[
            currentTab === tab.value 
              ? 'bg-[#01f4c9] text-gray-900 shadow-lg font-medium' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <!-- 瀑布流布局 -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" v-if="works.length > 0">
        <div v-for="work in works" :key="work.task_id" class="work-item">
          <div class="relative aspect-square rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-shadow">
            <template v-if="currentTab === 1">
              <div class="relative w-full h-full">
                <video 
                  :src="work.quality_image" 
                  class="w-full h-full object-cover cursor-pointer"
                  loading="lazy"
                  muted
                  playsinline
                  ref="videoRefs"
                  @mouseenter="handleVideoPlay($event)"
                  @mouseleave="handleVideoPause($event)"
                  @click="openLightbox(work.quality_image)"
                  @loadstart="handleVideoLoadStart(work.task_id)"
                  @canplay="handleVideoCanPlay(work.task_id)"
                />
                <!-- 视频加载状态指示器 -->
                <div v-if="videoLoadingStates.get(work.task_id)" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-white mb-2"></div>
                    <p class="text-white text-sm">Loading...</p>
                  </div>
                </div>
              </div>
              <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button 
                  @click="openLightbox(work.quality_image)"
                  class="bg-gray-800 bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all shadow-lg hover:shadow-xl"
                  title="View full size"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </button>
                <button 
                  @click="handleDownload(work.quality_image)"
                  class="bg-gray-800 bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all shadow-lg hover:shadow-xl"
                  :disabled="isDownloading"
                  title="Download video"
                >
                  <svg v-if="!isDownloading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <div v-else class="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </button>
              </div>
            </template>
            <template v-else>
              <div class="relative w-full h-full">
                <template v-if="work.origin_image">
                  <img 
                    :src="work.origin_image" 
                    class="w-full h-full object-cover"
                    loading="lazy"
                    alt="Processing image"
                  />
                  <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div class="text-center">
                      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-white mb-2"></div>
                      <p class="text-white text-sm">Processing...</p>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div class="text-center">
                      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-white mb-2"></div>
                      <p class="text-white text-sm">Generating...</p>
                    </div>
                  </div>
                </template>
              </div>
            </template>
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3">
              <div class="flex justify-between items-start">
                <p class="text-sm mt-1">{{ formatDate(work.created_at) }}</p>
                <button 
                  v-if="work.prompt"
                  @click="copyPrompt(work.prompt)"
                  class="text-gray-300 hover:text-white transition-colors"
                  title="Copy prompt"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
              <p v-if="work.prompt" class="text-sm text-gray-300 mt-2 line-clamp-2">{{ work.prompt }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else-if="!loading && works.length === 0" class="text-center py-12">
        <p class="text-gray-400">No works yet</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-8 mt-4">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-blue-500"></div>
      </div>

      <!-- 分页控件 -->
      <div v-if="!loading && works.length > 0" class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- 每页显示数量选择器 -->
        <div class="flex items-center gap-2">
          <span class="text-gray-400 text-sm">Show</span>
          <select 
            v-model="pageSize"
            @change="handleWorksPageSizeChange(Number(pageSize))"
            class="bg-gray-700 text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
            <option value="32">32</option>
          </select>
          <span class="text-gray-400 text-sm">entries</span>
        </div>

        <!-- 分页按钮 -->
        <div class="flex items-center gap-2">
          <button 
            @click="handleWorksPageChange(page - 1)"
            :disabled="page === 1"
            class="px-3 py-1.5 rounded-lg text-sm transition-colors"
            :class="[
              page === 1 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            ]"
          >
            Previous
          </button>
          
          <div class="flex items-center gap-1">
            <button 
              v-for="pageNum in totalWorksPages" 
              :key="pageNum"
              @click="handleWorksPageChange(pageNum)"
              class="w-8 h-8 rounded-lg text-sm transition-colors"
              :class="[
                pageNum === page 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              ]"
            >
              {{ pageNum }}
            </button>
          </div>

          <button 
            @click="handleWorksPageChange(page + 1)"
            :disabled="page === totalWorksPages"
            class="px-3 py-1.5 rounded-lg text-sm transition-colors"
            :class="[
              page === totalWorksPages 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            ]"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- 视频预览模态框 -->
    <div v-if="showPreview" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95" @click="closePreview">
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <div class="relative w-full h-full flex items-center justify-center">
          <video 
            :src="previewVideo" 
            class="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer"
            controls
            autoplay
            @click.stop
          />
          <button 
            @click="closePreview"
            class="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { getOpusList, checkTask, getTimesLog } from '~/api'
import { SparklesIcon } from '@heroicons/vue/24/outline'

// Get user info
const userStore = useUserStore()

import { useNuxtApp } from 'nuxt/app'
const { $toast } = useNuxtApp() as any

interface UserInfo {
  avatar: string
  created_at: number
  email: string
  free_limit: number
  from_login: string
  id: number
  nickname: string
  remaining_limit: number
  total_limit: number
  use_limit: number
  uuid: string
  vip_last_time: number
}

// 添加积分记录接口
interface CreditRecord {
  id: number
  user_id: number
  change_type: 'register_give' | 'buy_package' | 'create_task_free' | 'create_task'
  use_limit: number
  created_at: number
  updated_at: number
}

interface CreditRecordResponse {
  count: number
  list: CreditRecord[]
  total_page: number
}

interface Work {
  task_id: string
  quality_image: string
  created_at: number
  origin_image: string
  status: number
  prompt?: string
}

const userInfo = ref<UserInfo>({
  avatar: '',
  created_at: 0,
  email: '',
  free_limit: 0,
  from_login: '',
  id: 0,
  nickname: '',
  remaining_limit: 0,
  total_limit: 0,
  use_limit: 0,
  uuid: '',
  vip_last_time: 0
})

const works = ref<Work[]>([])
const worksCount = ref(0)
const loading = ref(true)
const hasMore = ref(true)
const page = ref(1)
const pageSize = ref(8)
const totalWorksPages = ref(1)

// 视频加载状态
const videoLoadingStates = ref(new Map<string, boolean>())

// 视频预览相关状态
const showPreview = ref(false)
const previewVideo = ref('')
const isDownloading = ref(false)

// 标签选项卡配置
const tabs = [
  { label: 'Completed', value: 1 },
  { label: 'In Progress', value: 0 }
]

const currentTab = ref(1)

// 添加积分记录相关状态
const creditRecords = ref<CreditRecord[]>([])
const creditLoading = ref(false)
const creditPage = ref(1)
const creditPageSize = ref(10)
const totalPages = ref(1)

// 视频播放控制
const handleVideoPlay = (event: Event) => {
  const video = event.target as HTMLVideoElement
  video.play().catch(() => {
    // 忽略自动播放策略导致的错误
  })
}

const handleVideoPause = (event: Event) => {
  const video = event.target as HTMLVideoElement
  video.pause()
  video.currentTime = 0
}

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const response = await userStore.fetchUserInfo()
    userInfo.value = response
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  }
}

// 切换标签
const handleTabChange = (tabValue: number) => {
  currentTab.value = tabValue
  // 重置分页和数据
  page.value = 1
  works.value = []
  fetchWorks()
}

// 刷新列表
const handleRefresh = () => {
  // 重置分页和数据
  page.value = 1
  works.value = []
  fetchWorks()
}

// 检查任务状态
const checkTaskStatus = async (taskId: string) => {
  try {
    const response = await checkTask(taskId) as any
    if (response.data?.status === 1) {
      // 如果任务完成，从列表中移除该作品
      works.value = works.value.filter(work => work.task_id !== taskId)
    }
  } catch (error) {
    console.error('Failed to check task status:', error)
  }
}

// 获取作品列表
const fetchWorks = async () => {
  loading.value = true
  try {
    const response = await getOpusList({
      page: page.value,
      page_size: pageSize.value,
      status: currentTab.value
    }) as any
    const data = response.data
    
    worksCount.value = data.count
    works.value = data.list
    totalWorksPages.value = Math.ceil(data.count / pageSize.value)

    // 如果是进行中的列表，检查每个任务的状态
    if (currentTab.value === 0) {
      data.list.forEach((work: Work) => {
        checkTaskStatus(work.task_id)
      })
    }
  } catch (error) {
    console.error('Failed to fetch works:', error)
    $toast.error('Failed to load works')
  } finally {
    loading.value = false
  }
}

// 打开视频预览
const openLightbox = (video: string) => {
  previewVideo.value = video
  showPreview.value = true
}

// 关闭视频预览
const closePreview = () => {
  showPreview.value = false
  previewVideo.value = ''
}

// 下载视频
const handleDownload = async (videoUrl: string) => {
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

// 视频加载事件处理
const handleVideoCanPlay = (taskId: string) => {
  videoLoadingStates.value.set(taskId, false)
}

// 视频加载开始事件处理
const handleVideoLoadStart = (taskId: string) => {
  videoLoadingStates.value.set(taskId, true)
}

// 复制提示词
const copyPrompt = async (prompt: string) => {
  try {
    await navigator.clipboard.writeText(prompt)
    $toast.success('Prompt copied to clipboard')
  } catch (error) {
    console.error('Failed to copy prompt:', error)
    $toast.error('Failed to copy prompt')
  }
}

// 获取积分记录
const fetchCreditRecords = async () => {
  if (creditLoading.value) return
  
  creditLoading.value = true
  try {
    const response = await getTimesLog({
      page: creditPage.value,
      page_size: creditPageSize.value
    }) as any
    
    const data = response.data as CreditRecordResponse
    totalPages.value = data.total_page
    creditRecords.value = data.list
  } catch (error) {
    console.error('Failed to fetch credit records:', error)
    $toast.error('Failed to load credit records')
  } finally {
    creditLoading.value = false
  }
}

// 获取积分记录类型的中文描述
const getCreditTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
    'register_give': 'Registration Bonus',
    'buy_package': 'Package Purchase',
    'create_task_free': 'Free Credit Usage',
    'create_task': 'Credit Usage'
  }
  return typeMap[type] || type
}

// 获取积分记录类型的图标
const getCreditTypeIcon = (type: string) => {
  switch (type) {
    case 'register_give':
      return 'gift'
    case 'buy_package':
      return 'shopping-bag'
    case 'create_task_free':
      return 'sparkles'
    case 'create_task':
      return 'fire'
    default:
      return 'currency-dollar'
  }
}

// 积分记录弹框状态
const showCreditRecords = ref(false)

// 切换页码
const handlePageChange = (page: number) => {
  creditPage.value = page
  fetchCreditRecords()
}

// 切换每页显示数量
const handlePageSizeChange = (size: number) => {
  creditPageSize.value = size
  creditPage.value = 1
  fetchCreditRecords()
}

// 打开积分记录弹框
const openCreditRecords = () => {
  showCreditRecords.value = true
  // 禁止背景滚动
  document.body.style.overflow = 'hidden'
  // 重置积分记录数据
  creditRecords.value = []
  creditPage.value = 1
  fetchCreditRecords()
}

const closeCreditRecords = () => {
  showCreditRecords.value = false
  // 恢复背景滚动
  document.body.style.overflow = ''
}

// 监听弹框显示状态变化
watch(showCreditRecords, (newValue) => {
  if (!newValue) {
    // 当弹框关闭时恢复滚动
    document.body.style.overflow = ''
  }
})

// 切换页码
const handleWorksPageChange = (newPage: number) => {
  if (newPage < 1 || newPage > totalWorksPages.value) return
  page.value = newPage
  fetchWorks()
  // 滚动到作品区域
  document.getElementById('works-section')?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  })
}

// 切换每页显示数量
const handleWorksPageSizeChange = (size: number) => {
  pageSize.value = size
  page.value = 1
  fetchWorks()
  // 滚动到作品区域
  document.getElementById('works-section')?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  })
}

onMounted(() => {
  fetchUserInfo()
  fetchWorks()
  fetchCreditRecords()
})

onUnmounted(() => {
  // 确保组件卸载时恢复滚动
  document.body.style.overflow = ''
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}
</style> 