<script setup>
import { featured } from '../data/featured.js'
import { meta } from '../data/meta.js'
</script>

<template>
  <section class="bg-primary">
    <div class="px-8 max-w-7xl mx-auto py-6">

      <!-- decorative bars + header -->
      <div class="mt-32 space-y-2">
        <div class="h-0.5 bg-secondary"
          data-aos="fade-up"
          data-aos-duration="1000">
        </div>
        <h3 class="text-secondary text-xs font-medium"
          data-aos="fade-up"
          data-aos-duration="1500">
          <span>Popular</span>
          <span class="font-bold">featured</span>
          <span class="italic">work</span>
        </h3>
        <div style="height:6px;"  class="bg-secondary" data-aos="fade-up" data-aos-duration="2000"></div>
        <div style="height:12px;" class="bg-secondary" data-aos="fade-up" data-aos-duration="2500"></div>
        <div style="height:24px;" class="bg-secondary" data-aos="fade-up" data-aos-duration="3000"></div>
        <div style="height:48px;" class="bg-secondary" data-aos="fade-up" data-aos-duration="3000"></div>
        <div style="height:96px;" class="bg-secondary"
          data-aos="fade-up"
          data-aos-duration="3000"
          data-aos-delay="150">
        </div>
      </div>

      <!-- featured links -->
      <ul class="flex flex-col lg:flex-row flex-wrap gap-3 text-secondary mt-3 list-none">
         <li
            v-for="(item, index) in featured"
            :key="item.title"
            class="flow-root"
            data-aos="fade-up"
            :data-aos-duration="3000">
            <a :href="item.url"
            target="_blank"
            class="italic text-xs hover:opacity-60 transition-opacity duration-200">
            {{ item.title }}
            </a>
        </li>
      </ul>

      <!-- footer -->
      <div class="mt-32 space-y-2">
        <div class="h-0.5 bg-secondary"
            data-aos="fade-up"
            data-aos-duration="3000">
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-8">

          <p style="font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,4rem);font-weight:700;font-style:italic;line-height:1.1;color:#161614;"
            data-aos="fade-up"
            data-aos-duration="2000">
            {{ meta.name }}
          </p>

          <div class="flex flex-col gap-1 text-right text-xs text-secondary"
            data-aos="fade-up"
            data-aos-duration="3000">
            <a :href="`mailto:${meta.email}`"
              class="hover:opacity-60 transition-opacity duration-200">
              {{ meta.email }}
            </a>
            <a href="https://github.com/mjmokhtar"
              target="_blank"
              class="hover:opacity-60 transition-opacity duration-200">
              github.com/mjmokhtar
            </a>
            <a href="https://cv-ats.mjmokhtar.cloud/"
              target="_blank"
              class="hover:opacity-60 transition-opacity duration-200">
              cv-ats.mjmokhtar.cloud
            </a>
            <span class="opacity-50">Djakarta, Indonesia · ©2026</span>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>