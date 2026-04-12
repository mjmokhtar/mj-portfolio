<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'

import HeroSection from './components/HeroSection.vue'
import IntroSection from './components/IntroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import FeaturedSection from './components/FeaturedSection.vue'

onMounted(() => {
  AOS.init({ once: true })
})
</script>

<template>
  <main class="bg-primary text-secondary">
    <HeroSection />
    <IntroSection />
    <ProjectsSection />
    <TestimonialsSection />
    <FeaturedSection />
  </main>
</template>