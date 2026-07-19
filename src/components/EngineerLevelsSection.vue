<script setup>
import { ref } from 'vue'

defineProps({ embedded: { type: Boolean, default: false } })

const levels = [
  {
    n: 0, name: 'Maker', formula: 'digitalWrite(LED_BUILTIN, HIGH)',
    desc: 'Getting into embedded', cat: 'Foundation & frameworks', color: '#d98d83',
    ciri: 'Arduino Uno/Nano with ready-made libraries. No idea yet what happens behind digitalWrite().',
    fokus: 'Curiosity — crack open one library and read what it actually does.',
    saran: 'Drive one peripheral without a library: blink an LED straight from the registers.',
  },
  {
    n: 1, name: 'Framework User', formula: 'UART · SPI · I2C · Interrupt',
    desc: 'Mastering peripherals', cat: 'Foundation & frameworks', color: '#dba36a',
    ciri: 'Arduino framework on serious boards (AVR, ESP32, STM32). Core peripherals up and running.',
    fokus: 'Communication protocols and interrupts — life beyond loop().',
    saran: 'Port one project to the vendor framework (STM32 HAL / ESP-IDF).',
  },
  {
    n: 2, name: 'HAL Engineer', formula: 'HAL_UART_Transmit(...)',
    desc: 'Understanding the HAL', cat: 'Foundation & frameworks', color: '#d9c069',
    ciri: 'STM32 HAL, ESP-IDF, Pico SDK. Reads the Reference Manual, not just tutorials.',
    fokus: 'Seeing what the HAL hides: clocks, registers, configuration.',
    saran: 'Rewrite one HAL driver straight against the registers — go bare metal.',
  },
  {
    n: 3, name: 'Bare Metal Engineer', formula: 'USART1->CR1 |= USART_CR1_TE',
    desc: 'Register programming, CMSIS', cat: 'Internals & control', color: '#adc16f',
    ciri: 'No HAL required. Understands the clock tree, RCC, interrupt vectors, DMA, linker scripts, startup files.',
    fokus: 'Full control of the silicon — every byte has a reason.',
    saran: 'Firmware getting complex? Time to learn scheduling: enter the RTOS.',
  },
  {
    n: 4, name: 'RTOS Engineer', formula: 'Task → Queue → Task',
    desc: 'FreeRTOS, Zephyr, ThreadX', cat: 'Internals & control', color: '#9bbd72',
    ciri: 'Professional multi-task firmware: sensor → queue → MQTT → display. Fluent in priorities and deadlocks.',
    fokus: 'Concurrency, timing, and resource sharing done right.',
    saran: 'Design in layers: split application from drivers — the road to architecture.',
  },
  {
    n: 5, name: 'Embedded Architect', formula: 'App → Service → Driver → HAL → MCU',
    desc: 'BSP, driver framework, CI/CD', cat: 'Architecture & creation', color: '#83bfae',
    ciri: 'Builds their own framework. Projects move STM32 → ESP32 → RP2040 by swapping only the HAL.',
    fokus: 'Portability, testability, and a codebase that ages well.',
    saran: 'Build something other engineers use: a component, a BSP, tooling.',
  },
  {
    n: 6, name: 'Platform Creator', formula: 'RTOS · SDK · Compiler · Bootloader',
    desc: 'Building the platform itself', cat: 'Architecture & creation', color: '#8fb6d9',
    ciri: 'Creates Arduino cores, ESP-IDF components, an RTOS, a compiler, or an open-source framework.',
    fokus: 'The level where your work becomes other engineers\' foundation.',
    saran: 'Top of the abstraction ladder — now share it: docs and community.',
  },
]

const catTint = {
  'Foundation & frameworks': { bg: '#f6e4e2', fg: '#96493f' },
  'Internals & control':     { bg: '#f4eed7', fg: '#7d6a20' },
  'Architecture & creation': { bg: '#e4ecdf', fg: '#4a6b3d' },
}

// ── carousel ──
// ── carousel ──
const active = ref(1)
const prev = () => { active.value = (active.value + levels.length - 1) % levels.length }
const next = () => { active.value = (active.value + 1) % levels.length }

