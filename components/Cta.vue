<template>
    <div class="cta-card bg-blue-pale/80 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-[#7C3AED]/20 hover:border-[#7C3AED]/40 transition-all duration-300">
      <h3>Ready to Create Your Own Masterpiece?</h3>
      <p>Join thousands of creators and brands producing amazing video content with Hailuo 02.</p>
      <nuxt-link @click="scrollToHero" class="cta-btn">Start Creating Your Hailuo 02 Video Now</nuxt-link>
    </div>
  </template>
  
  <script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ctaText: {
      type: String,
      required: true
    },
    ctaLink: {
      type: String,
      required: true
    }
  });
  // 跳转到首页
const scrollToHero = () => {
  router.push('/hailuo-ai-video-generator')
};
  </script>
  
  <style scoped>
  .cta-card {
    padding: 2.5rem;
    border-radius: 0.75rem;
    text-align: center;
    margin: 3rem auto;
    max-width: 800px;
  }
  
  .cta-card h3 {
    font-size: 2rem;
    margin-bottom: 1.25rem;
    color: white;
    font-weight: 800;
    line-height: 1.2;
  }
  
  .cta-card p {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    color: rgb(209, 213, 219);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  .cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    text-decoration: none;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(to right, #7C3AED, rgba(124, 58, 237, 0.8));
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.1), 0 2px 4px -1px rgba(124, 58, 237, 0.06);
  }
  
  .cta-btn:hover {
    background: linear-gradient(to right, rgba(124, 58, 237, 0.9), rgba(124, 58, 237, 0.7));
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.2), 0 4px 6px -2px rgba(124, 58, 237, 0.1);
  }
  </style>
  