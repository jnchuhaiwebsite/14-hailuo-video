<template>
  <!-- PC端用户菜单 -->
  <div class="hidden lg:flex items-center space-x-4">
    <template v-if="isSignedIn">
      <div class="relative user-menu-container">
        <button
          @click="toggleUserMenu"
          class="relative focus:outline-none"
        >
          <img
            :src="userDisplay?.imageUrl || '/default-avatar.png'"
            :alt="userDisplay?.username ? `${userDisplay.username}'s Profile Picture - Hailuo02 Video` : 'Default User Avatar - Hailuo 02 Video'"
            class="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity"
          />
        </button>

        <!-- 用户下拉菜单 -->
        <div
          v-if="showUserMenu"
          class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50"
        >
          <div class="px-4 py-3 border-b border-baby-pink/20">
            <div class="flex items-center gap-3 mb-2">
              <!-- <img
                :src="userDisplay?.imageUrl || '/default-avatar.png'"
                :alt="userDisplay?.username ? `${userDisplay.username}'s Profile Picture - Hailuo02 Video` : 'Default User Avatar - Hailuo02 Video'"
                loading="lazy"
                class="w-10 h-10 rounded-full object-cover ring-2 ring-baby-pink/20"
              /> -->
              <div>
                <p class="text-gray-800 text-sm font-medium">
                  {{ userDisplay?.username }}
                </p>
                <!-- <p
                  v-if="userDisplay?.email"
                  class="text-xs text-gray-500 truncate max-w-[160px]"
                >
                  {{ userDisplay?.email }}
                </p> -->
              </div>
            </div>

            <div class="space-y-1 mt-2">
              <div class="flex items-center py-2">
                <p class="text-xs text-gray-600">
                  My Credits: 
                </p>
                <div class="ml-2">
                  <template v-if="isCreditsLoading">
                    <div class="w-4 h-4 border-2 border-baby-coral border-t-transparent rounded-full animate-spin"></div>
                  </template>
                  <template v-else>
                    <p class="text-lg font-medium text-baby-coral text-green-800">
                      {{ limit || 0 }}
                    </p>
                  </template>
                </div>
              </div>

              <div v-if="vipLastTime" class="flex justify-between">
                <p class="text-xs text-gray-600">VIP expiration time:</p>
                <p class="text-xs text-gray-400">
                  {{ vipLastTime }}
                </p>
              </div>
            </div>
          </div>

          <!-- 个人中心入口 -->
          <NuxtLink
            to="/user-center/videos"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-all duration-200 hover:text-baby-coral"
            @click="showUserMenu = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" fill="currentColor">
              <path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM712 792H136V232h576v560z m176-167l-104-59.8V458.9L888 399v226z" />
              <path d="M208 360h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" />
            </svg>
            My Videos
          </NuxtLink>
          <NuxtLink
            to="/user-center/credits"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-all duration-200 hover:text-baby-coral"
            @click="showUserMenu = false"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1056 1024" class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" fill="currentColor">
              <path d="M779.68195496 393.76356841V244.58772657c0-94.48149629-152.52606521-145.46202836-296.06626008-145.46202836S187.54943479 150.10623028 187.54943479 244.58772657v428.75069206c0 94.45552462 152.52606521 145.43605791 296.06626009 145.43605789v-1.3504785c17.89382929 46.25386094 85.91115696 86.79416112 200.1563739 86.79416232 133.59340658 0 203.89615904-55.36958479 204.90901669-110.505433h0.05194094V494.06250732c0-40.35850574-37.13813587-81.0546311-109.05107145-100.29893891zM240.3479173 673.33841862v-128.97061848c56.01885237 38.67040882 148.6304561 59.29116436 238.51513476 60.01834452v160.00563428c-147.92924759-1.11674073-238.51513477-53.42178084-238.51513476-91.05336032z m238.51513476-179.2759113v55.96691145c-147.92924759-1.09077026-238.51513477-53.44775131-238.51513476-91.07933201v-128.94464682c57.00574079 39.37161853 151.92873855 60.01834454 243.26777758 60.01834454 91.31306735 0 186.26203679-20.64672601 243.26777634-60.01834454v54.35672592a433.71109975 433.71109975 0 0 0-43.11140244-2.07765749c-134.52835286 0-204.90901671 56.22661849-204.90901672 111.77799895z m355.66907242 299.70216094c0 15.81617183-51.2402391 52.8763951-150.7600557 52.87639511-99.46787567 0-150.73408524-37.06022449-150.73408524-52.87639511v-71.263668c34.35926869 20.30910638 84.87232763 33.7879125 150.73408524 33.7879125 65.93967021 0 116.400787-13.47880611 150.7600557-33.7879125v71.263668z m0-149.20181229c0 15.81617183-51.2402391 52.8763951-150.7600557 52.8763951-99.46787567 0-150.73408524-37.06022449-150.73408524-52.90236556v-71.23769752c34.35926869 20.28313593 84.87232763 33.81388295 150.73408524 33.81388293 65.93967021 0 116.400787-13.53074703 150.7600557-33.78791249v71.23769754z" />
            </svg>
            My Credits
          </NuxtLink>
                    <NuxtLink
            to="/user-center/orders"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-all duration-200 hover:text-baby-coral"
            @click="showUserMenu = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" fill="currentColor">
              <path d="M769.485841 957.246667 254.429225 957.246667c-31.605835 0-57.226353-25.563212-57.226353-57.0616L197.202872 211.186863c0-31.498388 25.620517-57.065693 57.226353-57.065693l143.074579 0 0 59.45102L283.033703 213.57219c-15.783475 0-28.605501 12.803607-28.605501 28.570709l0 629.511367c0 15.766079 12.821003 28.5308 28.605501 28.5308l457.831286 0c15.801894 0 28.620851-12.764722 28.620851-28.5308L769.485841 242.142899c0-15.767102-12.817933-28.570709-28.620851-28.570709L626.411261 213.57219l0-59.45102 143.074579 0c31.605835 0 57.228399 25.567305 57.228399 57.065693L826.71424 900.185067C826.71424 931.682431 801.091676 957.246667 769.485841 957.246667zM397.503804 384.766201l314.755684 0 0 28.566616L397.503804 413.332816 397.503804 384.766201zM397.503804 470.39851l314.755684 0 0 28.496008L397.503804 498.894518 397.503804 470.39851zM397.503804 555.955094l314.755684 0 0 28.570709L397.503804 584.525804 397.503804 555.955094zM397.503804 641.588427l314.755684 0 0 28.5308L397.503804 670.119227 397.503804 641.588427zM712.259488 841.34803 397.503804 841.34803l0-28.566616 314.755684 0L712.259488 841.34803zM397.503804 727.219713l314.755684 0 0 28.494984L397.503804 755.714697 397.503804 727.219713zM311.657624 384.188033l28.620851 0 0 28.5308-28.620851 0L311.657624 384.188033zM311.657624 469.784526l28.620851 0 0 28.5308-28.620851 0L311.657624 469.784526zM311.657624 555.376926l28.620851 0 0 28.535917-28.620851 0L311.657624 555.376926zM311.657624 641.009236l28.620851 0 0 28.496008-28.620851 0L311.657624 641.009236zM340.277452 840.734046l-28.620851 0 0-28.531823 28.620851 0L340.277452 840.734046zM311.657624 726.57196l28.620851 0 0 28.564569-28.620851 0L311.657624 726.57196zM683.63659 243.878426c15.803941 0 28.622898 12.798491 28.622898 28.565593s0 55.256488 0 55.256488L311.657624 327.700507c0 0 0-39.489386 0-55.256488s12.818957-28.565593 28.620851-28.565593l85.831854 0c0 0 0.361227-40.576137 0.361227-86.933955 0-48.168046 37.193087-88.415702 85.488023-88.415702 48.293913 0 86.807065 42.346457 86.807065 88.705298 0 49.903573-0.958838 86.644359-0.958838 86.644359L683.63659 243.878426zM511.958556 154.12117c-15.802918 0-28.605501 12.803607-28.605501 28.570709 0 15.691377 12.802584 28.494984 28.605501 28.494984 15.800871 0 28.602432-12.803607 28.602432-28.494984C540.560988 166.924777 527.759427 154.12117 511.958556 154.12117z" />
            </svg>
            My Orders
          </NuxtLink>
          <!-- 分享链接 -->
          <button
            v-if="hasPromotionPermission && promotionLink"
            @click="copyPromotionLink"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-all duration-200 hover:text-baby-coral"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            copy promotion link
          </button>

          <!-- 退出按钮 -->
          <SignOutButton>
            <button
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-baby-pink/10 flex items-center transition-all duration-200 hover:translate-x-1 hover:text-red-500"
            >
              <!-- Heroicons: logout/arrow-right-on-rectangle -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 登录按钮 -->
      <SignInButton mode="modal">
        <button id="bindLogin"
          :disabled="isAuthLoading"
          class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-medium to-blue-dark text-white hover:opacity-90 transition-all text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
        >
          {{ isAuthLoading ? 'Loading...' : 'Log in / Sign up' }}
        </button>
      </SignInButton>
    </template>
  </div>

  <!-- 移动端用户菜单（在导航滑出菜单内）-->
  <template v-if="isMobile">
    <div v-if="isSignedIn" class="pt-4 border-t border-gray-200">
      <!-- 用户信息区域 -->
      <div class="flex items-center gap-3 mb-4">
        <!-- <img
          :src="userDisplay?.imageUrl || '/default-avatar.png'"
          :alt="userDisplay?.username ? `${userDisplay.username}'s Profile Picture - Hailuo02 Video` : 'Default User Avatar - Hailuo02 Video'"
          loading="lazy"
          class="w-10 h-10 rounded-full object-cover ring-2 ring-baby-pink/20"
        /> -->
        <div>
          <p class="text-gray-800 font-medium text-white">
            {{ userDisplay?.username }}
          </p>
          <!-- <p
            v-if="userDisplay?.email"
            class="text-xs text-gray-500 max-w-[180px] truncate"
          >
            {{ userDisplay?.email }}
          </p> -->

          <div class="mt-1">
            <div class="flex items-center py-2">
              <p class="text-xs text-gray-600 text-white">
               My Credits:
              </p>
              <div class="ml-2">
                <template v-if="isCreditsLoading">
                  <div class="w-4 h-4 border-2 border-baby-coral border-t-transparent rounded-full animate-spin"></div>
                </template>
                <template v-else>
                  <p class="text-lg font-medium text-baby-coral text-green-800">
                    {{ limit || 0 }}
                  </p>
                </template>
              </div>
            </div>
            
            <div v-if="vipLastTime" class="flex justify-between">
              <p class="text-xs text-gray-600">VIP expiration time:</p>
              <p class="text-xs text-gray-400">
                {{ vipLastTime }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 按钮区域 - 垂直排列 -->
      <div class="space-y-3">
        <!-- 分享链接按钮 -->
        <button
          v-if="hasPromotionPermission && promotionLink"
          @click="copyPromotionLink"
          class="w-full py-3 px-6 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-baby-pink/20 to-baby-coral/10 border border-baby-pink/30 hover:from-baby-pink/30 hover:to-baby-coral/20 active:scale-95 transition-all duration-300 text-base font-semibold text-baby-coral shadow-sm hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          <span class="whitespace-nowrap">copy promotion link</span>
        </button>

        <!-- 退出按钮 -->
        <SignOutButton>
          <button
            class="w-full py-3 px-6 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200/50 hover:from-red-100/50 hover:to-red-200/30 active:scale-95 transition-all duration-300 text-base font-semibold text-red-600 shadow-sm hover:shadow-md">
            <!-- Heroicons: logout/arrow-right-on-rectangle -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
              </svg>
            <span class="whitespace-nowrap">Sign Out</span>
          </button>
        </SignOutButton>
      </div>
    </div>

    <!-- 移动端登录按钮 -->
    <SignInButton v-else mode="modal">
      <button id="bindLogin"
        :disabled="isAuthLoading"
        class="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-blue-medium to-blue-dark text-white hover:opacity-90 transition-all text-base font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
      >
        {{ isAuthLoading ? 'Loading...' : 'Log in / Sign up' }}
      </button>
    </SignInButton>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";
import { useClerkAuth } from '~/utils/auth'
import { useUserStore } from '~/stores/user';
import { setUserInfo, getCurrentUser } from '~/api/index'
import { useNuxtApp } from 'nuxt/app'
import { useRuntimeConfig } from 'nuxt/app'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
});
const { $toast } = useNuxtApp() as any
// 用户存储
const userStore = useUserStore();