// ── drag / swipe ──
const dragX = ref(0)
const dragging = ref(false)
let startX = 0

function onDown(e) {
  dragging.value = true
  startX = e.clientX
  dragX.value = 0
}
function onMove(e) {
  if (!dragging.value) return
  dragX.value = e.clientX - startX
}
function onUp() {
  if (!dragging.value) return
  dragging.value = false
  const THRESHOLD = 60
  if (dragX.value <= -THRESHOLD) next()
  else if (dragX.value >= THRESHOLD) prev()
  dragX.value = 0
}

function cardStyle(i) {
  let d = i - active.value
  if (d > levels.length / 2) d -= levels.length
  if (d < -levels.length / 2) d += levels.length
  const abs = Math.abs(d)

  // di luar jarak 2: hilang total, tidak ada yang terpotong di tepi
  const hidden = abs > 2

  return {
    transform: `translateX(calc(${d} * var(--fan-gap) + ${dragging.value ? dragX.value : 0}px)) rotate(${d * 9}deg) scale(${1 - abs * 0.07})`,
    zIndex: 10 - abs,
    opacity: hidden ? 0 : 1 - abs * 0.25,
    filter: abs === 0 ? 'none' : `blur(${abs * 0.6}px)`,
    background: levels[i].color,
    pointerEvents: hidden ? 'none' : 'auto',
    transition: dragging.value ? 'none' : undefined,   // ikut jari saat drag
  }
}
</script>

<template>
  <section :class="embedded ? '' : 'bg-primary'">
    <div :class="embedded ? 'py-6' : 'px-8 max-w-7xl mx-auto py-6'">

      <!-- ═══ tabel level ═══ -->
      <div class="lv-table" data-aos="fade-up" data-aos-duration="1500">
        <div class="lv-head">Embedded Engineer Levels</div>
        <div v-for="l in levels" :key="l.n" class="lv-row">
          <div class="lv-cell-level" :style="{ background: l.color }">
            Level {{ l.n }}
          </div>
          <div class="lv-cell-desc">
            <p class="lv-name">{{ l.desc }}</p>
            <p class="lv-formula">({{ l.formula }})</p>
          </div>
          <div class="lv-cell-cat">
            <span class="lv-badge"
              :style="{ background: catTint[l.cat].bg, color: catTint[l.cat].fg }">
              {{ l.cat }}
            </span>
          </div>
        </div>
      </div>

      <!-- ═══ carousel kartu kipas ═══ -->
      <div class="fan-block" data-aos="fade-up" data-aos-duration="2000">
        <h3 class="fan-title">
            Level "maker" but self claiming level "RTOS engineer"?
        </h3>
        <p class="fan-sub">
            It's not the board that levels up —<br>
            it's the engineer's way of thinking behind it.
        </p>

        <div class="fan-stage"
          @pointerdown="onDown"
          @pointermove="onMove"
          @pointerup="onUp"
          @pointerleave="onUp">
          <article v-for="(l, i) in levels" :key="l.n"
            class="fan-card"
            :style="cardStyle(i)"
            @click="active = i">
            <span class="fc-pill">Level {{ l.n }} · {{ l.name }}</span>
            <div class="fc-panel">
              <p class="fc-label">Traits</p>
              <p class="fc-text">{{ l.ciri }}</p>
              <p class="fc-label">Your focus</p>
              <p class="fc-text">{{ l.fokus }}</p>
              <p class="fc-label">Example</p>
              <p class="fc-code">{{ l.formula }}</p>
              <p class="fc-label">How to level up</p>
              <p class="fc-text">{{ l.saran }}</p>
            </div>
          </article>
        </div>

        <!-- kontrol -->
        <div class="fan-nav">
          <button class="fn-btn" @click="prev" aria-label="Previous level">‹</button>
          <span v-for="(l, i) in levels" :key="l.n"
            class="fn-dot" :class="{ on: i === active }"
            @click="active = i" />
          <button class="fn-btn" @click="next" aria-label="Next level">›</button>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ═══ tabel ═══ */
