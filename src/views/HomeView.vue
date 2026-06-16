<script setup>
import HeroSection from '../components/HeroSection.vue'
import IntroSection from '../components/IntroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import FeaturedSection from '../components/FeaturedSection.vue'
import PortfolioSection from '../components/PortfolioSection.vue'  // ← import komponen baru
</script>

<template>
  <main class="bg-primary text-secondary">
    <HeroSection />
    <IntroSection />
    <PortfolioSection />   <!-- ← tambah di sini -->
    <ProjectsSection />
    <TestimonialsSection />
    <FeaturedSection />
  </main>
</template>