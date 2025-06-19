import { ref, computed } from 'vue'
import { createError } from 'nuxt/app'

// Define blog post data structure
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  description: string;
  date: string;
  category: string;
  skip?: boolean;
  cta?: string;
}

// Blog post data
const blogPostsData: BlogPost[] = [
  {
    id: 'what-is-seedance',
    title: 'What is Seedance: A Revolutionary AI Video Generation Platform',
    content: `
      <h2 class="text-2xl font-bold mb-4">Introduction to Seedance: The Future of AI Video Generation</h2>
      <p>Welcome to Seedance, where we're transforming the way you create videos. Whether you're a content creator, marketer, or just someone who loves making videos, Seedance makes it easy to bring your ideas to life using the power of AI.</p>
      
      <h3 class="text-xl font-bold my-4">What is Seedance?</h3>
      <p>Seedance is your creative partner in video generation. We've built a platform that can turn your static images into dynamic videos or create entirely new videos from your text descriptions. Using cutting-edge AI technology, we help you create smooth, natural-looking videos that capture your vision perfectly.</p>
      
      <h3 class="text-xl font-bold my-4">Key Features and Capabilities</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Multiple Generation Methods
          <ul class="list-disc pl-5 mt-2">
            <li>Transform your photos into videos</li>
            <li>Create videos from text descriptions</li>
            <li>Add custom animations</li>
            <li>Apply different styles to your videos</li>
          </ul>
        </li>
        <li>Video Specifications
          <ul class="list-disc pl-5 mt-2">
            <li>Choose between 5 or 10 seconds</li>
            <li>Quick processing in 1-2 minutes</li>
            <li>High-quality output every time</li>
            <li>Multiple format support for easy sharing</li>
          </ul>
        </li>
        <li>User-Friendly Interface
          <ul class="list-disc pl-5 mt-2">
            <li>Simple and intuitive design</li>
            <li>Easy-to-use controls</li>
            <li>Real-time previews</li>
            <li>Quick access to all features</li>
          </ul>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Generation Methods</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Image-to-Video
          <ul class="list-disc pl-5 mt-2">
            <li>Use any image you like</li>
            <li>Choose between 480P or 1080P quality</li>
            <li>Keep your original image's aspect ratio</li>
            <li>Perfect for bringing photos to life</li>
          </ul>
        </li>
        <li>Text-to-Video
          <ul class="list-disc pl-5 mt-2">
            <li>Pick from multiple aspect ratios:
              <ul class="list-disc pl-5 mt-2">
                <li>1:1 (Perfect for social media)</li>
                <li>16:9 (Great for widescreen)</li>
                <li>4:3 (Classic format)</li>
                <li>21:9 (Ultrawide experience)</li>
                <li>9:16 (Vertical video)</li>
                <li>3:4 (Portrait mode)</li>
              </ul>
            </li>
            <li>Create videos from your imagination</li>
            <li>High-quality results every time</li>
          </ul>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Applications and Use Cases</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Content Creation
          <ul class="list-disc pl-5 mt-2">
            <li>Social media content that stands out</li>
            <li>Engaging marketing materials</li>
            <li>Educational videos that capture attention</li>
            <li>Entertaining content for your audience</li>
          </ul>
        </li>
        <li>Professional Use
          <ul class="list-disc pl-5 mt-2">
            <li>Eye-catching digital marketing</li>
            <li>Product videos that sell</li>
            <li>Professional presentations</li>
            <li>Training materials that engage</li>
          </ul>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Getting Started</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Platform Access
          <ul class="list-disc pl-5 mt-2">
            <li>Create your account</li>
            <li>Choose the plan that fits your needs</li>
            <li>Explore the dashboard</li>
            <li>Start creating amazing videos</li>
          </ul>
        </li>
        <li>Basic Workflow
          <ul class="list-disc pl-5 mt-2">
            <li>Pick your creation method</li>
            <li>Upload an image or write your idea</li>
            <li>Adjust your settings</li>
            <li>Generate and share your video</li>
          </ul>
        </li>
      </ul>

      <h3 class="text-xl font-bold my-4">Model Performance</h3>
      <p>Below are the results of Seedance 1.0 in internal benchmarks using SeedVideoBench-1.0 and on the third-party platform Artificial Analysis.</p>
      
      <h4 class="text-lg font-bold my-3">SeedVideoBench-1.0: Multi-Dimensional Evaluation</h4>
      <p>In comparison with other industry models, Seedance 1.0 performed well across core dimensions including prompt adherence, motion quality, and aesthetics.</p>
      
      <div class="my-6">
        <img src="/img/T2VRadarChart.webp" alt="T2V Radar Chart" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
        <p class="text-sm text-gray-300 text-center">Achieved high scores in T2V tasks for prompt adherence, motion quality, and aesthetics. Due to unavailable public data, the Elo score for Kling 2.1 is taken from Kling 2.0.</p>
      </div>
      
      <div class="my-6">
        <img src="/img/I2VRadarChart.webp" alt="I2V Radar Chart" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
        <p class="text-sm text-gray-300 text-center">Achieved high scores in I2V tasks for prompt adherence, motion quality, and aesthetics.</p>
      </div>

      <h4 class="text-lg font-bold my-3">Artificial Analysis Video Arena</h4>
      
      <div class="my-6">
        <img src="/img/T2VLeaderboard.webp" alt="T2V Leaderboard" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
        <p class="text-sm text-gray-300 text-center">Source: Artificial Analysis official website. As of 2025-06-09 11:00 (GMT+8).</p>
      </div>
      
      <div class="my-6">
        <img src="/img/I2VLeaderboard.webp" alt="I2V Leaderboard" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
        <p class="text-sm text-gray-300 text-center">Source: Artificial Analysis official website. As of 2025-06-09 11:00 (GMT+8).</p>
      </div>
      
      <p>Ready to start creating amazing videos? Seedance makes it easy to bring your ideas to life. Whether you're a professional or just getting started, our platform gives you the tools you need to create stunning videos in minutes. Join us today and discover the future of video creation!</p>
    `,
    description: 'A comprehensive guide to understanding Seedance, the revolutionary AI video generation platform',
    date: 'June 14, 2025',
    category: 'Platform',
    skip: false,
    cta: "Try Now",
  },
  {
    id: 'image-to-video-generation',
    title: 'How to Generate Videos from Images with Seedance: A Step-by-Step Guide',
    content: `
      <h2 class="text-2xl font-bold mb-4">Creating Dynamic Videos from Static Images</h2>
      <p>Ready to turn your favorite photos into engaging videos? With Seedance, you can transform any image into a dynamic video in just a few clicks. Let's walk through how to create amazing videos from your images.</p>
      
      <h3 class="text-xl font-bold my-4">Image-to-Video Generation Overview</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Key Features
          <ul class="list-disc pl-5 mt-2">
            <li>Use any image you want</li>
            <li>Choose between 480P or 1080P quality</li>
            <li>Create 5 or 10-second videos</li>
            <li>Get your video in 1-2 minutes</li>
          </ul>
        </li>
        <li>Output Specifications
          <ul class="list-disc pl-5 mt-2">
            <li>Quality matches your original image</li>
            <li>Keeps your image's natural proportions</li>
            <li>High-quality video output</li>
            <li>Easy to share in multiple formats</li>
          </ul>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Step-by-Step Generation Process</h3>
      <ol class="list-decimal pl-5 mb-6">
        <li>Image Upload
          <ul class="list-disc pl-5 mt-2">
            <li>Pick your favorite image</li>
            <li>Upload it to the platform</li>
            <li>Check that it looks good</li>
            <li>Make sure it's in a supported format</li>
          </ul>
        </li>
        <li>Generation Settings
          <ul class="list-disc pl-5 mt-2">
            <li>Choose between 5 or 10 seconds</li>
            <li>Select 480P or 1080P quality</li>
            <li>Adjust any additional settings</li>
            <li>Pick your preferred format</li>
          </ul>
        </li>
        <li>Processing
          <ul class="list-disc pl-5 mt-2">
            <li>Click generate and relax</li>
            <li>Wait 1-2 minutes for processing</li>
            <li>Preview your video</li>
            <li>Make any needed adjustments</li>
          </ul>
        </li>
        <li>Final Output
          <ul class="list-disc pl-5 mt-2">
            <li>Download your video</li>
            <li>Check the quality</li>
            <li>Share it with the world</li>
            <li>Save it to your library</li>
          </ul>
        </li>
      </ol>
      
      <h3 class="text-xl font-bold my-4">Best Practices</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Image Selection
          <ul class="list-disc pl-5 mt-2">
            <li>Pick clear, well-lit images</li>
            <li>Consider the composition</li>
            <li>Check the image quality</li>
            <li>Make sure the subject is well-positioned</li>
          </ul>
        </li>
        <li>Generation Tips
          <ul class="list-disc pl-5 mt-2">
            <li>Start with the default settings</li>
            <li>Try different durations</li>
            <li>Test various resolutions</li>
            <li>Optimize for your platform</li>
          </ul>
        </li>
      </ul>
      
      <p>Creating videos from your images has never been easier. With Seedance, you can transform your photos into engaging videos in minutes. Follow these steps and start creating amazing content today!</p>
    `,
    description: 'A comprehensive guide to generating videos from images using Seedance',
    date: 'June 14, 2025',
    category: 'Tutorials',
    skip: false,
    cta: "Learn More",
  },
  {
    id: 'text-to-video-generation',
    title: 'Text-to-Video Generation with Seedance: Creating Videos from Text Descriptions',
    content: `
      <h2 class="text-2xl font-bold mb-4">Transforming Text into Dynamic Videos</h2>
      <p>Have an idea for a video but don't know where to start? With Seedance's text-to-video generation, you can turn your ideas into reality just by describing what you want. Let's explore how to create amazing videos from your text descriptions.</p>
      
      <h3 class="text-xl font-bold my-4">Text-to-Video Generation Overview</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Key Features
          <ul class="list-disc pl-5 mt-2">
            <li>Choose from multiple aspect ratios</li>
            <li>Create 5 or 10-second videos</li>
            <li>Get results in 1-2 minutes</li>
            <li>High-quality output every time</li>
          </ul>
        </li>
        <li>Aspect Ratio Options
          <ul class="list-disc pl-5 mt-2">
            <li>1:1 (Perfect for Instagram)</li>
            <li>16:9 (Great for YouTube)</li>
            <li>4:3 (Classic format)</li>
            <li>21:9 (Cinematic experience)</li>
            <li>9:16 (Perfect for TikTok)</li>
            <li>3:4 (Ideal for stories)</li>
          </ul>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Creating Effective Text Prompts</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Prompt Structure
          <ul class="list-disc pl-5 mt-2">
            <li>Describe your scene clearly</li>
            <li>Specify the style you want</li>
            <li>Include motion details</li>
            <li>Add important elements</li>
          </ul>
        </li>
        <li>Best Practices
          <ul class="list-disc pl-5 mt-2">
            <li>Be specific about what you want</li>
            <li>Include visual details</li>
            <li>Mention your style preferences</li>
            <li>Describe key actions</li>
          </ul>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Generation Process</h3>
      <ol class="list-decimal pl-5 mb-6">
        <li>Text Input
          <ul class="list-disc pl-5 mt-2">
            <li>Write your idea</li>
            <li>Review and refine it</li>
            <li>Add style preferences</li>
            <li>Set your parameters</li>
          </ul>
        </li>
        <li>Generation Settings
          <ul class="list-disc pl-5 mt-2">
            <li>Pick your aspect ratio</li>
            <li>Choose 5 or 10 seconds</li>
            <li>Set your quality level</li>
            <li>Adjust motion settings</li>
          </ul>
        </li>
        <li>Processing
          <ul class="list-disc pl-5 mt-2">
            <li>Start generation</li>
            <li>Wait 1-2 minutes</li>
            <li>Check your preview</li>
            <li>Make any adjustments</li>
          </ul>
        </li>
        <li>Final Output
          <ul class="list-disc pl-5 mt-2">
            <li>Review your video</li>
            <li>Download it</li>
            <li>Share with others</li>
            <li>Save to your collection</li>
          </ul>
        </li>
      </ol>
      
      <h3 class="text-xl font-bold my-4">Tips for Success</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Aspect Ratio Selection
          <ul class="list-disc pl-5 mt-2">
            <li>Match your platform's needs</li>
            <li>Consider your content type</li>
            <li>Think about your audience</li>
            <li>Optimize for viewing experience</li>
          </ul>
        </li>
        <li>Generation Strategy
          <ul class="list-disc pl-5 mt-2">
            <li>Start with simple ideas</li>
            <li>Try different ratios</li>
            <li>Test various durations</li>
            <li>Keep refining your approach</li>
          </ul>
        </li>
      </ul>
      
      <p>Ready to bring your ideas to life? With Seedance's text-to-video generation, you can create amazing videos just by describing what you want. Follow these tips and start creating stunning content today!</p>
    `,
    description: 'A comprehensive guide to creating videos from text descriptions using Seedance',
    date: 'June 14, 2025',
    category: 'Tutorials',
    skip: false,
    cta: "Try Now",
  }
]

export function useBlogPosts() {
  // Currently selected category
  const currentCategory = ref('all')

  // Get all blog posts
  const allPosts = computed(() => blogPostsData)

  // Filter posts by current category
  const filteredPosts = computed(() => {
    if (currentCategory.value === 'all') {
      return allPosts.value
    }
    return allPosts.value.filter(post => post.category === currentCategory.value)
  })

  // Get a single post by ID
  const getPostById = (id: string): BlogPost => {
    const post = blogPostsData.find(post => post.id === id)
    
    if (!post) {
      throw createError({
        statusCode: 404,
        message: 'Article not found'
      })
    }
    
    return post
  }

  // Get category label
  const getCategoryLabel = (category: string) => {
    return category
  }

  // Get all available categories
  const allCategories = computed(() => {
    const categories = new Set<string>()
    blogPostsData.forEach(post => {
      categories.add(post.category)
    })
    return Array.from(categories)
  })

  return {
    currentCategory,
    allPosts,
    filteredPosts,
    getPostById,
    getCategoryLabel,
    allCategories
  }
} 