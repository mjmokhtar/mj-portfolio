<template>
  <div class="flipbook-page">

    <!-- top bar -->
    <header class="top-bar">
      <button @click="$router.back()" class="top-btn">← Back</button>
      <span class="doc-title">Portfolio — MJ Mokhtar</span>
      <div class="top-right">
        <template v-if="!isMobile">
          <button @click="zoomOut"   class="top-btn">−</button>
          <span class="zoom-label">{{ Math.round(zoom * 100) }}%</span>
          <button @click="zoomIn"    class="top-btn">+</button>
          <button @click="zoomReset" class="top-btn">⊙</button>
        </template>
        <button @click="toggleFullscreen" class="top-btn">⛶</button>
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
      @dblclick="onDblClick"
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd">

      <div class="stage-scaler" :style="scalerStyle">
        <div class="stage" :style="stageSize">

          <!-- MOBILE: 1 halaman -->
          <template v-if="isMobile">
            <div class="single-page shadow-book"
              :style="{ width: fitW + 'px', height: fitH + 'px' }">
              <canvas ref="canvasA" class="page-canvas" />
            </div>
            <div class="flip-el" ref="flipEl">
              <canvas ref="flipFront" class="flip-face page-canvas" />
              <canvas ref="flipBack"  class="flip-face flip-back-face page-canvas" />
            </div>
          </template>

          <!-- DESKTOP: buku SELALU 2 halaman; cover/back hanya menyembunyikan sebelah -->
          <div v-else class="book" :style="bookStyle">
            <div class="half half-l shadow-book"
              :style="{ visibility: showLeft ? 'visible' : 'hidden' }">
              <canvas ref="canvasA" class="page-canvas" />
            </div>
            <div class="half half-r shadow-book"
              :style="{ visibility: showRight ? 'visible' : 'hidden' }">
              <canvas ref="canvasB" class="page-canvas" />
            </div>
            <div v-if="showLeft && showRight" class="spine-line" />
            <div class="flip-el" ref="flipEl">
              <canvas ref="flipFront" class="flip-face page-canvas" />
              <canvas ref="flipBack"  class="flip-face flip-back-face page-canvas" />
            </div>
          </div>

          <!-- click zones -->
          <div class="zone-left"  @click="flip(-1)" />
          <div class="zone-right" @click="flip(1)" />
        </div>
      </div>
    </div>

    <!-- bottom bar -->
    <footer v-if="!loading && !error" class="bottom-bar">
      <button @click="flip(-1)" :disabled="curPage <= 1 || busy" class="nav-btn">←</button>
      <div class="page-track">
        <span class="pg-label">{{ pageLabel }}</span>
        <input
          type="range"
          class="page-slider"
          :min="sliderMin"
          :max="sliderMax"
          step="1"
          :value="sliderValue"
          :disabled="busy"
          @input="onSlideInput"
          @change="onSlideCommit" />
      </div>
      <button @click="flip(1)" :disabled="curPage >= totalPages || busy" class="nav-btn">→</button>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// ── refs ──
const stageWrap = ref(null)
const canvasA   = ref(null)   // desktop: kiri | mobile: satu-satunya
const canvasB   = ref(null)   // desktop: kanan
const flipEl    = ref(null)
const flipFront = ref(null)
const flipBack  = ref(null)

// ── state ──
const loading    = ref(true)
const error      = ref(null)
const busy       = ref(false)
const zoom       = ref(1)
const fitW       = ref(400)
const fitH       = ref(560)
const isMobile   = ref(false)
const totalPages = ref(0)
const mobilePage = ref(1)
const cur        = ref(0)
let   pdfDoc     = null
let   pdfjsLib   = null
let   pdfAspect  = 0.707

// ── computed ──
const totalStates = computed(() => {
  if (totalPages.value <= 0) return 0
  if (totalPages.value <= 2) return totalPages.value
  return 2 + Math.ceil((totalPages.value - 2) / 2)
})

const isCover = computed(() => cur.value === 0)
const isBack  = computed(() => cur.value === totalStates.value - 1)

const showLeft  = computed(() => !isCover.value)
const showRight = computed(() => !isBack.value)

const curPage = computed(() =>
  isMobile.value ? mobilePage.value : pdfPageFromState(cur.value)
)

