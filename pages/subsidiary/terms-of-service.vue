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

      <h1 class="text-3xl font-bold mb-8 text-white">Hailuo 02 - Terms of Service</h1>
      <p class="text-gray-300 mb-8">Effective Date: June 14, 2025</p>
      
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">1. Eligibility</h2>
          <p class="text-gray-300">You must be at least 13 years old to use our services. If you are under the legal age of majority, you must have parental consent.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">2. User Accounts</h2>
          <p class="text-gray-300">You must create an account to access certain features. You are responsible for your credentials and any activity under your account.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">3. Acceptable Use</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>You may not use the platform to generate or disseminate illegal, violent, hateful, sexually explicit, or deceptive content.</li>
            <li>You agree not to interfere with or disrupt the integrity of the service or bypass security mechanisms.</li>
            <li>Uploaded images must comply with our format requirements (JPG/JPEG/PNG) and size limitations (max 5MB).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">4. Intellectual Property</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>All Hailuo 02 tools, models, and interface elements are protected intellectual property.</li>
            <li>AI-generated videos are owned by the user unless they contain unlawful or infringing content.</li>
            <li>You grant Hailuo 02 the non-exclusive right to store, analyze, and display anonymized results for research, quality improvement, or marketing unless you opt out.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">5. Payments and Credits</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>Services are billed via credits. You may purchase different tiers depending on your video generation needs.</li>
            <li>Credits are non-refundable, expire after 12 months, and have no cash value.</li>
            <li>Video generation costs vary based on duration (6 or 10 seconds) and quality (768P or 1080P).</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">6. Service Availability and Support</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>We aim to maintain 99.9% uptime but cannot guarantee uninterrupted access to our AI video generation services.</li>
            <li>Video generation typically takes 7-10 minutes, but processing times may vary based on server load.</li>
            <li>We provide email support but do not offer 24/7 availability.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">7. Termination and Suspension</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>We reserve the right to suspend or terminate accounts for violations of these terms, abuse, or fraud.</li>
            <li>Users may delete their accounts at any time. Remaining credits will not be refunded unless required by law.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">8. Disclaimers and Limitation of Liability</h2>
          <ul class="list-disc pl-6 mt-4 space-y-2 text-gray-300">
            <li>AI video generation services are provided "as is" without warranties of any kind.</li>
            <li>Hailuo 02 shall not be liable for indirect, incidental, or consequential damages arising from video generation failures or quality issues.</li>
            <li>We do not guarantee that generated videos will meet specific artistic or technical requirements.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">9. Changes to Terms</h2>
          <p class="text-gray-300">We may update these Terms from time to time. Continued use implies acceptance of the latest version.</p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-white">10. Governing Law</h2>
          <p class="text-gray-300">These terms are governed by the laws of the jurisdiction in which the company is registered.</p>
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
  name: 'terms-of-service'
})

useSeo({
  title: 'Hailuo 02 | Terms of Service',
  description: 'Read our terms of service for Hailuo 02 AI-powered video generation services.'
})
</script>

<style>
body {
  background-color: #111827; /* bg-gray-900 */
  color: #F3F4F6; /* text-gray-100 */
}
</style> 