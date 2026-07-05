<script setup>
import HeroSection from '../components/HeroSection.vue'
import IntroSection from '../components/IntroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import FeaturedSection from '../components/FeaturedSection.vue'
import PortfolioSection from '../components/PortfolioSection.vue'  // ← import komponen baru
import DitherSection from '../components/DitherSection.vue'
</script>

<template>
  <main class="bg-primary text-secondary">
    <HeroSection />
    <DitherSection />
    <IntroSection />
    <PortfolioSection />   
    <ProjectsSection />
    <TestimonialsSection />
    <FeaturedSection />
  </main>
</template>