<template>
    <section class="hailuo-ai-video-use-cases">
      <div class="container">
        <h2 class="section-title"> See What's Possible with Hailuo 02 AI Video Generator</h2>
        <p class="section-description">
            From social media crazes to cinematic previews, creators are building the future of content.
        </p>
  
        <!-- Use Cases -->
        <div class="use-cases">
          <div class="use-case-card">
            <div class="video-container" ref="videoContainer1">
              <video 
                ref="video1"
                loop 
                muted 
                playsinline 
                loading="lazy"
                preload="none"
                poster="/video/Film-Production.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast"
              >
                <source src="/video/Film-Production.mp4" type="video/mp4">
              </video>
            </div>
            <h3>Film Production</h3>
            <p>
              Quickly generate complex special effects shots, such as acrobatics and fantasy scenes, reducing production time and costs.
            </p>
          </div>
  
          <div class="use-case-card">
            <div class="video-container" ref="videoContainer2">
              <video 
                ref="video2"
                loop 
                muted 
                playsinline 
                loading="lazy"
                preload="none"
                poster="/video/Advertising.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast"
              >
                <source src="/video/Advertising.mp4" type="video/mp4">
              </video>
            </div>
            <h3>Advertising</h3>
            <p>
              Create low-cost, high-quality video materials for brand advertisements to meet diverse creative demands.
            </p>
          </div>
  
          <div class="use-case-card">
            <div class="video-container" ref="videoContainer3">
              <video 
                ref="video3"
                loop 
                muted 
                playsinline 
                loading="lazy"
                preload="none"
                poster="/video/Corporate-Promotions.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast"
              >
                <source src="/video/Corporate-Promotions.mp4" type="video/mp4">
              </video>
            </div>
            <h3>Corporate Promotions</h3>
            <p>
              Provide small and medium businesses with affordable promotional videos to improve brand image and market competitiveness.
            </p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const videoContainer1 = ref(null)
  const videoContainer2 = ref(null)
  const videoContainer3 = ref(null)
  const video1 = ref(null)
  const video2 = ref(null)
  const video3 = ref(null)

  const observers = []

  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('video')
      if (entry.isIntersecting) {
        // 当视频进入视口时开始播放
        video.play().catch(() => {
          // 处理自动播放策略导致的错误
          console.log('Video autoplay failed')
        })
      } else {
        // 当视频离开视口时暂停播放
        video.pause()
      }
    })
  }

  onMounted(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // 当50%的视频容器可见时触发
    }

    const containers = [videoContainer1.value, videoContainer2.value, videoContainer3.value]
    
    containers.forEach(container => {
      if (container) {
        const observer = new IntersectionObserver(handleIntersection, options)
        observer.observe(container)
        observers.push(observer)
      }
    })
  })

  onUnmounted(() => {
    // 清理所有观察者
    observers.forEach(observer => observer.disconnect())
  })
  </script>
  
  <style scoped>
  .hailuo-ai-video-use-cases {
    @apply bg-blue-pale;
    color: white;
    padding: 80px 20px;
    position: relative;
    overflow: hidden;
  }
  
  .hailuo-ai-video-use-cases::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 10% 10%, rgba(124, 58, 237, 0.05), transparent 40%);
    z-index: 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
  }
  
  .section-title {
    text-align: center;
    font-size: 2.8rem;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #7C3AED, rgba(124, 58, 237, 0.5));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }
  
  .section-description {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 60px;
    line-height: 1.6;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    color: #999;
  }
  
  .use-cases {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    flex-wrap: wrap;
    gap: 30px;
  }
  
  .use-case-card {
    background: rgba(31, 31, 31, 0.3);
    backdrop-filter: blur(8px);
    padding: 0;
    border-radius: 16px;
    width: calc(33.33% - 30px);
    min-width: 280px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid rgba(124, 58, 237, 0.1);
}

.video-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 14px 14px 0 0;
    position: relative;
    margin-bottom: 0;
}

.video-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.icon-container {
    margin-top: -40px;
    background: rgba(124, 58, 237, 0.1);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(8px);
    border: 2px solid rgba(124, 58, 237, 0.2);
}

.use-case-card h3 {
    font-size: 1.6rem;
    margin: 20px 30px;
    font-weight: 600;
    color: white;
}

.use-case-card p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #999;
    flex-grow: 1;
    padding: 0 30px 30px;
}
  
  .use-case-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #7C3AED, rgba(124, 58, 237, 0.5));
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }
  
  .use-case-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(124, 58, 237, 0.1);
    border-color: rgba(124, 58, 237, 0.3);
  }
  
  .use-case-card:hover::after {
    transform: scaleX(1);
  }
  
  .icon-container {
    background: rgba(124, 58, 237, 0.1);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    transition: all 0.3s ease;
  }
  
  .use-case-card:hover .icon-container {
    background: rgba(124, 58, 237, 0.2);
    transform: scale(1.1);
  }
  
  .use-case-icon {
    width: 50px;
    height: 50px;
    filter: drop-shadow(0 2px 4px rgba(124, 58, 237, 0.5));
  }
  
  .cta-container {
    text-align: center;
    margin-top: 40px;
  }
  
  .cta-btn {
    display: inline-block;
    background: linear-gradient(90deg, #7C3AED, rgba(124, 58, 237, 0.8));
    color: white;
    padding: 16px 36px;
    text-decoration: none;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
    transition: all 0.3s ease;
    border: none;
    position: relative;
    overflow: hidden;
  }
  
  .cta-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2));
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  .cta-btn:hover {
    background: linear-gradient(90deg, rgba(124, 58, 237, 0.9), #7C3AED);
    transform: translateY(-3px);
    box-shadow: 0 15px 25px rgba(124, 58, 237, 0.4);
  }
  
  .cta-btn:hover::after {
    transform: translateX(100%);
  }
  
  @media (max-width: 1200px) {
    .use-case-card {
      width: calc(50% - 30px);
    }
    
    .section-title {
      font-size: 2.5rem;
    }
  }
  
  @media (max-width: 768px) {
    .use-case-card {
      width: 100%;
      max-width: 450px;
      margin: 0 auto 20px;
    }
    
    .section-title {
      font-size: 2.2rem;
    }
    
    .section-description {
      font-size: 1.1rem;
      margin-bottom: 40px;
    }
    
    .hailuo-ai-video-use-cases {
      padding: 60px 15px;
    }
  }
  </style>
  