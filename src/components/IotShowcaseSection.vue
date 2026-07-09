<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ── sensor dengan range untuk normalisasi bar meter ──
const sensors = ref([
  { id: 'TRN-07', label: 'FUEL',   value: 78.4, unit: '%',     min: 0,   max: 100, status: 'normal', hist: [], dots: [] },
  { id: 'TRN-12', label: 'FUEL',   value: 64.1, unit: '%',     min: 0,   max: 100, status: 'normal', hist: [], dots: [] },
  { id: 'ENV-03', label: 'TEMP',   value: 31.2, unit: '°C',    min: 20,  max: 40,  status: 'alert',  hist: [], dots: [] },
  { id: 'GW-01',  label: 'MQTT',   value: 412,  unit: 'msg/s', min: 0,   max: 600, status: 'normal', hist: [], dots: [] },
  { id: 'GW-02',  label: 'RSSI',   value: -67,  unit: 'dBm',   min: -95, max: -45, status: 'normal', hist: [], dots: [] },
  { id: 'PLC-04', label: 'MODBUS', value: 99.7, unit: '%',     min: 90,  max: 100, status: 'normal', hist: [], dots: [] },
])

const NUM_BARS = 11
const NUM_DOTS = 8

const tickerText =
  '▸ TRN-07 FUEL 78% ▸ ENV-03 31.2°C ▸ GW-01 MQTT 412 MSG/S ▸ PLC-04 MODBUS OK ▸ TRN-12 GPS LOCK ▸ GW-02 RSSI -67DBM ▸ NB-IOT LINK OK ▸ CAN-BUS OK '

let timer = null

function jitter(v, amt, min, max) {
  const n = v + (Math.random() - 0.5) * amt
  return Math.min(max, Math.max(min, n))
}

function randomDots(status) {
  // pola dot: kebanyakan mati, 1–2 menyala, kadang 1 redup
  const arr = Array(NUM_DOTS).fill('off')
  const lit = Math.floor(Math.random() * NUM_DOTS)
  arr[lit] = 'on'
  if (Math.random() > 0.5) {
    const dim = Math.floor(Math.random() * NUM_DOTS)
    if (dim !== lit) arr[dim] = 'dim'
  }
  return arr
}

function tickSensor(s) {
  if (s.label === 'FUEL')        s.value = jitter(s.value, 0.4, 20, 100)
  else if (s.unit === '°C')      s.value = jitter(s.value, 0.6, 24, 38)
  else if (s.unit === 'msg/s')   s.value = Math.round(jitter(s.value, 40, 200, 600))
  else if (s.unit === 'dBm')     s.value = Math.round(jitter(s.value, 3, -90, -50))
  else                           s.value = jitter(s.value, 0.2, 97, 100)

  s.hist.push(s.value)
  if (s.hist.length > 12) s.hist.shift()
  if (s.unit === '°C') s.status = s.value > 33 ? 'alert' : 'normal'
  s.dots = randomDots(s.status)
}

onMounted(() => {
  sensors.value.forEach(s => {
    s.hist = Array.from({ length: 12 }, () => jitter(s.value, (s.max - s.min) * 0.15, s.min, s.max))
    s.dots = randomDots(s.status)
  })
  timer = setInterval(() => sensors.value.forEach(tickSensor), 1400)
})
onUnmounted(() => clearInterval(timer))

// jumlah bar terisi (0..NUM_BARS)
function filledBars(s) {
  const t = (s.value - s.min) / (s.max - s.min)
  return Math.round(Math.min(1, Math.max(0, t)) * NUM_BARS)
}

// sparkline: 12 titik → polyline 0..96 x, 0..14 y
function sparkPoints(hist) {
  if (!hist.length) return ''
  const min = Math.min(...hist), max = Math.max(...hist)
  const range = max - min || 1
  return hist
    .map((v, i) => `${(i / (hist.length - 1)) * 96},${13 - ((v - min) / range) * 12}`)
    .join(' ')
}

function fmt(s) {
  return Number.isInteger(s.value) ? s.value : s.value.toFixed(1)
}

defineProps({
  embedded: { type: Boolean, default: false }
})

</script>

