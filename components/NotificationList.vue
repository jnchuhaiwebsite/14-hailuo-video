<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.taskId"
        class="bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg p-4 min-w-[300px] max-w-[400px] border border-gray-700/50"
        :class="{
          'border-green-500/50': notification.status === 'success',
          'border-red-500/50': notification.status === 'error'
        }"
        @mouseenter="pauseAutoHide(notification.taskId)"
        @mouseleave="resumeAutoHide(notification.taskId)"
      >
        <div class="flex items-start gap-3">
          <!-- 状态图标 -->
          <div
            class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            :class="{
              'bg-green-500/20 text-green-400': notification.status === 'success',
              'bg-red-500/20 text-red-400': notification.status === 'error'
            }"
          >
            <CheckCircleIcon v-if="notification.status === 'success'" class="w-5 h-5" />
            <XCircleIcon v-else class="w-5 h-5" />
          </div>
          
          <!-- 通知内容 -->
          <div class="flex-1 min-w-0">
            <p class="text-white font-medium">{{ notification.message }}</p>
            <p v-if="notification.prompt" class="text-gray-400 text-sm mt-1 truncate" :title="notification.prompt">
              Prompt: {{ notification.prompt }}
            </p>
            <div class="mt-2 flex gap-2">
              <div v-if="notification.origin" class="flex-1">
                <p class="text-gray-400 text-sm mb-1">原图:</p>
                <img 
                  :src="notification.origin" 
                  class="w-full h-24 object-cover rounded-lg"
                  alt="Original image"
                />
              </div>
            </div>
          </div>
          
          <!-- 关闭按钮 -->
          <button
            @click="removeNotification(notification.taskId)"
            class="flex-shrink-0 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
        
        <!-- 操作按钮 -->
        <div v-if="notification.videoUrl" class="mt-3 flex justify-end gap-2">
          <button
            @click="viewVideo(notification.videoUrl)"
            class="px-3 py-1.5 text-sm bg-[#00ffd1]/10 text-[#00ffd1] rounded-lg hover:bg-[#00ffd1]/20 transition-colors"
          >
          View video
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useNotificationStore } from '~/stores/notification'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)

// 移除通知
const removeNotification = (taskId: string) => {
  notificationStore.removeNotification(taskId)
}

// 暂停自动隐藏
const pauseAutoHide = (taskId: string) => {
  notificationStore.pauseAutoHide(taskId)
}

// 恢复自动隐藏
const resumeAutoHide = (taskId: string) => {
  notificationStore.resumeAutoHide(taskId)
}

// 查看视频
const viewVideo = (videoUrl: string) => {
  // 跳转到个人作品页面
  router.push('/profile')
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 