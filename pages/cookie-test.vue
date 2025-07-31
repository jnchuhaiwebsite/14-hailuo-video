<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Cookie测试工具</h1>
        <p class="text-gray-600 mb-8">用于模拟脏数据和测试认证机制</p>
      </div>

      <!-- Cookie状态显示 -->
      <div class="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 class="text-lg font-semibold mb-3">当前Cookie状态</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="font-medium">auth_token:</span>
            <span class="text-gray-600 break-all max-w-48">{{ authToken || '未设置' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">auth_token_expiry:</span>
            <span class="text-gray-600">{{ authTokenExpiry || '未设置' }}</span>
          </div>
        </div>
      </div>

      <!-- 调试信息 -->
      <div class="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 class="text-sm font-semibold text-yellow-800 mb-2">🔍 调试信息</h3>
        <div class="text-xs text-yellow-700 space-y-1">
          <div class="flex justify-between">
            <span>浏览器环境:</span>
            <span>{{ typeof document !== 'undefined' ? '✅ 客户端' : '❌ 服务端' }}</span>
          </div>
          <div class="flex justify-between">
            <span>完整Cookie:</span>
            <span class="break-all max-w-48">{{ allCookies || '无Cookie' }}</span>
          </div>
          <div class="flex justify-between">
            <span>最后操作:</span>
            <span>{{ lastOperation || '无' }}</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮区域 -->
      <div class="space-y-4">
        <!-- 设置脏数据区域 -->
        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 class="text-sm font-semibold text-orange-800 mb-3">🗂️ 设置脏数据测试</h3>
          <div class="grid grid-cols-1 gap-2">
            <button
              @click="setInvalidToken"
              class="w-full px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              设置无效Token格式
            </button>
            <button
              @click="setExpiredToken"
              class="w-full px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              设置过期Token
            </button>
            <button
              @click="setMismatchedTokenAndExpiry"
              class="w-full px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              设置不匹配的Token和过期时间
            </button>
            <button
              @click="setCorruptedData"
              class="w-full px-3 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              设置损坏的数据
            </button>
          </div>
        </div>

        <!-- 删除操作区域 -->
        <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 class="text-sm font-semibold text-red-800 mb-3">🗑️ 删除Cookie测试</h3>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <button
              @click="deleteAuthToken"
              class="w-full px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              删除 auth_token
            </button>
            <button
              @click="deleteAuthTokenExpiry"
              class="w-full px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              删除 auth_token_expiry
            </button>
          </div>
          <button
            @click="deleteAllAuthCookies"
            class="w-full px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            删除所有认证Cookie
          </button>
        </div>

        <!-- 基础测试区域 -->
        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 class="text-sm font-semibold text-green-800 mb-3">🧪 基础测试</h3>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="testBasicCookie"
              class="w-full px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              测试Cookie设置
            </button>
            <button
              @click="refreshCookieStatus"
              class="w-full px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              🔄 刷新状态
            </button>
          </div>
        </div>

        <!-- 脏数据自动清理测试 -->
        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 class="text-sm font-semibold text-purple-800 mb-3">🤖 自动清理测试</h3>
          <div class="mb-3 text-xs text-purple-700">
            <p>测试场景：设置脏数据后刷新页面，系统应自动检测并清理无效数据</p>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="testDirtyDataAutoClean"
              class="w-full px-3 py-2 bg-purple-500 text-white text-sm font-medium rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              🚀 设置脏数据并刷新
            </button>
            <button
              @click="manualDirtyCheck"
              class="w-full px-3 py-2 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              🔍 手动检测脏数据
            </button>
          </div>
          <div class="text-xs text-purple-600 mt-1">
            左侧：设置脏数据后自动刷新页面测试 | 右侧：立即检测当前状态
          </div>
        </div>
      </div>

      <!-- 操作记录 -->
      <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 class="text-sm font-semibold text-yellow-800 mb-2">操作记录</h3>
        <div class="text-xs text-yellow-700 space-y-1 max-h-32 overflow-y-auto">
          <div v-for="(log, index) in operationLogs" :key="index" class="flex justify-between">
            <span>{{ log.action }}</span>
            <span class="text-gray-500">{{ log.time }}</span>
          </div>
          <div v-if="operationLogs.length === 0" class="text-gray-500 italic">
            暂无操作记录
          </div>
        </div>
      </div>

      <!-- 说明文档 -->
      <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 class="text-sm font-semibold text-blue-800 mb-2">使用说明</h3>
        <ul class="text-xs text-blue-700 space-y-1">
          <li>• <strong>设置脏数据</strong>：模拟各种异常的认证状态来测试系统鲁棒性</li>
          <li>• <strong>无效Token格式</strong>：设置格式错误的token，测试token验证逻辑</li>
          <li>• <strong>过期Token</strong>：设置已过期的token，测试过期处理机制</li>
          <li>• <strong>不匹配数据</strong>：token和过期时间不匹配，测试一致性检查</li>
          <li>• <strong>损坏数据</strong>：包含特殊字符的无效数据，测试异常处理</li>
          <li>• <strong>删除Cookie</strong>：完全清除认证数据，测试未登录状态处理</li>
          <li>• <strong>🆕 自动清理测试</strong>：设置脏数据后自动刷新页面，测试系统自动检测和清理机制</li>
          <li>• 设置脏数据后建议刷新页面或访问需要认证的页面观察系统行为</li>
          <li>• 可以用来测试自动重登录、错误处理、数据验证等功能</li>
          <li>• 💡 观察浏览器控制台日志，查看详细的清理过程</li>
        </ul>
      </div>

      <!-- 返回首页 -->
      <div class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          ← 返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// SEO设置
definePageMeta({
  title: 'Cookie测试工具 - 认证测试'
})

// 响应式数据
const authToken = ref('')
const authTokenExpiry = ref('')
const operationLogs = ref([])
const allCookies = ref('')
const lastOperation = ref('')

/**
 * 获取指定名称的cookie值
 */
const getCookie = (name) => {
  if (typeof document === 'undefined') return null
  
  try {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length)
        return decodeURIComponent(value)
      }
    }
    return null
  } catch (error) {
    console.error('获取cookie时出错:', error)
    return null
  }
}

