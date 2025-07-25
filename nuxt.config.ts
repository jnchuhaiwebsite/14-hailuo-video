// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr: true, // 启用服务端渲染
  compatibilityDate: '2025-05-28', // 兼容性日期
  devtools: { enabled: true }, // 启用 Nuxt DevTools
  css: [
    '~/assets/css/tailwind.css', // Tailwind CSS 样式
    '@/assets/css/main.css', // 主样式文件
  ],
  plugins: [
    // '~/plugins/google-analytics.client.ts', // Google Analytics 插件（仅客户端）
  ],
  runtimeConfig: {
    public: {
      appid: process.env.APPID, // 应用 ID
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL, // 基础URL
    },
  },
  modules: [
    '@clerk/nuxt', // Clerk 集成
    '@pinia/nuxt', // Pinia 状态管理
    '@nuxtjs/tailwindcss', // Tailwind CSS 集成
    '@nuxt/image', // Nuxt Image 模块
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en' // 设置 HTML 语言
      },
      link: [
        // 预加载常规字重的 WOFF2 文件
        {
          rel: 'preload',
          href: '/fonts/265822651.woff2', // 使用从 public 根目录开始的绝对路径
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous' // 加上 anonymous 属性是个好习惯
        },
        // (可选) 如果粗体在首屏也很重要，也可以预加载它
        {
          rel: 'preload',
          href: '/fonts/265822652.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {  
          name: 'description', 
          content: 'hailuo2 is a cutting-edge video generation model that excels in multi-camera storytelling. Create stunning 1080P HD videos with smooth motion, rich details, and cinematic aesthetics.' 
        },
        { property: 'og:title', content: 'hailuo2 - Advanced Multi-Camera Video Generation' },
        { property: 'og:description', content: 'Create professional-quality videos with hailuo2. Our AI model supports multi-camera storytelling, smooth motion, and cinematic aesthetics.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'hailuo2' },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'hailuo2 - Advanced Multi-Camera Video Generation' },
        { name: 'twitter:description', content: 'Create professional-quality videos with hailuo2. Our AI model supports multi-camera storytelling, smooth motion, and cinematic aesthetics.' },
        { name: 'twitter:image', content: '/og-image.jpg' },
        { name: 'author', content: 'hailuo2 Team' },
        { name: 'application-name', content: 'hailuo2' },
      ],
      script: [
        { src: '/js/c6h.js', async: true }, 
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-TE7JHEHZ6J',
          async: true
        },
        // Google Analytics 配置代码 - 后执行
        {
          innerHTML: `
            // 检查当前页面路径
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TE7JHEHZ6J');
          `,
          type: 'text/javascript'
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=AW-17364631960',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17364631960');
          `,
          type: 'text/javascript'
        }
      ] // 外部脚本
    }
  },
  nitro: {
    preset: 'cloudflare_pages',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    //   wrangler:{
    //     vars:{
    //         "NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY":"pk_test_d29uZHJvdXMtbmFyd2hhbC0xMy5jbGVyay5hY2NvdW50cy5kZXYk",
    //         "NUXT_CLERK_SECRET_KEY":"sk_test_PXJ8xb1DxxFXl6Wk0Vs0fQkC8YLn7VICjuYplOxT7q"
    //     }
    //   }
    },
    devProxy: {
      '/nuxtRequest': {
        target: process.env.NUXT_PUBLIC_API_BASE, // 从环境变量获取代理目标
        changeOrigin: true, // 允许跨域
        prependPath: false // 不添加代理路径前缀
      }
    },
    // 预渲染
    prerender: {
      // 预渲染路由
      routes: [
        '/blog',
        '/pricing',
        '/subsidiary/privacy-policy',
        '/subsidiary/terms-of-service'
      ], // 手动指定所有文章路径
      crawlLinks: false, // 保持链接爬取
      autoSubfolderIndex: false,
      failOnError: false, // 预渲染失败时不中断构建
      ignore: [
        '/api/**', // 忽略 API 路由
        '/admin/**' // 忽略管理后台路由
      ]
    },
  },
  // Nuxt3正确的Tailwind配置
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false,
  },
  // 使用vite的正确配置方式
  vite: {
    build: {
      cssCodeSplit: false,
      // 强制提取CSS到单独文件
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return '_nuxt/css/[hash][extname]';
            }
            return '_nuxt/assets/[hash][extname]';
          }
        }
      }
    },
    // 确保CSS的sourcemap
    css: {
      devSourcemap: true
    }
  },
  build: {
    analyze: false, // 启用打包分析
    // 代码压缩配置
    terser: {
      compress: {
        drop_console: true, // 移除 console 语句
        drop_debugger: true, // 移除 debugger 语句
        pure_funcs: ['console.log', 'console.info'], // 移除特定的函数调用
        passes: 3, // 增加压缩次数
        dead_code: true, // 移除未使用的代码
        global_defs: {
          'process.env.NODE_ENV': 'production' // 定义全局变量
        }
      },
      mangle: true, // 混淆变量名
      output: {
        comments: false // 移除注释
      }
    }
  },
  // 强制CSS提取的配置
  experimental: {
    // 强制禁用内联样式，将样式提取到外部文件
    inlineSSRStyles: false,
    // 启用vite特性兼容
    // viteNode: true
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
})