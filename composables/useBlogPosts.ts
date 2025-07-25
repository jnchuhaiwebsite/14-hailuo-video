import { ref, computed } from 'vue'
import { createError } from 'nuxt/app'

// Define blog post data structure
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  seoTitle?: string;
  description: string;
  date: string;
  category: string;
  skip?: boolean;
  cta?: string;
}

// Blog post data
const blogPostsData: BlogPost[] = [
  {
    id: 'hailuo-ai-invitation-code-ultimate-guide',
    title: 'Unlock Unlimited Creativity: The Ultimate Guide to Your Hailuo AI Invitation Code',
    content: `
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Unlock Unlimited Creativity: The Ultimate Guide to Your Hailuo AI Invitation Code</h2>
        
        <p class="mb-6 text-lg">Welcome to the cutting edge of content creation. At Hailuo AI, we're building a world where your imagination is the only limit to producing stunning, professional-quality videos. But what if you could push those limits even further, generating more content simply by sharing the tools you love?</p>

        <p class="mb-6 text-lg">That's exactly why we created the Hailuo AI Referral Program. It's our way of thanking our community of creators and empowering you to produce even more. This guide will walk you through everything you need to know about your <strong>Hailuo AI invitation code</strong> and how it can become your ticket to unlimited creativity.</p>

        <h3 class="text-xl font-bold my-6">What is the Hailuo AI Referral Program?</h3>

        <p class="mb-6">Simply put, it's a reward system built for our users. When you invite a new user to Hailuo AI through your unique link, you earn points. But here's what makes our program truly special: you don't just earn points on their first purchase. <strong>You earn points on <em>every single purchase</em> they make, forever.</strong></p>

        <p class="mb-6">This isn't a one-time bonus; it's a continuous stream of rewards that grows with your network.</p>

        <h3 class="text-xl font-bold my-6">How to Start Earning in 3 Simple Steps</h3>

        <p class="mb-6">Getting started is incredibly easy. We've streamlined the process so you can focus on creating and sharing.</p>

        <ol class="list-decimal pl-6 mb-6 space-y-4">
          <li class="text-lg">
            <strong>Share Your Link:</strong> First, find your unique <code class="bg-gray-800 text-blue-300 px-2 py-1 rounded">hailuo ai invitation code</code> link in your user center. Copy it and share it with friends, colleagues, on social media, or in your creative communities.
          </li>
          <li class="text-lg">
            <strong>Your Friend Makes a Purchase:</strong> When someone signs up using your link and purchases any plan (Basic, Pro, or Enterprise), the system automatically tracks it back to you.
          </li>
          <li class="text-lg">
            <strong>You Earn, Always:</strong> The moment their purchase is complete, points are instantly added to your account. This process repeats for every single purchase they make in the future.
          </li>
        </ol>
        
        <h3 class="text-xl font-bold my-6">The "Forever" Reward: Why Our Program is Different</h3>

        <p class="mb-6">Most referral programs thank you once. We believe in building lasting relationships. By rewarding you for every purchase a referred user makes, we ensure that your initial effort of sharing continues to pay off.</p>

        <p class="mb-6">Think of it this way: a single successful referral can become a source of points for months or even years, funding your creative projects long-term. There are no limits to how many people you can refer or how many points you can earn.</p>

        <h4 class="text-lg font-bold my-4">A Breakdown of the Rewards</h4>

        <p class="mb-6">Transparency is key, so you'll always know exactly what you're earning. For every purchase your referred friend makes, you'll be rewarded with the following points:</p>
        
        <ul class="space-y-3 mb-6">
          <li class="flex items-center">
            <span class="text-green-400 mr-3 text-xl">✓</span>
            <span class="text-lg"><strong>Enterprise Plan Purchase:</strong> Get <strong>208 Points</strong></span>
          </li>
          <li class="flex items-center">
            <span class="text-green-400 mr-3 text-xl">✓</span>
            <span class="text-lg"><strong>Pro Plan Purchase:</strong> Get <strong>58 Points</strong></span>
          </li>
          <li class="flex items-center">
            <span class="text-green-400 mr-3 text-xl">✓</span>
            <span class="text-lg"><strong>Basic Plan Purchase:</strong> Get <strong>18 Points</strong></span>
          </li>
        </ul>

        <h3 class="text-xl font-bold my-6">Turning Points into Pixels: What Your Rewards Are For</h3>

        <p class="mb-6">We want to keep things simple and valuable. Your reward points have one, powerful purpose: <strong>to pay for AI video generations.</strong></p>

        <p class="mb-6">Every point you earn is a credit you can use to bring another idea to life. They cannot be used for subscription discounts or upgrades, ensuring that their value is tied directly to what matters most—creating more content.</p>

        <div class="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-lg my-8 text-center">
          <h3 class="text-2xl font-bold mb-4 text-white">Ready to Start? Find Your Hailuo AI Invitation Code Now!</h3>
          <p class="text-blue-100 mb-6">Your journey to earning unlimited rewards starts now. Log in to your Hailuo AI account, navigate to the user center, and find your invitation link.</p>
          <a href="/invitation-code" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Go to My Account
          </a>
        </div>
      </div>
    `,
    seoTitle: 'Your Hailuo AI Invitation Code: An Ultimate Guide',
    description: 'Learn how the Hailuo AI invitation code lets you earn unlimited points for AI video generation. Refer friends and get rewarded for every purchase, forever.',
    date: 'July 24, 2025',
    category: 'Guide',
    skip: false,
    cta: "Get Started",
  },
  {
    id: 'top-tips-for-cinematic-video-prompts-in-hailuo-02-ai',
    title: 'Top Tips for Cinematic Video Prompts in Hailuo 02 AI',
    content: `
      <h2 class="text-2xl font-bold mb-4">Top Tips for Cinematic Video Prompts in Hailuo 02 AI Video Generator</h2>
      <p>When using Hailuo 02 AI to generate dynamic videos, precise prompt design and camera control are crucial. Below are proven optimization techniques to help you efficiently create video content that meets your expectations.</p>
      
      <h3 class="text-xl font-bold my-4">Separating Action and Visual Descriptions</h3>
      <p>When crafting prompts, it's recommended to clearly divide them into two parts:</p>
      
      <div class="bg-gray-800 p-4 rounded-lg mb-6">
        <h4 class="font-bold mb-2">1. Action/Camera Movement Description</h4>
        <ul class="list-disc pl-5 mb-3">
          <li>Define character movements (e.g., "walking," "turning around")</li>
          <li>Specify camera techniques (e.g., "zoom in," "pan to the right")</li>
        </ul>
        
        <h4 class="font-bold mb-2">2. Visual Imagery Description</h4>
        <ul class="list-disc pl-5">
          <li>Character appearance (costume, facial expressions, etc.)</li>
          <li>Scene details (background, lighting, special effects, etc.)</li>
        </ul>
      </div>
      
      <div class="bg-blue-900 p-4 rounded-lg mb-6">
        <h4 class="font-bold mb-2 text-blue-200">Example:</h4>
        <p class="text-blue-100">"Slow zoom-in (camera movement) on a woman in a red cloak running through the snow, her eyes filled with determination (visual description)."</p>
      </div>
      
      <h3 class="text-xl font-bold my-4">Precision Control of Movements and Expressions</h3>
      
      <h4 class="text-lg font-bold my-3">1. Simplify Action Descriptions</h4>
      <ul class="list-disc pl-5 mb-6">
        <li>Start with basic actions (e.g., "look directly at the camera," "walking") before progressing to complex motions</li>
        <li>Avoid stacking multiple actions and limit each clip to 1 - 2 actions, as Hailuo 02 AI generates 6 or 10 second videos, and excessive movements may be ignored</li>
      </ul>
      
      <h4 class="text-lg font-bold my-3">2. Facial Expression Control for "Speech"</h4>
      <ul class="list-disc pl-5 mb-6">
        <li>Accurate, vivid facial expressions significantly enhance video quality, enriching storytelling and character dynamism</li>
        <li>Avoid negative instructions. For example, instead of saying "do not speak," use positive descriptions like:</li>
        <ul class="list-disc pl-8 mt-2">
          <li>"Lips tightly sealed"</li>
          <li>"Gritting teeth in silence"</li>
        </ul>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Adding Camera Movements</h3>
      
      <h4 class="text-lg font-bold my-3">1. Precise Insertion of Camera Commands</h4>
      <p class="mb-4">Embed camera movement keywords (e.g., pull in, pan right) directly into the corresponding action descriptions to ensure smooth transitions.</p>
      
      <div class="bg-blue-900 p-4 rounded-lg mb-6">
        <h4 class="font-bold mb-2 text-blue-200">Example:</h4>
        <p class="text-blue-100">"The character draws a sword (action), the camera quickly pulls back (camera movement), revealing the full battlefield (scene)."</p>
      </div>
      
      <h4 class="text-lg font-bold my-3">2. Common Camera Movement Keywords</h4>
      <div class="overflow-x-auto mb-6">
        <table class="w-full border-collapse border border-gray-600">
          <thead>
            <tr class="bg-gray-700">
              <th class="border border-gray-600 px-4 py-2 text-left">Prompt</th>
              <th class="border border-gray-600 px-4 py-2 text-left">Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border border-gray-600">
              <td class="border border-gray-600 px-4 py-2">Pull in</td>
              <td class="border border-gray-600 px-4 py-2">Camera zooms in for a close-up</td>
            </tr>
            <tr class="border border-gray-600">
              <td class="border border-gray-600 px-4 py-2">Pull out</td>
              <td class="border border-gray-600 px-4 py-2">Camera zooms out to show wider view</td>
            </tr>
            <tr class="border border-gray-600">
              <td class="border border-gray-600 px-4 py-2">Pan left/right</td>
              <td class="border border-gray-600 px-4 py-2">Camera horizontally moves left/right</td>
            </tr>
            <tr class="border border-gray-600">
              <td class="border border-gray-600 px-4 py-2">Tilt up/down</td>
              <td class="border border-gray-600 px-4 py-2">Camera vertically angles up/down</td>
            </tr>
            <tr class="border border-gray-600">
              <td class="border border-gray-600 px-4 py-2">Zoom in/out</td>
              <td class="border border-gray-600 px-4 py-2">Adjusts focal length for tighter/wider shots</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3 class="text-xl font-bold my-4">Streamlining Complex Scenes</h3>
      <ul class="list-disc pl-5 mb-6">
        <li>Weather Effects (rain, wind, lightning) and Particle Effects (fire, electricity) can be generated with relative stability</li>
        <li>Complex actions like fight sequences or rapid scene cuts are prone to errors. We recommend generating separate shots and editing them together in post-production</li>
      </ul>
      
      <h3 class="text-xl font-bold my-4">Optimized Prompt Formula</h3>
      <p class="mb-4">By integrating the above techniques, use this structure to efficiently produce high-quality videos:</p>
      
      <div class="bg-green-900 p-4 rounded-lg mb-6">
        <h4 class="font-bold mb-2 text-green-200">Formula:</h4>
        <p class="text-green-100">"Scene Description + Camera Movement + Additional Details"</p>
      </div>
      
      <div class="bg-blue-900 p-4 rounded-lg mb-6">
        <h4 class="font-bold mb-2 text-blue-200">Example:</h4>
        <p class="text-blue-100">"In a moonlit forest (scene), a wizard raises his staff to summon lightning (action), captured in a low-angle shot that pulls back (camera movement), with the lightning illuminating surrounding trees (VFX)."</p>
      </div>
      
      <h3 class="text-xl font-bold my-4">Iterate and Optimize!</h3>
      <p>Mastering Hailuo 02 AI prompts requires continuous experimentation. Start creating your stunning dynamic videos with Hailuo 02 AI Video Generator NOW!</p>
    `,
    description: 'Master cinematic prompts for Hailuo 02 AI. Our guide covers camera control, expressions & action. Use our winning formula to turn ideas into pro-level videos.',
    date: 'July 23, 2025',
    category: 'Tips',
    skip: false,
    cta: "Try Now",
  },
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
        <img src="/img/Artificial-Analysis.webp" alt="Artificial Analysis Rankings" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
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
    date: 'June 19, 2025',
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
    date: 'June 19, 2025',
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
    date: 'June 19, 2025',
    category: 'Tutorials',
    skip: false,
    cta: "Try Now",
  },

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