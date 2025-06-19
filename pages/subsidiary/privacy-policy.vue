<template>
  <div class="min-h-screen bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="mb-6">
        <NuxtLink to="/" class="flex items-center text-gray-400 hover:text-gray-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </NuxtLink>
      </div>
      
      <h1 class="text-3xl font-bold mb-8 text-white">Hailuo 02 Privacy Policy</h1>
      <p class="text-gray-400 mb-8">Last updated: June 14, 2025</p>
      
      <div class="space-y-6">
        <section>
          <p class="text-gray-300">Hailuo 02 ("we", "our", or "us") values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our AI video generation platform and related services.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li><strong>Personal Data</strong>: Includes name, email, billing information, and usage preferences. Collected when you register, purchase credits, or interact with our services.</li>
            <li><strong>User-Generated Content</strong>: Text prompts, uploaded images (JPG/JPEG/PNG format), and generated videos may be stored to improve service quality and model performance.</li>
            <li><strong>Technical Data</strong>: We automatically collect IP address, device type, browser type, OS version, and time of access.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>To enable AI video generation (image-to-video and text-to-video) and manage your user account.</li>
            <li>To process transactions and communicate confirmations or billing updates.</li>
            <li>To deliver personalized content, suggestions, and UI preferences.</li>
            <li>To improve the Hailuo 02 model's performance, identify bugs, and enhance user experience.</li>
            <li>To detect misuse and enforce platform policies.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">3. Legal Basis for Data Processing</h2>
          <p class="text-gray-300">We process personal data based on your consent, contractual necessity, legitimate interest, or legal obligation.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">4. Sharing and Third Parties</h2>
          <p class="text-gray-300">We do not sell your personal data.</p>
          <p class="text-gray-300 mt-2">We may share data with:</p>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>Payment processors (e.g., Stripe)</li>
            <li>Hosting/cloud providers (e.g., Vercel, Cloudflare)</li>
            <li>Analytics tools (e.g., Google Analytics)</li>
            <li>AI inference engines and video processing services</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">5. Data Retention</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>We retain your personal data as long as your account is active or as needed to fulfill legal obligations.</li>
            <li>Generated videos and uploaded images may be stored for service improvement purposes.</li>
            <li>You may request deletion of your data at any time.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">6. Your Rights</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>Right to access and correct personal data.</li>
            <li>Right to data deletion, portability, and restriction of processing.</li>
            <li>Right to object to marketing or data profiling.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">7. International Transfers</h2>
          <p class="text-gray-300">Your data may be processed in jurisdictions outside your home country. We ensure appropriate safeguards are in place.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">8. Cookies and Tracking Technologies</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>Used to enhance site functionality, measure usage analytics, and remember preferences.</li>
            <li>You can modify cookie settings via your browser or reject non-essential cookies.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">9. Children's Privacy</h2>
          <p class="text-gray-300">Our services are not intended for children under 13. We do not knowingly collect personal information from minors.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">10. Updates to This Policy</h2>
          <p class="text-gray-300">Changes will be posted on this page. Your continued use of the site indicates agreement.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">Contact</h2>
          <p class="text-gray-300">Email: support@hailuo02.com</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '~/composables/useSeo';

// @ts-ignore: Nuxt宏函数
definePageMeta({
  layout: false,
  name: 'privacy-policy'
})

useSeo({
  title: 'Hailuo 02 | Privacy Policy',
  description: 'Learn how we protect your data while using our AI-powered video generation service.'
})
</script>

<style>
body {
  background-color: #111827; /* bg-gray-900 */
  color: #F3F4F6; /* text-gray-100 */
}
</style> 