.lv-table {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(22,22,20,0.12);
  background: #fbfbf6;
}
.lv-head {
  background: #1e1e1c;
  color: #f4f5ef;
  text-align: center;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 14px;
}
.lv-row {
  display: grid;
  grid-template-columns: 130px 1fr 220px;
  align-items: stretch;
  border-bottom: 1px solid rgba(22,22,20,0.08);
}
.lv-row:last-child { border-bottom: none; }
.lv-cell-level {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: #2b2b28;
  padding: 18px 8px;
}
.lv-cell-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 14px 20px;
  border-right: 1px solid rgba(22,22,20,0.08);
}
.lv-name { font-size: 0.9rem; margin: 0; }
.lv-formula {
  font-family: 'DM Mono', 'Departure Mono', monospace;
  font-size: 0.72rem;
  opacity: 0.6;
  margin: 4px 0 0;
}
.lv-cell-cat {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
}
.lv-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 999px;
  white-space: nowrap;
}

/* ═══ fan carousel ═══ */
.fan-block {
  --fan-gap: 150px;
  margin-top: 90px;
  text-align: center;
}
.fan-title {
  font-weight: 800;
  font-size: clamp(1.3rem, 2.6vw, 1.9rem);
  color: #161614;
  margin: 0 0 10px;
}
.fan-sub {
  font-size: 0.85rem;
  opacity: 0.6;
  line-height: 1.6;
  margin: 0 0 34px;
}

.fan-stage {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;      /* horizontal utk carousel, vertikal tetap scroll halaman */
  user-select: none;
}
.fan-stage:active { cursor: grabbing; }
.fan-card {
  position: absolute;
  width: 330px;
  border-radius: 22px;
  padding: 20px 18px 22px;
  box-shadow: 0 16px 40px rgba(22,22,20,0.18);
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.4s, filter 0.4s;
  cursor: pointer;
  transform-origin: 50% 130%;   /* pivot di bawah kartu → mengipas natural */
  text-align: center;
  -webkit-user-drag: none;
}
.fc-pill {
  display: inline-block;
  background: #fbf6ec;
  border: 1px solid rgba(22,22,20,0.15);
  border-radius: 999px;
  padding: 7px 16px;
  font-weight: 700;
  font-size: 0.8rem;
  color: #2b2b28;
  position: relative;
  top: -34px;
  box-shadow: 0 4px 10px rgba(22,22,20,0.12);
}
.fc-panel {
  background: rgba(251, 246, 236, 0.75);
  border-radius: 14px;
  padding: 16px 16px 18px;
  margin-top: -20px;
}
.fc-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.45;
  margin: 12px 0 3px;
}
.fc-label:first-child { margin-top: 0; }
.fc-text {
  font-size: 0.8rem;
  line-height: 1.55;
  color: #2b2b28;
  margin: 0;
}
.fc-code {
  font-family: 'DM Mono', 'Departure Mono', monospace;
  font-size: 0.74rem;
  color: #2b2b28;
  background: rgba(22,22,20,0.06);
  border-radius: 6px;
  padding: 6px 10px;
  display: inline-block;
  margin: 0;
}

/* nav */
.fan-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}
.fn-btn {
  width: 42px; height: 42px;
  border-radius: 50%;
  border: none;
  background: #1e1e1c;
  color: #f4f5ef;
  font-size: 1.2rem;
  cursor: pointer;
  transition: opacity 0.2s;
}
.fn-btn:hover { opacity: 0.75; }
.fn-dot {
  width: 9px; height: 9px;
  border-radius: 999px;
  background: rgba(22,22,20,0.2);
  cursor: pointer;
  transition: all 0.25s;
}
.fn-dot.on {
  width: 26px;
  background: #6f8f4f;
}

/* ═══ mobile ═══ */
@media (max-width: 767px) {
  .lv-row { grid-template-columns: 84px 1fr; }
  .lv-cell-cat { display: none; }
  .lv-cell-level { font-size: 0.72rem; }

  .fan-block { --fan-gap: 78px; }
  .fan-stage { height: 470px; }
  .fan-card { width: 270px; }
}
</style>