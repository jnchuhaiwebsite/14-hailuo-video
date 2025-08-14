<template>
  <section class="py-20 bg-blue-pale/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          Seedance 1.0 Pro Examples
        </h2>
        <p class="mt-4 text-xl text-gray-300">
          Browse these professional Seedance 1.0 Pro examples, copy any prompt verbatim, and instantly create your own studio-quality videos with our advanced multi-shot AI technology.
        </p>
      </div>
      <div class="mt-16 flex flex-wrap justify-center gap-6">
        <div
          v-for="(item, itemIndex) in cases"
          :key="itemIndex"
          class="group flex w-[380px] flex-col overflow-hidden rounded-lg bg-gray-800 shadow-xl"
          @mouseenter="handleMouseEnter(itemIndex)"
          @mouseleave="handleMouseLeave(itemIndex)"
        >
          <div class="relative flex h-[285px] items-center justify-center bg-black">
            <div v-if="loadingIndex === itemIndex" class="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
              <div class="h-12 w-12 animate-spin rounded-full border-4 border-[#7C3AED] border-t-transparent"></div>
            </div>
            <video
              :ref="el => { if (el) videoRefs[itemIndex] = el as HTMLVideoElement }"
              :src="item.video"
              :poster="item.poster"
              class="h-full w-full object-cover"
              :preload="item.poster ? 'none' : 'metadata'"
              @loadstart="onLoadStart(itemIndex)"
              @canplay="onCanPlay(itemIndex)"
              @error="onVideoError(itemIndex)"
              @waiting="onVideoWaiting(itemIndex)"
              @playing="onVideoPlaying(itemIndex)"
              playsinline
              webkit-playsinline
              x5-playsinline
              x5-video-player-type="h5"
              x5-video-player-fullscreen="false"
              muted
              loop
            ></video>
            <div class="pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div class="mb-2 flex justify-end">
                <button
                  @click.stop="copyDesc(itemIndex)"
                  class="pointer-events-auto rounded-full bg-black bg-opacity-25 p-2 transition-colors hover:bg-opacity-50 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-white line-clamp-2">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16 text-center">
      <div class="text-2xl text-gray-400 mb-6">
        Ready to create professional videos with Seedance 1.0 Pro?
      </div>
      <button
        @click="scrollToTop"
        class="bg-[#7C3AED]/50 text-white hover:bg-[#7C3AED]/90 text-black font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none text-xl"
      >
        Generate with Seedance 1.0 Pro
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
    video: "https://resp.hailuo2.com/hailuo/video/City-Awakens-with-Cycling.mp4",
    poster: "https://resp.hailuo2.com/hailuo/image/City-Awakens-with-Cycling.webp",
    desc: "The sun slowly rises between tall buildings. [Ground tracking shot] Bicycle tires roll over dew-covered streets. The rider passes under a bridge, where sunlight filters through in dappled patches, as the whole city gradually wakes."
  },
  {
    video: "https://resp.hailuo2.com/hailuo/video/Comic-Style-Morning-Stretch.mp4",
    poster: "https://resp.hailuo2.com/hailuo/image/Comic-Style-Morning-Stretch.webp",
    desc: "In an American comic-style 2D animation, a medium-close shot captures a young, handsome white man releasing his hands, stretching, and yawning. The scene cuts to a woman holding a camera, photographing the man, who sits with his hands clasped, elbows resting on his knees. The shot then switches to an overhead view of a magazine on a table, as a hand enters from the lower left corner, setting down a steaming cup of coffee on the magazine."
  },
  {
    video: "https://resp.seedancepro.net/seedance/CaseStudies/Pixel-City.mp4",
    poster: "https://resp.seedancepro.net/seedance/image_case/Pixel-City.webp",
    desc: "8-bit pixel art style. A pixelated Manhattan skyline at dusk, with helicopters weaving between the towering, glowing skyscrapers. Retro video game aesthetic."
  },
  {
    video: "https://resp.seedancepro.net/seedance/CaseStudies/Underwater-Whale.mp4",
    poster: "https://resp.seedancepro.net/seedance/image_case/Underwater-Whale.webp",
    desc: "In a vast underwater canyon, ethereal god rays pierce the clear blue water from the surface. A majestic whale glides gracefully and peacefully between towering coral cliffs, its movements slow and serene."
  },
  {
    video: "https://resp.seedancepro.net/seedance/CaseStudies/Detective-Story.mp4",
    poster: "https://resp.seedancepro.net/seedance/image_case/Detective-Story.webp",
    desc: "Multiple shots, film noir style. Shot 1: A detective enters a dimly lit room, light slanting through dusty blinds. Shot 2: A close-up on his gloved hand examining clues on a desk—a faded photograph, a mysterious key. Shot 3: He picks up the key, holding it up to the light. Shot 4: Cut to a tight shot of his face, half in shadow, his eyes narrowing in thought."
  },
  {
    video: "https://resp.hailuo2.com/hailuo/video/Quantum-Lab-Crisis.mp4",
    poster: "https://resp.hailuo2.com/hailuo/image/Quantum-Lab-Crisis.webp",
    desc: "A surreal sci-fi movie scene in a panoramic view: inside a futuristic laboratory, at the center stands a quantum computer, surrounded by a scientist operating a holographic projection screen. The camera cuts to a close-up of the quantum computer, which suddenly bursts into a red glow. Then the shot shifts to a low-angle close-up of the scientist’s face, the red halo casting over him as his expression turns anxious."
  },
  {
    video: "https://resp.seedancepro.net/seedance/CaseStudies/Felted-Deer.mp4",
    poster: "https://resp.seedancepro.net/seedance/image_case/Felted-Deer.webp",
    desc: "Wool felt art style. A small, brown felted deer bows its head to gently sniff a pink felt mushroom. White dandelion seeds float past on a gentle breeze. The scene is lit by dappled sunlight, as if filtered through the leaves of a tree."
  },
  {
    video: "https://resp.seedancepro.net/seedance/CaseStudies/Forest-Sunrise.mp4",
    poster: "https://resp.seedancepro.net/seedance/image_case/Forest-Sunrise.webp",
    desc: "Cinematic aerial drone shot of a dense forest at sunrise. Golden hour light streams through thick layers of morning mist. The camera slowly pushes forward just above the tree canopy, gradually revealing a majestic waterfall in the distance. Hyperrealistic detail, soft lighting, and a shallow depth of field create a dreamy, ethereal atmosphere."
  },
  {
    video: "https://resp.hailuo2.com/hailuo/video/Red-Alien-Horizon.mp4",
    poster: "https://resp.hailuo2.com/hailuo/image/Red-Alien-Horizon.webp",
    desc: "At sunset, a blazing red alien landscape stretches out. Massive arched rock formations rise from the plain. A giant planet hangs low in the sky. Three human explorers walk slowly across the reflective ground. The camera follows them toward the gleaming horizon, their long shadows stretching across the warm red sand. A gentle breeze lifts crimson dust. Ahead, towering spires pierce the clouds like ancient alien monoliths. A colossal ringed planet gradually emerges on the right. The camera slowly tracks along their left side, framing their silhouettes against the molten sky, highlighting their scale and solitude. As they approach the largest structure, the reflection of the sky and shapes flickers beneath them, like fading memories of Earth."
  }
];

