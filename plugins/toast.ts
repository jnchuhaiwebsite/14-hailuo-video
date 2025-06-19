import { createApp } from 'vue'
import Toast from '../components/Toast.vue'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== 'undefined') {
    // 创建 Toast 容器
    const toastContainer = document.createElement('div')
    toastContainer.id = 'toast-container'
    document.body.appendChild(toastContainer)

    // 创建 Toast 实例
    const toastApp = createApp(Toast)
    const toastInstance = toastApp.mount(toastContainer) as any

    // 将 Toast 方法添加到全局属性
    nuxtApp.provide('toast', {
      // 显示
      show: (
        message: string, 
        type: 'success' | 'error' | 'warning' | 'info' = 'info', 
        duration: number = 2000,
        position: 'left' | 'center' | 'right' = 'center'
      ) => {
        toastInstance.show(message, type, duration, position)
      },
      // 成功
      success: (message: string, duration: number = 2000, position: 'left' | 'center' | 'right' = 'center') => {
        toastInstance.show(message, 'success', duration, position)
      },
      // 错误
      error: (message: string, duration: number = 2000, position: 'left' | 'center' | 'right' = 'center') => {
        toastInstance.show(message, 'error', duration, position)
      },
      // 警告
      warning: (message: string, duration: number = 2000, position: 'left' | 'center' | 'right' = 'center') => {
        toastInstance.show(message, 'warning', duration, position)
      },
      // 信息
      info: (message: string, duration: number = 2000, position: 'left' | 'center' | 'right' = 'center') => {
        toastInstance.show(message, 'info', duration, position)
      }
    })
  }
}) 