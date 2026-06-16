<template>
  <div class="flipbook-page">

    <!-- top bar -->
    <header class="top-bar">
      <button @click="$router.back()" class="top-btn">← Back</button>
      <span class="doc-title">Portfolio — MJ Mokhtar</span>
      <div class="top-right">
        <button @click="zoomOut" class="top-btn" title="Zoom out">−</button>
        <span class="zoom-label">{{ Math.round(zoom * 100) }}%</span>
        <button @click="zoomIn"  class="top-btn" title="Zoom in">+</button>
        <button @click="zoomReset" class="top-btn" title="Reset zoom">⊙</button>
        <button @click="toggleFullscreen" class="top-btn" title="Fullscreen">⛶</button>
      </div>
    </header>

    <!-- loading -->
    <div v-if="loading" class="center-state">
      <div class="loading-dots"><span /><span /><span /></div>
      <p>Memuat portfolio...</p>
    </div>

    <!-- error -->
    <div v-else-if="error" class="center-state">
      <p class="err-msg">{{ error }}</p>
      <button @click="loadPdf" class="retry-btn">Coba lagi</button>
    </div>

    <!-- flipbook -->
    <div v-else
      class="stage-wrap"
      ref="stageWrap"
      @wheel.prevent="onWheel"
      @dblclick="onDblClick">

      <div class="stage-scaler" :style="scalerStyle">
        <div class="stage" ref="stageRef"
          :style="{
            width:  (isSingle ? fitW : fitW * 2) + 'px',
            height: fitH + 'px',
          }">

          <!-- cover / back cover -->
          <div v-if="isSingle" class="single-page shadow-book">
            <canvas ref="canvasA" class="page-canvas" />
          </div>

          <!-- spread -->
          <div v-else class="spread shadow-book">
            <div class="half half-l">
              <canvas ref="canvasA" class="page-canvas" />
            </div>
            <div class="spine-line" />
            <div class="half half-r">
              <canvas ref="canvasB" class="page-canvas" />
            </div>
          </div>

          <!-- flip overlay -->
          <div class="flip-el" ref="flipEl">
            <canvas ref="flipFront" class="flip-face page-canvas" />
            <canvas ref="flipBack"  class="flip-face flip-back-face page-canvas" />
          </div>

          <!-- click zones -->
          <div class="zone-left"  @click="flip(-1)" />
          <div class="zone-right" @click="flip(1)" />
        </div>
      </div>
    </div>

    <!-- bottom bar -->
    <footer v-if="!loading && !error" class="bottom-bar">
      <button @click="flip(-1)" :disabled="cur === 0 || busy" class="nav-btn">←</button>
      <div class="page-track">
        <span class="pg-label">{{ pageLabel }}</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPct + '%' }" />
        </div>
      </div>
      <button @click="flip(1)" :disabled="cur === totalStates - 1 || busy" class="nav-btn">→</button>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// ── refs ──
const stageWrap = ref(null)
const canvasA   = ref(null)
const canvasB   = ref(null)
const flipEl    = ref(null)
const flipFront = ref(null)
const flipBack  = ref(null)

// ── state ──
const loading    = ref(true)
const error      = ref(null)
const busy       = ref(false)
const cur        = ref(0)
const totalPages = ref(0)
const zoom       = ref(1)
const fitW       = ref(400)
const fitH       = ref(560)
let   pdfDoc     = null
let   pdfjsLib   = null

// aspect ratio PDF — akan di-update saat halaman pertama dirender
let pdfAspect = 0.707  // A4 default (width/height)

// ── computed ──
const totalStates = computed(() => {
  if (totalPages.value <= 0) return 0
  if (totalPages.value <= 2) return totalPages.value
  return 2 + Math.ceil((totalPages.value - 2) / 2)
})

const isSingle = computed(() => cur.value === 0 || cur.value === totalStates.value - 1)
const isCover  = computed(() => cur.value === 0)
const isBack   = computed(() => cur.value === totalStates.value - 1)

