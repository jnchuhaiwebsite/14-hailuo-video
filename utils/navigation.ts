import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// 路由项接口定义
export interface RouteItem {
  id?: string
  name: string
  icon?: string
  href?: string
  children?: RouteItem[]
  openInNewTab?: boolean  // 是否在新标签页打开
  showBeta?: boolean      // 是否显示beta标签
  badge?: {
    text: string;         // 角标文本
    type: 'hot' | 'new';  // 角标类型：hot 或 new
  }
}

// 导航全局配置
export const navConfig = {
  subNavStyle: {
    noWrap: true,  // 子导航不换行
  },
  defaults: {
    openInNewTab: false,  // 默认不在新标签页打开
    showBeta: false       // 默认不显示beta标签
  }
}

// 主路由配置
export const mainRoutes: RouteItem[] = [
  { id: "hero", name: "Home", icon: "home" },

  { id: "AIVideo", name: "AI Video", icon: "AI Video",
    children: [
      { 
        name: "Hailuo 02🔥 ", 
        href: "/hailuo-ai-video-generator",
       
      },
      { 
        name: "Seedance 1.0 Pro🔥", 
        href: "/seedance-1-0-pro",
 
      },
    ]
  },
  { id: "APP", name: "APP", icon: "APP", href: "/hailuo-app" },

  // { id: "how-it-works", name: "How It Works", icon: "steps" },
  // { id: "features-showcase", name: "Features", icon: "star" },
  // 评价
  // { id: "reviews", name: "Reviews", icon: "star" },
  { id: "pricing", name: "Pricing", icon: "tag", href: "/pricing" },
  { id: "portfolio", name: "Explore Inspiration", href: "/portfolio", icon: "image" },
  { id: "invitation-code", name: "Invitation Code", href: "/invitation-code", icon: "gift" },
  // { id: "faq", name: "FAQ", icon: "help" },
  // { id: "blog", name: "Blog", href: "/blog", icon: "book" }
]


export const footerMainRoutes: RouteItem[] = [
  // { id: "hero", name: "Home", icon: "home" },
  // { id: "AIVideo", name: "AI Video", icon: "AI Video", href: "/hailuo-ai-video-generator" },
  // { id: "pricing", name: "Pricing", icon: "tag", href: "/pricing" },
  // { id: "portfolio", name: "Explore Inspiration", href: "/portfolio", icon: "image" },
  { id: "faq", name: "FAQ", icon: "help", href: "/faq" },
  { id: "blog", name: "Blog", href: "/blog", icon: "book" }
]

export const productsRoutes: RouteItem[] = [
  { id: "Android App", name: "Android App", href: "https://play.google.com/store/apps/details?id=com.cykj.hilo" },
  { id: "iOS App", name: "iOS App", href: "https://apps.apple.com/gb/app/hailuovideo-ai-generator/id6747421701" },
]

export const useNavigation = () => {
  const router = useRouter()
  const activeSection = ref('hero')
  const sections = mainRoutes
  const footerSections = footerMainRoutes
  const productsSections = productsRoutes
  
  // 检查是否应该在新标签页打开
  const shouldOpenInNewTab = (route: RouteItem) => {
    return route.openInNewTab ?? navConfig.defaults.openInNewTab
  }
  
  // 检查是否应该显示beta标签
  const shouldShowBeta = (route: RouteItem) => {
    return route.showBeta ?? navConfig.defaults.showBeta
  }

  // 检查是否显示角标及角标信息
  const getBadgeInfo = (route: RouteItem) => {
    return route.badge
  }
  
  // 获取子导航样式
  const getSubNavStyle = () => navConfig.subNavStyle

  // 执行滚动到指定section
  const executeScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // 导航栏高度
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // 更新活动section
      activeSection.value = sectionId
    }
  }

  // 处理页面跳转和滚动
  const handlePageNavigation = (sectionId: string) => {
    // 保存目标锚点到sessionStorage
    sessionStorage.setItem('targetSection', sectionId)

    // 使用 router.push 进行导航
    router.push('/').then(() => {
      // 等待页面完全加载
      nextTick(() => {
        // 添加重试机制
        let retryCount = 0;
        const maxRetries = 8;
        const retryInterval = 150; // 150ms

        const tryScroll = () => {
          const element = document.getElementById(sectionId);
          if (element) {
            executeScroll(sectionId);
            sessionStorage.removeItem('targetSection');
          } else if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(tryScroll, retryInterval);
          } else {
            console.warn(`无法找到目标元素: ${sectionId}`);
            sessionStorage.removeItem('targetSection');
          }
        };

        tryScroll();
      });
    });
  }

  // 处理导航点击
  const handleNavClick = (sectionId?: string) => {
    if (!sectionId) return
    
    // 如果当前不在首页，先跳转到首页
    if (window.location.pathname !== '/') {
      handlePageNavigation(sectionId)
      return
    }
    
    // 如果已经在首页，执行滚动
    executeScroll(sectionId)
    // 清空锚点信息
    sessionStorage.removeItem('targetSection')
  }

  // 处理滚动监听
  const handleScroll = () => {
    // 只在首页执行滚动监听
    if (window.location.pathname !== '/') return
    
    for (const section of sections) {
      if (!section.id) continue
      const element = document.getElementById(section.id)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          activeSection.value = section.id
          break
        }
      }
    }
  }

  return {
    activeSection,
    sections,
    executeScroll,
    handlePageNavigation,
    handleNavClick,
    handleScroll,
    footerSections,
    productsSections,
    // 新增配置相关方法
    shouldOpenInNewTab,
    shouldShowBeta,
    getBadgeInfo,
    getSubNavStyle
  }
} 