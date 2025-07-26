<template>
  <div class="min-h-screen bg-blue-pale/80 backdrop-blur-sm pt-[80px]">
    <div class="max-w-7xl mx-auto p-4 sm:p-6">
      <!-- 页面标题 -->
      <div class="mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-white">User Center</h1>
        <p class="text-gray-300 mt-2">Manage your account information and content</p>
      </div>

      <!-- 主要内容区域 -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- 左侧导航栏 -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <nav class="p-4">
              <ul class="space-y-2">
                <li v-for="item in navigationItems" :key="item.key">
                  <button
                    @click="activeTab = item.key"
                    :class="[
                      'w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                      activeTab === item.key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    ]"
                  >
                    <component :is="item.icon" class="h-5 w-5" />
                    <span class="font-medium">{{ item.label }}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- 右侧内容区域 -->
        <div class="flex-1">
          <div class="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
            <!-- 我的积分 -->
            <div v-if="activeTab === 'credits'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-white">My Credits</h2>
                <div class="text-right">
                  <p class="text-gray-300 text-sm">Current Credits</p>
                  <p class="text-2xl font-bold text-green-400">{{ userInfo.free_limit + userInfo.remaining_limit }}</p>
                </div>
              </div>
              
                             <!-- 积分记录 -->
               <div class="bg-gray-700 rounded-lg p-4">
                 <h3 class="text-lg font-semibold text-white mb-4">Credit Records</h3>
                                    <div v-if="loading.credits" class="text-center py-8">
                     <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                     <p class="text-gray-400 mt-2">Loading...</p>
                   </div>
                 <div v-else-if="creditRecords.length > 0" class="space-y-3">
                   <div v-for="record in creditRecords" :key="record.id" class="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                     <div>
                       <p class="text-white font-medium">{{ getChangeTypeText(record.change_type) }}</p>
                       <p class="text-gray-300 text-sm">{{ formatDate(record.created_at) }}</p>
                       <p v-if="record.task_id" class="text-gray-400 text-xs">任务ID: {{ record.task_id }}</p>
                     </div>
                     <span :class="record.use_limit > 0 ? 'text-green-400' : 'text-red-400'" class="font-semibold">
                       {{ record.use_limit > 0 ? '+' : '' }}{{ record.use_limit }}
                     </span>
                   </div>
                 </div>
                 <div v-else class="text-center py-8 text-gray-400">
                   <p>No credit records</p>
                 </div>
                 
                 <!-- 分页组件 -->
                 <div v-if="pagination.credits.total > pagination.credits.page_size" class="mt-6 flex justify-center">
                   <div class="flex items-center gap-2">
                     <button 
                       @click="loadCreditRecords(pagination.credits.page - 1)" 
                       :disabled="pagination.credits.page <= 1"
                       class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
                     >
                       Previous
                     </button>
                     <span class="text-gray-300 px-3 py-2">
                       {{ pagination.credits.page }} / {{ Math.ceil(pagination.credits.total / pagination.credits.page_size) }}
                     </span>
                     <button 
                       @click="loadCreditRecords(pagination.credits.page + 1)" 
                       :disabled="pagination.credits.page >= Math.ceil(pagination.credits.total / pagination.credits.page_size)"
                       class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
                     >
                       Next
                     </button>
                   </div>
                 </div>
               </div>
            </div>

                        <!-- 我的订单 -->
            <div v-if="activeTab === 'orders'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-white">My Orders</h2>
                <button @click="loadOrders(1)" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                  Refresh
                </button>
              </div>
              
                             <!-- 订单列表 -->
               <div class="bg-gray-700 rounded-lg p-4">
                 <div v-if="loading.orders" class="text-center py-8">
                   <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                   <p class="text-gray-400 mt-2">Loading...</p>
                 </div>
                 <div v-else-if="orders.length > 0" class="space-y-4">
                   <div v-for="order in orders" :key="order.id" class="border border-gray-600 rounded-lg p-4">
                     <div class="flex items-center justify-between mb-3">
                       <div>
                         <p class="text-white font-medium">Order No: {{ order.order_no }}</p>
                         <p class="text-gray-300 text-sm">{{ formatDate(order.created_at) }}</p>
                       </div>
                       <span :class="getOrderStatusClass(order.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                         {{ getOrderStatusText(order.status) }}
                       </span>
                     </div>
                     <div class="flex items-center justify-between">
                       <div>
                         <p class="text-gray-300">{{ order.plan_name }}</p>
                         <p class="text-white font-semibold">¥{{ order.amount }}</p>
                       </div>
                       <button v-if="order.status === 'pending'" @click="payOrder(order)" class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm">
                         Pay Now
                       </button>
                     </div>
                   </div>
                 </div>
                 <div v-else class="text-center py-8 text-gray-400">
                   <p>No order records</p>
                 </div>
                 
                 <!-- 分页组件 -->
                 <div v-if="pagination.orders.total > pagination.orders.page_size" class="mt-6 flex justify-center">
                   <div class="flex items-center gap-2">
                     <button 
                       @click="loadOrders(pagination.orders.page - 1)" 
                       :disabled="pagination.orders.page <= 1"
                       class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
                     >
                       Previous
                     </button>
                     <span class="text-gray-300 px-3 py-2">
                       {{ pagination.orders.page }} / {{ Math.ceil(pagination.orders.total / pagination.orders.page_size) }}
                     </span>
                     <button 
                       @click="loadOrders(pagination.orders.page + 1)" 
                       :disabled="pagination.orders.page >= Math.ceil(pagination.orders.total / pagination.orders.page_size)"
                       class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
                     >
                       Next
                     </button>
                   </div>
                 </div>
               </div>
            </div>

            <!-- 我的视频 -->
            <div v-if="activeTab === 'videos'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-white">My Videos</h2>
                <div class="flex gap-2">
                  <select v-model="videoFilter" @change="loadVideos(1)" class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                  <button @click="loadVideos(1)" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                    Refresh
                  </button>
                </div>
              </div>
              
                             <!-- 视频列表 -->
               <div class="bg-gray-700 rounded-lg p-4">
                 <div v-if="loading.videos" class="text-center py-8">
                   <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                   <p class="text-gray-400 mt-2">Loading...</p>
                 </div>
                 <div v-else-if="videos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   <div v-for="video in videos" :key="video.task_id" class="bg-gray-600 rounded-lg overflow-hidden">
                     <!-- 调试信息 -->
                     <div class="text-xs text-gray-400 p-1">{{ video.task_id }}</div>
                     <div class="aspect-video bg-gray-800 flex items-center justify-center">
                       <video v-if="video.generate_image" :src="video.generate_image" class="w-full h-full object-cover" controls></video>
                       <div v-else class="text-gray-400 text-center">
                         <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                         </svg>
                         <p class="text-sm">{{ getVideoStatusText(video.status) }}</p>
                       </div>
                     </div>
                     <div class="p-4">
                       <div class="flex items-start justify-between mb-3">
                         <p class="text-white font-medium text-sm leading-5 line-clamp-2 flex-1 mr-2">{{ video.prompt || 'No Title' }}</p>
                         <button @click="copyPrompt(video.prompt)" class="flex-shrink-0 p-1 text-gray-400 hover:text-white transition-colors">
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                           </svg>
                         </button>
                       </div>
                       <div class="flex items-center justify-between text-sm">
                         <span class="text-gray-300">{{ formatDate(video.created_at) }}</span>
                       </div>
                       <div class="mt-3">
                         <button @click="downloadVideo(video)" v-if="video.generate_image" class="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm transition-colors">
                           Download
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div v-else class="text-center py-8 text-gray-400">
                   <p>No video records</p>
                 </div>
                 
                 <!-- 分页组件 -->
                 <div v-if="pagination.videos.total > pagination.videos.page_size" class="mt-6 flex justify-center">
                   <div class="flex items-center gap-2">
                     <button 
                       @click="loadVideos(pagination.videos.page - 1)" 
                       :disabled="pagination.videos.page <= 1"
                       class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
                     >
                       Previous
                     </button>
                     <span class="text-gray-300 px-3 py-2">
                       {{ pagination.videos.page }} / {{ Math.ceil(pagination.videos.total / pagination.videos.page_size) }}
                     </span>
                     <button 
                       @click="loadVideos(pagination.videos.page + 1)" 
                       :disabled="pagination.videos.page >= Math.ceil(pagination.videos.total / pagination.videos.page_size)"
                       class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
                     >
                       Next
                     </button>
                   </div>
                 </div>
               </div>
            </div>



            <!-- 我邀请的用户 -->
            <div v-if="activeTab === 'invitedUsers'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-white">My Invited Users</h2>
                <button @click="loadInvitedUsers(1)" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                  Refresh
                </button>
              </div>
              
              <!-- 分享链接区域 -->
              <div class="bg-gray-700 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-white mb-4">My Invitation Link</h3>
                <div class="flex items-center gap-3">
                  <div class="flex-1 bg-gray-600 rounded-lg p-3">
                    <p class="text-gray-300 text-sm mb-1">Invitation Link</p>
                    <p class="text-white font-mono text-sm break-all">{{ shareLink }}</p>
                  </div>
                  <button 
                    @click="copyShareLink" 
                    class="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>
              <div class="bg-gray-700 rounded-lg p-4">
                <div v-if="invitedUsersLoading" class="text-center py-8">
                  <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  <p class="text-gray-400 mt-2">Loading...</p>
                </div>
                <div v-else-if="invitedUsersList.length > 0" class="space-y-4">
                  <div v-for="user in invitedUsersList" :key="user.user_id" class="border border-gray-600 rounded-lg p-4 flex items-center gap-4">
                    <img :src="user.user_avatar" class="w-12 h-12 rounded-full object-cover bg-gray-500" />
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <span class="text-white font-medium">{{ user.user_nickname || 'Unnamed' }}</span>
                        <span class="text-xs text-gray-400">ID: {{ user.user_id }}</span>
                      </div>
                      <div class="text-gray-300 text-sm">{{ user.user_email }}</div>
                      <div class="text-gray-400 text-xs mt-1">Registration Time: {{ formatDate(user.user_created_time) }}</div>
                      <div class="text-gray-400 text-xs">Last Login: {{ formatDate(user.user_last_login_time) }}</div>
                    </div>
                                          <div class="text-center min-w-[60px]">
                        <div class="text-yellow-400 font-bold text-lg">{{ user.score_total }}</div>
                        <div class="text-gray-400 text-xs">Total Credits</div>
                      </div>
                  </div>
                </div>
                                 <div v-else class="text-center py-8 text-gray-400">
                   <p>No invited users</p>
                 </div>
                 
                 <!-- 分页组件 -->
                 <div v-if="pagination.invitedUsers.total > pagination.invitedUsers.page_size" class="mt-6 flex justify-center">
                   <div class="flex items-center gap-2">
                     <button 
                       @click="loadInvitedUsers(pagination.invitedUsers.page - 1)" 
                       :disabled="pagination.invitedUsers.page <= 1"
                       class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
                     >
                       Previous
                     </button>
                     <span class="text-gray-300 px-3 py-2">
                       {{ pagination.invitedUsers.page }} / {{ Math.ceil(pagination.invitedUsers.total / pagination.invitedUsers.page_size) }}
                     </span>
                     <button 
                       @click="loadInvitedUsers(pagination.invitedUsers.page + 1)" 
                       :disabled="pagination.invitedUsers.page >= Math.ceil(pagination.invitedUsers.total / pagination.invitedUsers.page_size)"
                       class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
                     >
                       Next
                     </button>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { useSeo } from '~/composables/useSeo'
