<template>
  <button
    @click="scrollToTop"
    class="fixed bottom-20 right-8 w-12 h-12 rounded-full bg-theme text-black shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50"
    :class="{ 'opacity-0 translate-y-10 pointer-events-none': !isVisible, 'opacity-100 translate-y-0': isVisible }"
    aria-label="Back to top"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const visibilityThreshold = 300

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  isVisible.value = window.scrollY > visibilityThreshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
