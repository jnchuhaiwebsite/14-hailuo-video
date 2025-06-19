<template>
  <div class="min-h-screen bg-blue-pale pb-10">
    <!-- Page title -->
    <div class="pt-32 pb-12 text-center">
      <h1 class="text-3xl md:text-4xl font-bold mb-2 text-[#7C3AED]">Hailuo02 Video Blog</h1>
      <p class="text-gray-400">Tips, tutorials, and inspiration for creating professional-quality videos with AI video generation</p>
    </div>
    
    <div class="flex flex-col md:flex-row gap-4 md:gap-8 mb-16 mx-auto w-11/12 max-w-7xl">
      <!-- Categories on the left -->
      <div class="w-full md:w-64">
        <div class="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          <div 
            class="px-3 md:px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap text-sm md:text-base"
            :class="currentCategory === 'all' ? 'bg-[#7C3AED] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
            @click="currentCategory = 'all'"
          >
            All
          </div>
          <div 
            v-for="category in allCategories" 
            :key="category"
            class="px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
            :class="currentCategory === category ? 'bg-[#7C3AED] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
            @click="currentCategory = category"
          >
            {{ category }}
          </div>
        </div>
      </div>

      <!-- Blog list on the right -->
      <div class="flex-1">
        <div class="space-y-4 md:space-y-6">
          <div 
            v-for="post in filteredPosts" 
            :key="post.id"
            class="block bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all border border-gray-700 hover:border-[#7C3AED] hover:translate-y-[-2px] cursor-pointer"
            @click="navigateToBlog(post.id)"
          >
            <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4 mb-3 md:mb-4">
              <div class="flex-1 min-w-0">
                <h2 class="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-200 truncate">{{ post.title }}</h2>
                <p class="text-sm md:text-base text-gray-400 line-clamp-2">{{ post.description }}</p>
              </div>
              <span class="px-2 md:px-3 py-1 bg-[#7C3AED] text-white text-xs md:text-sm rounded-full whitespace-nowrap inline-block w-fit">
                {{ getCategoryLabel(post.category) }}
              </span>
            </div>
            <div class="text-gray-500 text-xs md:text-sm">
              {{ post.date }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogPosts } from '~/composables/useBlogPosts'
import { useSeo } from '~/composables/useSeo'

const router = useRouter()

useSeo({
  title: "Hailuo02 Video Blog - AI Video Generation Tips",
  description: "Expert guides on creating professional-quality videos with Hailuo02 Video. Learn tips and tricks for AI video generation from text or images.",
  ogTitle: "Hailuo02 Video Blog - AI Video Generation Tips",
  ogDescription: "Expert guides on creating professional-quality videos with Hailuo02 Video. Learn tips and tricks for AI video generation from text or images.",
  twitterTitle: "Hailuo02 Video Blog - AI Video Generation Tips",
  twitterDescription: "Expert guides on creating professional-quality videos with Hailuo02 Video. Learn tips and tricks for AI video generation from text or images."
});

// Use blog posts data
const { 
  currentCategory, 
  filteredPosts, 
  getCategoryLabel,
  allCategories
} = useBlogPosts()

// 导航到博客详情页
const navigateToBlog = (id) => {
  router.push(`/blog/${id}`)
}

// Set canonical URL when mounted
onMounted(() => {
  // 添加结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Hailuo02 Video Blog",
    description: "Expert tutorials and insights on AI video generation from text or images",
    url: "https://www.hailuo2.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Hailuo02 Video",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png"
      }
    },
    blogPost: filteredPosts.value.map(post => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        "@type": "Organization",
        name: "Hailuo02 Video Team"
      }
    }))
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
</script>

<style>

</style>