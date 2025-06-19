<template>
  <Transition name="toast">
    <div v-if="show" :class="[
      'fixed z-50',
      position === 'left' ? 'top-4 left-4' :
      position === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' :
      'top-4 right-4'
    ]">
      <div :class="[
        'px-6 py-4 rounded-xl shadow-2xl text-white flex items-center gap-3 min-w-[280px] max-w-[400px]',
        type === 'success' ? 'bg-emerald-500' :
        type === 'error' ? 'bg-rose-500' :
        type === 'warning' ? 'bg-amber-500' :
        'bg-sky-500',
        'backdrop-blur-sm bg-opacity-95 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.2)]'
      ]">
        <div class="flex-shrink-0">
          <svg v-if="type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else-if="type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <svg v-else-if="type === 'warning'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-medium text-md">{{ title }}</p>
          <p class="text-md opacity-90">{{ message }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue'

defineComponent({
  name: 'Toast'
})

const props = defineProps<{
  show: boolean
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  position?: 'left' | 'center' | 'right'
}>()

const show = ref(false)
const message = ref('')
const type = ref<'success' | 'error' | 'warning' | 'info'>('info')
const position = ref<'left' | 'center' | 'right'>('center')

const showToast = (
  msg: string, 
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info', 
  duration: number = 2000,
  toastPosition: 'left' | 'center' | 'right' = 'center'
) => {
  message.value = msg
  type.value = toastType
  position.value = toastPosition
  show.value = true
  setTimeout(() => {
    show.value = false
  }, duration)
}

// 监听 show prop 变化
watch(() => props.show, (newValue) => {
  show.value = newValue
  if (newValue && props.duration) {
    setTimeout(() => {
      show.value = false
    }, props.duration)
  }
}, { immediate: true })

// 监听 duration 变化
watch(() => props.duration, (newDuration) => {
  if (newDuration) {
    setTimeout(() => {
      show.value = false
    }, newDuration)
  }
})

defineExpose({
  show: showToast
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 为居中位置添加特殊动画 */
.toast-enter-from[class*="translate-x-1/2"] {
  transform: translate(-50%, 30px);
}

.toast-leave-to[class*="translate-x-1/2"] {
  transform: translate(-50%, 30px);
}
</style> 