const pageLabel = computed(() => {
  if (isMobile.value) return `${mobilePage.value} / ${totalPages.value}`
  if (isCover.value)  return 'Cover'
  if (isBack.value)   return 'Back Cover'
  const l = (cur.value - 1) * 2 + 2
  const r = l + 1
  return `${l}${r <= totalPages.value - 1 ? ' – ' + r : ''} / ${totalPages.value}`
})

const progressPct = computed(() => {
  if (totalPages.value <= 1) return 100
  if (isMobile.value)
    return Math.round(((mobilePage.value - 1) / (totalPages.value - 1)) * 100)
  return totalStates.value <= 1 ? 100
    : Math.round((cur.value / (totalStates.value - 1)) * 100)
})

// ── slider ──
const sliderMin = computed(() => (isMobile.value ? 1 : 0))
const sliderMax = computed(() =>
  isMobile.value ? totalPages.value : totalStates.value - 1
)
const sliderValue = computed(() =>
  isMobile.value ? mobilePage.value : cur.value
)

// guard supaya render tidak tumpang tindih saat drag cepat
let renderBusy = false, renderQueued = false
async function safeRenderCurrent() {
  if (renderBusy) { renderQueued = true; return }
  renderBusy = true
  try {
    await renderCurrent()
  } finally {
    renderBusy = false
    if (renderQueued) {
      renderQueued = false
      safeRenderCurrent()
    }
  }
}

let slideTimer = null
function onSlideInput(e) {
  const v = +e.target.value
  // update posisi & label langsung (live saat digeser)
  if (isMobile.value) mobilePage.value = v
  else cur.value = v
  // render di-debounce supaya tidak render tiap piksel geseran
  clearTimeout(slideTimer)
  slideTimer = setTimeout(safeRenderCurrent, 120)
}

function onSlideCommit() {
  clearTimeout(slideTimer)
  safeRenderCurrent()
}

const stageSize = computed(() => ({
  width:  (isMobile.value ? fitW.value : fitW.value * 2) + 'px',
  height: fitH.value + 'px',
  position: 'relative',
  perspective: '2000px',
}))

// buku digeser supaya cover/back cover tampil di tengah
const bookStyle = computed(() => ({
  position: 'relative',
  width:  fitW.value * 2 + 'px',
  height: fitH.value + 'px',
  transform: `translateX(${
    isCover.value ? -fitW.value / 2 : isBack.value ? fitW.value / 2 : 0
  }px)`,
  transition: 'transform 0.6s cubic-bezier(0.645,0.045,0.355,1)',
}))

