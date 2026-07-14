<script setup>
import { meta } from '../data/meta.js'
</script>

<template>
  <section class="bg-primary">

    <!-- Name SVG full width -->
    <div class="px-8 max-w-7xl mx-auto pt-12 hero-name"
      data-aos="fade-up" data-aos-duration="2000">
      <svg viewBox="0 0 1000 160" xmlns="http://www.w3.org/2000/svg"
        style="width:100%;display:block;">
        <text
          x="0" y="130"
          font-size="155"
          fill="#161614"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs">
          m.j.mokhtar
        </text>
      </svg>
    </div>

    <div class="px-8 max-w-7xl mx-auto pb-12">
      <div class="mt-6 space-y-2">

        <!-- thin rule -->
        <div class="h-0.5 bg-secondary"
          data-aos="fade-up"
          data-aos-duration="1000">
        </div>

        <!-- roles + status + links -->
        <div class="flex flex-col sm:flex-row gap-3 justify-between sm:items-center"
          data-aos="fade-up"
          data-aos-duration="1500">

          <div class="flex gap-3 items-center flex-wrap">
            <h3 class="text-secondary text-xs font-medium flex gap-1 items-center">
              <span>{{ meta.roles[0] }}</span>
              <span class="font-bold">{{ meta.roles[1] }}</span>
              <span class="italic">{{ meta.roles[2] }}</span>
            </h3>
            <span class="border border-secondary h-3 w-px"></span>
            <span class="text-secondary text-xs font-semibold flex items-center gap-1">
              <span class="status-dot"></span>
              {{ meta.status }}
            </span>
          </div>

          <ul class="flex gap-4 text-xs">
            <li v-for="link in meta.links" :key="link.label">
              <a
                :href="link.url"
                target="_blank"
                class="text-secondary hover:opacity-60 transition-opacity duration-200">
                {{ link.label }}
              </a>
            </li>
          </ul>

        </div>

        <!-- decorative bars -->
        <div style="height:6px;"  class="bg-secondary" data-aos="fade-up" data-aos-duration="2000"></div>
        <div style="height:12px;" class="bg-secondary" data-aos="fade-up" data-aos-duration="2500"></div>
        <div style="height:24px;" class="bg-secondary" data-aos="fade-up" data-aos-duration="3000"></div>
        <div style="height:48px;" class="bg-secondary" data-aos="fade-up" data-aos-duration="3000"></div>
        <div style="height:96px;" class="bg-secondary flex items-end p-4"
          data-aos="fade-up"
          data-aos-duration="3000"
          data-aos-delay="150">
        </div>

        <!-- promo bar -->        
        <div class="flex w-full"
        data-aos="fade-up"
        data-aos-duration="3000">
        <span class="text-xs font-medium text-secondary">
            {{ meta.footer.left }} &nbsp;
            <a
            :href="meta.footer.linkUrl"
            target="_blank"
            class="font-bold hover:opacity-60 transition-opacity duration-200">
            {{ meta.footer.linkLabel }}
            </a>
        </span>
        <span class="text-xs font-medium text-secondary ml-auto">
            {{ meta.footer.right }} &nbsp;
            <a
            :href="meta.footer.rightLinkUrl"
            target="_blank"
            class="font-bold hover:opacity-60 transition-opacity duration-200">
            {{ meta.footer.rightLinkLabel }}
            </a>
        </span>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #161614;
  display: inline-block;
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.2; }
}

.hero-name svg text {
  font-family: 'Geist', sans-serif;
  font-weight: 900;
  cursor: crosshair;
}
.hero-name:hover svg text {
  font-family: 'Departure Mono', monospace;
  font-weight: 400;
}
</style>