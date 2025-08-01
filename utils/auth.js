import { useUser, useClerk, useAuth } from '#imports'
import { ref, computed, watchEffect } from 'vue'
import { logoutCookie, getCurrentUser } from '~/api/index'
import { useUserStore } from '~/stores/user'

// 简单的token检查函数
const getValidToken = () => {
  if (typeof document === 'undefined') return null; // 服务端渲染时跳过
  
  const nameEQ = 'auth_token=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

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
 * 预检测用户登录状态
 * 在加载Clerk之前先检查本地token
 */
async function preCheckUserLogin() {
  try {
    // 检查是否有有效的本地token
    const token = getValidToken();
    if (!token) {
      return { isLoggedIn: false, userData: null };
    }

    // 如果有token，尝试获取用户信息
    const response = await getCurrentUser();
    if (response && response.code === 200 && response.data) {
      return { 
        isLoggedIn: true, 
        userData: response.data 
      };
    } else {
      // token无效，清除本地存储
      console.log('🧹 预检测发现无效token，清理脏数据...');
      console.log('清理原因: 服务器验证失败 (code:', response?.code, ')');
      logoutCookie();
      return { isLoggedIn: false, userData: null };
    }
  } catch (error) {
    console.error('❌ 预检测用户登录状态失败:', error);
    // 出错时清除本地存储
    console.log('🧹 预检测出错，清理可能的脏数据...');
    logoutCookie();
    return { isLoggedIn: false, userData: null };
  }
}

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
          // 简单检测：Clerk未登录但本地存在Cookie，直接清理
          const localToken = getValidToken()
          if (localToken) {
            console.log('🧹 检测到脏数据: Clerk未登录但本地存在Cookie，直接清理')
            console.log('Token:', localToken.substring(0, 20) + '...')
            
            // 直接清理Cookie，不进行复杂验证
            try {
              logoutCookie()
              useUserStore().clearUserInfo()
              console.log('✅ 脏数据清理完成')
            } catch (error) {
              console.error('❌ 脏数据清理失败:', error)
            }
          }
          
          if (!isHandlingSignOut) { // 防止重复处理退出
            authState.value.isLoggedIn = false
            authState.value.loginStatus = 'Not logged in'
            authState.value.authStatus = 'Not logged in'
            handleSignOut() // 处理其他退出逻辑
          }
        }
        
        authState.value.isCheckingAuth = false
        
        // 最终检查：确保没有遗留的脏数据
        setTimeout(() => {
          forceDirtyDataCheck()
        }, 500)
        
        // 立即触发clerkLoaded事件，确保组件能快速响应
        authEventBus.emit('clerkLoaded', isSignedIn.value)
      }
    })
  }



  /**
   * 强制检查并清理脏数据
   * 在认证状态稳定后进行最终检查
   */
  function forceDirtyDataCheck() {
    // 只在客户端执行
    if (typeof document === 'undefined') return
    
    const currentToken = getValidToken()
    const isCurrentlyLoggedIn = authState.value.isLoggedIn
    
    console.log('🔍 执行强制脏数据检查...')
    console.log('当前登录状态:', isCurrentlyLoggedIn)
    console.log('本地Token存在:', !!currentToken)
    
    // 如果显示未登录但存在token，直接清理
    if (!isCurrentlyLoggedIn && currentToken) {
      console.log('🚨 发现状态不一致: 未登录状态但存在token，直接清理')
      console.log('清理的Token:', currentToken.substring(0, 20) + '...')
      
      try {
        logoutCookie()
        useUserStore().clearUserInfo()
        console.log('✅ 强制清理完成')
        
        // 再次验证清理结果
        const tokenAfterClean = getValidToken()
        if (tokenAfterClean) {
          console.error('⚠️ 警告: 强制清理后仍有残留数据:', tokenAfterClean)
        } else {
          console.log('🎉 确认: 所有脏数据已清理干净')
        }
      } catch (error) {
        console.error('❌ 强制清理失败:', error)
      }
    } else if (!isCurrentlyLoggedIn && !currentToken) {
      console.log('✅ 状态一致: 未登录且无本地token')
    } else if (isCurrentlyLoggedIn && currentToken) {
      console.log('✅ 状态一致: 已登录且有本地token')
    } else if (isCurrentlyLoggedIn && !currentToken) {
      console.log('⚠️ 状态可疑: 显示已登录但无本地token (可能正常)')
    }
  }

  /**
   * 处理用户退出登录后的操作
   */
  function handleSignOut() {
    // 如果已经在处理退出流程，则不重复执行
    if (isHandlingSignOut) return
    
    // 设置标记，避免重复处理
    isHandlingSignOut = true
    
    // 清除本地存储（如果还未清理）
    try {
      // 检查清理前的状态
      const tokenBeforeClean = getValidToken()
      if (tokenBeforeClean) {
        console.log('🗑️ handleSignOut: 清理剩余认证数据...')
        console.log('清理前的token:', tokenBeforeClean.substring(0, 20) + '...')
        
        logoutCookie();
        useUserStore().clearUserInfo();
        
        // 验证清理结果
        const tokenAfterClean = getValidToken()
        if (!tokenAfterClean) {
          console.log('✅ handleSignOut: 认证数据清理完成')
        } else {
          console.warn('⚠️ 警告: handleSignOut清理后仍有残留数据')
        }
      } else {
        console.log('ℹ️ handleSignOut: 认证数据已经被清理，跳过重复清理')
      }
    } catch (error) {
      console.error('❌ handleSignOut退出登录失败:', error)
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
    
    // 减少超时时间，从10秒改为3秒
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
    }, 3000)
    
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
    logoutCookie()
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
   * @param {boolean} skipPreCheck 是否跳过预检测，直接加载Clerk
   */
  async function initAuth(skipPreCheck = false) {
    if (!skipPreCheck) {
      // 先进行预检测
      try {
        const preCheckResult = await preCheckUserLogin();
        
        if (preCheckResult.isLoggedIn) {
          // 用户已登录，直接设置状态，不需要加载Clerk
          authState.value.isLoggedIn = true;
          authState.value.loginStatus = 'Logged in';
          authState.value.authStatus = 'Logged in (pre-check)';
          authState.value.isCheckingAuth = false;
          authState.value.isLoading = false;
          authState.value.isLoaded = true;
          
          // 触发预检测登录事件
          authEventBus.emit('preCheckLogin', preCheckResult.userData);
          return;
        }
      } catch (error) {
        console.error('预检测失败，继续加载Clerk:', error);
      }
    }
    
    // 如果预检测失败或用户未登录，则加载Clerk
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