const scalerStyle = computed(() => ({
  transform: `scale(${zoom.value})`,
  transformOrigin: 'center center',
  transition: 'transform 0.15s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

// ── page mapping ──
function pdfPageFromState(state) {
  if (state === 0) return 1
  if (state === totalStates.value - 1) return totalPages.value
  return (state - 1) * 2 + 2
}

// 0 = halaman kosong (blank)
function pagesForState(state) {
  if (state === 0) return [1]
  if (state === totalStates.value - 1) return [totalPages.value]
  const l = (state - 1) * 2 + 2
  const r = l + 1
  return [l, r <= totalPages.value - 1 ? r : 0]
}

// ── mobile detect & fit ──
function checkMobile() { isMobile.value = window.innerWidth < 768 }

function recalcFit() {
  if (!stageWrap.value) return
  const wrapH = stageWrap.value.clientHeight - 32
  const wrapW = stageWrap.value.clientWidth  - 32

  if (isMobile.value) {
    const w = Math.min(wrapW, 500)
    fitW.value = w
    fitH.value = Math.round(w / pdfAspect)
    if (fitH.value > wrapH) {
      fitH.value = wrapH
      fitW.value = Math.round(wrapH * pdfAspect)
    }
  } else {
    const h = Math.min(wrapH, 900)
    const w = Math.round(h * pdfAspect)
    if (w * 2 > wrapW) {
      fitW.value = Math.floor(wrapW / 2)
      fitH.value = Math.round(fitW.value / pdfAspect)
    } else {
      fitH.value = h
      fitW.value = w
    }
  }
}

// ── zoom & pinch ──
const ZOOM_MIN = 0.5, ZOOM_MAX = 3.0, ZOOM_STEP = 0.15
function zoomIn()    { zoom.value = Math.min(ZOOM_MAX, +(zoom.value + ZOOM_STEP).toFixed(2)) }
function zoomOut()   { zoom.value = Math.max(ZOOM_MIN, +(zoom.value - ZOOM_STEP).toFixed(2)) }
function zoomReset() { zoom.value = 1 }
function onDblClick() { zoom.value === 1 ? (zoom.value = 1.8) : zoomReset() }
function onWheel(e) {
  if (e.ctrlKey || e.metaKey) { e.deltaY < 0 ? zoomIn() : zoomOut() }
}

let lastPinchDist = 0, pinching = false
function onTouchStart(e) {
  if (e.touches.length === 2) { pinching = true; lastPinchDist = pinchDist(e) }
}
function onTouchMove(e) {
  if (e.touches.length === 2 && pinching) {
    const d = pinchDist(e)
    zoom.value = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN,
      +(zoom.value + (d - lastPinchDist) * 0.005).toFixed(2)))
    lastPinchDist = d
  }
}
function onTouchEnd() { pinching = false }
function pinchDist(e) {
  const dx = e.touches[0].clientX - e.touches[1].clientX
  const dy = e.touches[0].clientY - e.touches[1].clientY
  return Math.sqrt(dx * dx + dy * dy)
}

// ── render ──
async function renderToCanvas(pageNum, canvas) {
  if (!canvas || !pdfDoc) return

  const QUALITY_MULTIPLIER = 1.8   // render lebih tinggi dari ukuran tampil, lalu di-downscale browser -> tajam

  if (!pageNum) {
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    canvas.width  = Math.round(fitW.value * dpr * QUALITY_MULTIPLIER)
    canvas.height = Math.round(fitH.value * dpr * QUALITY_MULTIPLIER)
    canvas.style.width  = '100%'
    canvas.style.height = '100%'
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#f4f5ef'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    return
  }

  const page   = await pdfDoc.getPage(pageNum)
  const vp     = page.getViewport({ scale: 1 })
  const dpr    = Math.min(window.devicePixelRatio || 1, 3)     // sebelumnya cap di 2
  const scale  = (fitH.value / vp.height) * dpr * QUALITY_MULTIPLIER   // + supersampling
  const scaled = page.getViewport({ scale })
  canvas.width  = scaled.width
  canvas.height = scaled.height
  canvas.style.width  = '100%'
  canvas.style.height = '100%'

  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  await page.render({
    canvasContext: ctx,
    viewport: scaled,
  }).promise
}

async function renderCurrent() {
  await nextTick()
  if (isMobile.value) {
    await renderToCanvas(mobilePage.value, canvasA.value)
    return
  }
  if (isCover.value) {
    await renderToCanvas(1, canvasB.value)              // cover di sisi kanan
  } else if (isBack.value) {
    await renderToCanvas(totalPages.value, canvasA.value) // back cover di sisi kiri
  } else {
    const p = pagesForState(cur.value)
    await Promise.all([
      renderToCanvas(p[0], canvasA.value),
      renderToCanvas(p[1], canvasB.value),
    ])
  }
}

// ── flip ──
async function flip(dir) {
  if (busy.value) return

  if (isMobile.value) {
    const next = mobilePage.value + dir
    if (next < 1 || next > totalPages.value) return
    busy.value = true
    if (dir > 0) {
      // overlay = halaman current, di baliknya dilukis halaman tujuan
      await flipAnimate(dir, mobilePage.value, next,
        () => renderToCanvas(next, canvasA.value))
    } else {
      // overlay masuk dari kiri membawa halaman tujuan; background tetap current
      await flipAnimate(dir, next, mobilePage.value, null)
    }
    mobilePage.value = next
    await renderCurrent()
    hideFlip()
    busy.value = false
    return
  }

  const next = cur.value + dir
  if (next < 0 || next >= totalStates.value) return
  busy.value = true

  const fromPages = pagesForState(cur.value)
  const toPages   = pagesForState(next)

  const frontPg = dir > 0 ? fromPages[fromPages.length - 1] : fromPages[0]
  const backPg  = dir > 0 ? toPages[0] : toPages[toPages.length - 1]

  // apa yang dilukis DI BALIK halaman yang terbang (setelah overlay tampil)
  let underPaint
  if (dir > 0) {
    underPaint = (next === totalStates.value - 1)
      ? () => renderToCanvas(0, canvasB.value)           // menuju back cover: kanan jadi kosong
      : () => renderToCanvas(toPages[1], canvasB.value)  // kanan tujuan
  } else {
    underPaint = (next === 0)
      ? () => renderToCanvas(0, canvasA.value)           // menuju cover: kiri jadi kosong
      : () => renderToCanvas(toPages[0], canvasA.value)  // kiri tujuan
  }

  await flipAnimate(dir, frontPg, backPg, underPaint)

  cur.value = next
  await renderCurrent()
  hideFlip()
  busy.value = false
}

function hideFlip() {
  if (flipEl.value) flipEl.value.style.display = 'none'
}

async function flipAnimate(dir, frontPg, backPg, underPaint) {
  const el = flipEl.value
  const w  = fitW.value
  const h  = fitH.value

  // 1. siapkan kedua muka
  await Promise.all([
    renderToCanvas(frontPg, flipFront.value),
    renderToCanvas(backPg,  flipBack.value),
  ])

  // 2. tampilkan overlay MENUTUPI halaman aslinya dulu
  el.style.display    = 'block'
  el.style.width      = w + 'px'
  el.style.height     = h + 'px'
  el.style.top        = '0px'
  el.style.transition = 'none'

  if (isMobile.value) {
    el.style.left            = '0px'
    el.style.transformOrigin = 'left center'
    el.style.transform       = dir > 0 ? 'rotateY(0deg)' : 'rotateY(-180deg)'
  } else if (dir > 0) {
    // MAJU: halaman kanan terbang, pivot di spine (sisi kiri elemen)
    el.style.left            = w + 'px'
    el.style.transformOrigin = 'left center'
    el.style.transform       = 'rotateY(0deg)'
  } else {
    // MUNDUR: halaman kiri terbang, pivot di spine (sisi kanan elemen)
    el.style.left            = '0px'
    el.style.transformOrigin = 'right center'
    el.style.transform       = 'rotateY(0deg)'
  }

  void el.offsetWidth

  // 3. SEKARANG aman melukis halaman di baliknya (tertutup overlay)
  if (underPaint) await underPaint()

  // 4. animasikan
  el.style.transition = 'transform 0.6s cubic-bezier(0.645,0.045,0.355,1)'
  el.style.transform  = isMobile.value
    ? (dir > 0 ? 'rotateY(-180deg)' : 'rotateY(0deg)')
    : (dir > 0 ? 'rotateY(-180deg)' : 'rotateY(180deg)')

  return new Promise(r => setTimeout(r, 620))
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
    pdfDoc = await pdfjsLib.getDocument('/portfolio_mjmokhtar.pdf').promise
    totalPages.value = pdfDoc.numPages
    const fp = await pdfDoc.getPage(1)
    const vp = fp.getViewport({ scale: 1 })
    pdfAspect = vp.width / vp.height

    loading.value = false
    await nextTick()
    checkMobile()
    recalcFit()
    await renderCurrent()
  } catch (e) {
    error.value = 'Gagal memuat PDF. Pastikan file ada di folder public.'
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

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}

function onKey(e) {
  if (e.key === 'ArrowRight') flip(1)
  if (e.key === 'ArrowLeft')  flip(-1)
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
  if (e.key === '0') zoomReset()
}

let resizeObs = null
onMounted(() => {
  loadPdf()
  window.addEventListener('keydown', onKey)
  resizeObs = new ResizeObserver(async () => {
    const wasMobile = isMobile.value
    checkMobile()
    recalcFit()
    if (wasMobile !== isMobile.value) {
      if (isMobile.value) {
        mobilePage.value = pdfPageFromState(cur.value)
      } else {
        cur.value = Math.min(
          Math.ceil((mobilePage.value - 1) / 2),
          totalStates.value - 1
        )
      }
    }
    if (!loading.value && !error.value) await renderCurrent()
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
  z-index: 50; overflow: hidden;
}
.top-bar {
  height: 48px; flex-shrink: 0;
  background: #1a1a18;
  border-bottom: 1px solid rgba(244,245,239,0.08);
  display: flex; align-items: center;
  padding: 0 12px; gap: 8px;
}
.doc-title {
  flex: 1; text-align: center; font-size: 12px;
  font-style: italic; color: rgba(244,245,239,0.3);
  font-family: 'Playfair Display', serif;
}
.top-right { display: flex; align-items: center; gap: 4px; }
.top-btn {
  background: none;
  border: 1px solid rgba(244,245,239,0.15);
  color: rgba(244,245,239,0.5); cursor: pointer;
  font-size: 12px; font-family: 'Geist', sans-serif;
  padding: 4px 10px; transition: all 0.2s; white-space: nowrap;
}
.top-btn:hover { color: #f4f5ef; border-color: rgba(244,245,239,0.4); }
.zoom-label {
  font-size: 11px; color: rgba(244,245,239,0.35);
  min-width: 38px; text-align: center;
}
.stage-wrap {
  flex: 1; display: flex;
  align-items: center; justify-content: center;
  overflow: auto;
}
.stage-scaler { display: flex; align-items: center; justify-content: center; }

/* mobile single page */
.single-page {
  border-radius: 2px; overflow: hidden; background: #f4f5ef;
}

/* desktop: dua half absolut di dalam .book */
.half {
  position: absolute; top: 0;
  width: 50%; height: 100%;
  overflow: hidden;
  background: #f4f5ef;
}
.half-l { left: 0;   border-radius: 2px 0 0 2px; }
.half-r { left: 50%; border-radius: 0 2px 2px 0; }

.shadow-book {
  box-shadow: 0 20px 60px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.6);
}
.page-canvas { display: block; width: 100%; height: 100%; }

.spine-line {
  position: absolute; left: 50%; top: 0; width: 3px; height: 100%;
  background: linear-gradient(to right, rgba(22,22,20,0.15), rgba(22,22,20,0.01));
  transform: translateX(-50%); pointer-events: none; z-index: 5;
}

.flip-el {
  position: absolute; top: 0;
  transform-style: preserve-3d;
  z-index: 20; pointer-events: none; display: none;
}
.flip-face {
  position: absolute; inset: 0;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  background: #f4f5ef;
  box-shadow: 0 8px 30px rgba(0,0,0,0.4);
}
.flip-back-face { transform: rotateY(180deg); }

.zone-left, .zone-right {
  position: absolute; top: 0; width: 50%; height: 100%; z-index: 10;
}
.zone-left  { left: 0;  cursor: w-resize; }
.zone-right { right: 0; cursor: e-resize; }

.bottom-bar {
  height: 52px; flex-shrink: 0; background: #1a1a18;
  border-top: 1px solid rgba(244,245,239,0.08);
  display: flex; align-items: center; padding: 0 20px; gap: 16px;
}
.nav-btn {
  width: 36px; height: 36px; background: none;
  border: 1px solid rgba(244,245,239,0.15);
  color: rgba(244,245,239,0.6); cursor: pointer;
  font-size: 16px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.nav-btn:hover:not(:disabled) { border-color: rgba(244,245,239,0.5); color: #f4f5ef; }
.nav-btn:disabled { opacity: 0.2; cursor: default; }
.page-track { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.pg-label {
  text-align: center; font-size: 11px; font-style: italic;
  color: rgba(244,245,239,0.3); font-family: 'Playfair Display', serif;
}
/*.progress-bar { height: 1px; background: rgba(244,245,239,0.08); overflow: hidden; }*/
/*.progress-fill { height: 100%; background: rgba(244,245,239,0.3); transition: width 0.3s; }*/

/* slider halaman */
.page-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 16px;             /* area sentuh cukup besar untuk jari */
  background: transparent;
  cursor: pointer;
  margin: 0;
}

/* track */
.page-slider::-webkit-slider-runnable-track {
  height: 2px;
  background: rgba(244,245,239,0.15);
}
.page-slider::-moz-range-track {
  height: 2px;
  background: rgba(244,245,239,0.15);
}

/* thumb */
.page-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -6px;          /* (14-2)/2 supaya center di track */
  background: #f4f5ef;
  border: none;
  border-radius: 50%;
  transition: transform 0.15s;
}
.page-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: #f4f5ef;
  border: none;
  border-radius: 50%;
  transition: transform 0.15s;
}
.page-slider:hover::-webkit-slider-thumb { transform: scale(1.25); }
.page-slider:hover::-moz-range-thumb     { transform: scale(1.25); }

.page-slider:disabled { opacity: 0.4; cursor: default; }

.center-state {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 16px; color: rgba(244,245,239,0.3); font-size: 12px;
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
  40%            { transform: scale(1);   opacity: 1; }
}
.err-msg { color: rgba(255,100,100,0.6); font-size: 12px; }
.retry-btn {
  background: none;
  border: 1px solid rgba(244,245,239,0.2);
  color: rgba(244,245,239,0.5); cursor: pointer;
  padding: 7px 18px; font-size: 12px; transition: all 0.2s;
}
.retry-btn:hover { border-color: rgba(244,245,239,0.5); color: #f4f5ef; }
</style>