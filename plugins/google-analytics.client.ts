import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  // 确保只在客户端环境中运行
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  // 判断页面路径，只有首页和支付页面需要添加Google Analytics和Ads跟踪代码
  const pathname = window.location.pathname
  if (pathname !== '/' && pathname !== '/payment') {
    return
  }
  
  // 创建脚本容器div
  const gaContainer = document.createElement('div')
  gaContainer.id = 'google-analytics-scripts'
  gaContainer.style.display = 'none'
  
  // 创建并添加 Google Analytics 和 Ads 跟踪代码
  const gtagScript = document.createElement('script')
  gtagScript.async = true
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17211053842'
  gaContainer.appendChild(gtagScript)

  // 创建并添加配置脚本
  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'AW-17211053842');
    
  `
  gaContainer.appendChild(script2)
  
  // 添加脚本到head标签
  const addGaScripts = () => {
    const head = document.getElementsByTagName('head')[0]
    if (head) {
      head.appendChild(gaContainer)
    }
  }
  
  // 如果DOM已经加载完成，立即添加
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    addGaScripts()
  } else {
    // 否则等待DOM加载完成
    document.addEventListener('DOMContentLoaded', addGaScripts)
  }

  // 提供一个全局函数用于发送转化事件
  return {
    provide: {
      trackConversion: (params: any = {}) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17211053842/CONVERSION_LABEL',
            ...params
          })
        }
      }
    }
  }
}) 