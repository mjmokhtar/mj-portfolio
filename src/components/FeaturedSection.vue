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
          data-aos-duration="3000" />

        <div class="footer-stage">

          <!-- dot grid memudar -->
          <div class="footer-dots" />

          <!-- watermark nama raksasa -->
          <p class="footer-watermark" aria-hidden="true">m.j.mokhtar</p>

          <!-- konten footer di atas watermark -->
          <div class="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 py-10">
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

    </div>
  </section>
</template>

<style scoped>
.footer-stage {
  position: relative;
  overflow: hidden;
  min-height: 260px;
  display: flex;
  align-items: flex-end;
}

/* watermark nama — besar, samar, terpotong di bawah seperti Tiger Data */
.footer-watermark {
  position: absolute;
  left: -0.04em;
  bottom: -0.28em;          /* terpotong sebagian di tepi bawah */
  font-family: 'Geist', sans-serif;
  font-weight: 900;
  font-size: clamp(5rem, 13.5vw, 13rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: rgba(22, 22, 20, 0.06);   /* hitam sangat samar di atas cream */
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  z-index: 0;
}

/* dot grid memudar di sekitar watermark */
.footer-dots {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60%;
  height: 75%;
  background-image: radial-gradient(circle, rgba(22,22,20,0.14) 1.2px, transparent 1.2px);
  background-size: 14px 14px;
  /* memudar radial: rapat di kiri-atas watermark, hilang ke tepi */
  -webkit-mask-image: radial-gradient(ellipse 70% 80% at 22% 30%, black 0%, transparent 65%);
  mask-image: radial-gradient(ellipse 70% 80% at 22% 30%, black 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}
</style>