import { 
  getCurrentUser, 
  getTimesLog, 
  getPayLog, 
  getOpusList, 
  getPromotionUsers // 新增API
} from '~/api'

// 响应式数据
const activeTab = ref('credits')
const userStore = useUserStore()
const userInfo = ref({})
const creditRecords = ref([])
const orders = ref([])
const videos = ref([])
const videoFilter = ref('all')
const invitedUsersList = ref([])
const invitedUsersLoading = ref(false)
const shareLink = ref('')


// 分页数据
const pagination = ref({
  credits: { page: 1, page_size: 10, total: 0 },
  orders: { page: 1, page_size: 10, total: 0 },
  videos: { page: 1, page_size: 6, total: 0 },
  invitedUsers: { page: 1, page_size: 10, total: 0 }
})

// 加载状态
const loading = ref({
  userInfo: false,
  credits: false,
  orders: false,
  videos: false,

})

// 导航项配置
const navigationItems = [
  {
    key: 'credits',
    label: 'My Credits',
    icon: 'CreditCardIcon'
  },
  {
    key: 'orders',
    label: 'My Orders',
    icon: 'ShoppingCartIcon'
  },
  {
    key: 'videos',
    label: 'My Videos',
    icon: 'VideoCameraIcon'
  },
  {
    key: 'invitedUsers',
    label: 'My Invited Users',
    icon: 'ShareIcon'
  }
]

