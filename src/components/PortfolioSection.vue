<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <section class="bg-primary">
    <div class="px-8 max-w-7xl mx-auto py-6">

      <!-- header -->
      <div class="space-y-2">
        <div class="h-0.5 bg-secondary"
          data-aos="fade-up" data-aos-duration="1000" />
        <h2 class="text-secondary text-base font-medium"
          data-aos="fade-up" data-aos-duration="1500">
          <span>Portfolio</span> <span class="font-bold italic">book</span>
        </h2>
      </div>

      <!-- judul besar -->
      <div class="mt-12 mb-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        data-aos="fade-up" data-aos-duration="2000">
        <p style="font-family:'Playfair Display',serif;font-size:clamp(3rem,8vw,7rem);font-weight:700;font-style:italic;line-height:1;color:#161614;">
          View<br/>my work.
        </p>
        <div class="flex flex-col gap-4 items-start lg:items-end">
          <p class="text-xs opacity-50 text-secondary max-w-xs lg:text-right">
            A curated collection of projects, experiments, and work — presented as an interactive portfolio book.
          </p>
        </div>
      </div>

      <!-- 2 card -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"
        data-aos="fade-up" data-aos-duration="2500">

        <!-- card kiri: buka flipbook -->
        <div class="portfolio-card card-dark group cursor-pointer"
          @click="router.push('/portfolio')">
          <!-- dot grid -->
          <div class="card-dots" />
          <!-- konten -->
          <div class="card-body">
            <div>
              <h3 class="card-title">Interactive Portfolio Book</h3>
              <p class="card-desc">Browse all projects, case studies, and work in an immersive flipbook experience.</p>
            </div>
            <button class="card-cta">
              <span class="cta-arrow">→</span>
              <span>Open Portfolio</span>
            </button>
          </div>
          <!-- ilustrasi: buku terbuka -->
          <div class="card-illo">
            <svg viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- shadow buku (offset gelap di belakang) -->
              <g transform="translate(14, 14)">
                <path d="M20 30 Q60 15 105 30 L105 140 Q60 125 20 140 Z" fill="rgba(0,0,0,0.35)"/>
                <path d="M105 30 Q150 15 190 30 L190 140 Q150 125 105 140 Z" fill="rgba(0,0,0,0.35)"/>
              </g>
              <!-- buku terbuka: halaman kiri (fill solid) -->
              <path d="M20 30 Q60 15 105 30 L105 140 Q60 125 20 140 Z"
                fill="#4a4c66" stroke="#f4f5ef" stroke-width="2"/>
              <!-- halaman kanan -->
              <path d="M105 30 Q150 15 190 30 L190 140 Q150 125 105 140 Z"
                fill="#3d3f56" stroke="#f4f5ef" stroke-width="2"/>
              <!-- spine -->
              <line x1="105" y1="30" x2="105" y2="140" stroke="#f4f5ef" stroke-width="2"/>
              <!-- garis teks kiri -->
              <line x1="35" y1="50" x2="90" y2="45" stroke="rgba(244,245,239,0.5)" stroke-width="1.5"/>
              <line x1="35" y1="62" x2="90" y2="57" stroke="rgba(244,245,239,0.35)" stroke-width="1.5"/>
              <line x1="35" y1="74" x2="80" y2="70" stroke="rgba(244,245,239,0.35)" stroke-width="1.5"/>
              <line x1="35" y1="86" x2="90" y2="82" stroke="rgba(244,245,239,0.25)" stroke-width="1.5"/>
              <!-- kotak gambar kanan -->
              <rect x="120" y="45" width="55" height="38" rx="2"
                fill="rgba(244,245,239,0.15)" stroke="rgba(244,245,239,0.5)" stroke-width="1.5"
                transform="rotate(-2 147 64)"/>
              <line x1="120" y1="100" x2="175" y2="96" stroke="rgba(244,245,239,0.4)" stroke-width="1.5"/>
              <line x1="120" y1="112" x2="168" y2="108" stroke="rgba(244,245,239,0.3)" stroke-width="1.5"/>
            </svg>
          </div>
        </div>

        <!-- card kanan: CV / resume -->
        <div class="portfolio-card card-muted group cursor-pointer"
          @click="router.push('/resume')">
          <div class="card-dots card-dots-light" />
          <div class="card-body">
            <div>
              <h3 class="card-title">Résumé & CV</h3>
              <p class="card-desc">ATS-friendly resume, skills overview, and professional background in one place.</p>
            </div>
            <button class="card-cta">
              <span class="cta-arrow">→</span>
              <span>View CV</span>
            </button>
          </div>
          <!-- ilustrasi: dokumen -->
          <div class="card-illo">
            <svg viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- shadow -->
              <rect x="72" y="24" width="110" height="140" rx="4" fill="rgba(0,0,0,0.35)"/>
              <!-- dokumen (fill solid hijau muted) -->
              <rect x="60" y="12" width="110" height="140" rx="4"
                fill="#4a5244" stroke="#f4f5ef" stroke-width="2"/>
              <!-- header -->
              <rect x="60" y="12" width="110" height="26" rx="4" fill="rgba(244,245,239,0.12)"/>
              <line x1="60" y1="38" x2="170" y2="38" stroke="#f4f5ef" stroke-width="1.5"/>
              <!-- foto -->
              <rect x="74" y="50" width="28" height="34" rx="2"
                fill="rgba(244,245,239,0.15)" stroke="rgba(244,245,239,0.5)" stroke-width="1.5"/>
              <!-- garis nama -->
              <line x1="112" y1="56" x2="156" y2="56" stroke="rgba(244,245,239,0.6)" stroke-width="2"/>
              <line x1="112" y1="66" x2="150" y2="66" stroke="rgba(244,245,239,0.35)" stroke-width="1.5"/>
              <line x1="112" y1="76" x2="156" y2="76" stroke="rgba(244,245,239,0.25)" stroke-width="1.5"/>
              <!-- garis isi -->
              <line x1="74" y1="100" x2="156" y2="100" stroke="rgba(244,245,239,0.4)" stroke-width="1.5"/>
              <line x1="74" y1="112" x2="146" y2="112" stroke="rgba(244,245,239,0.3)" stroke-width="1.5"/>
              <line x1="74" y1="124" x2="156" y2="124" stroke="rgba(244,245,239,0.25)" stroke-width="1.5"/>
              <line x1="74" y1="136" x2="130" y2="136" stroke="rgba(244,245,239,0.2)" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
        <!-- card 3: transkrip nilai -->
        <div class="portfolio-card card-teal group cursor-pointer"
          @click="router.push('/transcript')">
          <div class="card-dots card-dots-light" />
          <div class="card-body">
            <div>
              <h3 class="card-title">Academic Transcript</h3>
              <p class="card-desc">Official university transcript — Instrumentation Physics, Lambung Mangkurat University.</p>
            </div>
            <button class="card-cta">
              <span class="cta-arrow">→</span>
              <span>View Transcript</span>
            </button>
          </div>
          <!-- ilustrasi: dokumen dengan segel -->
          <div class="card-illo">
            <svg viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="72" y="24" width="110" height="140" rx="4" fill="rgba(0,0,0,0.35)"/>
              <rect x="60" y="12" width="110" height="140" rx="4"
                fill="#3d4457" stroke="#f4f5ef" stroke-width="2"/>
              <line x1="74" y1="34" x2="156" y2="34" stroke="rgba(244,245,239,0.6)" stroke-width="2"/>
              <line x1="74" y1="46" x2="140" y2="46" stroke="rgba(244,245,239,0.3)" stroke-width="1.5"/>
              <!-- baris nilai: label + grade -->
              <line x1="74" y1="66" x2="128" y2="66" stroke="rgba(244,245,239,0.35)" stroke-width="1.5"/>
              <line x1="144" y1="66" x2="156" y2="66" stroke="rgba(244,245,239,0.6)" stroke-width="2"/>
              <line x1="74" y1="78" x2="122" y2="78" stroke="rgba(244,245,239,0.3)" stroke-width="1.5"/>
              <line x1="144" y1="78" x2="156" y2="78" stroke="rgba(244,245,239,0.6)" stroke-width="2"/>
              <line x1="74" y1="90" x2="130" y2="90" stroke="rgba(244,245,239,0.3)" stroke-width="1.5"/>
              <line x1="144" y1="90" x2="156" y2="90" stroke="rgba(244,245,239,0.6)" stroke-width="2"/>
              <line x1="74" y1="102" x2="118" y2="102" stroke="rgba(244,245,239,0.25)" stroke-width="1.5"/>
              <line x1="144" y1="102" x2="156" y2="102" stroke="rgba(244,245,239,0.6)" stroke-width="2"/>
              <!-- segel wisuda -->
              <circle cx="92" cy="130" r="14" fill="rgba(244,245,239,0.1)"
                stroke="rgba(244,245,239,0.5)" stroke-width="1.5"/>
              <circle cx="92" cy="130" r="8" fill="none"
                stroke="rgba(244,245,239,0.35)" stroke-width="1"/>
              <path d="M88 141 L85 152 L92 148 L99 152 L96 141"
                fill="none" stroke="rgba(244,245,239,0.4)" stroke-width="1.5"/>
            </svg>
          </div>
        </div>

        <!-- card 4: main catur -->
        <a class="portfolio-card card-wine group cursor-pointer"
          href="https://catur-chess.mjmokhtar.cloud"
          target="_blank" rel="noopener">
          <div class="card-dots card-dots-light" />
          <div class="card-body">
            <div>
              <h3 class="card-title">Play Chess</h3>
              <p class="card-desc">Take a break and sharpen your mind — play a game against the engine.</p>
            </div>
            <button class="card-cta">
              <span class="cta-arrow">→</span>
              <span>Start a Game</span>
            </button>
          </div>
          <!-- ilustrasi: papan + kuda -->
          <div class="card-illo">
            <svg viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- papan miring -->
              <g transform="translate(70,40) rotate(-4)">
                <rect x="0" y="0" width="120" height="120" rx="3"
                  fill="#4a3d3d" stroke="#f4f5ef" stroke-width="2"/>
                <g fill="rgba(244,245,239,0.18)">
                  <rect x="15" y="0"  width="15" height="15"/><rect x="45" y="0"  width="15" height="15"/><rect x="75" y="0"  width="15" height="15"/><rect x="105" y="0" width="15" height="15"/>
                  <rect x="0"  y="15" width="15" height="15"/><rect x="30" y="15" width="15" height="15"/><rect x="60" y="15" width="15" height="15"/><rect x="90" y="15" width="15" height="15"/>
                  <rect x="15" y="30" width="15" height="15"/><rect x="45" y="30" width="15" height="15"/><rect x="75" y="30" width="15" height="15"/><rect x="105" y="30" width="15" height="15"/>
                  <rect x="0"  y="45" width="15" height="15"/><rect x="30" y="45" width="15" height="15"/><rect x="60" y="45" width="15" height="15"/><rect x="90" y="45" width="15" height="15"/>
                  <rect x="15" y="60" width="15" height="15"/><rect x="45" y="60" width="15" height="15"/><rect x="75" y="60" width="15" height="15"/><rect x="105" y="60" width="15" height="15"/>
                  <rect x="0"  y="75" width="15" height="15"/><rect x="30" y="75" width="15" height="15"/><rect x="60" y="75" width="15" height="15"/><rect x="90" y="75" width="15" height="15"/>
                  <rect x="15" y="90" width="15" height="15"/><rect x="45" y="90" width="15" height="15"/><rect x="75" y="90" width="15" height="15"/><rect x="105" y="90" width="15" height="15"/>
                  <rect x="0"  y="105" width="15" height="15"/><rect x="30" y="105" width="15" height="15"/><rect x="60" y="105" width="15" height="15"/><rect x="90" y="105" width="15" height="15"/>
                </g>
              </g>
              <!-- kuda unicode besar -->
              <text x="52" y="120" font-size="72" fill="#f4f5ef"
                style="font-family:serif;" opacity="0.9">♞</text>
            </svg>
          </div>
        </a>

        <!-- card 5: store -->
        <a class="portfolio-card card-amber group cursor-pointer"
          href="https://store.mjmokhtar.cloud"
          target="_blank" rel="noopener">
          <div class="card-dots card-dots-light" />
          <div class="card-body">
            <div>
              <h3 class="card-title">Digital Store</h3>
              <p class="card-desc">Templates, guides, and digital products on physics, IoT, and project management.</p>
            </div>
            <button class="card-cta">
              <span class="cta-arrow">→</span>
              <span>Visit Store</span>
            </button>
          </div>
          <!-- ilustrasi: etalase toko -->
          <div class="card-illo">
            <svg viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- shadow -->
              <rect x="66" y="66" width="120" height="86" rx="4" fill="rgba(0,0,0,0.35)"/>
              <!-- badan toko -->
              <rect x="56" y="56" width="120" height="86" rx="4"
                fill="#4d3f2a" stroke="#f4f5ef" stroke-width="2"/>
              <!-- awning bergelombang -->
              <path d="M50 56 L182 56 L176 34 L56 34 Z"
                fill="#5a4a30" stroke="#f4f5ef" stroke-width="2"/>
              <path d="M56 56 Q63 66 70 56 Q77 66 84 56 Q91 66 98 56 Q105 66 112 56 Q119 66 126 56 Q133 66 140 56 Q147 66 154 56 Q161 66 168 56 Q172 66 176 56"
                fill="rgba(244,245,239,0.15)" stroke="#f4f5ef" stroke-width="1.5"/>
              <!-- pintu -->
              <rect x="72" y="94" width="30" height="48" rx="2"
                fill="rgba(244,245,239,0.1)" stroke="rgba(244,245,239,0.5)" stroke-width="1.5"/>
              <!-- jendela display -->
              <rect x="116" y="94" width="46" height="30" rx="2"
                fill="rgba(244,245,239,0.14)" stroke="rgba(244,245,239,0.5)" stroke-width="1.5"/>
              <!-- price tag gantung -->
              <g transform="rotate(8 148 78)">
                <path d="M138 70 L158 70 L164 78 L158 86 L138 86 Z"
                  fill="#d8e34e" opacity="0.9" stroke="#f4f5ef" stroke-width="1.5"/>
                <circle cx="158" cy="78" r="2" fill="#4d3f2a"/>
              </g>
            </svg>
          </div>
        </a>

        <!-- card 6: jutsu scrolls (repo collection) -->
        <div class="portfolio-card card-scroll group cursor-pointer"
          @click="router.push('/scrolls')">
          <div class="card-dots card-dots-light" />
          <div class="card-body">
            <div>
              <h3 class="card-title">Jutsu Scrolls</h3>
              <p class="card-desc">Open-source techniques — firmware examples, drivers, and experiments, sealed in scrolls.</p>
            </div>
            <button class="card-cta">
              <span class="cta-arrow">→</span>
              <span>Unroll the Scrolls</span>
            </button>
          </div>
          <!-- ilustrasi: gulungan ninja terbuka -->
          <div class="card-illo">
            <svg viewBox="0 0 220 170" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- shadow -->
              <g transform="translate(10,10)" opacity="0.35">
                <rect x="40" y="50" width="140" height="70" fill="#000"/>
              </g>
              <!-- kertas gulungan terbentang -->
              <rect x="40" y="50" width="140" height="70"
                fill="#3a3230" stroke="#f4f5ef" stroke-width="2"/>
              <!-- gulungan kiri (roll) -->
              <rect x="26" y="42" width="18" height="86" rx="9"
                fill="#8a2f24" stroke="#f4f5ef" stroke-width="2"/>
              <circle cx="35" cy="42" r="5" fill="#f4f5ef" opacity="0.85"/>
              <circle cx="35" cy="128" r="5" fill="#f4f5ef" opacity="0.85"/>
              <!-- gulungan kanan (roll) -->
              <rect x="176" y="42" width="18" height="86" rx="9"
                fill="#8a2f24" stroke="#f4f5ef" stroke-width="2"/>
              <circle cx="185" cy="42" r="5" fill="#f4f5ef" opacity="0.85"/>
              <circle cx="185" cy="128" r="5" fill="#f4f5ef" opacity="0.85"/>
              <!-- "kanji" kode: kurung siku + baris -->
              <text x="58" y="82" font-size="26" fill="rgba(244,245,239,0.8)"
                style="font-family:monospace;">&lt;/&gt;</text>
              <line x1="58" y1="96" x2="128" y2="96" stroke="rgba(244,245,239,0.4)" stroke-width="1.5"/>
              <line x1="58" y1="106" x2="116" y2="106" stroke="rgba(244,245,239,0.3)" stroke-width="1.5"/>
              <!-- lingkaran segel (fuin) -->
              <circle cx="150" cy="85" r="17" fill="none"
                stroke="rgba(244,245,239,0.5)" stroke-width="1.5"/>
              <circle cx="150" cy="85" r="10" fill="none"
                stroke="rgba(244,245,239,0.3)" stroke-width="1"
                stroke-dasharray="3 3"/>
              <circle cx="150" cy="85" r="3" fill="#d8e34e" opacity="0.85"/>
            </svg>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>

