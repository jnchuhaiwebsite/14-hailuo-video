<template>
  <!-- 这个组件不渲染任何内容，只负责延迟加载分析脚本 -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// 扩展 Window 接口
declare global {
  interface Window {
    dataLayer: any[]
  }
}

onMounted(() => {
  // 延迟加载 CNZZ 统计
  // const loadCNZZ = () => {
  //   const script = document.createElement('script')
  //   script.src = 'https://c.cnzz.com/core.php?web_id=1280000000&t=z'
  //   script.async = true
  //   document.head.appendChild(script)
  // }

  // 延迟加载 Google Analytics
  const loadGoogleAnalytics = () => {
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TE7JHEHZ6J'
    script.async = true
    document.head.appendChild(script)
    
    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'G-TE7JHEHZ6J')
    }
  }

  // 延迟加载 Google Ads
  const loadGoogleAds = () => {
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17364631960'
    script.async = true
    document.head.appendChild(script)
    
    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'AW-17364631960')
    }
  }

  // 使用 Intersection Observer 延迟加载
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 当页面可见时加载分析脚本
        // loadCNZZ()
        loadGoogleAnalytics()
        loadGoogleAds()
        observer.disconnect()
      }
    })
  })

  // 观察页面主体
  const mainElement = document.querySelector('main') || document.body
  observer.observe(mainElement)
})
</script> 