/**
 * 删除指定名称的cookie
 */
const deleteCookie = (name) => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

/**
 * 设置cookie
 */
const setCookie = (name, value, days = 7) => {
  if (typeof document === 'undefined') {
    console.warn('document未定义，跳过cookie设置')
    return false
  }
  
  try {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    
    const cookieString = `${name}=${encodeURIComponent(value)}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax`
    document.cookie = cookieString
    
    console.log('设置cookie:', cookieString)
    
    // 验证cookie是否设置成功
    const verification = getCookie(name)
    if (verification === value) {
      console.log('Cookie设置成功:', name, '=', value)
      return true
    } else {
      console.error('Cookie设置失败，验证值不匹配:', verification, '!=', value)
      return false
    }
  } catch (error) {
    console.error('设置cookie时出错:', error)
    return false
  }
}

/**
 * 添加操作日志
 */
const addLog = (action) => {
  const now = new Date()
  const time = now.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })
  
  operationLogs.value.unshift({
    action,
    time
  })
  
  // 只保留最近10条记录
  if (operationLogs.value.length > 10) {
    operationLogs.value = operationLogs.value.slice(0, 10)
  }
}

/**
 * 刷新cookie状态
 */
const refreshCookieStatus = () => {
  authToken.value = getCookie('auth_token') || ''
  authTokenExpiry.value = getCookie('auth_token_expiry') || ''
  
  // 获取所有cookie
  if (typeof document !== 'undefined') {
    allCookies.value = document.cookie || '无Cookie'
  }
  
  console.log('当前所有Cookie:', allCookies.value)
  console.log('auth_token:', authToken.value)
  console.log('auth_token_expiry:', authTokenExpiry.value)
  
  addLog('刷新Cookie状态')
}

/**
 * 测试基础Cookie设置功能
 */
