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
    id: 'use-hailuo-02-to-reduce-your-creation-costs',
    title: 'Use Hailuo 02 to Reduce Your Creation Costs',
    content: `
      <div class="max-w-4xl mx-auto">
        
        <div class="my-6">
          <img src="https://resp.hailuo2.com/hailuo/blog/image/hailuo-price-plan.webp" alt="Hailuo Price Plan" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
          <p class="text-sm text-gray-300 text-center">Hailuo Price Plan</p>
        </div>
        
        <p class="mb-6 text-lg">Hailuo 02 can create 10-second, uninterrupted 1080P videos with stunning visual effects. However, the core value of Hailuo 02 lies not in "showing off technology" but in reshaping the "narrative cost" of high-quality visual content. What once required professional film studios to execute creatively can now be done with just a prompt. The focus of content creation has shifted from "production capability" to "creative capability."</p>

        <h2 class="text-xl font-bold my-6">The Revolution of Content Density</h2>
        
        <p class="mb-6 text-lg">In the past, "imagination" was the only way to compensate for limited visual presentation capabilities. Now, Hailuo 02 allows you to directly bridge the gap from "imagination" to "visual presentation," filling the divide between "imagination" and "reality." Moreover, what Hailuo 02 offers isn't just simple illustrations, but micro-films. The competition in content creation has shifted from "writing" to "storyboarding". Hailuo 02 enables the creation of videos with rich, detailed content density.</p>

        <h2 class="text-xl font-bold my-6">B-roll Freedom</h2>
        
        <p class="mb-6 text-lg">B-roll, or supplemental footage, has always been a challenge for traditional filmmakers. Creators often face the choice of either spending high costs on commercial video assets or spending significant time searching for free material, which often leads to video homogenization. Shooting original footage independently also requires substantial time and labor costs.</p>
        
        <p class="mb-6 text-lg">Hailuo 02, with its powerful dynamic effects, physical simulation and precise control over camera angles, can generate video footage that meets your exact expectations. This not only saves costs but also represents a complete liberation of creativity. Production costs are no longer a constraint; the ability to harness AI to bring your creative vision to life is now the most crucial skill.</p>

        <h2 class="text-xl font-bold my-6">Industrial Production of Emotional Value</h2>
        
        <p class="mb-6 text-lg">What's the core of short videos? "Emotion." The key to a video's viral success lies in quickly capturing the viewer's emotions within a few seconds. Hailuo 02 can industrialize the production of "emotion." It allows you to customize blockbuster-level visual spectacles to captivate and shock audiences, delivering emotional value and generating traffic in bulk.</p>

        <p class="mb-6 text-lg">Try Hailuo 02 for free now with free credits. For more videos and effects, you can generate 18 1080p videos for just $10 per month. Read about the <a href="/pricing" class="text-blue-400 hover:text-blue-300">pricing plans</a> to choose the one that's right for you.</p>

        <div class="bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-lg my-8 text-center">
          <h2 class="text-2xl font-bold mb-4 text-white">Ready to Reduce Your Creation Costs?</h2>
          <p class="text-purple-100 mb-6">Start using Hailuo 02 today and transform your creative process!</p>
          <a href="/hailuo-ai-video-generator" class="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Try Hailuo 02 Now
          </a>
        </div>
      </div>
    `,
    seoTitle: 'Use Hailuo 02 to Reduce Your Creation Costs',
    description: 'Hailuo 02 turns imagination into visual products, reduces video material costs, and realizes the industrial production of emotional value.',
    date: 'August 3, 2025',
    category: 'Insights',
    skip: false,
    cta: "Try Now",
  },
  {
    id: 'how-to-use-hailuo-prompts-to-create-rich-film-and-television-effects',
    title: 'How to Use Hailuo Prompts to Create Rich Film and Television Effects',
    content: `
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">How to Use Hailuo Prompts to Create Rich Film and Television Effects</h2>
        
        <div class="my-6">
          <img src="https://resp.hailuo2.com/hailuo/blog/image/hailuo-clip-screenshot.webp" alt="Hailuo AI Video Competition Showcase" class="w-full max-w-2xl mx-auto mb-2" loading="lazy" />
          <p class="text-sm text-gray-300 text-center">Hailuo and WaytoAGI AI Video Competition Showcase</p>
        </div>
        
        <p class="mb-6 text-lg">Hailuo and the AI community WaytoAGI jointly organized an AI video competition that received numerous outstanding submissions. The outstanding videos were featured at the WAIC exhibition, showcasing not only wild imagination but also Hailuo's creative potential.</p>

        <h3 class="text-xl font-bold my-6">Camera Movement</h3>
        
        <p class="mb-6 text-lg">Hailuo 02 possesses an exceptional understanding and expressive ability for camera movement. You can choose from stable tracking shots to handheld close-ups, slowly zooming in to focus on a character's emotions, and even using drones to capture panoramic city shots.</p>
        
        <p class="mb-6 text-lg">Hailuo 02 can maintain character consistency across multiple shots, demonstrating its ability to understand and orchestrate shots, making it highly suitable for short films, visual advertisements, and other creative scenarios.</p>

        <h3 class="text-xl font-bold my-6">Shot Rhythm</h3>
        
        <p class="mb-6 text-lg">Shot rhythm can enhance the thrill of action. For example, the camera can follow the details of a speeding motorcycle's tires crushing gravel, spinning at high speed and kicking up dust. The protagonist's bike can leap onto a sand dune, tumbling through the air, landing firmly, and continuing its rapid progress. These descriptions can create a complete rhythm and layering of action in the video.</p>

        <h3 class="text-xl font-bold my-6">Physical Movement</h3>
        
        <p class="mb-6 text-lg">Ball sports are often a challenge in AI-generated videos. This is partly due to the physical effects of the ball's bounce and rotation, and partly due to the natural and fluid interactions between characters involved. Hailuo 02 perfectly captures these effects, even including multiplayer interactions.</p>
        
        <p class="mb-6 text-lg">Example prompts: A soccer player takes a run-up and shoots a powerful shot. The ball spins rapidly towards the top right corner of the goal. The goalkeeper dives in but misses, and the ball hits the net and bounces back.</p>

        <h3 class="text-xl font-bold my-6">Intense Fighting</h3>
        
        <p class="mb-6 text-lg">Hailuo 02 can process and generate complex and engaging fight videos. The seamless interaction between movement and the environment, combined with highly immersive camera shots, creates a truly compelling and impactful experience. Furthermore, you can apply a variety of special effects, such as recreating a battle between gods or a freehand sword fight in the style of ink painting.</p>

        <h3 class="text-xl font-bold my-6">Performance Details</h3>
        
        <p class="mb-6 text-lg">Hailuo 02 demonstrates a sophisticated understanding and performance of emotional cues. Not only does it accurately match color tones, lighting, and camera language, but it also dynamically adjusts character expressions, movement rhythm, and scene composition to create a cohesive and unified emotional atmosphere.</p>
        
        <p class="mb-6 text-lg">Example prompts: cues range from sadness to rage to regret, and from happiness to surprise to relief.</p>

        <h3 class="text-xl font-bold my-6">Subject Reference</h3>
        
        <p class="mb-6 text-lg">Hailuo 02 allows you to upload an image as primary reference, accurately transferring the subject from the reference image to the generated video, achieving highly realistic character reproduction. This is an excellent tool for creating creative series.</p>

        <div class="bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-lg my-8 text-center">
          <h3 class="text-2xl font-bold mb-4 text-white">Ready to Create Your Own Film?</h3>
          <p class="text-purple-100 mb-6">If you also want to create your own film and television works, use Hailuo 02 to realize your dream NOW!</p>
          <a href="/hailuo-ai-video-generator" class="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Start Creating with Hailuo 02
          </a>
        </div>
      </div>
    `,
    seoTitle: 'How to Use Hailuo Prompts to Create Rich Film and Television Effects',
    description: 'This article introduces the use of Hailuo 02 prompts from the perspectives of camera movement, shot rhythm, physical movement, intense fighting, performance details, and subject reference to generate wonderful visual effects.',
    date: 'August 2, 2025',
    category: 'Tutorials',
    skip: false,
    cta: "Start Creating",
  },
  {
    id: 'hailuo-02-shanghai-film-festival',
    title: 'Hailuo 02 Unlocked the AI Film Creation Code at the 27th Shanghai Film Festival',
    content: `
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Hailuo 02 Unlocked the AI Film Creation Code at the 27th Shanghai Film Festival</h2>
        
        <p class="mb-6 text-lg">During the <strong>27th Shanghai International Film Festival</strong>, MiniMax brought the AI video model Hailuo 02 to the venue and held a creative sharing session titled "The Future of AI Imaging Has Started", discussing the future of AI film and television creation with academic representatives, film and television celebrities and AI creators.</p>

        <h3 class="text-xl font-bold my-6">Hailuo 02 Advantages over Traditional Creation:</h3>

        <h4 class="text-lg font-bold my-4">• Surprising Creativity</h4>
        
        <p class="mb-6 text-lg">MiniMax's director stated, "The biggest difference between Hailuo 02 and traditional production is that AI isn't just a tool that follows instructions; its unpredictability can also lead to unexpected surprises."</p>
        
        <p class="mb-6 text-lg">AI is no longer simply mimicking traditional film and television effects; it starts generating unique content.</p>

        <h4 class="text-lg font-bold my-4">• Creative Equality</h4>
        
        <p class="mb-6 text-lg">Director of the Experimental Center of the Shanghai Theatre Academy's Film School stated, "The emergence of AI is not just a technological revolution; it also provides more creators with opportunities to create narrative content."</p>
        
        <p class="mb-6 text-lg">Technology should not be a barrier to entry, but rather a force for equal creative rights.</p>

        <h4 class="text-lg font-bold my-4">• Reduced Costs</h4>
        
        <p class="mb-6 text-lg">Hailuo 02 breaks the global record for cost-effective video model effects. Hailuo 02 can fully respond to complex commands and physical representations, ensuring even carefully crafted prompts receive better feedback.</p>
        
        <p class="mb-6 text-lg">This allows creators to efficiently optimize their creations multiple times.</p>

        <h3 class="text-xl font-bold my-6">The Future Potential of AI Film and Television</h3>

        <p class="mb-6 text-lg">AI film director Joey shared, "We can truly create films in four dimensions, like detective stories, where you can search for clues and interact with the characters in the film."</p>

        <p class="mb-6 text-lg">In the future, it's possible to blend virtual production technology with live action. Future AI-powered imaging will lead to an explosion in the scale of content, embracing emerging trends like gaming, interactive storytelling, and real-time generation.</p>

        <div class="bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-lg my-8 text-center">
          <h3 class="text-2xl font-bold mb-4 text-white">Ready to Create Your Own Film?</h3>
          <p class="text-purple-100 mb-6">If you also want to create your own film and television works, use Hailuo 02 to realize your dream NOW!</p>
          <a href="/hailuo-ai-video-generator" class="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Start Creating with Hailuo 02
          </a>
        </div>
      </div>
    `,
    seoTitle: 'Hailuo 02 Unlocked the AI Film Creation Code at the 27th Shanghai Film Festival',
    description: 'The Hailuo 02 team shared their experience in AI film creation at the 27th Shanghai International Film Festival, summarizing its advantages over traditional film and television production: surprising creativity, equal creation, and low cost.',
    date: 'August 1, 2025',
    category: 'Event',
    skip: false,
    cta: "Create Now",
  },
  {
    id: 'hailuo-02-vs-veo-3-kling-2-comparison',
    title: 'Hailuo 02 VS. VEO 3 and Kling 2: Image to Video AI Generator Comparison',
    content: `
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Hailuo 02 VS. VEO 3 and Kling 2: Image to Video AI Generator Comparison</h2>
        
        <p class="mb-6 text-lg">Hailuo 02 is an AI video generation model launched by MiniMax. It ranks second in the Image to Video category on the <strong>Artificial Analysis Video Arena Leaderboard</strong>, surpassing well-known video models such as Google Veo 3 and Kling 2. Let's take a look at how Hailuo 02 outperformed Veo 3 and Kling 2.</p>

        <h3 class="text-xl font-bold my-6">Outstanding Cinematic Quality:</h3>

        <ul class="list-disc pl-6 mb-6 space-y-3">
          <li class="text-lg">Hailuo 02 can generate richer and smoother camera movements, producing more coherent and narrative-driven videos. This is thanks to its built-in professional cinematic techniques, which can be freely applied through prompts.</li>
          <li class="text-lg">When generating videos with multiple actions, Veo 3 may produce stiff transitions that resemble a PowerPoint presentation.</li>
          <li class="text-lg">Moreover, Veo3 does not allow users to upload images containing people for video generation, while Hailuo 02 permits this, offering greater flexibility and convenience.</li>
        </ul>

        <h3 class="text-xl font-bold my-6">Natural and Realistic Physics:</h3>

        <ul class="list-disc pl-6 mb-6 space-y-3">
          <li class="text-lg">Hailuo's videos feature more comprehensive physics simulations. Even without specific prompts, the model automatically incorporates object interactions, environmental influences, and other details—resulting in a more lifelike output.</li>
          <li class="text-lg">In contrast, Kling 2 may overlook certain natural physical phenomena when not explicitly instructed.</li>
        </ul>

        <p class="mb-6 text-lg">For example, with the prompt "A girl gets frightened by a monster emerging from a swamp and runs away," Hailuo 02 naturally simulates the difficulty of fleeing through swampy terrain—showing the girl lifting her legs higher and moving at a slower and more labored pace. Meanwhile, Kling 2 generates a video where the girl runs as if on flat ground, lacking realistic resistance. This creates an unnatural, overly artificial "AI look" in comparison.</p>

        <h3 class="text-xl font-bold my-6">More Precise Control:</h3>

        <p class="mb-6 text-lg">Hailuo 02 allows for detailed motion control of characters through prompts, combined with specified camera movements, to achieve video results that better match the creator's vision.</p>

        <h4 class="text-lg font-bold my-4">Key advantages:</h4>

        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li class="text-lg">Maintain consistent character behavior across shots</li>
          <li class="text-lg">Achieve cinematic framing without post-production edits</li>
        </ul>

        <p class="mb-6 text-lg">This level of directed control surpasses Veo 3 and Kling 2's more generalized output.</p>

        <h3 class="text-xl font-bold my-6">More Affordable Pricing:</h3>

        <p class="mb-6 text-lg">Hailuo 02 offers greater flexibility and cost efficiency compared to Veo 3:</p>

        <h4 class="text-lg font-bold my-4">Resolution Options:</h4>

        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li class="text-lg">6-second videos at 1080P</li>
          <li class="text-lg">6-second or 10-second videos at 768P</li>
          <li class="text-lg">Veo 3 only supports 8-second 1080P clips</li>
        </ul>

        <h4 class="text-lg font-bold my-4">Budget-Friendly:</h4>

        <p class="mb-6 text-lg">With <a href="/pricing" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300"><strong>lower generation costs</strong></a>, Hailuo 02 is ideal for iterative experimentation—letting creators refine prompts and perfect results through multiple attempts.</p>

        <h3 class="text-xl font-bold my-6">Why Hailuo02?</h3>

        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li class="text-lg"><strong>Hollywood-grade cinematography</strong> – Dynamic shots with intentional framing</li>
          <li class="text-lg"><strong>Expressive motion physics</strong> – Natural weight, impact, and interaction</li>
          <li class="text-lg"><strong>Director-level control</strong> – Fine-tune actions and perspectives via prompts</li>
        </ul>

        <div class="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-lg my-8 text-center">
          <h3 class="text-2xl font-bold mb-4 text-white">Ready to Experience the Difference?</h3>
          <p class="text-blue-100 mb-6">Unleash your creativity with Hailuo 02 AI Video Generator right NOW!</p>
          <a href="/hailuo-ai-video-generator" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Try Hailuo 02 Now
          </a>
        </div>
      </div>
    `,
    seoTitle: 'Hailuo 02 vs VEO 3 vs Kling 2: AI Video Generator Comparison 2025',
    description: 'Compare Hailuo 02 with VEO 3 and Kling 2 AI video generators. Discover why Hailuo 02 leads in cinematic quality, physics simulation, control precision, and cost-effectiveness.',
    date: 'August 1, 2025',
    category: 'Comparison',
    skip: false,
    cta: "Try Now",
  },
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