// 图标组件
const CreditCardIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>`
}

const ShoppingCartIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>`
}

const VideoCameraIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>`
}

const ShareIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>`
}

// 方法
const loadUserInfo = async () => {
  loading.value.userInfo = true
  try {
    const response = await getCurrentUser()
    if (response.code === 200) {
      userInfo.value = response.data
    }
  } catch (error) {
    console.error('加载用户信息失败:', error)
  } finally {
    loading.value.userInfo = false
  }
}

const loadCreditRecords = async (page = 1) => {
  loading.value.credits = true
  try {
    pagination.value.credits.page = page
    const response = await getTimesLog({ page: page, page_size: pagination.value.credits.page_size })
    if (response.code === 200) {
      creditRecords.value = response.data.list || []
      pagination.value.credits.total = response.data.count || 0
    }
  } catch (error) {
    console.error('加载积分记录失败:', error)
  } finally {
    loading.value.credits = false
  }
}

const loadOrders = async (page = 1) => {
  loading.value.orders = true
  try {
    pagination.value.orders.page = page
    const response = await getPayLog({ page: page, page_size: pagination.value.orders.page_size })
    if (response.code === 200) {
      orders.value = response.data.list || []
      pagination.value.orders.total = response.data.count || 0
    }
  } catch (error) {
    console.error('加载订单失败:', error)
  } finally {
    loading.value.orders = false
  }
}

