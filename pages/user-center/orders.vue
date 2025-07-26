<template>
  <!-- 订单列表 -->
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-bold text-white">My Orders</h2>
    <button @click="loadOrders(1)" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
      Refresh
    </button>
  </div>
  
  <div class="bg-gray-700 rounded-lg p-4">
    <div v-if="loading" class="text-center py-8">
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
    <div v-if="pagination.total > pagination.page_size" class="mt-6 flex justify-center">
      <div class="flex items-center gap-2">
        <button 
          @click="loadOrders(pagination.page - 1)" 
          :disabled="pagination.page <= 1"
          class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
        >
          Previous
        </button>
        <span class="text-gray-300 px-3 py-2">
          {{ pagination.page }} / {{ Math.ceil(pagination.total / pagination.page_size) }}
        </span>
        <button 
          @click="loadOrders(pagination.page + 1)" 
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
import { getPayLog } from '~/api'

// 响应式数据
const orders = ref([])
const loading = ref(false)
const pagination = ref({ page: 1, page_size: 10, total: 0 })

// 方法
const loadOrders = async (page = 1) => {
  loading.value = true
  try {
    pagination.value.page = page
    const response = await getPayLog({ page: page, page_size: pagination.value.page_size })
    if (response.code === 200) {
      orders.value = response.data.list || []
      pagination.value.total = response.data.count || 0
    }
  } catch (error) {
    console.error('Failed to load orders:', error)
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

const payOrder = (order) => {
  // 实现支付功能
  console.log('Pay order:', order)
}

// 页面加载时初始化
onMounted(async () => {
  await loadOrders(1)
})
</script>

<style scoped>
/* 可以添加自定义样式 */
</style> 