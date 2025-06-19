import { useUser, useClerk, useAuth } from '#imports'
import { ref, computed, watchEffect } from 'vue'
import { logoutCookie } from '~/api/index'
import { useUserStore } from '~/stores/user'

// 创建认证事件总线
const authEventBus = {
  events: {},
  
  // 注册事件监听器
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    return () => this.off(event, callback) // 返回解绑函数
  },
  
  // 移除事件监听器
  off(event, callback) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter(cb => cb !== callback)
  },
  
  // 触发事件
  emit(event, data) {
    if (!this.events[event]) return
    this.events[event].forEach(callback => callback(data))
  }
}

// 导出事件总线，以便其他组件可以监听认证事件
export const useAuthEvents = () => authEventBus

/**
 * Clerk认证工具函数
 * 提供认证状态管理和用户信息访问
 */
export function useClerkAuth() {
  // 获取Clerk API提供的基础数据
  const { user, isSignedIn, isLoaded } = useUser()
  const clerk = useClerk()
  const { userId, sessionId } = useAuth()

  // 认证状态 - 统一响应式管理
  const authState = ref({
    // Clerk状态
    isInitializing: true,
    isLoading: true,
    isLoaded: false,
    isLoadFailed: false,
    isLoadTimedOut: false,
    
    // 用户状态
    isLoggedIn: false,
    isCheckingAuth: true,
    
    // 状态文本
    clerkStatus: 'Waiting for initialization',
    loginStatus: 'unknown',
    authStatus: 'Checking login status...',
    
    // 错误信息
    error: null
  })

  // 计算属性 - 便于使用
  const isAuthenticated = computed(() => authState.value.isLoggedIn)
  
  // 防止退出登录重复调用
  let isHandlingSignOut = false
  
  // 用于区分是否是用户主动触发的操作
  let isUserInitiatedAction = false

  /**
   * 监听用户登录状态变化
   */
  function watchLoginStatus() {
    watchEffect(() => {
      if (isLoaded.value) {
        authState.value.isLoaded = true
        authState.value.isLoading = false
        authState.value.isInitializing = false
        
        if (isSignedIn.value) {
          // 如果之前未登录，现在登录了，视为有效的登录状态变化
          const wasLoggedIn = authState.value.isLoggedIn
          
          authState.value.isLoggedIn = true//已登录
          authState.value.loginStatus = 'Logged in'//登录状态文本
          authState.value.authStatus = `Logged in, user ID: ${userId.value}`//认证状态文本
          
          // 如果状态从未登录变为已登录，触发登录事件
          if (!wasLoggedIn) {
            authEventBus.emit('login', user.value)
          }
          
          // 重置退出处理标记
          isHandlingSignOut = false
        } else {
          if (!isHandlingSignOut) { // 防止重复处理退出
            authState.value.isLoggedIn = false
            authState.value.loginStatus = 'Not logged in'
            authState.value.authStatus = 'Not logged in'
            handleSignOut()
          }
        }
        
        authState.value.isCheckingAuth = false
      }
    })
  }

  /**
   * 处理用户退出登录后的操作
   */
  function handleSignOut() {
    // 如果已经在处理退出流程，则不重复执行
    if (isHandlingSignOut) return
    
    // 设置标记，避免重复处理
    isHandlingSignOut = true
    
    // 清除本地存储
    try {
      logoutCookie();
      useUserStore().clearUserInfo();
    } catch (error) {
      console.error('退出登录失败:', error)
    }
    
    // 重置应用状态
    authState.value.isLoggedIn = false
    authState.value.loginStatus = 'Not logged in'
    authState.value.authStatus = 'Not logged in'
    authState.value.isCheckingAuth = false
    
    // 触发退出事件
    authEventBus.emit('logout')
  }

  /**
   * 监听Clerk加载状态
   */
  function watchClerkStatus() {
    // 设置一个检查器，每200ms检查一次Clerk状态
    const checkInterval = setInterval(() => {
      if (isLoaded.value) {
        authState.value.isInitializing = false//Clerk初始化中
        authState.value.isLoading = false//Clerk正在加载中
        authState.value.isLoaded = true//Clerk已加载完成
        authState.value.clerkStatus = 'Loaded successfully'//Clerk状态文本
        console.log('Clerk 状态: 加载成功')
        console.log('用户已登录状态:', isSignedIn.value)
        
        // 触发Clerk加载完成事件
        authEventBus.emit('clerkLoaded', isSignedIn.value)
        
        // 清除检查器
        clearInterval(checkInterval)
      }
    }, 200)
    
    // 设置超时器
    setTimeout(() => {
      if (!isLoaded.value) {
        authState.value.isInitializing = false//Clerk初始化中
        authState.value.isLoading = false//Clerk正在加载中
        authState.value.isLoadTimedOut = true//Clerk加载超时
        authState.value.clerkStatus = 'Load timed out'//Clerk状态文本
        authState.value.error = 'Load Clerk timed out'//Clerk错误信息
        console.log('Clerk 状态: 加载超时')
        
        // 触发加载超时事件
        authEventBus.emit('error', { type: 'timeout', message: 'Clerk加载超时' })
        
        // 清除检查器
        clearInterval(checkInterval)
      }
    }, 10000)
    
    // 使用try-catch捕获可能的错误
    try {
      // 其他可能的初始化代码
    } catch (error) {
      authState.value.isInitializing = false//Clerk初始化中
      authState.value.isLoading = false//Clerk正在加载中
      authState.value.isLoadFailed = true//Clerk加载失败
      authState.value.clerkStatus = 'Load failed'//Clerk状态文本
      authState.value.error = error//Clerk错误信息
      console.log('Clerk 状态: 加载失败', error)
      
      // 触发错误事件
      authEventBus.emit('error', { type: 'loadFailed', error })
      
      // 清除检查器
      clearInterval(checkInterval)
    }
  }

  /**
   * 主动触发登录操作
   */
  function login() {
    // 标记为用户主动操作
    isUserInitiatedAction = true
    clerk.openSignIn()
  }

  /**
   * 主动触发退出登录操作
   */
  async function logout() {
    // 如果已经在处理退出流程，则不重复执行
    if (isHandlingSignOut) return
    
    try {
      // 设置标记，避免重复处理
      isHandlingSignOut = true
      
      await clerk.signOut()
      // 用户主动触发的退出
      handleSignOut()
    } catch (error) {
      console.error('退出登录失败:', error)
      authState.value.error = error
      authEventBus.emit('error', { type: 'logoutFailed', error })
      
      // 退出失败，重置标记
      isHandlingSignOut = false
    }
  }

  /**
   * 初始化认证，自动监听状态变化
   */
  function initAuth() {
    watchLoginStatus()//监听用户登录状态变化
    watchClerkStatus()//监听Clerk加载状态
  }

  // 返回必要的状态和方法
  return {
    // 统一状态对象
    authState,//认证状态对象
    
    // 便捷访问计算属性
    isAuthenticated,//是否已认证
    
    // Clerk原始数据
    user,//用户信息
    isSignedIn,//是否已登录
    isLoaded,//是否已加载
    clerk,//Clerk实例
    userId,//用户ID
    sessionId,//会话ID
    
    // 方法
    initAuth,//初始化认证
    handleSignOut,//处理用户退出登录
    login,//主动触发登录
    logout,//主动触发退出登录
    
    // 事件相关
    on: authEventBus.on.bind(authEventBus),//注册事件监听
    off: authEventBus.off.bind(authEventBus),//移除事件监听
    emit: authEventBus.emit.bind(authEventBus)//手动触发事件
  }
} 