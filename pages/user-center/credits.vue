<template>
  <!-- 积分概览 -->
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-bold text-white">My Credits</h2>
    <div class="text-right">
      <p class="text-gray-300 text-sm">Current Credits</p>
      <p class="text-2xl font-bold text-green-400">{{ userInfo.free_limit + userInfo.remaining_limit }}</p>
    </div>
  </div>
  
  <!-- 积分记录 -->
  <div class="bg-gray-700 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-white mb-4">Credit Records</h3>
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      <p class="text-gray-400 mt-2">Loading...</p>
    </div>
    <div v-else-if="creditRecords.length > 0" class="space-y-3">
      <div v-for="record in creditRecords" :key="record.id" class="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
        <div>
          <p class="text-white font-medium">{{ getChangeTypeText(record.change_type) }}</p>
          <p class="text-gray-300 text-sm">{{ formatDate(record.created_at) }}</p>
          <p v-if="record.task_id" class="text-gray-400 text-xs">Task ID: {{ record.task_id }}</p>
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
    <div v-if="pagination.total > pagination.page_size" class="mt-6 flex justify-center">
      <div class="flex items-center gap-2">
        <button 
          @click="loadCreditRecords(pagination.page - 1)" 
          :disabled="pagination.page <= 1"
          class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
        >
          Previous
        </button>
        <span class="text-gray-300 px-3 py-2">
          {{ pagination.page }} / {{ Math.ceil(pagination.total / pagination.page_size) }}
        </span>
        <button 
          @click="loadCreditRecords(pagination.page + 1)" 
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
import { getCurrentUser, getTimesLog } from '~/api'

// 响应式数据
const userInfo = ref({})
const creditRecords = ref([])
const loading = ref(false)
const pagination = ref({ page: 1, page_size: 10, total: 0 })

// 方法
const loadUserInfo = async () => {
  try {
    const response = await getCurrentUser()
    if (response.code === 200) {
      userInfo.value = response.data
    }
  } catch (error) {
    console.error('Failed to load user info:', error)
  }
}

const loadCreditRecords = async (page = 1) => {
  loading.value = true
  try {
    pagination.value.page = page
    const response = await getTimesLog({ page: page, page_size: pagination.value.page_size })
    if (response.code === 200) {
      creditRecords.value = response.data.list || []
      pagination.value.total = response.data.count || 0
    }
  } catch (error) {
    console.error('Failed to load credit records:', error)
  } finally {
    loading.value = false
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

// 页面加载时初始化
onMounted(async () => {
  await loadUserInfo()
  await loadCreditRecords(1)
})
</script> 