.portfolio-card {
  position: relative;
  border-radius: 12px;
  padding: 32px;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
}
.portfolio-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(22,22,20,0.18);
}
a.portfolio-card { text-decoration: none; color: inherit; }

/* card kiri — gelap seperti referensi kiri */
.card-dark {
  background: #1e1f2e;
}
/* card kanan — lebih muted/hijau gelap seperti referensi kanan */
.card-muted {
  background: #1a1f1a;
}

.card-navy { background: #1a1e2b; }
.card-wine { background: #241a1a; }
.card-teal { background: #14232a; }
.card-amber  { background: #241e12; }   /* store — coklat amber gelap */
.card-scroll { background: #3f2535; }   /* scrolls — merah bata gelap ala gulungan */

.card-grain {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.5;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}

/* dot grid overlay */
.card-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(244,245,239,0.22) 1.5px, transparent 1.5px);
  background-size: 26px 26px;
  pointer-events: none;
  z-index: 0;
  /* dot hanya terlihat di area kanan seperti referensi */
  -webkit-mask-image: linear-gradient(to right, transparent 30%, black 70%);
  mask-image: linear-gradient(to right, transparent 30%, black 70%);
}

.card-dots-light {
  background-image: radial-gradient(circle, rgba(244,245,239,0.12) 1px, transparent 1px);
}

/* konten di atas dot grid */
.card-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 60%;
}

.card-title {
  font-family: 'Geist', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #f4f5ef;
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-desc {
  font-family: 'Geist', sans-serif;
  font-size: 0.8rem;
  color: rgba(244,245,239,0.55);
  line-height: 1.6;
}

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(244,245,239,0.08);
  border: 1px solid rgba(244,245,239,0.2);
  color: #f4f5ef;
  font-family: 'Geist', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  width: fit-content;
}
.card-cta:hover {
  background: rgba(244,245,239,0.15);
  border-color: rgba(244,245,239,0.4);
}

.cta-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #f4f5ef;
  color: #161614;
  border-radius: 4px;
  font-size: 0.75rem;
}

/* ilustrasi SVG di pojok kanan bawah */
.card-illo {
  position: absolute;
  right: -20px;
  bottom: -30px;
  width: 240px;
  height: 185px;
  opacity: 0.9;
  z-index: 0;
  transition: transform 0.25s ease;
}
.group:hover .card-illo {
  transform: translate(-6px, -6px) rotate(-1deg);
}
</style>