const testBasicCookie = () => {
  lastOperation.value = '基础Cookie测试'
  const testToken = 'test_token_' + Date.now()
  const testExpiry = (Date.now() + 3600000).toString() // 1小时后
  
  console.log('开始基础Cookie测试...')
  console.log('测试Token:', testToken)
  console.log('测试过期时间:', testExpiry)
  
  const success1 = setCookie('auth_token', testToken)
  const success2 = setCookie('auth_token_expiry', testExpiry)
  
  if (success1 && success2) {
    addLog('✅ 基础Cookie设置测试成功')
  } else {
    addLog('❌ 基础Cookie设置测试失败')
  }
  
  setTimeout(() => {
    refreshCookieStatus()
  }, 100)
}

/**
 * 测试脏数据自动清理功能
 */
const testDirtyDataAutoClean = () => {
  lastOperation.value = '脏数据自动清理测试'
  
  // 设置明显无效的认证数据
  const dirtyToken = 'INVALID_DIRTY_TOKEN_' + Math.random().toString(36).substring(7)
  const dirtyExpiry = 'INVALID_EXPIRY_FORMAT'
  
  console.log('🧪 开始脏数据自动清理测试...')
  console.log('设置脏数据 - Token:', dirtyToken)
  console.log('设置脏数据 - Expiry:', dirtyExpiry)
  
  const success1 = setCookie('auth_token', dirtyToken)
  const success2 = setCookie('auth_token_expiry', dirtyExpiry)
  
  if (success1 && success2) {
    addLog('✅ 脏数据设置成功，准备刷新页面测试清理机制')
    
    // 给用户一点时间看到设置的脏数据
    setTimeout(() => {
      refreshCookieStatus()
      
      // 延迟刷新页面，让系统检测并清理脏数据
      setTimeout(() => {
        addLog('🔄 正在刷新页面测试自动清理...')
        console.log('🔄 即将刷新页面，请观察控制台日志中的自动清理过程')
        
        // 延迟刷新，让用户看到日志
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }, 1000)
    }, 500)
  } else {
    addLog('❌ 脏数据设置失败')
  }
}

/**
 * 手动检测脏数据状态
 */
const manualDirtyCheck = () => {
  lastOperation.value = '手动脏数据检测'
  
  console.log('🔍 开始手动脏数据检测...')
  
  const currentToken = getCookie('auth_token')
  const currentExpiry = getCookie('auth_token_expiry')
  
  addLog('🔍 执行手动脏数据检测')
  
  if (currentToken && currentExpiry) {
    console.log('📊 检测结果:')
    console.log('- Token存在:', !!currentToken)
    console.log('- Token内容:', currentToken?.substring(0, 20) + '...')
    console.log('- Expiry存在:', !!currentExpiry)
    console.log('- Expiry内容:', currentExpiry)
    
    // 检查是否为明显的脏数据
    if (currentToken.includes('INVALID') || currentToken.includes('invalid') || 
        currentExpiry === 'INVALID_EXPIRY_FORMAT' || currentExpiry === 'not_a_timestamp') {
      addLog('⚠️ 检测到脏数据，建议清理')
      console.log('🚨 检测到明显的脏数据!')
      
      // 提供清理选项
      setTimeout(() => {
        if (confirm('检测到脏数据，是否立即清理？')) {
          deleteAllAuthCookies()
          addLog('🧹 用户确认，已清理脏数据')
        }
      }, 100)
    } else {
      addLog('⚡ 数据格式正常，可能有效')
      console.log('✅ Token格式看起来正常')
    }
  } else if (currentToken && !currentExpiry) {
    addLog('⚠️ 检测到不完整数据: 有Token无Expiry')
    console.log('⚠️ 不完整数据: 有Token但无过期时间')
  } else if (!currentToken && currentExpiry) {
    addLog('⚠️ 检测到不完整数据: 有Expiry无Token')
    console.log('⚠️ 不完整数据: 有过期时间但无Token')
  } else {
    addLog('✅ 无认证数据，状态正常')
    console.log('✅ 无本地认证数据')
  }
  
  // 刷新显示
  setTimeout(() => {
    refreshCookieStatus()
  }, 100)
}

