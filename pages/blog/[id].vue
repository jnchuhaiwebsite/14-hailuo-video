<template>
  <div class="min-h-screen bg-gray-900">
    <div class="pt-32 py-10 mx-auto w-11/12 max-w-4xl">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center text-gray-300 hover:text-[#7C3AED] transition-colors mb-8 group font-medium"
        @click.prevent="handleBackToList"
      >
        <div class="w-3 h-3 border-l-2 border-b-2 border-gray-300 group-hover:border-[#7C3AED] transform rotate-45 mr-2 transition-colors"></div>
        Back to Blog
      </NuxtLink>

      <!-- Loading state -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C3AED]"></div>
      </div>

      <!-- Blog content -->
      <article v-else-if="post" class="prose prose-invert max-w-none bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm">
        <h1 class="text-3xl md:text-4xl font-bold mb-6 text-[#7C3AED] border-l-4 border-[#7C3AED] pl-4">{{ post.title}}</h1>
        
        <div class="flex items-center gap-4 mb-8">
          <span class="px-2 md:px-3 py-1 bg-[#7C3AED] text-white text-xs rounded-full">
            {{ getCategoryLabel(post.category) }}
          </span>
          <span class="text-gray-400 text-sm">{{ formatDate(post) }}</span>
        </div>

        <!-- Rich text content -->
        <div class="text-gray-300 space-y-6 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-100 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-100 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-gray-100 [&>p]:text-gray-300 [&>p]:leading-relaxed [&>a]:text-[#7C3AED] [&>a]:hover:text-[#8B5CF6] [&>strong]:text-gray-100 [&>code]:text-gray-100 [&>code]:bg-gray-700 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>blockquote]:border-l-4 [&>blockquote]:border-[#7C3AED] [&>blockquote]:pl-4 [&>blockquote]:text-gray-300 [&>hr]:border-gray-600 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:marker:text-gray-400 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:marker:text-gray-400" v-html="post.content"></div>

        <!-- Related articles section -->
        <div class="mt-12 pt-8 border-t border-gray-700" v-if="relatedPosts.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink 
              v-for="relatedPost in relatedPosts" 
              :key="relatedPost.id"
              :to="`/blog/${relatedPost.id}`"
              class="p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h2 class="font-medium mb-2 text-lg text-gray-200">{{ relatedPost.title }}</h2>
              <p class="text-sm text-gray-400 line-clamp-2">{{ relatedPost.description }}</p>
            </NuxtLink>
          </div>
        </div>

        <!-- Action button -->
        <div class="text-center mt-12">
          <NuxtLink
            to="/"
            class="inline-flex items-center px-8 py-4 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
          >
            <span class="mr-2">👉</span>
            Back to Home
          </NuxtLink>
        </div>
      </article>
      
      <!-- Error state -->
      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-white mb-4">Blog post not found</h2>
        <p class="text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <NuxtLink 
          to="/blog" 
          class="inline-flex items-center px-8 py-4 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
        >
          Back to Blog
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlogPosts } from '~/composables/useBlogPosts';
import { useSeo } from '~/composables/useSeo';

const route = useRoute();
const router = useRouter();
const isFromList = ref(false);

// 在组件挂载时检查来源
onMounted(() => {
  // 检查是否从列表页面进入
  isFromList.value = document.referrer.includes('/blog');
});

//获取文章数据
const { getPostById, allPosts } = useBlogPosts();

//获取文章内容
const post = computed(() => {
  const postId = route.params.id as string;
  if(!postId) {
    return null;
  }
  try {
    const foundPost = getPostById(postId);
    if (!foundPost) {
      router.push('/404');
      return null;
    }
    return foundPost;
  } catch (error) {
    router.push('/404');
    return null;
  }
});

//获取相关文章
const relatedPosts = computed(() => {
  if (!post.value) return [];
  return allPosts.value
    .filter(p => p.category === post.value?.category && p.id !== post.value?.id)
    .slice(0, 2); // Just show maximum 2 related posts
});

//获取文章描述
const metaDescription = computed(() => {
  if (!post.value) return '';
  return post.value.description.length > 155 
    ? post.value.description.substring(0, 155) + '...'
    : post.value.description;
});

//获取文章标题
const title = computed(() => {
  if (!post.value) return '';
  return post.value.title.length > 55 
    ? post.value.title.substring(0, 55) + '...' 
    : post.value.title;
});

//设置页面元数据
useSeo({
  title: `${title.value} - Hailuo02 Video Blog`,
  description: metaDescription.value,
  ogType: 'article',
  ogTitle: `${title.value} - Hailuo02 Video Blog`,
  ogDescription: metaDescription.value,
  twitterTitle: `${title.value} - Hailuo02 Video Blog`,
  twitterDescription: metaDescription.value,
  other: [
    { property: 'article:published_time', content: post.value?.date || '' },
    { property: 'article:section', content: post.value?.category || '' },
    { property: 'article:tag', content: 'AI video generation, text to video, image to video, video creation' },
    { property: 'article:author', content: 'Hailuo02 Video Team' },
    { property: 'article:publisher', content: 'Hailuo02 Video' }
  ]
});

//返回列表
const handleBackToList = () => {
  if (window.history.length > 2) {
    router.back();
  } else {
    router.push('/blog');
  }
};
</script>