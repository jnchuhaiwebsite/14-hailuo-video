<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :fetchpriority="fetchpriority"
    :preload="preload"
    :class="imgClass"
    :style="imgStyle"
    :placeholder="placeholder"
    :format="format"
    :quality="quality"
    :sizes="sizes"
  />
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  preload?: boolean
  imgClass?: string
  imgStyle?: string | Record<string, string>
  placeholder?: string
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
  quality?: number
  sizes?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  fetchpriority: 'auto',
  preload: false,
  format: 'webp',
  quality: 80,
  sizes: '100vw'
})
</script> 