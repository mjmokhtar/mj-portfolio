<script setup>
import { RouterLink } from 'vue-router'
import FavRepoSection from '../components/FavRepoSection.vue'
import EngineerLevelsSection from '../components/EngineerLevelsSection.vue'
</script>

<template>
  <main class="bg-primary text-secondary min-h-screen">
    <div class="px-8 max-w-7xl mx-auto">

      <!-- back -->
      <div class="pt-8 pb-0">
        <RouterLink
          to="/"
          class="text-xs font-medium text-secondary hover:opacity-60 transition-opacity duration-200">
          ← Back
        </RouterLink>
      </div>

      <!-- num + title -->
      <div class="pt-8">
        <p class="text-xs opacity-50 mb-2">05.</p>
        <h1 style="font-family:'Playfair Display',serif;font-size:clamp(2.5rem,6vw,5rem);font-weight:700;font-style:italic;line-height:1.1;letter-spacing:-0.02em;">
          Jutsu Scrolls
        </h1>
        <p class="mt-3 text-base opacity-60 italic">
          Open-source techniques, sealed and ready to summon.
        </p>
      </div>

      <!-- rule -->
      <div class="h-0.5 bg-secondary mt-8"></div>

      <!-- meta row -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 text-xs">
        <div>
          <p class="opacity-40 uppercase tracking-widest mb-1">Scrolls</p>
          <p class="font-medium">3 sealed</p>
        </div>
        <div>
          <p class="opacity-40 uppercase tracking-widest mb-1">Discipline</p>
          <p class="font-medium">Embedded · Firmware</p>
        </div>
        <div>
          <p class="opacity-40 uppercase tracking-widest mb-1">Targets</p>
          <p class="font-medium">ESP32 · AVR · STM32</p>
        </div>
        <div>
          <p class="opacity-40 uppercase tracking-widest mb-1">License</p>
          <p class="font-medium">Open Source</p>
        </div>
      </div>

      <!-- rule -->
      <div class="h-0.5 bg-secondary"></div>

      <!-- engineer levels -->
      <EngineerLevelsSection embedded />

       <!-- rule -->
      <div class="h-0.5 bg-secondary"></div>

      <!-- repo cards -->
      <FavRepoSection embedded />

      <!-- rule -->
      <div class="h-0.5 bg-secondary"></div>

      <!-- footer nav -->
      <div class="py-8 flex justify-between items-center">
        <RouterLink
          to="/"
          class="text-xs font-medium hover:opacity-60 transition-opacity duration-200">
          ← Back to homepage
        </RouterLink>
        <a
          href="https://github.com/mjmokhtar"
          target="_blank" rel="noopener"
          class="text-xs font-medium hover:opacity-60 transition-opacity duration-200">
          All repositories →
        </a>
      </div>

    </div>
  </main>
</template>