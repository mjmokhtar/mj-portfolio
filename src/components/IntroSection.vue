<script setup>
import { meta } from '../data/meta.js'
</script>

<template>
  <section class="bg-primary intro-section">

    <!-- dot grid overlay -->
    <div class="dot-grid"/>

    <div class="px-8 max-w-7xl mx-auto py-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-4 text-secondary gap-6">
        <!-- big lead -->
        <p class="lg:col-span-3 lg:text-5xl text-3xl indent-16 lg:indent-32 swap-bootzy intro-lead lg:mt-10 lg:mb-10"
          data-aos="fade-up" data-aos-duration="2000">
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
        <p class="lg:col-start-4 leading-relaxed text-base swap-grotesque"
          data-aos="fade-up" data-aos-duration="2500">
          {{ meta.bio.p2 }}
        </p>
        <p class="lg:col-start-4 leading-relaxed text-base swap-dmmono"
          data-aos="fade-up" data-aos-duration="3000">
          {{ meta.bio.p3 }}
        </p>
        <div class="lg:col-start-1 lg:col-span-1 flex items-end justify-center lg:center"
          data-aos="fade-up" data-aos-duration="3000">
          <div class="intro-illo">
            <img src="/intro.png"
              alt="Ilustrasi seseorang membaca buku di atas tumpukan buku"
              style="mix-blend-mode: multiply;" />
          </div>
        </div>
        <!-- big closing -->
        <p class="lg:col-span-3 lg:col-start-2 lg:text-7xl text-3xl indent-10 lg:indent-32 swap-broadsheet intro-closing lg:mt-16"
          data-aos="fade-up" data-aos-duration="3000"
          v-html="meta.bio.closing" />
      </div>
      <div
        class="mt-12 lg:mt-12 map-wrap"
        data-aos="fade-up"
        data-aos-duration="3000"
        data-aos-delay="250">
        <img
          src="/map.png"
          alt="Peta dunia proyeksi interrupted — lokasi saat ini Jakarta"
          class="w-full h-auto object-cover"
        />

        <!-- marker Jakarta -->
        <div class="map-marker" style="--x: 79%; --y: 55%;">
          <span class="mm-ring" aria-hidden="true"></span>
          <span class="mm-ring mm-ring-2" aria-hidden="true"></span>
          <span class="mm-dot" aria-hidden="true"></span>
          <div class="mm-label">
            ░ CURRENT LOCATION<br>
            DJAKARTA, ID<br>
            6°12'00"S&nbsp;106°49'00"E
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.intro-section {
  position: relative;
}

.dot-grid {
  position: absolute;
  /* ikutin padding dan max-width konten, bukan full section */
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(calc(100% - 4rem), 80rem); /* px-8 = 2rem tiap sisi, max-w-7xl = 80rem */
  z-index: 0;
  background-image: radial-gradient(
    circle,
    #161614 1.5px,
    transparent 1.5px
  );
  background-size: 16px 16px;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0,0,0,0.08) 15%,
    rgba(0,0,0,0.12) 40%,
    rgba(0,0,0,0.12) 60%,
    rgba(0,0,0,0.08) 85%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0,0,0,0.08) 15%,
    rgba(0,0,0,0.12) 40%,
    rgba(0,0,0,0.12) 60%,
    rgba(0,0,0,0.08) 85%,
    transparent 100%
  );
  pointer-events: none;
}

.map-wrap {
  position: relative;
}