const pageLabel = computed(() => {
  if (isCover.value) return 'Cover'
  if (isBack.value)  return 'Back Cover'
  const l = (cur.value - 1) * 2 + 2
  const r = l + 1
  return `${l}${r <= totalPages.value - 1 ? ' – ' + r : ''} / ${totalPages.value}`
})

const progressPct = computed(() =>
  totalStates.value <= 1 ? 100
    : Math.round((cur.value / (totalStates.value - 1)) * 100)
)

const scalerStyle = computed(() => ({
  transform: `scale(${zoom.value})`,
  transformOrigin: 'center center',
  transition: 'transform 0.2s ease',
}))

// ── fit ke layar ──
function recalcFit() {
  if (!stageWrap.value) return
  const wrapH = stageWrap.value.clientHeight - 48  // padding atas bawah
  const wrapW = stageWrap.value.clientWidth  - 48

  // tinggi page = fit ke wrap height
  const h = Math.min(wrapH, 900)
  const w = Math.round(h * pdfAspect)

  // untuk spread, total width = w*2, pastikan muat
  const spreadW = w * 2
  if (spreadW > wrapW) {
    const scaled = wrapW / 2
    fitH.value = Math.round(scaled / pdfAspect)
    fitW.value = scaled
  } else {
    fitH.value = h
    fitW.value = w
  }
}

// ── zoom ──
const ZOOM_MIN = 0.5
const ZOOM_MAX = 3.0
const ZOOM_STEP = 0.15

function zoomIn()    { zoom.value = Math.min(ZOOM_MAX, +(zoom.value + ZOOM_STEP).toFixed(2)) }
function zoomOut()   { zoom.value = Math.max(ZOOM_MIN, +(zoom.value - ZOOM_STEP).toFixed(2)) }
function zoomReset() { zoom.value = 1 }
function onDblClick() { zoom.value === 1 ? zoom.value = 1.8 : zoomReset() }

function onWheel(e) {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    e.deltaY < 0 ? zoomIn() : zoomOut()
  }
}

// ── pinch to zoom (touch) ──
let lastPinchDist = 0
function onTouchStart(e) {
  if (e.touches.length === 2) {
    lastPinchDist = getPinchDist(e)
  }
}
function onTouchMove(e) {
  if (e.touches.length === 2) {
    e.preventDefault()
    const dist  = getPinchDist(e)
    const delta = dist - lastPinchDist
    zoom.value  = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(zoom.value + delta * 0.005).toFixed(2)))
    lastPinchDist = dist
  }
}
function getPinchDist(e) {
  const dx = e.touches[0].clientX - e.touches[1].clientX
  const dy = e.touches[0].clientY - e.touches[1].clientY
  return Math.sqrt(dx * dx + dy * dy)
}

// ── PDF pages untuk state ──
function pagesForState(state) {
  if (state === 0) return [1]
  if (state === totalStates.value - 1) return [totalPages.value]
  const l = (state - 1) * 2 + 2
  const r = l + 1
  return r <= totalPages.value - 1 ? [l, r] : [l]
}

// ── load PDF ──
async function loadPdf() {
  loading.value = true
  error.value   = null
  try {
    if (!pdfjsLib) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js')
      pdfjsLib = window.pdfjsLib
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    }
    pdfDoc = await pdfjsLib.getDocument('/portfolio_v3.pdf').promise
    totalPages.value = pdfDoc.numPages

    // ambil aspect ratio dari halaman pertama
    const firstPage = await pdfDoc.getPage(1)
    const vp = firstPage.getViewport({ scale: 1 })
    pdfAspect = vp.width / vp.height

    loading.value = false
    await nextTick()
    recalcFit()
    await nextTick()
    await renderState(0)
  } catch (e) {
    error.value = 'Gagal memuat PDF. Pastikan file ada di public/portfolio_v3.pdf'
    loading.value = false
    console.error(e)
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src; s.onload = resolve; s.onerror = reject
    document.head.appendChild(s)
  })
}