/**
 * 删除auth_token
 */
const deleteAuthToken = () => {
  deleteCookie('auth_token')
  refreshCookieStatus()
  addLog('删除 auth_token')
}

/**
 * 删除auth_token_expiry
 */
const deleteAuthTokenExpiry = () => {
  deleteCookie('auth_token_expiry')
  refreshCookieStatus()
  addLog('删除 auth_token_expiry')
}

/**
 * 删除所有认证相关的cookie
 */
const deleteAllAuthCookies = () => {
  deleteCookie('auth_token')
  deleteCookie('auth_token_expiry')
  refreshCookieStatus()
  addLog('删除所有认证Cookie')
}

/**
 * 设置无效的Token格式
 */
const setInvalidToken = () => {
  lastOperation.value = '设置无效Token格式'
  const invalidToken = 'invalid_token_format_' + Math.random().toString(36).substring(7)
  const currentTime = Date.now()
  
  console.log('开始设置无效Token...', invalidToken)
  
  const success1 = setCookie('auth_token', invalidToken)
  const success2 = setCookie('auth_token_expiry', currentTime.toString())
  
  if (success1 && success2) {
    addLog('✅ 设置无效Token格式成功')
  } else {
    addLog('❌ 设置无效Token格式失败')
  }
  
  // 延迟刷新以确保cookie设置生效
  setTimeout(() => {
    refreshCookieStatus()
  }, 100)
}

/**
 * 设置过期的Token
 */
const setExpiredToken = () => {
  const expiredToken = 'expired_token_' + Math.random().toString(36).substring(7)
  const pastTime = Date.now() - (24 * 60 * 60 * 1000) // 1天前过期
  
  console.log('开始设置过期Token...')
  
  const success1 = setCookie('auth_token', expiredToken)
  const success2 = setCookie('auth_token_expiry', pastTime.toString())
  
  if (success1 && success2) {
    addLog('✅ 设置过期Token成功 (1天前过期)')
  } else {
    addLog('❌ 设置过期Token失败')
  }
  
  setTimeout(() => {
    refreshCookieStatus()
  }, 100)
}

/**
 * 设置不匹配的Token和过期时间
 */
const setMismatchedTokenAndExpiry = () => {
  const tokenA = 'token_a_' + Math.random().toString(36).substring(7)
  const futureTime = Date.now() + (7 * 24 * 60 * 60 * 1000) // 7天后过期
  
  console.log('开始设置不匹配的Token...')
  
  // 先设置一个token
  const success1 = setCookie('auth_token', tokenA)
  const success2 = setCookie('auth_token_expiry', futureTime.toString())
  
  if (success1 && success2) {
    // 然后只更新token，保持过期时间不变（造成不匹配）
    setTimeout(() => {
      const tokenB = 'token_b_' + Math.random().toString(36).substring(7)
      const success3 = setCookie('auth_token', tokenB)
      
      if (success3) {
        addLog('✅ 设置不匹配的Token和过期时间成功')
      } else {
        addLog('❌ 设置不匹配的Token失败')
      }
      
      setTimeout(() => {
        refreshCookieStatus()
      }, 100)
    }, 100)
  } else {
    addLog('❌ 初始Token设置失败')
  }
}

/**
 * 设置损坏的数据
 */
const setCorruptedData = () => {
  const corruptedToken = '<!@#$%^&*()_+{}[]|\\:";\'<>?,./`~corrupted_data'
  const invalidExpiry = 'not_a_timestamp'
  
  console.log('开始设置损坏数据...')
  
  const success1 = setCookie('auth_token', corruptedToken)
  const success2 = setCookie('auth_token_expiry', invalidExpiry)
  
  if (success1 && success2) {
    addLog('✅ 设置损坏数据成功 (包含特殊字符)')
  } else {
    addLog('❌ 设置损坏数据失败')
  }
  
  setTimeout(() => {
    refreshCookieStatus()
  }, 100)
}

// 组件挂载时初始化
onMounted(() => {
  refreshCookieStatus()
  addLog('页面初始化完成')
})
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>