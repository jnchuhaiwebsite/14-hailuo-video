<template>
  <!-- 分享链接区域 -->
  <div class="mb-6">
    <h2 class="text-xl font-bold text-white mb-4">My Invitation Link</h2>
    <div class="bg-gray-700 rounded-lg p-4">
      <div class="flex items-center gap-3">
        <div class="flex-1 bg-gray-600 rounded-lg p-3">
          <p class="text-gray-300 text-sm mb-1">Invitation Link</p>
          <p class="text-white font-mono text-sm break-all">{{ shareLink }}</p>
        </div>
        <button 
          @click="copyShareLink" 
          class="px-4 py-3 bg-[#7C3AED] hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Copy Link
        </button>
      </div>
    </div>
  </div>

  <!-- 邀请用户列表 -->
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-bold text-white">My Invited Users</h2>
    <button @click="loadInvitedUsers(1)" class="px-4 py-2 bg-[#7C3AED] hover:bg-blue-700 rounded-lg text-white transition-colors">
      Refresh
    </button>
  </div>
  
  <div class="bg-gray-700 rounded-lg p-4">
    <div v-if="loading" class="text-center py-8">
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
    <div v-if="pagination.total > pagination.page_size" class="mt-6 flex justify-center">
      <div class="flex items-center gap-2">
        <button 
          @click="loadInvitedUsers(pagination.page - 1)" 
          :disabled="pagination.page <= 1"
          class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
        >
          Previous
        </button>
        <span class="text-gray-300 px-3 py-2">
          {{ pagination.page }} / {{ Math.ceil(pagination.total / pagination.page_size) }}
        </span>
        <button 
          @click="loadInvitedUsers(pagination.page + 1)" 
          :disabled="pagination.page >= Math.ceil(pagination.total / pagination.page_size)"
          class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentUser, getPromotionUsers } from '~/api'
import { useHead } from "nuxt/app";
useHead({
  title: 'My Invited Users - Hailuo02 Video',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
// 响应式数据
const invitedUsersList = ref([])
const loading = ref(false)
const shareLink = ref('')
const pagination = ref({ page: 1, page_size: 10, total: 0 })

// 方法
const loadInvitedUsers = async (page = 1) => {
  loading.value = true
  try {
    pagination.value.page = page
    const response = await getPromotionUsers({ page: page, page_size: pagination.value.page_size })
    if (response.code === 200) {
      invitedUsersList.value = response.data.list || []
      pagination.value.total = response.data.count || 0
    }
  } catch (error) {
    console.error('Failed to load invited users:', error)
  } finally {
    loading.value = false
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
    console.error('Failed to load share link:', error)
  }
}

const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value)
    console.log('Invitation link copied to clipboard')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 页面加载时初始化
onMounted(async () => {
  await loadShareLink()
  await loadInvitedUsers(1)
})
</script>

<style scoped>
/* 可以添加自定义样式 */
</style> 