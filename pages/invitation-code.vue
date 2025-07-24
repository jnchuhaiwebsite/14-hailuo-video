<template>
  <div
    class="py-16 bg-blue-pale"
    aria-labelledby="pricing-heading"
  >
    <div class="mt-[64px] mb-10 flex flex-col items-center relative z-10 w-full max-w-[1360px] mx-auto px-2 sm:px-3 lg:px-4">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#db2777] bg-clip-text text-transparent drop-shadow-2xl tracking-tight animate-gradient-x">
        Get Your Hailuo AI Invitation Code: Refer Friends & Earn Unlimited Rewards
      </h1>
      <p class="mt-4 text-base text-gray-200 text-center max-w-2xl font-medium">
        Share your unique link and get rewarded with Credits for every single purchase your friends make. Turn your network into endless AI video generations.
    </p>
    </div>

    <!-- 主体内容区域 -->
    <div class="w-4/5 max-w-[1088px] mx-auto px-2 sm:px-3 lg:px-4 pb-12 lg:pb-20 space-y-8">
      <!-- Get Link Card -->
      <section class="bg-blue-pale/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 xl:p-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white mb-4">Get Your Invitation Link</h2>
          <p class="text-gray-300 mb-6">Share your unique link and start earning Credits for every purchase your friends make.</p>
          <button 
            @click="handleGetLink"
            :disabled="isLoadingUserInfo"
            class="bg-[#7C3AED] hover:bg-[#8B5CF6] disabled:bg-gray-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed"
          >
            <span v-if="isLoadingUserInfo" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
            <span v-else>Get Link</span>
          </button>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="bg-blue-pale/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 xl:p-8">
        <h2 class="text-2xl font-bold text-white text-center mb-8">
          How It Works
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div class="text-3xl mb-3">🔗</div>
            <h3 class="text-lg font-semibold text-white mb-2">1. Share Your Link</h3>
            <p class="text-gray-300 text-sm">Copy your unique invitation link and share it with friends or followers.</p>
          </div>
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div class="text-3xl mb-3">🛍️</div>
            <h3 class="text-lg font-semibold text-white mb-2">2. Friend Makes a Purchase</h3>
            <p class="text-gray-300 text-sm">When your referred friend buys any plan or credit pack, the purchase is confirmed.</p>
          </div>
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div class="text-3xl mb-3">🔁</div>
            <h3 class="text-lg font-semibold text-white mb-2">3. You Earn, Always</h3>
            <p class="text-gray-300 text-sm">You'll receive reward Credits for <strong>every single purchase</strong> your friend makes, with no limits!</p>
          </div>
        </div>
      </section>

      <!-- Rewards Details Section -->
      <section class="bg-blue-pale/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 xl:p-8">
        <h2 class="text-2xl font-bold text-white text-center mb-8">
          What You'll Earn Per Purchase
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border-t-4 border-orange-400">
            <h3 class="text-lg font-semibold text-white mb-2">Basic Plan</h3>
            <div class="text-3xl font-bold text-orange-400 mb-1">18</div>
            <p class="text-gray-300 text-sm">Credits Awarded</p>
          </div>
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border-t-4 border-[#7C3AED]">
            <h3 class="text-lg font-semibold text-white mb-2">Pro Plan</h3>
            <div class="text-3xl font-bold text-[#7C3AED] mb-1">58</div>
            <p class="text-gray-300 text-sm">Credits Awarded</p>
          </div>
          <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border-t-4 border-red-500">
            <h3 class="text-lg font-semibold text-white mb-2">Enterprise Plan</h3>
            <div class="text-3xl font-bold text-red-500 mb-1">208</div>
            <p class="text-gray-300 text-sm">Credits Awarded</p>
          </div>
        </div>
      </section>
    </div>



      <!-- Your Link Card -->
      <section v-if="isSignedIn" id="rewards" class="py-16 px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-blue-pale/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 md:p-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
              Your Invitation Link
            </h2>
            <p class="text-xl text-gray-300 mb-8">
              Share this link to start earning. The more you share, the more you earn!
            </p>
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-600">
              <div v-if="isLoadingUserInfo" class="text-center text-gray-300">
                <svg class="animate-spin h-8 w-8 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading invitation link...
              </div>
              <div v-else class="relative">
                <div class="text-lg font-mono text-[#7C3AED] break-all pr-12">
                  {{ userInvitationLink || 'No invitation link available' }}
                </div>
                <button 
                  v-if="userInvitationLink && !userInvitationLink.includes('Failed') && !userInvitationLink.includes('No')"
                  @click="copyInvitationLink"
                  class="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors"
                  :title="copyStatus"
                >
                  <svg v-if="!isCopied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg v-else class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="text-2xl font-semibold text-white">
              <span v-if="isLoadingUserInfo" class="text-gray-300">Loading Credits...</span>
              <span v-else>
                Your Current Credits: <span class="text-[#7C3AED] text-3xl">{{ userCredits }}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div class="space-y-4">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="bg-blue-pale/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700/50"
            >
              <button
                @click="toggleFaq(index)"
                class="w-full px-6 py-4 text-left flex justify-between items-center text-white font-semibold hover:bg-white/5 transition-colors"
              >
                <span>{{ faq.question }}</span>
                <svg 
                  :class="['w-5 h-5 transition-transform duration-300', faq.isOpen ? 'rotate-45' : '']"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div 
                :class="['overflow-hidden transition-all duration-300', faq.isOpen ? 'max-h-96' : 'max-h-0']"
              >
                <div class="px-6 pb-4 text-gray-300">
                  <p v-html="faq.answer"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    <!-- 登录确认弹窗 -->
    <div v-if="showLoginModal" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click="closeLoginModal"
    >
      <div class="relative w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] max-w-md bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden" 
        @click.stop
      >
        <!-- 弹框头部 -->
        <div class="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h3 class="text-xl font-bold text-white">Sign In Required</h3>
          <button 
            @click="closeLoginModal"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- 弹框内容 -->
        <div class="p-6">
          <div class="text-center mb-6">
            <div class="text-4xl mb-4">🔐</div>
            <h4 class="text-lg font-semibold text-white mb-2">Get Your Valid Invitation Link</h4>
            <p class="text-gray-300">Please sign in to get your exclusive invitation link and start earning Credits</p>
          </div>
          
          <div class="flex gap-3">
            <button 
              @click="closeLoginModal"
              class="flex-1 py-3 px-4 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="confirmLogin"
              class="flex-1 py-3 px-4 rounded-lg bg-[#7C3AED] text-white hover:bg-[#8B5CF6] transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 复制成功提示弹窗 -->
    <div v-if="showCopySuccessModal" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div class="relative w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] max-w-md bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden" 
        @click.stop
      >
        <!-- 弹框内容 -->
        <div class="p-6 text-center">
          <div class="text-center mb-6">
            <div class="text-4xl mb-4">✅</div>
            <h4 class="text-lg font-semibold text-white mb-2">Link Copied Successfully!</h4>
            <p class="text-gray-300">Your invitation link has been copied to clipboard</p>
          </div>
          
          <button 
            @click="showCopySuccessModal = false"
            class="w-full py-3 px-4 rounded-lg bg-[#7C3AED] text-white hover:bg-[#8B5CF6] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useSeo } from '~/composables/useSeo'
import { useClerkAuth } from '~/utils/auth'
import { useUserStore } from '~/stores/user'
import { getCurrentUser } from '~/api/index'

// SEO设置
useSeo({
  title: "Hailuo AI Invitation Code | Earn Unlimited Credits",
  description: "Get your official Hailuo AI invitation code to share with friends. Earn Credits for every purchase they make, forever! Use your Credits for more AI generations."
})

// 引入认证和用户状态
const { isSignedIn, clerk } = useClerkAuth()
const userStore = useUserStore()

// 状态管理
const showLoginModal = ref(false)
const showCopySuccessModal = ref(false)
const userInvitationLink = ref('')
const userCredits = ref(0)
const isLoadingUserInfo = ref(false)
const isCopied = ref(false)
const copyStatus = ref('Copy link')
// 新增：标记是否为Get Link触发的登录
const loginForGetLink = ref(false)

// FAQ数据
const faqs = ref([
  {
    question: "Do I only get Credits for my friend's first purchase?",
    answer: "<strong>No!</strong> Our program is designed to reward you continuously. You will earn Credits for <strong>every purchase</strong> your referred friend makes, including initial subscriptions, renewals, and credit packs. There's no limit!",
    isOpen: false
  },
  {
    question: "When do I receive my Credits?",
    answer: "Credits are credited to your account as soon as your referred friend successfully completes any purchase.",
    isOpen: false
  },
  {
    question: "What can I use my Credits for?",
    answer: "Reward Credits are used exclusively to pay for AI video generations. Think of them as credits for creating more amazing content!",
    isOpen: false
  }
])

// 处理Get Link按钮点击
const handleGetLink = () => {
  if (!isSignedIn.value) {
    loginForGetLink.value = true
    localStorage.setItem('loginForGetLink', '1') // 新增：持久化标记
    showLoginModal.value = true
    return
  }
  // 直接滚动到rewards部分
  const rewardsSection = document.getElementById('rewards')
  if (rewardsSection) {
    rewardsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 确认登录
const confirmLogin = () => {
  showLoginModal.value = false
  loginForGetLink.value = true // 再次确保
  // 触发登录按钮点击
  try {
    const loginBtn = document.querySelector('#bindLogin') as HTMLElement
    if (loginBtn) {
      loginBtn.click()
    }
  } catch (error) {
    console.error("Failed to find login button:", error)
  }
}

// 关闭登录弹窗
const closeLoginModal = () => {
  showLoginModal.value = false
}

// 获取用户信息
const fetchUserInfo = async () => {
  if (isLoadingUserInfo.value) return
  
  isLoadingUserInfo.value = true
  try {
    const response = await getCurrentUser() as any
    if (response.code === 200 && response.data) {
      // 计算总积分：remaining_limit + free_limit
      const totalCredits = (response.data.remaining_limit || 0) + (response.data.free_limit || 0)
      userCredits.value = totalCredits
      
      // 同时构建邀请链接
      if (response.data.ivcode) {
        userInvitationLink.value = `https://www.hailuo2.com?ivcode=${response.data.ivcode}`
      }
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    userCredits.value = 0
  } finally {
    isLoadingUserInfo.value = false
  }
}



// 切换FAQ展开/收起
const toggleFaq = (index: number) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

// 复制邀请链接
const copyInvitationLink = async () => {
  // 如果未登录，显示登录提示
  if (!isSignedIn.value) {
    showLoginModal.value = true
    return
  }
  
  const linkToCopy = userInvitationLink.value
  if (!linkToCopy) return
  
  try {
    await navigator.clipboard.writeText(linkToCopy)
    // 显示复制成功提示
    showCopySuccessMessage()
  } catch (error) {
    console.error('Failed to copy link:', error)
    // 降级方案：使用传统的复制方法
    const textArea = document.createElement('textarea')
    textArea.value = linkToCopy
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    // 显示复制成功提示
    showCopySuccessMessage()
  }
}

// 显示复制成功消息
const showCopySuccessMessage = () => {
  isCopied.value = true
  copyStatus.value = 'Copied!'
  showCopySuccessModal.value = true
  
  // 3秒后重置状态
  setTimeout(() => {
    isCopied.value = false
    copyStatus.value = 'Copy link'
    showCopySuccessModal.value = false
  }, 3000)
}

// 监听登录状态变化，自动获取用户信息和邀请链接
onMounted(async () => {
  if (isSignedIn.value) {
    await fetchUserInfo()
    // 新增：如果有localStorage标记，自动复制
    if (localStorage.getItem('loginForGetLink') === '1') {
      await copyInvitationLink()
      localStorage.removeItem('loginForGetLink')
      // 滚动到rewards部分
      const rewardsSection = document.getElementById('rewards')
      if (rewardsSection) {
        rewardsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
})

// 监听登录状态变化
watch(isSignedIn, async (newValue: boolean) => {
  if (newValue) {
    // 用户登录后，获取用户信息（包含邀请链接）
    await fetchUserInfo()
    // 优先用localStorage标记
    if (localStorage.getItem('loginForGetLink') === '1' || loginForGetLink.value) {
      await copyInvitationLink()
      loginForGetLink.value = false
      localStorage.removeItem('loginForGetLink') // 清除
      // 滚动到rewards部分
      const rewardsSection = document.getElementById('rewards')
      if (rewardsSection) {
        rewardsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
})
</script>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(124, 58, 237, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(124, 58, 237, 0.7);
}

/* 渐变动画 */
@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}
</style> 