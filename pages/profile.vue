<template>
  <div class="min-h-screen bg-blue-pale pt-[80px]">
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

      <!-- 分享链接 -->
      <div v-if="hasPromotionPermission" class="mt-6 bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="bg-gray-700 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-gray-300 text-sm font-medium">Share & Earn</p>
            <div class="mt-2 flex items-center gap-2">
              <div class="flex-1 bg-gray-900 rounded-lg px-4 py-2 text-gray-300 text-sm truncate">
                {{ promotionLink || 'Loading...' }}
              </div>
              <button 
                @click="copyPromotionLink"
                class="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!promotionLink"
                title="Copy link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
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
                      ? 'bg-[#7C3AED] text-white' 
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

    <!-- 添加积分记录弹框 -->
    <div v-if="showScoreRecords" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click="closeScoreRecords"
    >
      <div class="relative w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] max-w-3xl bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden" 
        @click.stop
      >
        <!-- 弹框头部 -->
        <div class="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h3 class="text-xl font-bold text-white">Score Records</h3>
          <button 
            @click="closeScoreRecords"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 弹框内容 -->
        <div class="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <!-- 积分记录列表 -->
          <div class="space-y-4">
            <div v-for="record in scoreRecords" :key="record.id" 
              class="flex items-center justify-between p-4 bg-gray-700/50 backdrop-blur-sm rounded-xl hover:bg-gray-700 transition-all duration-300">
              <div class="flex items-center space-x-4">
                <!-- 用户头像 -->
                <img :src="record.from_user_avatar || '/img/default-avatar.png'" alt="avatar" class="w-10 h-10 rounded-full">
                <div>
                  <p class="text-white font-medium">{{ record.from_user_nickname }}</p>
                  <p class="text-gray-400 text-sm">{{ formatDate(record.updated_at) }}</p>
                </div>
              </div>
              <!-- 积分信息 -->
              <div class="text-right">
                <p class="text-lg font-semibold text-green-400">
                  +{{ record.score }}
                </p>
                <p class="text-sm text-gray-400">{{ record.status_text }}</p>
              </div>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="scoreLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-blue-500"></div>
          </div>

          <!-- 空状态 -->
          <div v-if="!scoreLoading && scoreRecords.length === 0" class="text-center py-12">
            <div class="inline-block p-4 rounded-full bg-gray-700/50 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
              </svg>
            </div>
            <p class="text-gray-400">No score records yet</p>
          </div>

          <!-- 分页控件 -->
          <div v-if="!scoreLoading && scoreRecords.length > 0" class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- 每页显示数量选择器 -->
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm">Show</span>
              <select 
                v-model="scorePageSize"
                @change="handleScorePageSizeChange"
                class="bg-gray-700 text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-gray-400 text-sm">entries</span>
            </div>

            <!-- 分页按钮 -->
            <div class="flex items-center gap-2">
              <button 
                @click="handleScorePageChange(scorePage - 1)"
                :disabled="scorePage === 1"
                class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="[
                  scorePage === 1 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                ]"
              >
                Previous
              </button>
              
              <div class="flex items-center gap-1">
                <button 
                  v-for="page in totalScorePages" 
                  :key="page"
                  @click="handleScorePageChange(page)"
                  class="w-8 h-8 rounded-lg text-sm transition-colors"
                  :class="[
                    page === scorePage 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button 
                @click="handleScorePageChange(scorePage + 1)"
                :disabled="scorePage === totalScorePages"
                class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="[
                  scorePage === totalScorePages 
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
              ? 'bg-[#7C3AED] text-gray-300 shadow-lg font-medium' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <!-- 作品列表内容 -->
      <div v-if="currentTab === 1 || currentTab === 0">
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
    </div>

    <!-- 分享用户列表 -->
    <div v-if="hasPromotionPermission" class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-white">My Share Link</h3>
        <button 
          @click="fetchSharedUsers"
          class="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-200 hover:bg-gray-700"
          :disabled="sharedUsersLoading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'animate-spin': sharedUsersLoading}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span>{{ sharedUsersLoading ? 'Refreshing...' : 'Refresh' }}</span>
        </button>
      </div>

      <div class="bg-gray-800 rounded-lg p-6">
        <!-- 用户列表 -->
        <div class="space-y-4">
          <div v-if="sharedUsers.length > 0">
            <div v-for="user in sharedUsers" :key="user.user_id" 
              class="flex items-center justify-between p-4 bg-gray-700/50 backdrop-blur-sm rounded-xl hover:bg-gray-700 transition-all duration-300">
              <div class="flex items-center space-x-4">
                <img :src="user.user_avatar || '/img/default-avatar.png'" alt="avatar" class="w-10 h-10 rounded-full">
                <div>
                  <p class="text-white font-medium">{{ user.user_nickname || 'Anonymous User' }}</p>
                  <p class="text-gray-400 text-sm">Joined: {{ formatDate(user.user_created_time) }}</p>
                </div>
              </div>
              <!-- 添加总积分显示 -->
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-yellow-500 font-medium">{{ user.score_total || 0 }}</span>
                <button 
                  @click="openScoreRecords(user.user_id)"
                  class="ml-2 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-200 transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  Details
                </button>
              </div>
              
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else-if="!sharedUsersLoading" class="text-center py-12">
            <div class="inline-block p-4 rounded-full bg-gray-700/50 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <p class="text-gray-400">No shared users yet</p>
          </div>

          <!-- 加载状态 -->
          <div v-if="sharedUsersLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-blue-500"></div>
          </div>

          <!-- 分页控件 -->
          <div v-if="!sharedUsersLoading && sharedUsers.length > 0" class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- 每页显示数量选择器 -->
            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm">Show</span>
              <select 
                v-model="sharedUsersPageSize"
                @change="handleSharedUsersPageSizeChange(Number(sharedUsersPageSize))"
                class="bg-gray-700 text-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-gray-400 text-sm">entries</span>
            </div>

            <!-- 分页按钮 -->
            <div class="flex items-center gap-2">
              <button 
                @click="handleSharedUsersPageChange(sharedUsersPage - 1)"
                :disabled="sharedUsersPage === 1"
                class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="[
                  sharedUsersPage === 1 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                ]"
              >
                Previous
              </button>
              
              <div class="flex items-center gap-1">
                <button 
                  v-for="pageNum in totalSharedUsersPages" 
                  :key="pageNum"
                  @click="handleSharedUsersPageChange(pageNum)"
                  class="w-8 h-8 rounded-lg text-sm transition-colors"
                  :class="[
                    pageNum === sharedUsersPage 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  ]"
                >
                  {{ pageNum }}
                </button>
              </div>

              <button 
                @click="handleSharedUsersPageChange(sharedUsersPage + 1)"
                :disabled="sharedUsersPage === totalSharedUsersPages"
                class="px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="[
                  sharedUsersPage === totalSharedUsersPages 
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
import { getOpusList, checkTask, getTimesLog, getPromotionLink, getPromotionUsers, getPromotionScoreLog } from '~/api'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { useRuntimeConfig } from '#app'

// Get user info
const userStore = useUserStore()

import { useNuxtApp } from 'nuxt/app'
const { $toast } = useNuxtApp() as any

// 在 UserInfo 接口中添加分享链接相关字段
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
  promotion_link?: string
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

// 添加分享链接相关状态
const promotionLink = ref('')
const isLoadingLink = ref(false)
const hasPromotionPermission = ref(false)  // 添加权限状态

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

// 添加积分记录接口
interface ScoreRecord {
  id: number
  amount: number
  user_id: number
  from_user_id: number
  score: number
  status: number
  status_msg: string
  created_at: number
  updated_at: number
  status_text: string
  from_user_email: string
  from_user_nickname: string
  from_user_avatar: string
}

interface ScoreRecordResponse {
  count: number
  list: ScoreRecord[]
  total_page: number
}

// 添加分享用户列表相关状态
interface SharedUser {
  promotion_time: number
  user_id: number
  user_email: string
  user_nickname: string
  user_avatar: string
  user_level: number
  user_created_time: number
  user_last_login_time: number
  score_total: number // 添加总积分字段
}

const sharedUsers = ref<SharedUser[]>([])
const sharedUsersCount = ref(0)
const sharedUsersLoading = ref(false)
const sharedUsersPage = ref(1)
const sharedUsersPageSize = ref(10)
const totalSharedUsersPages = ref(0)

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

// 获取分享链接
const fetchPromotionLink = async () => {
  if (isLoadingLink.value) return
  
  isLoadingLink.value = true
  try {
    const response = await getPromotionLink() as any
    if (response.code === 500 && response.msg === 'this website  no permission') {
      hasPromotionPermission.value = false
      return
    }
    hasPromotionPermission.value = true
    const config = useRuntimeConfig()
    const baseUrl = config.public.baseUrl
    promotionLink.value = `${baseUrl}?ivcode=${response.data.ivcode}`
  } catch (error) {
    console.error('Failed to fetch promotion link:', error)
    hasPromotionPermission.value = false
    $toast.error('Failed to load promotion link')
  } finally {
    isLoadingLink.value = false
  }
}

// 复制分享链接
const copyPromotionLink = async () => {
  if (!promotionLink.value) return
  
  try {
    await navigator.clipboard.writeText(promotionLink.value)
    $toast.success('Promotion link copied to clipboard')
  } catch (error) {
    console.error('Failed to copy promotion link:', error)
    $toast.error('Failed to copy promotion link')
  }
}

// 获取分享用户列表
const fetchSharedUsers = async () => {
  if (sharedUsersLoading.value) return
  
  sharedUsersLoading.value = true
  try {
    const response = await getPromotionUsers({
      page: sharedUsersPage.value,
      page_size: sharedUsersPageSize.value
    }) as any
    
    const data = response.data
    sharedUsers.value = data.list
    sharedUsersCount.value = data.count
    totalSharedUsersPages.value = data.total_page
  } catch (error) {
    console.error('Failed to fetch shared users:', error)
    $toast.error('Failed to load shared users')
  } finally {
    sharedUsersLoading.value = false
  }
}

// 切换标签时获取数据
watch(currentTab, (newValue) => {
  if (newValue === 2) {
    fetchSharedUsers()
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

// 处理分享用户列表分页
const handleSharedUsersPageChange = (newPage: number) => {
  if (newPage < 1 || newPage > totalSharedUsersPages.value) return
  sharedUsersPage.value = newPage
  fetchSharedUsers()
}

// 处理分享用户列表每页显示数量变化
const handleSharedUsersPageSizeChange = (size: number) => {
  sharedUsersPageSize.value = size
  sharedUsersPage.value = 1
  fetchSharedUsers()
}

// 添加记录详情相关状态和方法
const currentRecord = ref<ScoreRecord | null>(null)
const showRecordDetails = (record: ScoreRecord) => {
  currentRecord.value = record
  // 这里可以添加显示详情的逻辑，比如打开一个新的弹框
  $toast.info(`User ${record.from_user_nickname} received ${record.score} points on ${formatDate(record.updated_at)}`)
}

// 添加积分记录相关状态和方法
const currentUserId = ref<number | null>(null)
const scoreRecords = ref<ScoreRecord[]>([])
const scoreLoading = ref(false)
const scorePage = ref(1)
const scorePageSize = ref(10)
const totalScorePages = ref(1)
const showScoreRecords = ref(false)

// 获取积分记录
const fetchScoreRecords = async () => {
  console.log(currentUserId.value)
  if (scoreLoading.value || !currentUserId.value) return
  
  scoreLoading.value = true
  try {
    const response = await getPromotionScoreLog({
      page: scorePage.value,
      page_size: scorePageSize.value,
      from_uid: currentUserId.value,
      status: 1
    }) as any
    
    const data = response.data
    totalScorePages.value = data.total_page
    scoreRecords.value = data.list
  } catch (error) {
    console.error('Failed to fetch score records:', error)
    $toast.error('Failed to load score records')
  } finally {
    scoreLoading.value = false
  }
}

// 打开积分记录弹框
const openScoreRecords = (userId: number) => {
  currentUserId.value = userId
  showScoreRecords.value = true
  // 禁止背景滚动
  document.body.style.overflow = 'hidden'
  // 重置积分记录数据
  scoreRecords.value = []
  scorePage.value = 1
  fetchScoreRecords()
}

// 关闭积分记录弹框
const closeScoreRecords = () => {
  showScoreRecords.value = false
  // 恢复背景滚动
  document.body.style.overflow = ''
}

// 切换积分记录页码
const handleScorePageChange = (page: number) => {
  if (page < 1 || page > totalScorePages.value) return
  scorePage.value = page
  fetchScoreRecords()
}

// 切换积分记录每页显示数量
const handleScorePageSizeChange = (size: number) => {
  scorePageSize.value = Number(size)
  scorePage.value = 1
  fetchScoreRecords()
}

onMounted(() => {
  fetchUserInfo()
  fetchWorks()
  fetchCreditRecords()
  fetchPromotionLink()
  fetchSharedUsers() // 添加这行来初始加载分享用户列表
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