// ── render ke canvas ──
async function renderToCanvas(pageNum, canvas) {
  if (!canvas || !pdfDoc) return
  const page   = await pdfDoc.getPage(pageNum)
  const vp     = page.getViewport({ scale: 1 })
  // render pada resolusi 2x untuk ketajaman
  const scale  = (fitH.value / vp.height) * 2
  const scaled = page.getViewport({ scale })
  canvas.width  = scaled.width
  canvas.height = scaled.height
  canvas.style.width  = '100%'
  canvas.style.height = '100%'
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled }).promise
}

async function renderState(state) {
  await nextTick()
  const pages = pagesForState(state)
  if (pages.length === 1) {
    await renderToCanvas(pages[0], canvasA.value)
  } else {
    await Promise.all([
      renderToCanvas(pages[0], canvasA.value),
      renderToCanvas(pages[1], canvasB.value),
    ])
  }
}

// ── flip ──
async function flip(dir) {
  if (busy.value) return
  const next = cur.value + dir
  if (next < 0 || next >= totalStates.value) return
  busy.value = true

  const fromPages = pagesForState(cur.value)
  const toPages   = pagesForState(next)
  const frontPg   = dir > 0 ? fromPages[fromPages.length - 1] : fromPages[0]
  const backPg    = dir > 0 ? toPages[0] : toPages[toPages.length - 1]

  await renderToCanvas(frontPg, flipFront.value)
  await renderToCanvas(backPg,  flipBack.value)

  const el = flipEl.value
  el.style.display         = 'block'
  el.style.width           = fitW.value + 'px'
  el.style.height          = fitH.value + 'px'
  el.style.left            = dir > 0 ? fitW.value + 'px' : '0px'
  el.style.transformOrigin = 'left center'
  el.style.transition      = 'none'
  el.style.transform       = `rotateY(${dir > 0 ? 0 : -180}deg)`

  void el.offsetWidth
  el.style.transition = 'transform 0.65s cubic-bezier(0.645,0.045,0.355,1)'
  el.style.transform  = `rotateY(${dir > 0 ? -180 : 0}deg)`

  setTimeout(async () => {
    el.style.display = 'none'
    cur.value = next
    await renderState(next)
    busy.value = false
  }, 670)
}

// ── fullscreen ──
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}

// ── resize observer ──
let resizeObs = null

// ── keyboard ──
function onKey(e) {
  if (e.key === 'ArrowRight') flip(1)
  if (e.key === 'ArrowLeft')  flip(-1)
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
  if (e.key === '0') zoomReset()
}

onMounted(() => {
  loadPdf()
  window.addEventListener('keydown', onKey)

  // touch events untuk pinch
  stageWrap.value?.addEventListener('touchstart', onTouchStart, { passive: true })
  stageWrap.value?.addEventListener('touchmove',  onTouchMove,  { passive: false })

  // resize observer — refit saat window resize
  resizeObs = new ResizeObserver(async () => {
    recalcFit()
    if (!loading.value && !error.value) {
      await nextTick()
      await renderState(cur.value)
    }
  })
  if (stageWrap.value) resizeObs.observe(stageWrap.value)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  resizeObs?.disconnect()
})
</script>

<style scoped>
.flipbook-page {
  position: fixed; inset: 0;
  background: #161614;
  display: flex; flex-direction: column;
  font-family: 'Geist', sans-serif;
  z-index: 50;
  overflow: hidden;
}

/* top bar */
.top-bar {
  height: 48px; flex-shrink: 0;
  background: #1a1a18;
  border-bottom: 1px solid rgba(244,245,239,0.08);
  display: flex; align-items: center;
  padding: 0 12px; gap: 8px;
}
.doc-title {
  flex: 1; text-align: center;
  font-size: 12px; font-style: italic;
  color: rgba(244,245,239,0.3);
  font-family: 'Playfair Display', serif;
}
.top-right { display: flex; align-items: center; gap: 4px; }
.top-btn {
  background: none;
  border: 1px solid rgba(244,245,239,0.15);
  color: rgba(244,245,239,0.5); cursor: pointer;
  font-size: 12px; font-family: 'Geist', sans-serif;
  padding: 4px 10px; transition: all 0.2s;
  white-space: nowrap;
}
.top-btn:hover { color: #f4f5ef; border-color: rgba(244,245,239,0.4); }
.zoom-label {
  font-size: 11px; color: rgba(244,245,239,0.35);
  min-width: 38px; text-align: center;
  font-family: 'Geist', sans-serif;
}

/* stage */
.stage-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  cursor: grab;
}
.stage-wrap:active { cursor: grabbing; }

