<script setup lang="ts">
import { onMounted } from 'vue'
import { statistics } from '~/api'

// 生成唯一标识符的函数
const generateUniqueId = (): string => {
  // 使用时间戳 + 随机数 + 用户代理信息来确保唯一性
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const userAgent = navigator.userAgent.substring(0, 50) // 取前50个字符
  const screenInfo = `${screen.width}x${screen.height}`
  
  // 组合所有信息并生成哈希
  const combined = `${timestamp}-${random}-${userAgent}-${screenInfo}`
  return btoa(combined).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32)
}

// 设置 Cookie 的函数
const setCookie = (name: string, value: string, days: number = 365 * 10) => {
  if (typeof document === 'undefined') return // 服务端渲染时跳过
  
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
}

// 获取 Cookie 的函数
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null // 服务端渲染时跳过
  
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// 初始化唯一标识符并发送统计信息
const initializeUniqueId = async () => {
  try {
    // 检查是否已经有唯一标识符
    let uniqueId = getCookie('user_unique_id')
    
    // 如果没有，生成一个新的
    if (!uniqueId) {
      uniqueId = generateUniqueId()
      setCookie('user_unique_id', uniqueId)
      console.log('生成新的唯一标识符:', uniqueId)
    } else {
      console.log('使用现有的唯一标识符:', uniqueId)
    }
    
    // 调用统计 API
    try {
      const response = await statistics({ userCode: uniqueId })
      console.log('统计信息发送成功:', response)
    } catch (error) {
      console.error('发送统计信息失败:', error)
    }
  } catch (error) {
    console.error('初始化唯一标识符失败:', error)
  }
}

onMounted(() => {
  // 检查页面是否已经完全加载
  if (document.readyState === 'complete') {
    // 页面已经完全加载，立即执行
    initializeUniqueId()
  } else {
    // 页面还未完全加载，等待 window.onload 事件
    window.addEventListener('load', () => {
      console.log('页面完全加载完成，开始初始化统计功能')
      initializeUniqueId()
    })
  }
})
</script>

<template>
  <!-- 这是一个无渲染组件，不需要任何模板内容 -->
</template> 