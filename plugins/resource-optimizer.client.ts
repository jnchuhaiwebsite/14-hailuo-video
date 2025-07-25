import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  // 只在客户端运行
  if (process.client) {
    // 优化字体加载
    const optimizeFontLoading = () => {
      // 预加载关键字体
      const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]')
      fontLinks.forEach(link => {
        const href = link.getAttribute('href')
        if (href) {
          const font = new FontFace('Custom Font', `url(${href})`)
          font.load().then(() => {
            // 使用类型断言
            (document.fonts as any).add(font)
          }).catch(console.error)
        }
      })
    }

    // 优化图片加载
    const optimizeImageLoading = () => {
      // 使用 Intersection Observer 延迟加载图片
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              imageObserver.unobserve(img)
            }
          }
        })
      })

      // 观察所有延迟加载的图片
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }

    // 优化视频加载
    const optimizeVideoLoading = () => {
      // 使用 Intersection Observer 延迟加载视频
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement
            if (video.dataset.src) {
              video.src = video.dataset.src
              video.removeAttribute('data-src')
              videoObserver.unobserve(video)
            }
          }
        })
      })

      // 观察所有延迟加载的视频
      document.querySelectorAll('video[data-src]').forEach(video => {
        videoObserver.observe(video)
      })
    }

    // 优化 CSS 加载
    const optimizeCSSLoading = () => {
      // 内联关键 CSS
      const criticalCSS = `
        /* 关键样式 */
        .hero-title { line-height: 1.2; }
        .hero-text { line-height: 1.2; }
        .bg-blue-pale { background-color: #1e293b; }
      `
      
      const style = document.createElement('style')
      style.textContent = criticalCSS
      document.head.appendChild(style)
    }

    // 优化资源优先级
    const optimizeResourcePriority = () => {
      // 设置关键资源的优先级
      const criticalResources = document.querySelectorAll('link[rel="preload"]')
      criticalResources.forEach(link => {
        if (link.getAttribute('as') === 'video' || link.getAttribute('as') === 'image') {
          link.setAttribute('fetchpriority', 'high')
        }
      })
    }

    // 在 DOM 加载完成后执行优化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        optimizeFontLoading()
        optimizeImageLoading()
        optimizeVideoLoading()
        optimizeCSSLoading()
        optimizeResourcePriority()
      })
    } else {
      optimizeFontLoading()
      optimizeImageLoading()
      optimizeVideoLoading()
      optimizeCSSLoading()
      optimizeResourcePriority()
    }
  }
}) 