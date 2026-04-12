<script setup>
import { meta } from '../data/meta.js'
</script>

<template>
  <section class="bg-primary">
    <div class="px-8 max-w-7xl mx-auto py-6">
      <div class="grid grid-cols-1 lg:grid-cols-4 text-secondary gap-6">

        <!-- big lead -->
        <p class="lg:col-span-3 lg:text-5xl text-3xl indent-32"
          style="font-family:'Playfair Display',serif;font-weight:700;line-height:1.3;"
          data-aos="fade-up"
          data-aos-duration="2000">
          {{ meta.bio.lead }}
        </p>

        <!-- available line -->
        <p class="text-base lg:col-start-2 leading-relaxed underline underline-offset-4"
          data-aos="fade-up"
          data-aos-duration="2500">
          {{ meta.bio.p1 }}
          <a :href="`mailto:${meta.email}`"
            class="font-semibold hover:opacity-60 transition-opacity duration-200">
            {{ meta.email }}
          </a>
        </p>

        <!-- right col -->
        <p class="lg:col-start-4 leading-relaxed text-base"
          data-aos="fade-up"
          data-aos-duration="2500">
          {{ meta.bio.p2 }}
        </p>

        <p class="lg:col-start-4 leading-relaxed text-base"
          data-aos="fade-up"
          data-aos-duration="3000">
          {{ meta.bio.p3 }}
        </p>

        <!-- big closing -->
        <p class="lg:col-span-3 lg:col-start-2 lg:text-7xl text-3xl indent-32 lg:mt-48"
          style="font-family:'Playfair Display',serif;font-weight:700;line-height:1.1;"
          data-aos="fade-up"
          data-aos-duration="3000">
          {{ meta.bio.closing }}
        </p>

      </div>
    </div>
  </section>
</template>