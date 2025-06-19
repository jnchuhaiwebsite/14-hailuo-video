import { defineStore } from 'pinia'
import { checkTask } from '~/api'

interface Notification {
  taskId: string
  status: 'success' | 'error'
  message: string
  videoUrl?: string
  prompt?: string
  origin?: string
  autoHideTimer?: number
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[],
    checkingTasks: new Set<string>(),
    checkIntervals: new Map<string, number>()
  }),
  
  actions: {
    startCheckingTask(taskId: string) {
      if (this.checkingTasks.has(taskId)) return
      
      this.checkingTasks.add(taskId)
      
      // 开始轮询检查任务状态
      const interval = window.setInterval(async () => {
        try {
          const response = await checkTask(taskId) as any
          if (response.code === 200) {
            if (response.data.status == '1' && response.data.video_url) {
              // 任务完成
              this.addNotification({
                taskId,
                status: 'success',
                message: 'Video generation completed!',
                videoUrl: response.data.video_url,
                prompt: response.data.prompt,
                origin: response.data.origin
              })
              this.stopCheckingTask(taskId)
              return
            } else if (response.data.status === '2') {
              // 任务失败
              this.addNotification({
                taskId,
                status: 'error',
                message: response.data.message || 'Video generation failed'
              })
              this.stopCheckingTask(taskId)

              return
            }
          }
        } catch (error) {
          console.error('Check task status error:', error)
          this.stopCheckingTask(taskId)
          return
        }
      }, 2000) // 每2秒检查一次
      
      this.checkIntervals.set(taskId, interval)
    },
    
    stopCheckingTask(taskId: string) {
      const interval = this.checkIntervals.get(taskId)
      if (interval) {
        clearInterval(interval)
        this.checkIntervals.delete(taskId)
      }
      this.checkingTasks.delete(taskId)
      // 清除请求缓存
      localStorage.removeItem('seedanceFormCache')
    },
    
    addNotification(notification: Notification) {
      this.notifications.push(notification)
      // 5秒后自动移除通知
      notification.autoHideTimer = window.setTimeout(() => {
        this.removeNotification(notification.taskId)
      }, 5000)
    },
    
    removeNotification(taskId: string) {
      const notification = this.notifications.find(n => n.taskId === taskId)
      if (notification) {
        if (notification.autoHideTimer) {
          clearTimeout(notification.autoHideTimer)
        }
        this.notifications = this.notifications.filter(n => n.taskId !== taskId)
      }
    },

    // 暂停自动隐藏
    pauseAutoHide(taskId: string) {
      const notification = this.notifications.find(n => n.taskId === taskId)
      if (notification && notification.autoHideTimer) {
        clearTimeout(notification.autoHideTimer)
        notification.autoHideTimer = undefined
      }
    },

    // 恢复自动隐藏
    resumeAutoHide(taskId: string) {
      const notification = this.notifications.find(n => n.taskId === taskId)
      if (notification && !notification.autoHideTimer) {
        notification.autoHideTimer = window.setTimeout(() => {
          this.removeNotification(taskId)
        }, 5000)
      }
    },
    
    clearNotifications() {
      this.notifications.forEach(notification => {
        if (notification.autoHideTimer) {
          clearTimeout(notification.autoHideTimer)
        }
      })
      this.notifications = []
    }
  }
}) 