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
    id: 'hailuo-02-breaks-global-video-model-cost-record',
    title: 'Hailuo 02 Breaks Global Video Model Cost-Effectiveness Record',
    content: `
      <h2 class="text-2xl font-bold mb-4">Hailuo 02: MiniMax's Revolutionary AI Video Generation Model</h2>
      <p>Hailuo 02 is MiniMax's latest AI video generation model, representing a significant upgrade from Hailuo 01. This model currently ranks second in both image-to-video and text-to-video leaderboards, surpassing Kuaishou's Keling and Google's Veo3, and trailing only ByteDance's recently released Seedance 1.0. Hailuo 02 has achieved technological breakthroughs in multiple areas, including a complete reconstruction of the underlying architecture, with both training and inference efficiency improved by 2.5x. The model achieves an 85% complex instruction response rate, significantly outperforming competitors, and can generate videos with extremely complex physical scenarios, such as acrobatics and other high-difficulty content. Additionally, Hailuo 02 excels in cost efficiency, offering the lowest price among first-tier models with exceptional value for money.</p>
      
      <div class="my-6">
        <img src="/img/hailuo-demo.webp" alt="Hailuo 02 Demo" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
        <p class="text-sm text-gray-300 text-center">Hailuo 02 Demo Showcase</p>
      </div>
      
      <h3 class="text-xl font-bold my-4">Technical Specifications and Performance</h3>
      <p>Hailuo 02 can generate 6-second videos at 768P or 1080P ultra-high definition resolution, as well as 10-second videos at 768P resolution. The model features top-tier instruction-following capabilities and can handle extreme physical scenarios, such as performing stunts.</p>
      
      <h3 class="text-xl font-bold my-4">Leaderboard Performance</h3>
      <p>On Artificial Analysis's latest image-to-video leaderboard, Hailuo 02 ranks second.</p>
      
      <div class="my-6">
        <img src="/img/Artificial Analysis.webp" alt="Artificial Analysis Rankings" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
        <p class="text-sm text-gray-300 text-center">Artificial Analysis Image-to-Video Leaderboard</p>
      </div>
      
      <h3 class="text-xl font-bold my-4">Hailuo 02 Applications</h3>
      <p>Thanks to its efficiency, low cost, and powerful complex scene generation capabilities, Hailuo 02 is primarily suitable for the following scenarios:</p>
      
      <ul class="list-disc pl-5 mb-6">
        <li><strong>Film and Video Production:</strong> Quickly generate complex special effects shots, such as acrobatics, fantasy scenes, and more, reducing production costs and time.</li>
        <li><strong>Advertising and Creative:</strong> Provide low-cost, high-quality video materials for brand advertising, meeting diverse creative needs.</li>
        <li><strong>Content Creation:</strong> Help content creators quickly generate video content, improving creation efficiency.</li>
        <li><strong>Education and Entertainment:</strong> Generate educational videos or entertainment content, such as science animations, virtual performances, and more, enhancing engagement and appeal.</li>
        <li><strong>Corporate Promotion:</strong> Provide low-cost corporate promotional videos for small and medium enterprises, enhancing brand image and market competitiveness.</li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Key Technological Innovations</h3>
      <ul class="list-disc pl-5 mb-6">
        <li><strong>Architecture Reconstruction:</strong> Complete reconstruction of the underlying architecture, improving training and inference efficiency by 2.5x</li>
        <li><strong>Complex Instruction Response:</strong> Achieves 85% complex instruction response rate, significantly higher than competitors</li>
        <li><strong>Extreme Scene Processing:</strong> Can generate videos with extremely complex physical scenarios, such as acrobatics and other high-difficulty content</li>
        <li><strong>Cost Efficiency Advantage:</strong> Offers the lowest price among first-tier models with exceptional value for money</li>
      </ul>
      
      <p>The release of Hailuo 02 marks an important milestone in AI video generation technology, achieving breakthrough progress not only in performance but also setting new industry standards in cost-effectiveness. Both professional creators and enterprise users can benefit from this innovative technology.</p>
    `,
    description: 'Hailuo 02 is MiniMax\'s latest AI video generation model, ranking second in image-to-video and text-to-video leaderboards, featuring excellent cost-effectiveness and complex scene generation capabilities',
    date: 'June 14, 2025',
    category: 'Platform',
    skip: false,
    cta: "Learn More",
  },
  {
    id: 'image-to-video-generation',
    title: 'How to Generate Videos from Images with Hailuo 02: A Step-by-Step Guide',
    content: `
      <h2 class="text-2xl font-bold mb-4">Creating Dynamic Videos from Static Images</h2>
      <p>Ready to turn your favorite photos into engaging videos? With Hailuo 02, you can transform any image into a dynamic video in just a few clicks. Let's walk through how to create amazing videos from your images.</p>
      
      <h3 class="text-xl font-bold my-4">Image-to-Video Generation Overview</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Key Features
          <ul class="list-disc pl-5 mt-2">
            <li>Use any image you want</li>
            <li>Choose between 768P or 1080P quality for 6-second videos</li>
            <li>Create 768P quality for 10-second videos</li>
            <li>Get your video in 1-2 minutes</li>
          </ul>
        </li>
        <li>Output Specifications
          <ul class="list-disc pl-5 mt-2">
            <li>6-second videos: 768P or 1080P resolution</li>
            <li>10-second videos: 768P resolution</li>
            <li>High-quality video output</li>
            <li>Easy to share in multiple formats</li>
          </ul>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Image Upload Requirements</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Supported Formats
          <ul class="list-disc pl-5 mt-2">
            <li>JPG/JPEG</li>
            <li>PNG</li>
          </ul>
        </li>
        <li>Image Specifications
          <ul class="list-disc pl-5 mt-2">
            <li>Aspect ratio: greater than 2:5 and less than 5:2</li>
            <li>Shortest side: minimum 300px</li>
            <li>File size: maximum 5MB</li>
          </ul>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Step-by-Step Generation Process</h3>
      <ol class="list-decimal pl-5 mb-6">
        <li>Upload Image
          <ul class="list-disc pl-5 mt-2">
            <li>Pick your favorite image (JPG/JPEG/PNG format)</li>
            <li>Ensure aspect ratio is between 2:5 and 5:2</li>
            <li>Check that shortest side is at least 300px</li>
            <li>Make sure file size is under 5MB</li>
          </ul>
        </li>
        <li>Fill in Prompt
          <ul class="list-disc pl-5 mt-2">
            <li>Describe the desired motion and effects</li>
            <li>Specify the style and atmosphere you want</li>
            <li>Add any specific details or requirements</li>
            <li>Review and refine your prompt</li>
          </ul>
        </li>
        <li>Set Parameters
          <ul class="list-disc pl-5 mt-2">
            <li>Choose between 6 or 10 seconds</li>
            <li>For 6-second videos: select 768P or 1080P quality</li>
            <li>For 10-second videos: 768P quality only</li>
            <li>Click generate and wait 1-2 minutes</li>
          </ul>
        </li>
      </ol>
      
      <h3 class="text-xl font-bold my-4">Best Practices</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Image Selection
          <ul class="list-disc pl-5 mt-2">
            <li>Pick clear, well-lit images</li>
            <li>Ensure aspect ratio meets requirements (2:5 to 5:2)</li>
            <li>Check that shortest side is at least 300px</li>
            <li>Keep file size under 5MB for faster upload</li>
          </ul>
        </li>
        <li>Generation Tips
          <ul class="list-disc pl-5 mt-2">
            <li>Start with 6-second videos for higher quality options</li>
            <li>Use 10-second videos when you need longer content</li>
            <li>Choose 1080P for maximum quality on 6-second videos</li>
            <li>Optimize for your platform's requirements</li>
          </ul>
        </li>
      </ul>
      
      <p>Creating videos from your images has never been easier. With Hailuo 02, you can transform your photos into engaging videos in minutes. Follow these steps and start creating amazing content today!</p>
    `,
    description: 'A comprehensive guide to generating videos from images using Hailuo 02 with specific format and quality requirements',
    date: 'June 14, 2025',
    category: 'Tutorials',
    skip: false,
    cta: "Learn More",
  },
  {
    id: 'text-to-video-generation',
    title: 'Text-to-Video Generation with Hailuo 02: Creating Videos from Text Descriptions',
    content: `
      <h2 class="text-2xl font-bold mb-4">Transforming Text into Dynamic Videos</h2>
      <p>Have an idea for a video but don't know where to start? With Hailuo 02's text-to-video generation, you can turn your ideas into reality just by describing what you want. Let's explore how to create amazing videos from your text descriptions.</p>
      
      <h3 class="text-xl font-bold my-4">Text-to-Video Generation Overview</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Key Features
          <ul class="list-disc pl-5 mt-2">
            <li>Create 6 or 10-second videos</li>
            <li>Get results in 1-2 minutes</li>
            <li>High-quality output every time</li>
          </ul>
        </li>
        <li>Video Specifications
          <ul class="list-disc pl-5 mt-2">
            <li>6-second videos: 768P or 1080P resolution</li>
            <li>10-second videos: 768P resolution</li>
            <li>Fast generation process</li>
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
            <li>Choose 6 or 10 seconds</li>
            <li>For 6-second videos: select 768P or 1080P quality</li>
            <li>For 10-second videos: 768P quality only</li>
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
        <li>Generation Strategy
          <ul class="list-disc pl-5 mt-2">
            <li>Start with 6-second videos for higher quality options</li>
            <li>Use 10-second videos when you need longer content</li>
            <li>Choose 1080P for maximum quality on 6-second videos</li>
            <li>Keep refining your approach</li>
          </ul>
        </li>
      </ul>
      
      <p>Ready to bring your ideas to life? With Hailuo 02's text-to-video generation, you can create amazing videos just by describing what you want. Follow these tips and start creating stunning content today!</p>
    `,
    description: 'A comprehensive guide to creating videos from text descriptions using Hailuo 02 with specific duration and quality options',
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