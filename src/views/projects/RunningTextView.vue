<script setup>
import { projectDetails } from '../../data/projectDetails.js'
import { RouterLink } from 'vue-router'
import ProjectGallery from '../../components/ProjectGallery.vue'

const project = projectDetails.runningText
</script>

<template>
  <main class="bg-primary text-secondary min-h-screen">
    <div class="px-8 max-w-7xl mx-auto">

      <div class="pt-8 pb-0">
        <RouterLink
          to="/"
          class="text-xs font-medium text-secondary hover:opacity-60 transition-opacity duration-200">
          ← Back
        </RouterLink>
      </div>

      <div class="pt-8">
        <p class="text-xs opacity-50 mb-2">{{ project.num }}</p>
        <h1 style="font-family:'Playfair Display',serif;font-size:clamp(2.5rem,6vw,5rem);font-weight:700;line-height:1.1;letter-spacing:-0.02em;">
          {{ project.title }}
        </h1>
        <p class="mt-3 text-base opacity-60 italic">{{ project.tagline }}</p>
      </div>

      <div class="h-0.5 bg-secondary mt-8"></div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 text-xs">
        <div>
          <p class="opacity-40 uppercase tracking-widest mb-1">Year</p>
          <p class="font-medium">{{ project.year }}</p>
        </div>
        <div>
          <p class="opacity-40 uppercase tracking-widest mb-1">Role</p>
          <p class="font-medium">{{ project.role }}</p>
        </div>
        <div v-if="project.sites.length">
          <p class="opacity-40 uppercase tracking-widest mb-1">Deployed at</p>
          <p v-for="site in project.sites" :key="site" class="font-medium">{{ site }}</p>
        </div>
        <div v-if="project.impact.length">
          <p class="opacity-40 uppercase tracking-widest mb-1">Impact</p>
          <p v-for="item in project.impact" :key="item" class="font-medium">{{ item }}</p>
        </div>
      </div>

      <!-- <div class="h-0.5 bg-secondary"></div> -->

      <!-- <div class="py-32 flex flex-col items-center justify-center text-center gap-6">
         <p style="font-family:'Playfair Display',serif;font-size:clamp(3rem,8vw,6rem);font-weight:700;font-style:italic;line-height:1;opacity:0.15;">
          Coming Soon
        </p> -->
        
        <!-- <p class="text-sm opacity-50 max-w-md leading-relaxed">
          Full case study with deployment photos and hardware details is being prepared.
        </p> -->
      <!-- </div> --> 
      <!-- gallery -->
      <ProjectGallery :gallery="project.gallery" />

      <div class="h-0.5 bg-secondary"></div>

      <div class="py-6">
        <p class="text-xs opacity-40 uppercase tracking-widest mb-4">Tech Stack</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in project.stack"
            :key="tech"
            class="text-xs border border-secondary px-3 py-1 opacity-60">
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="h-0.5 bg-secondary"></div>

      <div class="py-8 flex justify-between items-center">
        <RouterLink
          to="/projects/epaper"
          class="text-xs font-medium hover:opacity-60 transition-opacity duration-200">
          ← Previous Project
        </RouterLink>
        <RouterLink
          to="/"
          class="text-xs font-medium hover:opacity-60 transition-opacity duration-200">
          All Projects →
        </RouterLink>
      </div>

    </div>
  </main>
</template>