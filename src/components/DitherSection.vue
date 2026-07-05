<template>
  <div class="dither-wrap" data-aos="fade-up" data-aos-duration="2000">
    <div class="dither-zone" ref="zoneRef" @pointerdown="onDown">
      <canvas ref="canvasRef" class="dither-canvas" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const zoneRef   = ref(null)
const canvasRef = ref(null)

onMounted(() => {
  const canvas = canvasRef.value
  const zone   = zoneRef.value
  const ctx    = canvas.getContext('2d', { alpha: false })

  const SCALE = 4
  let W = 0, H = 0

  function resize() {
    W = Math.ceil(zone.offsetWidth  / SCALE)
    H = Math.ceil(zone.offsetHeight / SCALE)
    canvas.width  = W
    canvas.height = H
  }

  // Bayer 8x8
  const BAYER = (() => {
    let m = [[0]]
    for (let n = 1; n <= 8; n *= 2) {
      const s = m.length, next = []
      for (let y = 0; y < s * 2; y++) next.push(new Array(s * 2))
      for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
        const v = m[y][x] * 4
        next[y][x]         = v
        next[y][x + s]     = v + 2
        next[y + s][x]     = v + 3
        next[y + s][x + s] = v + 1
      }
      m = next
      if (s * 2 === 8) break
    }
    const flat = new Float32Array(64)
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++)
      flat[y * 8 + x] = (m[y][x] + 0.5) / 64
    return flat
  })()

  // Value noise
  const P = new Uint8Array(512)
  {
    const p = [...Array(256).keys()]
    let seed = 1337
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
    for (let i = 255; i > 0; i--) {
      const j = (rnd() * (i + 1)) | 0;
      [p[i], p[j]] = [p[j], p[i]]
    }
    for (let i = 0; i < 512; i++) P[i] = p[i & 255]
  }

  const fade = t => t * t * (3 - 2 * t)
  function noise3(x, y, z) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z)
    const u = fade(x), v = fade(y), w = fade(z)
    const h = (a, b, c) => P[(P[(P[a & 255] + b) & 255] + c) & 255] / 255
    const lerp = (a, b, t) => a + (b - a) * t
    return lerp(
      lerp(lerp(h(X,Y,Z), h(X+1,Y,Z), u), lerp(h(X,Y+1,Z), h(X+1,Y+1,Z), u), v),
      lerp(lerp(h(X,Y,Z+1), h(X+1,Y,Z+1), u), lerp(h(X,Y+1,Z+1), h(X+1,Y+1,Z+1), u), v),
      w
    )
  }
  function fbm(x, y, z) {
    let sum = 0, amp = 0.5, freq = 1
    for (let o = 0; o < 4; o++) {
      sum += amp * noise3(x * freq, y * freq, z * freq)
      amp *= 0.5; freq *= 2.05
    }
    return sum
  }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  let mx = 0.5, my = 0.5
  let windX = 0.012, windY = 0.002
  let density = 0.52
  let gust = 0
  let ox = 0, oy = 0, oz = 0
  let rafId = null

  const onMove = e => {
    const r = zone.getBoundingClientRect()
    mx = (e.clientX - r.left) / r.width
    my = (e.clientY - r.top)  / r.height
  }
  const onWheel = e => {
    density = Math.min(0.75, Math.max(0.30,
      density + (e.deltaY > 0 ? 0.02 : -0.02)))
  }

  zone.addEventListener('pointermove', onMove)
  zone.addEventListener('wheel', onWheel, { passive: true })

  const ro = new ResizeObserver(resize)
  ro.observe(zone)
  resize()

  let frame = null
  function draw() {
    if (!frame || frame.width !== W || frame.height !== H)
      frame = ctx.createImageData(W, H)
    const d = frame.data

    windX += ((mx - 0.5) * 0.05 + 0.012 - windX) * 0.03
    windY += ((my - 0.5) * 0.02           - windY) * 0.03
    gust  *= 0.95

    if (!reduceMotion) {
      ox += windX * (1 + gust * 6)
      oy += windY * (1 + gust * 6)
      oz += 0.0035 + gust * 0.02
    }

    const s = 0.014
    const tx = mx * W, ty = my * H
    let i = 0
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const dx = x - tx, dy = y - ty
        const swirl = Math.exp(-(dx*dx + dy*dy) / 1800) * 0.35
        let n = fbm(
          x * s + ox + swirl * Math.sin(oz * 3 + dy * 0.05),
          y * s * 1.6 + oy + swirl * Math.cos(oz * 3 + dx * 0.05),
          oz
        )
        let v = (n - density) * 4.2 + 0.85
        v = v < 0 ? 0 : v > 1 ? 1 : v
        v = v * (0.92 + 0.08 * (y / H))
        const on = v > BAYER[(y & 7) * 8 + (x & 7)]
        const c  = on ? 244 : 22
        const g  = on ? 245 : 22
        const b  = on ? 239 : 20
        d[i++] = c; d[i++] = g; d[i++] = b; d[i++] = 255
      }
    }
    ctx.putImageData(frame, 0, 0)
    rafId = requestAnimationFrame(draw)
  }
  rafId = requestAnimationFrame(draw)

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    ro.disconnect()
    zone.removeEventListener('pointermove', onMove)
    zone.removeEventListener('wheel', onWheel)
  })
})
</script>

<style scoped>
.dither-wrap {
  background: #f4f5ef;
  padding: 0 2rem;          /* px-8 = 2rem */
}

.dither-zone {
  max-width: 76rem;         /* max-w-7xl = 80rem */
  margin: 0 auto;           /* mx-auto */
  height: 240px;
  cursor: crosshair;
  overflow: hidden;
  position: relative;
}

.dither-canvas {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  display: block;
}
</style>