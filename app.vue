<script setup lang="ts">
import { useNotificationStore } from '~/stores/notification'
import { onMounted } from 'vue'
import NotificationList from '~/components/NotificationList.vue'

const notificationStore = useNotificationStore()

onMounted(() => {
  
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NotificationList />
  </div>
</template>

<style>
/* 主题色 */
:root {
  /* 主题色 - 青色 */
  --theme-primary: #00ffd1;
  --theme-primary-hover: #00e6bc;
  
  /* 文字颜色 */
  --text-primary: #ffffff;
  --text-secondary: #a0aec0;
  
  /* 背景和边框 */
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
}

/* 主题色相关的通用类 */
.text-theme {
  color: var(--theme-primary);
}

.bg-theme {
  background-color: var(--theme-primary);
}

/* 修改hover-theme全局效果 */
.hover-theme:hover {
  background-color: var(--theme-primary-hover) !important;
}

/* 添加文本hover类 */
.hover-text-theme:hover {
  color: var(--theme-primary);
}

/* 博客相关样式 */
.blog-page-gradient {
  background-image: linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary));
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.main-content {
  flex: 1 0 auto;
}
</style>
