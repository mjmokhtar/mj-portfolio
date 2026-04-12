<script setup>
import { testimonials } from '../data/testimonials.js'
</script>

<template>
  <section class="bg-primary">
    <div class="px-8 max-w-7xl mx-auto py-6">

      <!-- header -->
      <div class="mt-6 space-y-2">
        <div class="h-0.5 bg-secondary"></div>
        <h3 class="text-secondary text-base font-medium">
          <span>human</span> <span class="font-bold">opinions</span>
        </h3>
      </div>

      <!-- testimonials -->
      <div class="flex flex-col text-secondary pt-2 mt-2 gap-12 lg:gap-32">
        <div
          v-for="(item, index) in testimonials"
          :key="index"
          class="grid grid-cols-1 lg:grid-cols-4 py-4 gap-4 lg:items-end"
          data-aos="fade-up"
          :data-aos-duration="1500 + index * 500">

          <!-- quote — Geist besar, indent, col-span-3 -->
          <p class="lg:col-span-3 text-3xl lg:text-5xl indent-32 leading-tight">
            {{ item.quote }}
          </p>

          <!-- attribution — italic kecil, col-4 -->
          <p class="italic text-xs">
            {{ item.name }} {{ item.role }}
          </p>

        </div>
      </div>

    </div>
  </section>
</template>