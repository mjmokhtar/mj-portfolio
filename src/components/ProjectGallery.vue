<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  gallery: {
    type: Array,
    required: true,
  },
})

const current = ref(0)
const activeImg = ref(null)

function prev() {
  current.value = current.value === 0
    ? props.gallery.length - 1
    : current.value - 1
}

function next() {
  current.value = current.value === props.gallery.length - 1
    ? 0
    : current.value + 1
}

function open(item) {
  activeImg.value = item
}

function close() {
  activeImg.value = null
}

const currentItem = computed(() => props.gallery[current.value])
</script>

<template>
  <div>
    <!-- section label -->
    <div class="space-y-2 mt-12">
      <div class="h-0.5 bg-secondary"></div>
      <p class="text-xs opacity-40 uppercase tracking-widest py-2">Gallery</p>
    </div>

    <!-- slider -->
    <div class="mt-4">

      <!-- image area -->      
      <div
        class="relative overflow-hidden cursor-zoom-in"
        style="aspect-ratio: 16/9; background: #e8e4dc;"
        @click="open(currentItem)">

        <Transition name="slide" mode="out-in">
          <img
            :key="current"
            :src="currentItem.src"
            :alt="currentItem.caption"
            class="w-full h-full object-cover"
            loading="lazy"
            @error="(e) => e.target.parentElement.style.background = '#d4cfc5'"/>
        </Transition>

        <!-- dots overlay di dalam gambar -->
        <div
          class="absolute bottom-3 left-4 flex gap-2"
          @click.stop>
          <button
            v-for="(item, index) in gallery"
            :key="index"
            @click="current = index"
            class="dot-btn"
            :class="{ 'dot-active': index === current }">
          </button>
        </div>

      </div>

      <!-- caption + controls -->
      <div class="flex items-center justify-between mt-3 mb-3">
        <div class="flex items-center gap-4">
          <p class="text-xs opacity-50 italic">{{ currentItem.caption }}</p>
          <span class="text-xs opacity-30">{{ current + 1 }} / {{ gallery.length }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button @click="prev" class="nav-btn">←</button>
          <button @click="next" class="nav-btn">→</button>
        </div>
      </div>

    </div>

    <!-- lightbox -->
    <div
      v-if="activeImg"
      class="lightbox"
      @click="close">
      <div class="lightbox-inner" @click.stop>
        <button @click="close" class="lightbox-close">✕</button>
        <img
          :src="activeImg.src"
          :alt="activeImg.caption"
          class="lightbox-img"/>
        <p class="text-xs opacity-60 mt-3 italic text-center">{{ activeImg.caption }}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* nav buttons */
.nav-btn {
  font-family: 'Geist', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #161614;
  background: none;
  border: 1px solid #161614;
  padding: 6px 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.nav-btn:hover {
  opacity: 0.6;
}

/* dots */
.dot-btn {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f4f5ef;
  opacity: 0.4;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0;
}

.dot-active {
  opacity: 1;
}

/* lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(22, 22, 20, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 2rem;
}

.lightbox-inner {
  position: relative;
  max-width: 1000px;
  width: 100%;
}

.lightbox-img {
  width: 100%;
  height: auto;
  max-height: 85vh;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  color: #f4f5ef;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.lightbox-close:hover {
  opacity: 1;
}
</style>