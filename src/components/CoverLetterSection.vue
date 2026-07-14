<script setup>

// pixel dither badge — deterministik (seeded)
function badgeRng(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const brng = badgeRng(2026)
const BCOLS = 34, BROWS = 32
const badgeCells = []
for (let y = 0; y < BROWS; y++) {
  for (let x = 0; x < BCOLS; x++) {
    // kolom kiri (0–2) lebih padat putih, sisanya ±50%
    const density = x < 3 ? 0.78 : 0.5
    if (brng() < density) badgeCells.push({ x, y })
  }
}

// tidak ada logic — komposisi statis seperti aslinya
</script>

<template>
  <section class="bg-primary">

    <!-- pembatas section standar -->
    <div class="px-8 max-w-7xl mx-auto py-6">
      <div class="mt-6 space-y-2">
        <div class="h-0.5 bg-secondary" data-aos="fade-up" data-aos-duration="1000" />
        <h3 class="text-secondary text-base font-medium" data-aos="fade-up" data-aos-duration="1500">
          <span>Cover</span> <span class="font-bold">letter</span>
        </h3>
      </div>
    </div>

    <!-- stage -->
    <div class="cl-stage">
      <div class="cl-max">

        <!-- ═══ #letter : grid 155px | 1fr, persis aslinya ═══ -->
        <div class="cl-letter-grid">

          <!-- kolom kiri: comment ░ -->
          <p class="cl-comment">
            ░&nbsp;&nbsp;THIS IS A COVER LETTER
            <br />░&nbsp;&nbsp;FROM A FIELD ENGINEER
            <br />░&nbsp;&nbsp;AIMING FOR PRODUCT COMMAND
          </p>

          <!-- kolom kanan: kertas brief -->
          <div class="cl-brief">
            <div class="cl-holes cl-holes-l" aria-hidden="true" />
            <div class="cl-holes cl-holes-r" aria-hidden="true" />
<pre class="cl-pre">
To:                                From:
HIRING MANAGER                     M.J. MOKHTAR
FUTURE EMPLOYER                    DJAKARTA, INDONESIA
                                   MJMOKHTAR.CLOUD


Dear Hiring Manager,

I trust this message finds you in good spirits. I am
pleased to brief you on <span class="highlight">this career transition mission</span>
toward IoT Product & Project Management.

<span class="highlight">My primary objective is to bridge engineering execution</span>
<span class="highlight">with product strategy.</span> Field records confirm 50+ train
units running systems I commissioned, deployments led
end to end, and BNSP certifications in IoT Network Engineering.

Please review all evidence according to the attached
mission report. Departure toward product command is
set for the earliest opportunity.

I have full confidence in the fit between this profile
and your mission.

Best regards,
Muhammad Jumi'at Mokhtar</pre>
          </div>

          <!-- memo (clipping) — absolut, px keras seperti aslinya -->
          <div class="cl-memo">
            <p class="cl-memo-title">EVIDENCE OF END-TO-END IOT DELIVERY ON LIVE RAIL SITES</p>
            <p class="cl-memo-body">Field reports confirm 50+ train units running monitoring systems commissioned by the candidate, suggesting recent and ongoing delivery activity.</p>
          </div>

          <!-- paperclip — absolut, menjepit memo -->
          <svg class="cl-paperclip" viewBox="0 0 40 110" fill="none" aria-hidden="true">
            <path d="M12 100 V22 a9 9 0 0 1 18 0 v64 a6.5 6.5 0 0 1 -13 0 V34"
              stroke="#1a1a17" stroke-width="2.6" stroke-linecap="round" />
          </svg>

          <!-- badge — absolut kiri, dengan hover fisik aslinya -->
          <div class="cl-badge">
            <span class="cl-badge-notch" />
            <p class="cl-badge-tier">TIER 1 ACCESS</p>
            <div class="cl-badge-mid">
            <img class="cl-badge-qr" src="/qr.png"
                alt="Scan untuk membuka mjmokhtar.cloud" />
            <!-- <div class="cl-badge-side">
                <span class="cl-badge-sq" />
                <span class="cl-badge-year">0<br>2<br>6</span>
            </div> -->
            </div>
            <p class="cl-badge-name">M.J.<br>Mokhtar</p>
            <p class="cl-badge-org">mjmokhtar.cloud</p>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* ═══ palet mengikuti aslinya ═══ */
.cl-stage {
  /*--bg: #e7e7e4;        /* aluminum */
  --soot: #1a1a17;
  --foam: #ccd6b5;      /* highlight sage */
  --time: 600ms;
  --easing: cubic-bezier(1, 0.05, 0.48, 0.99);   /* easing badge aslinya */

  background: var(--bg);
  overflow: hidden;
  font-family: 'Departure Mono', monospace;
  color: var(--soot);
}
.cl-max {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ═══ #letter — grid & margin persis: 155px 1fr, gap besar ═══ */
.cl-letter-grid {
  position: relative;
  display: grid;
  grid-template-columns: 155px 1fr;
  gap: 120px;                        /* aslinya 187px; dirapatkan utk max-w-7xl */
  margin: 90px 0 120px 60px;         /* aslinya 185/492/114 — diskala */
}

/* comment ░ — width 204px persis */
.cl-comment {
  width: 204px;
  font-size: 12px;
  line-height: 1.55;
  margin: 0;
  opacity: 0.75;
}

/* ═══ kertas brief ═══ */
.cl-brief {
  position: relative;
  background: #fdfdfb;
  z-index: 1;
  box-shadow: 0 12px 36px rgba(26,26,23,0.08);
}
.cl-holes {
  position: absolute; top: 0; bottom: 0;
  width: 48px;
  background-image: radial-gradient(circle, #dcdcd7 7px, transparent 7.5px);
  background-size: 48px 52px;
  background-position: center 26px;
  background-repeat: repeat-y;
}
.cl-holes-l { left: 0; }
.cl-holes-r { right: 0; }

/* pre surat — metrik persis aslinya: 16.5px / 24.75px, padding 88px 66px */
.cl-pre {
  position: relative;
  margin: 0;
  padding: 15px 66px 15px;
  font-family: inherit;
  font-size: 16.5px;
  line-height: 24.75px;
  white-space: pre;
  overflow-x: auto;
  overflow: hidden;
}
.cl-pre .highlight,
.cl-pre :deep(.highlight) {
  background-color: var(--foam);
}

/* ═══ memo — posisi px keras ala #newspaper-clipping ═══ */
.cl-memo {
  position: absolute;
  top: -24px;
  right: -14px;                      /* aslinya left:836px dari grid; disetarakan */
  width: 300px;
  background: #ddceb9;
  padding: 26px 18px 18px;
  clip-path: polygon(0 0, 100% 0, 100% 94%, 95% 100%, 0 100%);
  box-shadow: 0 12px 30px rgba(26,26,23,0.2);
  z-index: 2;
}
.cl-memo-title {
  font-size: 19px;
  line-height: 1.18;
  text-transform: uppercase;
  margin: 0 0 12px;
}
.cl-memo-body {
  font-size: 10px;
  line-height: 1.6;
  margin: 0 0 10px;
  color: #4a453f;
}
.cl-memo-cut { max-height: 2.7em; overflow: hidden; margin-bottom: 0; }

/* paperclip — ala #paperclip: top -14px, di tepi kiri memo */
.cl-paperclip {
  position: absolute;
  top: -50px;
  right: 236px;
  width: 32px; height: 96px;
  transform: rotate(2deg);
  z-index: 3;
}

/* ═══ badge — ala #badge: menjorok keluar kiri + hover fisik ═══ */
.cl-badge {
  position: absolute;
  top: 258px;
  left: -30px;
  width: 262px;
  background: #3f3f3d;
  border-radius: 18px;
  padding: 40px 24px 30px;
  box-shadow: 0 18px 44px rgba(26,26,23,0.35);
  transform: rotate(-6deg);                          /* kemiringan ala badge.svg */
  transition: transform var(--time, 600ms) cubic-bezier(1,.05,.48,.99);
  z-index: 2;
}
.cl-badge:hover {
  transform: rotate(-2deg) translate(60px, -10px);   /* hover fisik, dari base miring */
}
.cl-badge-notch {
  position: absolute; top: 14px; left: 50%;
  transform: translateX(-50%);
  width: 56px; height: 7px; border-radius: 4px;
  display: block;
  background: #ececea;                               /* eksplisit, bukan var */
}
.cl-badge-tier {
  font-size: 14px;
  letter-spacing: 0.2em;
  color: #cfcfca;
  margin: 10px 0 16px;
}
.cl-badge-mid { display: flex; gap: 16px; }
.cl-badge-noise {
  width: 158px; height: 172px;
  display: block;
  shape-rendering: crispEdges;                       /* kotak tajam, tanpa antialias */
}
.cl-badge-side {
  display: flex; flex-direction: column;
  align-items: center;
  gap: 28px;                                          /* kotak di atas, angka menyusul */
  padding-top: 2px;
}
.cl-badge-sq {
  display: block;                                     /* fix: span perlu block */
  width: 42px; height: 42px;
  background: #ececea;
}
.cl-badge-year {
  font-size: 32px;
  line-height: 1.35;
  color: #ececea;
  text-align: center;
}
.cl-badge-name {
  margin: 24px 0 12px;
  font-size: 33px;
  line-height: 1.12;
  color: #ececea;
}
.cl-badge-org {
  font-size: 15px;
  color: #9a9a94;
  margin: 0;
}

/* ═══ breakpoint mengikuti pola aslinya: 767px → block, paperclip hilang ═══ */
@media (max-width: 1115px) {
  .cl-letter-grid { margin: 70px 0 100px 0; gap: 70px; }
  .cl-badge { left: -60px; }
  .cl-memo { right: 0; }
}
@media (max-width: 767px) {
  .cl-letter-grid { display: block; margin: 50px 0 60px; }
  .cl-comment { margin-bottom: 24px; }
  .cl-paperclip { display: none; }              /* persis keputusan aslinya */
  .cl-pre {
    font-size: 16.5px;        /* tetap ukuran desktop */
    line-height: 24.75px;
    padding: 56px 0 52px 60px;
    overflow: hidden;
  }
  .cl-brief {
    position: relative;
    left: -10px;
    width: calc(100% + 160px);   /* melebihi layar ±120px ke kanan */
  }
  .cl-holes { width: 26px; background-size: 26px 38px;
    background-position: center 16px;
    background-image: radial-gradient(circle, #dcdcd7 4.5px, transparent 5px); }
  .cl-badge {
    position: static; margin: 30px auto 0;
    pointer-events: none;                        /* ala mobile aslinya */
  }
  .cl-memo {
    position: static; width: min(300px, 100%);
    margin: 26px auto 0; transform: rotate(-1deg);
  }
}
</style>