<template>
  <section :class="embedded ? '' : 'bg-primary'">
    <div :class="embedded ? 'py-6' : 'px-8 max-w-7xl mx-auto py-6'">

      <div class="space-y-2">
        <div class="h-0.5 bg-secondary"
          data-aos="fade-up" data-aos-duration="1000" />
        <h2 class="text-secondary text-base font-medium"
          data-aos="fade-up" data-aos-duration="1500">
          <span>What I</span> <span class="font-bold italic">build</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12 items-center">

        <!-- KIRI: copy + stats (tidak berubah) -->
        <div data-aos="fade-up" data-aos-duration="2000">
          <span class="tag-badge">INDUSTRIAL IOT · RAILWAY · EMBEDDED · SIMULATED DEMO</span>

          <h3 class="mt-6 text-secondary"
            style="font-family:'Geist',sans-serif;font-weight:900;font-size:clamp(2.2rem,4.5vw,3.6rem);line-height:1.05;">
            Sensors to dashboards, end to end.
          </h3>

          <p class="mt-6 text-sm leading-relaxed text-secondary opacity-70 max-w-md">
            I design and ship monitoring systems for trains, plants, and field
            equipment — from PCB and firmware up to backend, protocols
            (Modbus, MQTT, CAN), and real-time dashboards running 24/7.
          </p>

          <div class="flex flex-wrap gap-0 mt-10 stats-row">
            <div class="stat-item">
              <p class="stat-num">50+</p>
              <p class="stat-label">Train units</p>
            </div>
            <div class="stat-item">
              <p class="stat-num">99%</p>
              <p class="stat-label">Uptime</p>
            </div>
            <div class="stat-item">
              <p class="stat-num">10+</p>
              <p class="stat-label">Sensor types</p>
            </div>
            <div class="stat-item">
              <p class="stat-num">24/7</p>
              <p class="stat-label">Operation</p>
            </div>
          </div>
        </div>

        <!-- KANAN: panel telemetri gaya Tiger Data -->
        <div class="telemetry-panel notched"
          data-aos="fade-up" data-aos-duration="2500">

          <!-- header status -->
          <div class="panel-head">
            <span class="ph-item"><i class="hdot hdot-yellow" /> <b class="ph-id">GW-01</b> <span class="ph-val">ONLINE</span></span>
            <span class="ph-item"><i class="hdot hdot-red" /> <b class="ph-id">ENV-03</b> <span class="ph-val">31.2 °C</span></span>
            <span class="ph-item"><i class="hdot hdot-blue" /> <b class="ph-id">LINK</b> <span class="ph-val">4G LTE</span></span>
          </div>

          <!-- sensor rows -->
          <div class="panel-rows">
            <div v-for="s in sensors" :key="s.id"
              class="sensor-row"
              :class="{ 'row-alert': s.status === 'alert' }">

              <!-- id + status -->
              <div class="sr-id">
                <p class="sr-name">{{ s.id }}</p>
                <div class="sr-status">
                  <i class="sdot" :class="s.status === 'alert' ? 'sdot-red' : 'sdot-yellow'" />
                  <span>{{ s.status === 'alert' ? 'ALERT' : 'NORMAL' }}</span>
                </div>
              </div>

              <!-- angka pixel besar -->
              <div class="sr-value">
                <span class="sr-num">{{ fmt(s) }}</span>
                <span class="sr-unit">{{ s.unit }}</span>
              </div>

              <!-- bar meter 11 segmen -->
              <div class="sr-bars">
                <span v-for="i in NUM_BARS" :key="i"
                  class="bar-seg"
                  :class="i <= filledBars(s) ? 'seg-on' : 'seg-off'"
                  :style="{ transitionDelay: (i <= filledBars(s) ? (i - 1) * 70 : 0) + 'ms' }" />
              </div>

              <!-- dots + sparkline -->
              <div class="sr-right">
                <div class="dot-row">
                  <span v-for="(d, i) in s.dots" :key="i"
                    class="mini-dot"
                    :class="{
                      'md-on':  d === 'on'  && s.status !== 'alert',
                      'md-dim': d === 'dim' && s.status !== 'alert',
                      'md-red':     d === 'on'  && s.status === 'alert',
                      'md-red-dim': d === 'dim' && s.status === 'alert',
                    }" />
                </div>
                <svg class="sr-spark" viewBox="0 0 96 14" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient :id="'grad-' + s.id" x1="0" y1="0" x2="96" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#101013" />
                      <stop offset="1" :stop-color="s.status === 'alert' ? '#FF5843' : '#FBFBFB'" />
                    </linearGradient>
                  </defs>
                  <polyline
                    :points="sparkPoints(s.hist)"
                    :stroke="'url(#grad-' + s.id + ')'"
                    stroke-width="1"
                    fill="none" />
                </svg>
              </div>

            </div>
          </div>

          <!-- marquee ticker -->
          <div class="panel-ticker">
            <div class="ticker-track">
              <span class="ticker-text">{{ tickerText }}</span>
              <span class="ticker-text" aria-hidden="true">{{ tickerText }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tag-badge {
  display: inline-block;
  font-family: 'Geist', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #161614;
  background: #e8e9df;
  border: 1px solid #161614;
  padding: 6px 12px;
}

.stats-row {
  border-top: 1px solid rgba(22,22,20,0.15);
  display: grid;
  grid-template-columns: repeat(4, 1fr);   /* selalu 4 sebaris */
}
.stat-item {
  padding: 16px 12px 0 0;
  border-right: 1px solid rgba(22,22,20,0.12);
  margin-right: 12px;
}
.stat-item:last-child { border-right: none; margin-right: 0; }
.stat-num {
  font-family: 'VT323', monospace;
  font-size: 2rem;
  color: #161614;
  line-height: 1;
}
.stat-label {
  font-size: 0.7rem;
  color: rgba(22,22,20,0.5);
  margin-top: 4px;
}

/* ── panel ── */
.telemetry-panel {
  background: #101013;
  padding: 20px;
  overflow: hidden;
}

/* sudut terpotong seperti Tiger Data */
.notched {
  clip-path: polygon(
    16px 0, calc(100% - 16px) 0,
    100% 16px, 100% calc(100% - 16px),
    calc(100% - 16px) 100%, 16px 100%,
    0 calc(100% - 16px), 0 16px
  );
}

.panel-head {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 2px 4px 16px;
  font-family: 'Geist Mono', 'Courier New', monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
}
.ph-item { display: flex; align-items: center; gap: 7px; }
.ph-id  { color: #71717a; font-weight: 500; }
.ph-val { color: #fbfbfb; font-weight: 500; }

.hdot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.hdot-yellow { background: #d8e34e; }
.hdot-red    { background: #ff5843; }
.hdot-blue   { background: #5a7bff; }

/* rows */
.panel-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 10px;
}

.sensor-row {
  display: grid;
  grid-template-columns: 64px 110px 1fr 100px;
  align-items: center;
  gap: 14px;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 6px;
  padding: 12px 14px;
}

.sr-name {
  font-family: 'Geist Mono', 'Courier New', monospace;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #71717a;
  letter-spacing: -0.01em;
}
.row-alert .sr-name { color: #ff5843; }

.sr-status {
  display: flex; align-items: center; gap: 4px;
  font-family: 'Geist Mono', 'Courier New', monospace;
  font-size: 0.5rem;
  text-transform: uppercase;
  color: #71717a;
}
.row-alert .sr-status { color: #ff5843; }

.sdot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
.sdot-yellow { background: #e9f087; }
.sdot-red    { background: #ff5843; }

/* angka pixel */
.sr-value { display: flex; align-items: baseline; gap: 4px; }
.sr-num {
  font-family: 'VT323', monospace;
  font-size: 2.7rem;
  line-height: 1;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.row-alert .sr-num { color: #ff5843; }
.sr-unit {
  font-family: 'Geist', sans-serif;
  font-size: 0.8rem;
  color: #71717a;
  white-space: nowrap;   /* ← tambah ini */
}

/* bar meter */
.sr-bars {
  display: flex;
  gap: 3px;
  height: 40px;
  align-items: stretch;
}
.bar-seg {
  width: 6px;
  border-radius: 2px;
  transition: background-color 0.5s ease-out;
}
.seg-on  { background: #000; }
.seg-off { background: #3f3f46; }

/* dots + sparkline */
.sr-right { display: flex; flex-direction: column; gap: 7px; }
.dot-row { display: flex; gap: 8px; height: 5px; }
.mini-dot {
  width: 5px; height: 5px;
  background: #3f3f46;
  transition: opacity 0.3s ease-out, background-color 0.3s ease-out;
}
.md-on      { background: #d8e34e; }
.md-dim     { background: #d8e34e; opacity: 0.25; }
.md-red     { background: #ff5843; }
.md-red-dim { background: #ff5843; opacity: 0.25; }

.sr-spark { width: 100%; height: 14px; }

/* marquee ticker */
.panel-ticker {
  margin-top: 16px;
  padding: 8px 0 2px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.ticker-track {
  display: flex;
  width: max-content;
  white-space: nowrap;
  animation: marquee 28s linear infinite;
}
.ticker-text {
  font-family: 'Geist Mono', 'Courier New', monospace;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #fff;
  padding-right: 16px;
}
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* mobile: sembunyikan bar meter supaya tidak sempit */
/* mobile: susun 2 baris per sensor row */
@media (max-width: 640px) {
  .telemetry-panel { padding: 14px; }
  .panel-rows      { padding: 8px; }
  .stat-item  { padding: 12px 8px 0 0; margin-right: 8px; }
  .stat-num   { font-size: 1.4rem; }
  .stat-label { font-size: 0.58rem; }

  .sensor-row {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "id    value"
      "spark spark";
    gap: 10px 12px;
    padding: 10px 12px;
  }

  .sr-id    { grid-area: id; }
  .sr-value {
    grid-area: value;
    justify-content: flex-end;   /* angka rata kanan */
  }
  .sr-num   { font-size: 1.9rem; }

  /* bar meter tetap disembunyikan di mobile */
  .sr-bars  { display: none; }

  /* dots + sparkline pindah ke baris bawah, melebar penuh */
  .sr-right {
    grid-area: spark;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
  .dot-row  { flex-shrink: 0; gap: 6px; }
  .sr-spark { flex: 1; height: 12px; width: auto; }

  .panel-head  { gap: 12px; font-size: 0.62rem; }
  .ticker-text { font-size: 0.7rem; }
}
</style>