const loadVideos = async (page = 1) => {
  loading.value.videos = true
  try {
    pagination.value.videos.page = page
    let statusParam = 1
    if (videoFilter.value === 'completed') statusParam = 1
    else if (videoFilter.value === 'processing') statusParam = 0
    else if (videoFilter.value === 'failed') statusParam = -1
    const response = await getOpusList({ 
      page: page, 
      page_size: pagination.value.videos.page_size, 
      status: statusParam 
    })
    if (response.code === 200) {
      videos.value = response.data.list || []
      pagination.value.videos.total = response.data.count || 0
      console.log('视频加载结果:', {
        total: response.data.count,
        listLength: response.data.list?.length,
        page: page,
        page_size: pagination.value.videos.page_size,
        status: statusParam
      })
    }
  } catch (error) {
    console.error('加载视频失败:', error)
  } finally {
    loading.value.videos = false
  }
}



const loadInvitedUsers = async (page = 1) => {
  invitedUsersLoading.value = true
  try {
    pagination.value.invitedUsers.page = page
    const response = await getPromotionUsers({ page: page, page_size: pagination.value.invitedUsers.page_size })
    if (response.code === 200) {
      invitedUsersList.value = response.data.list || []
      pagination.value.invitedUsers.total = response.data.count || 0
    }
  } catch (error) {
    console.error('加载邀请用户失败:', error)
  } finally {
    invitedUsersLoading.value = false
  }
}