// 状态管理
const limit = ref(0);
const vipLastTime = ref("");
const showUserMenu = ref(false);
const isAuthLoading = ref(true);
const isCreditsLoading = ref(false);
const promotionLink = ref('')
const hasPromotionPermission = ref(false)  // 添加权限状态

// 添加防重复请求的标记
const isGettingUserInfo = ref(false);
const hasGotUserInfo = ref(false);

// 引入auth认证
const { 
  user, 
  isSignedIn, 
  initAuth,
  on
} = useClerkAuth();

// 获取用户信息，次数、昵称、头像等
const getUserInfo = async (forceRefresh = false) => {
  // 防止重复请求，除非强制刷新
  if (!forceRefresh && (isGettingUserInfo.value || hasGotUserInfo.value)) {
    console.log('跳过重复的getUserInfo调用');
    return;
  }
  
  try {
    console.log('开始获取用户信息...');
    isGettingUserInfo.value = true;
    isCreditsLoading.value = true;
    
    const response = await getCurrentUser() as any;
    if (response.code === 200 && response.data) {
      const userData = response.data;
      
      // 更新用户信息
      limit.value = userData.free_limit + userData.remaining_limit || 0;
      vipLastTime.value = userData.vipLastTime || "";
      
      // 处理分享链接
      if (userData.ivcode) {
        hasPromotionPermission.value = true;
        const baseUrl = useRuntimeConfig().public.baseUrl;
        promotionLink.value = `${baseUrl}?ivcode=${userData.ivcode}`;
      } else {
        hasPromotionPermission.value = false;
        promotionLink.value = '';
      }
      
      // 标记已获取用户信息
      hasGotUserInfo.value = true;
      console.log('用户信息获取成功');
    } else {
      // 如果获取失败，清除分享链接
      hasPromotionPermission.value = false;
      promotionLink.value = '';
      console.log('用户信息获取失败:', response);
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    // 出错时清除分享链接
    hasPromotionPermission.value = false;
    promotionLink.value = '';
  } finally {
    isCreditsLoading.value = false;
    isGettingUserInfo.value = false;
  }
}

// 设置用户信息的统一方法
const setUserData = (userData: any) => {
  if (!userData) return;
  
  limit.value = userData.free_limit + userData.remaining_limit || 0;
  vipLastTime.value = userData.vipLastTime || "";
  
  // 处理分享链接
  if (userData.ivcode) {
    hasPromotionPermission.value = true;
    const baseUrl = useRuntimeConfig().public.baseUrl;
    promotionLink.value = `${baseUrl}?ivcode=${userData.ivcode}`;
  } else {
    hasPromotionPermission.value = false;
    promotionLink.value = '';
  }
  
  // 标记已获取用户信息
  hasGotUserInfo.value = true;
  console.log('用户信息设置成功');
}

// 转换用户数据为组件需要格式
interface User {
  username: string;
  email?: string;
  imageUrl?: string;
}

const userDisplay = computed<User | null>(() => {
  if (!user.value) return null;

  return {
    username: user.value.username || user.value.fullName || "User",
    email: user.value.emailAddresses?.[0]?.emailAddress,
    imageUrl: user.value.imageUrl + '?width=64&height=64',
  };
});

// 切换用户菜单
const toggleUserMenu = async () => {
  // 如果菜单关闭，在打开时刷新用户信息
  if (!showUserMenu.value) {
    // 显示菜单
    showUserMenu.value = true;

    // 刷新用户信息（强制刷新）
    try {
      await getUserInfo(true);
    } catch (err) {
      console.error("Failed to refresh user info:", err);
    }
  } else {
    // 关闭菜单 
    showUserMenu.value = false;
  }
};

// 复制分享链接
const copyPromotionLink = () => {
  if (promotionLink.value) {
    navigator.clipboard.writeText(promotionLink.value)
      .then(() => {
        // 这里可以添加成功提示，如果你有toast组件的话
        $toast.success("Promotion link copied to clipboard");
      })
      .catch(err => {
        console.error("Copy promotion link failed:", err);
      });
  }
};

onMounted(async () => {
  try {
    // 初始化认证（启用预检测）
    await initAuth();

    // 立即检查当前状态，如果Clerk已经加载完成，立即结束loading
    if (isSignedIn.value !== undefined) {
      isAuthLoading.value = false;
      if (isSignedIn.value && !hasGotUserInfo.value) {
        await getUserInfo();
      }
    }

    // 减少超时时间，从5秒改为2秒
    setTimeout(() => {
      isAuthLoading.value = false;
    }, 2000);
    
    // 监听预检测登录事件
    on('preCheckLogin', async (userData: any) => {
      console.log('预检测登录成功，用户数据:', userData);
      isAuthLoading.value = false;
      
      // 直接使用预检测获取的用户数据，避免再次请求API
      if (userData && !hasGotUserInfo.value) {
        setUserData(userData);
      }
    });
    
    // 监听登录事件
    on('login', async (user: any) => {
      isAuthLoading.value = false;
      
      let from_login = "email";
      // 如果是github
      if (user.externalAccounts && user.externalAccounts[0]?.provider.includes("github")) {
        from_login = "github";
      } else if (user.externalAccounts && user.externalAccounts[0]?.provider.includes("google")) {
        from_login = "google";
      }
      
      const email = user.emailAddresses && user.emailAddresses.length > 0
          ? user.emailAddresses[0].emailAddress
          : (user.externalAccounts && user.externalAccounts[0]?.emailAddress || '');
        
      const avatar = user.imageUrl || 
        (user.externalAccounts && user.externalAccounts[0]?.imageUrl || '');
      
      const nickname = user.username || 
        (user.externalAccounts && user.externalAccounts[0]?.username || '') || 
        user.fullName || '';

      // 获取URL中的ivcode参数
      const urlParams = new URLSearchParams(window.location.search);
      const ivcode = urlParams.get('ivcode');

      // 构建setUserInfo的参数对象
      const userInfoParams: any = {
        uuid: user.id,
        email,
        from_login,
        avatar,
        nickname
      };

      // 如果存在ivcode，添加到参数中
      if (ivcode) {
        userInfoParams.ivcode = ivcode;
      }

      setUserInfo(userInfoParams).then(() => {
        // 设置用户信息成功后，只有在还没有获取用户信息时才调用
        if (!hasGotUserInfo.value) {
          getUserInfo();
        }
      }).catch((error) => {
        console.error("设置用户信息失败:", error);
        isAuthLoading.value = false;
      });
    });
    
    on('logout', async () => {
      console.log('🧹 [UserMenu] 清除用户界面状态')
      document.cookie = `auth_token=; Path=/; max-age=0;`;
      document.cookie = `auth_token_expiry=; Path=/; max-age=0;`;
      console.log('清除cookie成功');
      // 清除用户界面状态
      limit.value = 0;
      vipLastTime.value = "";
      isAuthLoading.value = false;
      // 重置用户信息获取状态
      hasGotUserInfo.value = false;
    });

    // 监听Clerk加载完成事件，更新认证加载状态
    on('clerkLoaded', async (isSignedIn: boolean) => {
      isAuthLoading.value = false;
      // 如果Clerk加载完成且用户已登录，获取用户信息
      if (isSignedIn && !hasGotUserInfo.value) {
        await getUserInfo();
      }
    });
    
    // 监听错误事件，确保用户界面不会一直处于加载状态
    on('error', (error: any) => {
      isAuthLoading.value = false;
      console.error("认证系统错误:", error);
    });

    // 添加额外的状态检查，确保loading状态不会卡住
    // 监听isSignedIn的变化
    watchEffect(() => {
      if (isSignedIn.value !== undefined) {
        // 如果用户状态已经确定，立即结束loading
        setTimeout(() => {
          isAuthLoading.value = false;
        }, 100);
      }
    });

    // 点击外部关闭用户菜单
    if (process.client) {
      document.addEventListener("click", (event: MouseEvent) => {
        // 如果点击的不是用户菜单区域，则关闭菜单
        const target = event.target as HTMLElement;
        if (
          showUserMenu.value &&
          target &&
          !target.closest(".user-menu-container")
        ) {
          showUserMenu.value = false;
        }
      });
    }
  } catch (err) {
    isAuthLoading.value = false;
    console.error("组件挂载时加载用户信息失败:", err);
  }
});
</script> 