const playingIndex = ref<number|null>(null);//当前播放的索引
const copiedIndex = ref<number|null>(null);//当前复制的索引
const loadingIndex = ref<number|null>(null);//当前加载的索引
const videoRefs = ref<HTMLVideoElement[]>([]);

const runAfterPostersLoaded = (callback: () => void) => {
  const posterUrls = cases
    .map(c => c.poster)
    .filter(Boolean) as string[];

  if (posterUrls.length === 0) {
    callback();
    return;
  }

  let loadedCount = 0;
  const totalPosters = posterUrls.length;

  posterUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    const onFinish = () => {
      loadedCount++;
      if (loadedCount === totalPosters) {
        callback();
      }
    };
    img.onload = onFinish;
    img.onerror = onFinish; 
  });
};

function handleMouseEnter(idx: number) {
  const videoElement = videoRefs.value[idx];
  if (!videoElement) return;

  // 暂停其他正在播放的视频
  videoRefs.value.forEach((vid, i) => {
    if (i !== idx && vid && !vid.paused) {
      vid.pause();
    }
  });

  playingIndex.value = idx;
  // 检查视频是否已准备好，防止在已缓存的视频上显示不必要的加载动画
  // HAVE_FUTURE_DATA (3) 或 HAVE_ENOUGH_DATA (4) 意味着可以开始播放
  if (videoElement.readyState < 3) {
    loadingIndex.value = idx;
  }
  const playPromise = videoElement.play();
  if (playPromise !== undefined) {
    playPromise.catch(e => {
      console.error('Video playback failed:', e);
      if (playingIndex.value === idx) playingIndex.value = null;
      if (loadingIndex.value === idx) loadingIndex.value = null;
    });
  }
}

function handleMouseLeave(idx: number) {
  const videoElement = videoRefs.value[idx];
  if (videoElement) {
    videoElement.pause();
    videoElement.currentTime = 0; // 重置视频到开头
    if (playingIndex.value === idx) {
      playingIndex.value = null;
    }
    if (loadingIndex.value === idx) {
      loadingIndex.value = null;
    }
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
// function onVideoPause(idx: number) {
//   if (playingIndex.value === idx) {
//     loadingIndex.value = null;
//   }
// }

// 视频加载错误
function onVideoError(idx: number) {
  loadingIndex.value = null;
  playingIndex.value = null;
  console.error(`Video loading error for index ${idx}`);
}

// 组件卸载时清理
onMounted(() => {
});

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
  $toast.success('copied to clipboard')
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style> 