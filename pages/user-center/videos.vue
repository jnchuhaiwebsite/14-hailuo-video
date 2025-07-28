<template>
  <!-- 视频列表 -->
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-xl font-bold text-white">My Videos</h2>
    <div class="flex gap-2">
      <select v-model="videoFilter" @change="loadVideos(1)" class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="processing">Processing</option>
        <option value="failed">Failed</option>
      </select>
      <button @click="loadVideos(1)" class="px-4 py-2 bg-[#7C3AED] hover:bg-blue-700 rounded-lg text-white transition-colors">
        Refresh
      </button>
    </div>
  </div>
  
  <div class="bg-gray-700 rounded-lg p-4">
    <div v-if="loading" class="text-center py-8">
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
            <button 
              @click="downloadVideo(video)" 
              v-if="video.generate_image" 
              class="w-full px-3 py-2 bg-[#7C3AED] hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-white text-sm transition-colors flex items-center justify-center gap-2"
              :disabled="downloadingVideo === video.task_id"
            >
              <svg v-if="downloadingVideo === video.task_id" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              {{ downloadingVideo === video.task_id ? 'Downloading...' : 'Download' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-400">
      <p>No video records</p>
    </div>
    
    <!-- 分页组件 -->
    <div v-if="pagination.total > pagination.page_size" class="mt-6 flex justify-center">
      <div class="flex items-center gap-2">
        <button 
          @click="loadVideos(pagination.page - 1)" 
          :disabled="pagination.page <= 1"
          class="px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 rounded text-white transition-colors"
        >
          Previous
        </button>
        <span class="text-gray-300 px-3 py-2">
          {{ pagination.page }} / {{ Math.ceil(pagination.total / pagination.page_size) }}
        </span>
        <button 
          @click="loadVideos(pagination.page + 1)" 
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
import { getOpusList } from '~/api'
import { useNuxtApp } from 'nuxt/app'

const { $toast } = useNuxtApp() as any

// 响应式数据
const videos = ref([])
const videoFilter = ref('all')
const loading = ref(false)
const downloadingVideo = ref(null)
const pagination = ref({ page: 1, page_size: 6, total: 0 })

// 方法
const loadVideos = async (page = 1) => {
  loading.value = true
  try {
    pagination.value.page = page
    let statusParam = 1
    if (videoFilter.value === 'completed') statusParam = 1
    else if (videoFilter.value === 'processing') statusParam = 0
    else if (videoFilter.value === 'failed') statusParam = -1
    const response = await getOpusList({ 
      page: page, 
      page_size: pagination.value.page_size, 
      status: statusParam 
    })
    if (response.code === 200) {
      videos.value = response.data.list || []
      pagination.value.total = response.data.count || 0
      console.log('Video loading result:', {
        total: response.data.count,
        listLength: response.data.list?.length,
        page: page,
        page_size: pagination.value.page_size,
        status: statusParam
      })
    }
  } catch (error) {
    console.error('Failed to load videos:', error)
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

const getVideoStatusText = (status) => {
  const statusTexts = {
    '1': 'Completed',
    '0': 'Processing',
    '-1': 'Failed'
  }
  return statusTexts[String(status)] || 'Unknown'
}

const downloadVideo = async (video) => {
  if (!video.generate_image) {
    console.error('No video URL available')
    $toast.error('视频链接不可用')
    return
  }

  try {
    // 设置下载状态
    downloadingVideo.value = video.task_id

    // 获取视频文件
    const response = await fetch(video.generate_image)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 获取视频数据
    const blob = await response.blob()
    
    // 创建下载链接
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // 设置文件名（使用任务ID和当前时间戳）
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const fileName = `hailuo_video_${video.task_id}_${timestamp}.mp4`
    link.download = fileName
    
    // 触发下载
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 清理URL对象
    window.URL.revokeObjectURL(url)
    
    console.log(`视频已下载: ${fileName}`)
    $toast.success('视频下载成功！')
    
  } catch (error) {
    console.error('下载视频失败:', error)
    $toast.error('下载失败，请稍后重试')
  } finally {
    // 清除下载状态
    downloadingVideo.value = null
  }
}

const copyPrompt = async (prompt) => {
  try {
    await navigator.clipboard.writeText(prompt || '')
    console.log('Prompt copied to clipboard')
    $toast.success('提示词已复制到剪贴板')
  } catch (error) {
    console.error('Copy failed:', error)
    $toast.error('复制失败，请手动复制')
  }
}

// 页面加载时初始化
onMounted(async () => {
  await loadVideos(1)
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