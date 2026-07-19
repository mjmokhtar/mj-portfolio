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

/* gust dipicu pointerdown (template kamu sudah punya @pointerdown="onDown") */
const shared = { gust: 0 }
const onDown = () => { shared.gust = 1 }

onMounted(() => {
  const canvas = canvasRef.value
  const zone   = zoneRef.value
  const ctx    = canvas.getContext('2d', { alpha: false })

  const SCALE = 4
  let W = 0, H = 0

  /* ── geometri papan tetris: FULL FRAME, kolom & baris ikut zone ── */
  let ROWS = 12, COLS = 40
  let CELL = 5, boardX = 0, boardY = 0, boardW = 0, boardH = 0

  function resize() {
    W = Math.ceil(zone.offsetWidth  / SCALE)
    H = Math.ceil(zone.offsetHeight / SCALE)
    canvas.width  = W
    canvas.height = H
    CELL   = Math.max(3, Math.floor(H / 12))
    ROWS   = Math.max(8,  Math.floor(H / CELL))
    COLS   = Math.max(10, Math.floor(W / CELL))
    boardW = COLS * CELL
    boardH = ROWS * CELL
    boardX = ((W - boardW) / 2) | 0
    boardY = H - boardH
    resetPlayfield()
    parts.length = 0
    if (tetromino) tetromino = getNextTetromino()
  }

  /* ── Bayer 8x8 (sama seperti punyamu) ── */
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

  /* ── Value noise + fbm (sama seperti punyamu) ── */
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

  /* ════════════════════════════════════════════════════
     TETRIS — struktur data & aturan dari referensi
     (SRS matrices, 7-bag, rotate, isValidMove, place)
     ════════════════════════════════════════════════════ */
  // @see https://tetris.fandom.com/wiki/SRS
  const tetrominos = {
    'I': [ [0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0] ],
    'J': [ [1,0,0],[1,1,1],[0,0,0] ],
    'L': [ [0,0,1],[1,1,1],[0,0,0] ],
    'O': [ [1,1],[1,1] ],
    'S': [ [0,1,1],[1,1,0],[0,0,0] ],
    'Z': [ [1,1,0],[0,1,1],[0,0,0] ],
    'T': [ [0,1,0],[1,1,1],[0,0,0] ]
  }

  /* pengganti tabel warna: kepekatan tinta per tetromino
     (blok gelap jatuh di atas awan terang, tiap bentuk beda kepekatan) */
  const LEVEL = {
    'I': 0.04, 'O': 0.30, 'T': 0.18,
    'S': 0.40, 'Z': 0.10, 'J': 0.24, 'L': 0.48
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min); max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // @see https://tetris.fandom.com/wiki/Random_Generator
  const tetrominoSequence = []
  function generateSequence() {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
    while (sequence.length) {
      const rand = getRandomInt(0, sequence.length - 1)
      tetrominoSequence.push(sequence.splice(rand, 1)[0])
    }
  }

  // rotasi NxN 90 derajat, persis referensi
  function rotate(matrix) {
    const N = matrix.length - 1
    return matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]))
  }

  // playfield 10x20 + 2 baris offscreen, persis referensi
  const playfield = []
  function resetPlayfield() {
    for (let row = -2; row < ROWS; row++) {
      playfield[row] = []
      for (let col = 0; col < COLS; col++) playfield[row][col] = 0
    }
  }
  resetPlayfield()

  function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] && (
            cellCol + col < 0 ||
            cellCol + col >= COLS ||
            cellRow + row >= ROWS ||
            playfield[cellRow + row][cellCol + col])
          ) {
          return false
        }
      }
    }
    return true
  }

  /* ── bot auto-play: pilih rotasi + kolom terbaik ── */
  function planFor(name) {
    let matrix = tetrominos[name]
    const spawnRow = name === 'I' ? -1 : -2
    let best = null
    for (let r = 0; r < 4; r++) {
      for (let col = -2; col < COLS; col++) {
        if (!isValidMove(matrix, spawnRow, col)) continue
        let row = spawnRow
        while (isValidMove(matrix, row + 1, col)) row++

        /* simulasi papan baris 0..19 */
        const sim = []
        for (let rr = 0; rr < ROWS; rr++) sim[rr] = playfield[rr].slice()
        let above = false
        matrix.forEach((mrow, rr) => mrow.forEach((v, cc) => {
          if (!v) return
          if (row + rr < 0) above = true
          else sim[row + rr][col + cc] = 1
        }))
        if (above) continue

        let holes = 0, aggH = 0, lines = 0
        for (let c = 0; c < COLS; c++) {
          let seen = false
          for (let rr = 0; rr < ROWS; rr++) {
            if (sim[rr][c]) { if (!seen) { aggH += ROWS - rr; seen = true } }
            else if (seen) holes++
          }
        }
        for (let rr = 0; rr < ROWS; rr++) if (sim[rr].every(v => v)) lines++

        const score = lines * 100 - holes * 8 - aggH * 0.5 + row * 1.2
        if (!best || score > best.score) best = { score, matrix, col }
      }
      matrix = rotate(matrix)
    }
    return best
  }

  function getNextTetromino() {
    if (tetrominoSequence.length === 0) generateSequence()
    const name = tetrominoSequence.pop()
    const plan = planFor(name)
    if (!plan) { dissolveBoard(); resetPlayfield(); return getNextTetromino() }
    return {
      name,
      matrix: plan.matrix,
      row: name === 'I' ? -1 : -2,
      col: plan.col
    }
  }

  /* ── partikel "pixel bergerak" saat baris pecah ── */
  const parts = []
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  function burstCell(cellRow, cellCol) {
    const px = boardX + cellCol * CELL
    const py = boardY + cellRow * CELL
    const n = reduceMotion ? 2 : 6
    for (let i = 0; i < n; i++) {
      parts.push({
        x: px + Math.random() * CELL,
        y: py + Math.random() * CELL,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -Math.random() * 1.4 - 0.3,
        life: 35 + Math.random() * 25
      })
    }
  }
  function dissolveBoard() {
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (playfield[r][c]) burstCell(r, c)
  }
  function stepParts() {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life--
      if (p.life <= 0 || p.y > H || p.x < 0 || p.x >= W) parts.splice(i, 1)
    }
  }

  function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {
          /* di referensi ini game over; di banner: larutkan lalu mulai lagi */
          if (tetromino.row + row < 0) {
            dissolveBoard()
            resetPlayfield()
            tetromino = getNextTetromino()
            return
          }
          playfield[tetromino.row + row][tetromino.col + col] = tetromino.name
        }
      }
    }

    /* line clear, loop persis referensi + burst partikel */
    for (let row = ROWS - 1; row >= 0; ) {
      if (playfield[row].every(cell => !!cell)) {
        for (let c = 0; c < COLS; c++) burstCell(row, c)
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < COLS; c++) {
            playfield[r][c] = playfield[r - 1][c]
          }
        }
      } else {
        row--
      }
    }

    tetromino = getNextTetromino()
  }

  let tetromino = null
  let count = 0
  const DROP_FRAMES = reduceMotion ? 40 : 10

  /* ── state angin/awan (sama seperti punyamu) ── */
  let mx = 0.5, my = 0.5
  let windX = 0.012, windY = 0.002
  let density = 0.52
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
  tetromino = getNextTetromino()

  /* ── render: satu pass ImageData, awan + tetris didither bersama ── */
  let frame = null
  let cellName = new Array(ROWS * COLS)

  function draw() {
    if (!frame || frame.width !== W || frame.height !== H)
      frame = ctx.createImageData(W, H)
    if (cellName.length !== ROWS * COLS) cellName = new Array(ROWS * COLS)
    const d = frame.data

    windX += ((mx - 0.5) * 0.05 + 0.012 - windX) * 0.03
    windY += ((my - 0.5) * 0.02           - windY) * 0.03
    shared.gust *= 0.95

    if (!reduceMotion) {
      ox += windX * (1 + shared.gust * 6)
      oy += windY * (1 + shared.gust * 6)
      oz += 0.0035 + shared.gust * 0.02
    }

    /* peta sel frame ini: tumpukan + tetromino aktif */
    cellName.fill(0)
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (playfield[r][c]) cellName[r * COLS + c] = playfield[r][c]
    if (tetromino) tetromino.matrix.forEach((mrow, r) => mrow.forEach((v, c) => {
      const br = tetromino.row + r
      if (v && br >= 0) cellName[br * COLS + tetromino.col + c] = tetromino.name
    }))

    const s = 0.014
    const tx = mx * W, ty = my * H
    const bx1 = boardX + boardW, by1 = boardY + boardH
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

        /* blok tetris menimpa langit; sel kosong tetap awan */
        if (x >= boardX && x < bx1 && y >= boardY && y < by1) {
          const cx = ((x - boardX) / CELL) | 0
          const cy = ((y - boardY) / CELL) | 0
          const nm = cellName[cy * COLS + cx]
          if (nm) {
            const lx = (x - boardX) % CELL
            const ly = (y - boardY) % CELL
            /* seam 1px kanan-bawah = efek "grid-1" dari referensi */
            v = (lx === CELL - 1 || ly === CELL - 1) ? 0.95 : LEVEL[nm]
          }
        }

        const on = v > BAYER[(y & 7) * 8 + (x & 7)]
        const r_ = on ? 244 : 22
        const g_ = on ? 245 : 22
        const b_ = on ? 239 : 20
        d[i++] = r_; d[i++] = g_; d[i++] = b_; d[i++] = 255
      }
    }

    /* partikel "pixel bergerak": tinta gelap di atas awan */
    stepParts()
    for (const p of parts) {
      const px = p.x | 0, py = p.y | 0
      if (px < 0 || px >= W || py < 0 || py >= H) continue
      const idx = (py * W + px) * 4
      d[idx] = 22; d[idx + 1] = 22; d[idx + 2] = 20
    }

    ctx.putImageData(frame, 0, 0)

    /* tetromino jatuh tiap DROP_FRAMES frame, pola referensi */
    if (tetromino && ++count > DROP_FRAMES) {
      count = 0
      if (isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
        tetromino.row++
      } else {
        placeTetromino()
      }
    }

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
  padding: 0 2rem;
}

.dither-zone {
  max-width: 76rem;
  margin: 0 auto;
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