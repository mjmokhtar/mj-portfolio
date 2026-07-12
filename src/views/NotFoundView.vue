<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="bg-primary min-h-screen flex items-center">
    <div class="px-8 max-w-7xl mx-auto w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">

        <!-- kiri: copy -->
        <div>
          <p class="text-xs opacity-40 uppercase tracking-widest mb-4">Error 404</p>
          <h1 style="font-family:'Playfair Display',serif;font-size:clamp(3rem,7vw,6rem);font-weight:700;font-style:italic;line-height:1.05;color:#161614;">
            You shall<br/>not pass.
          </h1>
          <p class="mt-6 text-sm leading-relaxed text-secondary opacity-60 max-w-sm">
            This page doesn't exist — or the bouncer decided you're not on the list.
            Either way, there's nothing behind this rope.
          </p>
          <RouterLink to="/" class="back-home-btn mt-8">
            ← Back to homepage
          </RouterLink>
        </div>

        <!-- kanan: ilustrasi -->
        <div class="flex justify-center lg:justify-end">
          <img src="/404.png"
            alt="Bouncer menjaga area terlarang dengan tanda dilarang robot"
            class="w-full max-w-md"
            style="mix-blend-mode: multiply;" />
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
.back-home-btn {
  display: inline-block;
  font-family: 'Geist', sans-serif;
  font-size: 0.75rem;
  font-style: italic;
  color: #161614;
  border: 1px solid #161614;
  padding: 10px 22px;
  text-decoration: none;
  transition: opacity 0.2s;
}
.back-home-btn:hover { opacity: 0.6; }
</style>