<script setup>
import HeroSection from '../components/HeroSection.vue'
import IntroSection from '../components/IntroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import FeaturedSection from '../components/FeaturedSection.vue'
import PortfolioSection from '../components/PortfolioSection.vue'  
import DitherSection from '../components/DitherSection.vue'
import HumanMadeSection from '../components/HumanMadeSection.vue'
import MissionReportSection from '../components/MissionReportSection.vue'
import CoverLetterSection from '../components/CoverLetterSection.vue'
</script>

<template>
  <main class="bg-primary text-secondary">
    <HeroSection />
    <DitherSection />
    <IntroSection />
    <CoverLetterSection />
    <PortfolioSection />   
    <ProjectsSection />
    <TestimonialsSection />
    <MissionReportSection />
    <HumanMadeSection />   
    <FeaturedSection />
  </main>
</template>