.map-marker {
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* titik pusat */
.mm-dot {
  position: absolute;
  left: 50%; top: 50%;
  width: 8px; height: 8px;
  transform: translate(-50%, -50%);
  background: #161614;
  border-radius: 50%;
  outline: 2px solid #f4f5ef;   /* pemisah dari daratan hitam di bawahnya */
}

/* ping radar */
.mm-ring {
  position: absolute;
  left: 50%; top: 50%;
  width: 8px; height: 8px;
  transform: translate(-50%, -50%);
  border: 1.5px solid #161614;
  border-radius: 50%;
  animation: mm-ping 2.4s cubic-bezier(0, 0.4, 0.4, 1) infinite;
}
.mm-ring-2 { animation-delay: 1.2s; }

@keyframes mm-ping {
  0%   { width: 8px;  height: 8px;  opacity: 0.9; }
  100% { width: 56px; height: 56px; opacity: 0; }
}

/* label mono dengan garis penunjuk */
.mm-label {
  position: absolute;
  left: 50%;
  top: 22px;                       /* jarak label dari titik — ke bawah */
  transform: translateX(-50%);     /* rata tengah terhadap titik */
  padding: 7px 10px;
  background: #f4f5ef;
  border: 1px solid #161614;
  font-family: 'Departure Mono', monospace;
  font-size: 10px;
  line-height: 1.55;
  letter-spacing: 0.06em;
  color: #161614;
  white-space: nowrap;
  text-align: center;
}

/* garis penunjuk: sekarang vertikal, dari titik turun ke label */
.mm-label::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -17px;                      /* menjulur ke atas menuju titik */
  width: 1px;
  height: 17px;
  background: #161614;
}

/* ── font swap saat hover ── */
.swap-bootzy, .swap-broadsheet {
  cursor: crosshair;
}

.swap-bootzy:hover {
  font-family: var(--font-bootzy) !important;
  font-weight: 700 !important;
  /* font-size: 60px; */
}

.swap-grotesque {
  font-family: var(--font-grotesque);
  font-weight: 500;
  font-size: 1.25rem;      /* DG x-height kecil — dikompensasi sedikit */
  line-height: 1.28;
}

.swap-dmmono {
  font-family: var(--font-dm-mono);
  font-weight: 500;
  font-style: italic;
  font-size: 0.85rem;      /* DM Mono lebih lebar — dikecilkan sedikit */
}

.swap-broadsheet:hover {
  font-family: var(--font-broadsheet) !important;
  font-weight: 600 !important;   /* Broadsheet hanya punya regular */
  /* font-size: 84px; */
}

/* kata kunci: tegak secara default, italic hanya saat Broadsheet aktif */
.swap-broadsheet :deep(.sw) { font-style: normal; }
.swap-broadsheet:hover :deep(.sw) { font-style: italic; }

.intro-illo {
  width: 240px;
  overflow: hidden;
  display: flex;
  justify-content: center;   /* figur di tengah kanvas → slice tengah yang tampil */
}
.intro-illo img {
  height: 360px;
  width: auto;
  max-width: none;           /* penting: lepas batas lebar Tailwind */
}

.intro-lead {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  line-height: 1.15;
}

.intro-closing {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  line-height: 1.05;
}

/* ukuran khusus desktop */
@media (min-width: 1024px) {
  .intro-lead{
    line-height:64px;
  }
  .intro-closing{
    line-height:80px;
    font-size: 78px;
  }
  .swap-bootzy:hover     { 
    font-size: 63px; 
    line-height: 64px !important;  /* = 72px × 1.1, tinggi baris Playfair closing */
  }
  .swap-broadsheet:hover { 
    font-size: 95px !important; 
    line-height: 80px !important;  /* = 72px × 1.1, tinggi baris Playfair closing */
  }
  /* Firefox SAJA — harus di bawah rule default */
  @supports (-moz-appearance: none) {
    .swap-broadsheet:hover {
      font-size: 94px !important;
      line-height: 79.7px !important;
    }
  }
}

@media (max-width: 640px) {
  .mm-label {
    font-size: 7.5px;
    padding: 5px 7px;
    top: 16px;
  }
  .mm-label::before { top: -12px; height: 12px; }
  @keyframes mm-ping {
    0%   { width: 6px;  height: 6px;  opacity: 0.9; }
    100% { width: 34px; height: 34px; opacity: 0; }
  }
  .swap-bootzy:hover     { 
    font-size: 40px; 
    line-height: .863 !important;  /* = 72px × 1.1, tinggi baris Playfair closing */
  }
  .swap-broadsheet:hover { 
    font-size: 40px; 
    line-height: 31.2px !important;  
  }
  .swap-dmmono {
    font-family: var(--font-dm-mono);
    font-weight: 500;
    font-style: italic;
    font-size: 0.88rem;      /* DM Mono lebih lebar — dikecilkan sedikit */
  }
}
</style>