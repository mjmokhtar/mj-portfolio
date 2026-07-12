<script setup>
import { ref, onMounted } from 'vue'

const REPOS = [
  'mjmokhtar/esp32-idf-examples',
  'mjmokhtar/avr-atmel-example',
  'mjmokhtar/STM32Cube-IDE-example',
]

defineProps({
  embedded: { type: Boolean, default: false }
})

const repos = ref(
  REPOS.map((full, i) => ({
    full,
    owner: full.split('/')[0],
    name:  full.split('/')[1],
    idx:   String(i + 1).padStart(2, '0'),
    og:    `https://opengraph.githubassets.com/1/${full}`,
    stars: null, forks: null, issues: null, language: null,
    loaded: false,
  }))
)

onMounted(async () => {
  await Promise.all(repos.value.map(async r => {
    try {
      const res = await fetch(`https://api.github.com/repos/${r.full}`)
      if (!res.ok) return
      const d = await res.json()
      r.stars = d.stargazers_count
      r.forks = d.forks_count
      r.issues = d.open_issues_count
      r.language = d.language
      r.loaded = true
    } catch { /* stats optional */ }
  }))
})
</script>

<template>
  <section :class="embedded ? '' : 'bg-primary'">
    <div :class="embedded ? 'py-6' : 'px-8 max-w-7xl mx-auto py-6'">

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <article v-for="(r, i) in repos" :key="r.full"
          class="scroll-card"
          data-aos="fade-up"
          :data-aos-duration="1500 + i * 300">

          <!-- baris atas: PREVIEW + index -->
          <div class="sc-toprow">
            <span class="sc-microlabel">Preview</span>
            <span class="sc-microlabel">Scroll_{{ r.idx }}</span>
          </div>

          <!-- judul -->
          <p class="sc-title">
            <span class="sc-owner">{{ r.owner }}/</span><span class="sc-name">{{ r.name }}</span>
          </p>

          <!-- stats -->
          <div class="sc-stats">
            <span class="sc-stat">
              <b>{{ r.loaded ? r.issues : '–' }}</b> Issues
            </span>
            <span class="sc-stat">
              <b>{{ r.loaded ? r.stars : '–' }}</b> Stars
            </span>
            <span class="sc-stat">
              <b>{{ r.loaded ? r.forks : '–' }}</b> Forks
            </span>
            <span v-if="r.language" class="sc-stat">
              <b>{{ r.language }}</b>
            </span>
          </div>

          <!-- bar aksen -->
          <div class="sc-bar" />

          <!-- preview OG image github -->
          <div class="sc-frame">
            <span class="sc-coord sc-coord-tl">Preview</span>
            <span class="sc-coord sc-coord-br">{{ r.name }}</span>
            <img :src="r.og"
              :alt="`Preview repository ${r.full}`"
              loading="lazy" decoding="async"
              class="sc-og" />
          </div>

          <!-- baris bawah: route + tombol -->
          <div class="sc-botrow">
            <span class="sc-microlabel">Route_Repo</span>
            <a :href="`https://github.com/${r.full}`"
              target="_blank" rel="noopener"
              class="sc-btn">
              Open ↗
            </a>
          </div>

        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
.scroll-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1.5px dashed rgba(22,22,20,0.35);
  background: #f4f5ef;
  padding: 22px;
}

.sc-toprow, .sc-botrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sc-microlabel {
  font-family: 'Courier New', monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(22,22,20,0.4);
}

.sc-title {
  font-family: 'Geist', sans-serif;
  font-size: 1.55rem;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: #161614;
  word-break: break-word;
}
.sc-owner { font-weight: 400; opacity: 0.5; }
.sc-name  { font-weight: 900; }

.sc-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-family: 'Geist', sans-serif;
  font-size: 0.68rem;
  color: rgba(22,22,20,0.5);
}
.sc-stat b { color: #161614; font-weight: 700; margin-right: 3px; }

/* bar aksen ala garis oranye naufaldi — pakai kuning aksen situsmu */
.sc-bar {
  height: 5px;
  background: repeating-linear-gradient(
    90deg,
    #161614 0 24px,
    #d8e34e 24px 32px
  );
}

/* frame preview */
.sc-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid rgba(22,22,20,0.25);
  background:
    linear-gradient(rgba(22,22,20,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22,22,20,0.05) 1px, transparent 1px);
  background-size: 20px 20px;   /* drawing-grid seperti referensi */
}
.sc-og {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  opacity: 0.75;
  transition: filter 0.3s, opacity 0.3s, transform 0.3s;
}
.scroll-card:hover .sc-og {
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.02);
}

/* coordinate labels di sudut frame */
.sc-coord {
  position: absolute;
  z-index: 1;
  font-family: 'Courier New', monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(22,22,20,0.45);
  background: rgba(244,245,239,0.85);
  padding: 2px 6px;
}
.sc-coord-tl { top: 6px; left: 6px; }
.sc-coord-br { bottom: 6px; right: 6px; }

/* tombol */
.sc-btn {
  font-family: 'Courier New', monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #161614;
  border: 1px solid #161614;
  padding: 8px 16px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.sc-btn:hover {
  background: #161614;
  color: #f4f5ef;
}
</style>