const loadShareLink = async () => {
  try {
    const response = await getCurrentUser()
    if (response.code === 200 && response.data.ivcode) {
      const currentDomain = window.location.origin
      shareLink.value = `${currentDomain}?ivcode=${response.data.ivcode}`
    }
  } catch (error) {
    console.error('加载分享链接失败:', error)
  }
}

const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value)
    console.log('Invitation link copied to clipboard')
  } catch (error) {
    console.error('复制失败:', error)
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getOrderStatusClass = (status) => {
  const statusClasses = {
    pending: 'bg-yellow-600 text-yellow-100',
    completed: 'bg-green-600 text-green-100',
    failed: 'bg-red-600 text-red-100',
    cancelled: 'bg-gray-600 text-gray-100'
  }
  return statusClasses[status] || 'bg-gray-600 text-gray-100'
}

const getOrderStatusText = (status) => {
  const statusTexts = {
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled'
  }
  return statusTexts[status] || 'Unknown'
}

const getVideoStatusClass = (status) => {
  const statusClasses = {
    '1': 'bg-green-600 text-green-100',
    '0': 'bg-yellow-600 text-yellow-100',
    '-1': 'bg-red-600 text-red-100'
  }
  return statusClasses[String(status)] || 'bg-gray-600 text-gray-100'
}

const getVideoStatusText = (status) => {
  const statusTexts = {
    '1': 'Completed',
    '0': 'Processing',
    '-1': 'Failed'
  }
  return statusTexts[String(status)] || 'Unknown'
}

const getChangeTypeText = (changeType) => {
  const changeTypeTexts = {
    create_task: 'Create Task',
    buy_package: 'Buy Package',
    refund: 'Refund',
    admin_adjust: 'Admin Adjustment',
    promotion: 'Promotion Reward'
  }
  return changeTypeTexts[changeType] || changeType
}

const downloadVideo = (video) => {
  if (video.generate_image) {
    const link = document.createElement('a')
    link.href = video.generate_image
    link.download = `video_${video.task_id}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const copyPrompt = async (prompt) => {
  try {
    await navigator.clipboard.writeText(prompt || '')
    // 可以添加一个简单的提示，比如使用 toast 组件
    console.log('Prompt copied to clipboard')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const shareVideo = (video) => {
  // 实现分享功能
  console.log('Share video:', video)
}



const payOrder = (order) => {
  // 实现支付功能
  console.log('Pay order:', order)
}

// 监听标签页切换
watch(activeTab, (newTab) => {
  switch (newTab) {
    case 'credits':
      loadCreditRecords(1)
      break
    case 'orders':
      loadOrders(1)
      break
    case 'videos':
      loadVideos(1)
      break
    case 'invitedUsers':
      loadInvitedUsers(1)
      loadShareLink()
      break
  }
})

// SEO配置
useSeo({
  title: 'User Center - Hailuo2 AI Video Generator',
  description: 'Manage your account information, credits, orders, videos and sharing records. Hailuo2 provides professional AI video generation services.',
  ogTitle: 'User Center - Hailuo2 AI Video Generator',
  ogDescription: 'Manage your account information, credits, orders, videos and sharing records.',
  ogType: 'website'
})

// 页面加载时初始化
onMounted(async () => {
  await loadUserInfo()
  await loadCreditRecords(1)
  // 如果当前是邀请用户页面，也加载分享链接
  if (activeTab.value === 'invitedUsers') {
    await loadShareLink()
  }
})
</script>

<style scoped>
/* 可以添加自定义样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 