<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <section class="bg-primary">
    <div class="px-8 max-w-7xl mx-auto py-6">

      <div class="space-y-2">
        <div class="h-0.5 bg-secondary"
          data-aos="fade-up"
          data-aos-duration="1000" />
        <h3 class="text-secondary text-base font-medium"
          data-aos="fade-up"
          data-aos-duration="1500">
          <span>Portfolio</span> <span class="font-bold italic">book</span>
        </h3>
      </div>

      <div class="mt-12 mb-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        data-aos="fade-up"
        data-aos-duration="2000">

        <p style="font-family:'Playfair Display',serif;font-size:clamp(3rem,8vw,7rem);font-weight:700;font-style:italic;line-height:1;color:#161614;">
          View<br/>my work.
        </p>

        <div class="flex flex-col gap-4 items-start lg:items-end">
          <p class="text-xs opacity-50 text-secondary max-w-xs lg:text-right">
            A curated collection of projects, experiments, and work — presented as an interactive portfolio book.
          </p>
          <button
            @click="router.push('/portfolio')"
            class="open-btn"
            data-aos="fade-up"
            data-aos-duration="2500">
            Open portfolio ↗
          </button>
        </div>

      </div>

      <!-- preview card -->
      <div
        class="relative overflow-hidden cursor-pointer border border-secondary/10 group"
        style="aspect-ratio:16/6; background:#161614;"
        data-aos="fade-up"
        data-aos-duration="3000"
        @click="router.push('/portfolio')">

        <!-- decorative book spines -->
        <div class="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
          <div v-for="i in 6" :key="i"
            class="h-3/4 border border-primary/40"
            :style="{ width: (8 + i * 4) + 'px', background: `rgba(244,245,239,${0.03 + i * 0.02})` }" />
        </div>

        <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <p style="font-family:'Playfair Display',serif;"
            class="text-primary text-2xl font-bold italic opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            Portfolio — MJ Mokhtar
          </p>
          <span class="text-xs text-primary opacity-40 group-hover:opacity-60 transition-opacity duration-300 tracking-widest uppercase">
            Click to open
          </span>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.open-btn {
  font-family: 'Geist', sans-serif;
  font-size: 0.75rem;
  font-style: italic;
  color: #161614;
  background: none;
  border: 1px solid #161614;
  padding: 8px 20px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.open-btn:hover {
  opacity: 0.6;
}
</style>