.stage-scaler {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage { position: relative; flex-shrink: 0; }

/* pages */
.single-page {
  border-radius: 2px; overflow: hidden;
  background: #f4f5ef;
}
.spread {
  display: flex; border-radius: 2px;
  overflow: hidden; background: #f4f5ef;
  position: relative;
}
.shadow-book {
  box-shadow:
    0 24px 80px rgba(0,0,0,0.85),
    0 4px 16px rgba(0,0,0,0.6);
}
.half { width: 50%; height: 100%; overflow: hidden; }
.half-l { border-right: 1px solid rgba(22,22,20,0.08); }
.page-canvas { display: block; width: 100%; height: 100%; }
.spine-line {
  position: absolute; left: 50%; top: 0;
  width: 3px; height: 100%;
  background: linear-gradient(to right, rgba(22,22,20,0.15), rgba(22,22,20,0.01));
  transform: translateX(-50%);
  pointer-events: none; z-index: 5;
}

/* flip */
.flip-el {
  position: absolute; top: 0;
  transform-style: preserve-3d;
  z-index: 20; pointer-events: none;
  display: none;
}
.flip-face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: #f4f5ef;
}
.flip-back-face { transform: rotateY(180deg); }

/* click zones */
.zone-left, .zone-right {
  position: absolute; top: 0;
  width: 50%; height: 100%; z-index: 10;
}
.zone-left  { left: 0;  cursor: w-resize; }
.zone-right { right: 0; cursor: e-resize; }

/* bottom bar */
.bottom-bar {
  height: 52px; flex-shrink: 0;
  background: #1a1a18;
  border-top: 1px solid rgba(244,245,239,0.08);
  display: flex; align-items: center;
  padding: 0 20px; gap: 16px;
}
.nav-btn {
  width: 36px; height: 36px;
  background: none;
  border: 1px solid rgba(244,245,239,0.15);
  color: rgba(244,245,239,0.6); cursor: pointer;
  font-size: 16px; font-weight: 600;
  font-family: 'Geist', sans-serif;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.nav-btn:hover:not(:disabled) { border-color: rgba(244,245,239,0.5); color: #f4f5ef; }
.nav-btn:disabled { opacity: 0.2; cursor: default; }
.page-track { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.pg-label {
  text-align: center; font-size: 11px; font-style: italic;
  color: rgba(244,245,239,0.3);
  font-family: 'Playfair Display', serif;
}
.progress-bar {
  height: 1px; background: rgba(244,245,239,0.08); overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: rgba(244,245,239,0.3);
  transition: width 0.3s;
}

/* loading / error */
.center-state {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 16px; color: rgba(244,245,239,0.3);
  font-size: 12px; font-family: 'Geist', sans-serif;
}
.loading-dots { display: flex; gap: 6px; }
.loading-dots span {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(244,245,239,0.3);
  animation: bounce 1.2s infinite ease-in-out;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.3; }
  40%           { transform: scale(1);   opacity: 1; }
}
.err-msg { color: rgba(255,100,100,0.6); font-size: 12px; }
.retry-btn {
  background: none; font-family: 'Geist', sans-serif;
  border: 1px solid rgba(244,245,239,0.2);
  color: rgba(244,245,239,0.5); cursor: pointer;
  padding: 7px 18px; font-size: 12px; transition: all 0.2s;
}
.retry-btn:hover { border-color: rgba(244,245,239,0.5); color: #f4f5ef; }
</style>