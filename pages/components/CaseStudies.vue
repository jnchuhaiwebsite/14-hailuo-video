<template>
  <section class="py-20 bg-blue-pale">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          Amazing Case Studies
        </h2>
        <p class="mt-4 text-xl text-gray-300">
          Browse stunning AI-generated videos. Click the play button to watch.
        </p>
      </div>
      <div class="mt-16 columns-1 sm:columns-2 md:columns-3 gap-6">
        <div
          v-for="(item, idx) in cases"
          :key="idx"
          class="mb-6 break-inside-avoid bg-gray-800 rounded-lg overflow-hidden shadow-xl flex flex-col"
          style="width:auto;"
        >
          <div class="relative flex items-center justify-center bg-black">
            <div v-if="loadingIndex === idx" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#7C3AED] border-t-transparent"></div>
            </div>
            <video
              :src="item.video"
              :poster="item.poster"
              class="w-full h-auto min-h-[200px]"
              :preload="item.poster ? 'none' : 'metadata'"
              @ended="onVideoEnded"
              @click="playVideo(idx)"
              @loadstart="onLoadStart(idx)"
              @canplay="onCanPlay(idx)"
              @error="onVideoError(idx)"
              @waiting="onVideoWaiting(idx)"
              @playing="onVideoPlaying(idx)"
              @pause="onVideoPause(idx)"
              ref="videoRefs"
              playsinline
              webkit-playsinline
              x5-playsinline
              x5-video-player-type="h5"
              x5-video-player-fullscreen="false"
            ></video>
            <button 
              v-if="playingIndex !== idx"
              class="absolute inset-0 flex items-center justify-center w-full h-full focus:outline-none" 
              @click.stop="playVideo(idx)"
            >
              <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </button>
          </div>
          <div class="p-4 text-gray-200 text-left text-base flex items-center">
            {{ item.desc }}
          </div>
          <div class="px-4 pb-4 flex justify-end">
            <button
              @click="copyDesc(idx)"
              class="bg-[#7C3AED] hover:bg-[#8B5CF6] text-white text-sm px-3 py-1 rounded transition-colors focus:outline-none"
            >
            Copy prompt
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16 text-center">
      <h3 class="text-2xl text-gray-400 mb-6">
        Ready to create your own stunning videos?
      </h3>
      <button
        @click="scrollToTop"
        class="bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none text-xl"
      >
        Start Creating Your Masterpiece
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from 'nuxt/app'
const { $toast } = useNuxtApp() as any

const cases = [
  {
    video: "https://resource.hailuo2.com/seedance/video/seeddancepro-Inspiration-a-paper-folding-dragon.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/8.webp",
    desc: "A paper dragon unfolds from a sheet of paper and soars over folded mountain ranges. The camera pans through floating paper scraps, with each wing beat and fold revealing sharp geometric lines."
  },
  {
    video: "https://resource.hailuo2.com/seedance/video/Seedance-A-cathedral-carved-from-cold-ice.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/6.webp",
    desc: "A cathedral carved from cold ice, emanating a soft glow from within. The camera gradually moves from a wide-angle view to the entrance, revealing the intricate internal structure of the ice architecture."
  },
  {
    video: "https://resource.hailuo2.com/seedance/video/seeddancepro-Inspiration-A-bright-orange-sports-car-is-speeding-on-the-damp-track.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/7.webp",
    desc: "A bright orange sports car speeds along a wet track. Low-angle shots capture lightning flashing through dark storm clouds. The camera gradually rises to reveal the complete racing scene under the lights in the rain."
  },
  {
    video: "https://resource.hailuo2.com/seedance/video/seeddancepro-Inspiration-girl-looking-at-the-camera.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/5.webp",
    desc: "A girl looks at the camera, her earrings gently swaying as she turns, while the camera rotates in a dreamy sunlight."
  },
  {
    video: "https://resource.hailuo2.com/seedance/video/seeddancepro-Inspiration-wide-angle-lens-grassland-white-horse-girl.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/4.webp",
    desc: "Wide-angle lens captures golden grassland swaying in the wind, with a white horse standing still. In the mid-ground, a girl slowly approaches, her dress billowing in the breeze. She reaches out to touch the horse's nose, bathed in soft backlight."
  },
  {
    video: "https://resource.hailuo2.com/seedance/video/seeddancepro-Inspiration-track-the-bicycle-tires-on-the-ground-and-drive-through-chenlu-street.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/1.webp",
    desc: "The sun slowly rises between tall buildings. Ground-level tracking shot follows bicycle tires rolling through morning dew-covered streets. The rider passes under bridges with dappled light, as the entire city gradually awakens."
  },
  {
    video: "https://resource.hailuo2.com/seedance/video/seeddancepro-Inspiration-a-movie-level-aerial-shot-of-a-dense-forest-at-sunrise.mp4",
    poster: "https://resource.hailuo2.com/seedance/image/9.webp",
    desc: "A cinematic aerial shot of a dense forest at sunrise, with golden light streaming through layers of morning mist. The camera slowly advances above the treetops, gradually revealing a waterfall in the distance."
  }
];

const playingIndex = ref<number|null>(null);//当前播放的索引
const copiedIndex = ref<number|null>(null);//当前复制的索引
const loadingIndex = ref<number|null>(null);//当前加载的索引
const videoRefs = ref<HTMLVideoElement[]>([]);

// 视频播放
function playVideo(idx: number) {
  try {
    const videoElement = videoRefs.value[idx];
    if (!videoElement) return;

    if (playingIndex.value === idx) {
      // 暂停视频
      videoElement.pause();
      playingIndex.value = null;
      loadingIndex.value = null;
    } else {
      // 暂停其他正在播放的视频
      if (playingIndex.value !== null) {
        const currentVideo = videoRefs.value[playingIndex.value];
        if (currentVideo) {
          currentVideo.pause();
          loadingIndex.value = null;
        }
      }

      // 播放新视频
      loadingIndex.value = idx;
      playingIndex.value = idx; // 先设置播放索引
      
      // 尝试播放视频
      videoElement.play().catch((error) => {
        console.error('Video playback error:', error);
        loadingIndex.value = null;
        playingIndex.value = null;
      });
    }
  } catch(err) {
    console.error(err);
    loadingIndex.value = null;
    playingIndex.value = null;
  }
}

// 视频开始加载
function onLoadStart(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = idx;
  }
}

// 视频可以播放
function onCanPlay(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = null;
  }
}

// 视频等待缓冲
function onVideoWaiting(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = idx;
  }
}

// 视频开始播放
function onVideoPlaying(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = null;
  }
}

// 视频暂停
function onVideoPause(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = null;
  }
}

// 视频播放结束
function onVideoEnded() {
  playingIndex.value = null;
  loadingIndex.value = null;
}

// 视频加载错误
function onVideoError(idx: number) {
  loadingIndex.value = null;
  playingIndex.value = null;
  console.error(`Video loading error for index ${idx}`);
}

// 组件卸载时清理
onUnmounted(() => {
  // 暂停所有视频
  videoRefs.value.forEach(video => {
    if (video) {
      video.pause();
      video.src = '';
      video.load();
    }
  });
  playingIndex.value = null;
  loadingIndex.value = null;
});

function copyDesc(idx: number) {
  navigator.clipboard.writeText(cases[idx].desc);
  copiedIndex.value = idx;
  $toast.success('copied to clipboard');
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}
</style> 