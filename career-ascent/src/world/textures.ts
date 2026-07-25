import * as THREE from 'three'

// Cel scenery painted to CanvasTextures — flat stepped bands + hard silhouettes,
// kept in the cel dialect (no photoreal). These are the far, slow 2D parallax layers.
function toTexture(c: HTMLCanvasElement): THREE.Texture {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.needsUpdate = true
  return t
}

// Vertical sky: deep space at the top (canvas y=0) → dusk ground at the bottom.
// Default texture flipY puts canvas-top at plane-top, so space ends up high. Stepped = cel.
export function skyGradient(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = 16; c.height = 640
  const g = c.getContext('2d')!
  const bands: Array<[number, string]> = [
    [0.0, '#05070D'], [0.14, '#081428'], [0.28, '#0E2140'],
    [0.44, '#173A63'], [0.6, '#26456E'], [0.74, '#3E3552'],
    [0.85, '#6E4A46'], [0.93, '#B5623A'], [1.0, '#7C3F27'], // warm dusk horizon at the ground
  ]
  for (let i = 0; i < bands.length - 1; i++) {
    const y0 = bands[i][0] * c.height
    const y1 = bands[i + 1][0] * c.height
    g.fillStyle = bands[i][1]
    g.fillRect(0, y0, c.width, y1 - y0 + 1)
  }
  return toTexture(c)
}

// A bold hand-drawn cumulus: thick ink silhouette, lavender/periwinkle flat fills, stepped
// purple shade, near-white crown, and internal ink lobe-lines where the puffs overlap — the
// chunky comic-book cloud of the reference art, not a soft photographic puff.
const CLOUD_INK = '#141026'
export function cloudSprite(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = 512; c.height = 232
  const g = c.getContext('2d')!
  const puffs: Array<[number, number, number]> = [
    [118, 160, 62], [200, 118, 86], [296, 126, 92], [382, 152, 64], [250, 168, 104],
  ]
  const BASE = 206
  const union = (grow = 0) => {
    g.beginPath()
    for (const [x, y, r] of puffs) { g.moveTo(x + r + grow, y); g.arc(x, y, r + grow, 0, Math.PI * 2) }
  }
  // thick ink silhouette — the bold outline
  g.fillStyle = CLOUD_INK
  union(14); g.fill()
  g.clearRect(0, BASE, c.width, c.height - BASE) // hard flat base
  g.save()
  g.beginPath(); g.rect(0, 0, c.width, BASE - 9); g.clip() // keep fills off the base ink
  // lavender body
  g.fillStyle = '#CBCFEE'
  union(); g.fill()
  union(); g.clip() // confine shading + lobe lines to the body
  // stepped periwinkle underside
  g.fillStyle = '#9BA0D4'
  g.beginPath()
  for (const [x, y, r] of puffs) { g.moveTo(x + r * 0.9, y + r * 0.5); g.arc(x, y + r * 0.5, r * 0.9, 0, Math.PI * 2) }
  g.fill()
  g.fillStyle = '#7C82BC'
  g.beginPath()
  for (const [x, y, r] of puffs) { g.moveTo(x + r * 0.85, y + r * 0.92); g.arc(x, y + r * 0.92, r * 0.85, 0, Math.PI * 2) }
  g.fill()
  // near-white crown highlight on the top lobes
  g.fillStyle = '#EFF0FF'
  g.beginPath()
  for (const [x, y, r] of puffs) { g.moveTo(x - r * 0.14 + r * 0.5, y - r * 0.4); g.arc(x - r * 0.14, y - r * 0.4, r * 0.5, 0, Math.PI * 2) }
  g.fill()
  // internal lobe lines — thick ink arcs on each puff's lower boundary
  g.strokeStyle = CLOUD_INK; g.lineWidth = 7; g.lineCap = 'round'
  for (const [x, y, r] of puffs) { g.beginPath(); g.arc(x, y, r - 3, 0.12 * Math.PI, 0.88 * Math.PI); g.stroke() }
  g.restore()
  return toTexture(c)
}

// Atmosphere halo for the Earth reveal — a radial aura the globe occludes from the center,
// leaving a soft rim of light outside the limb. The one permitted glow of the deep-space band.
export function earthGlow(): THREE.Texture {
  const S = 512
  const c = document.createElement('canvas')
  c.width = S; c.height = S
  const g = c.getContext('2d')!
  // many close stops → a smooth ramp the bloom pass can spread without banding
  const rg = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  rg.addColorStop(0.0, 'rgba(122,180,240,0.82)')
  rg.addColorStop(0.45, 'rgba(112,172,236,0.66)')
  rg.addColorStop(0.58, 'rgba(96,158,228,0.46)')
  rg.addColorStop(0.7, 'rgba(74,132,212,0.26)')
  rg.addColorStop(0.82, 'rgba(56,106,190,0.12)')
  rg.addColorStop(0.92, 'rgba(44,86,168,0.04)')
  rg.addColorStop(1.0, 'rgba(40,80,160,0)')
  g.fillStyle = rg
  g.fillRect(0, 0, S, S)
  const t = toTexture(c)
  t.minFilter = THREE.LinearMipmapLinearFilter
  t.generateMipmaps = true
  return t
}

// Origins: black mountain range + a distant city skyline with a few lit windows.
export function groundSilhouette(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = 1024; c.height = 320
  const g = c.getContext('2d')!
  g.fillStyle = '#0A0E16'
  // mountains
  g.beginPath(); g.moveTo(0, 320)
  const peaks = [0, 40, 20, 80, 45, 120, 70, 150, 60, 210, 90, 260, 55, 300, 110, 320]
  for (let x = 0, i = 0; x <= 1024; x += 68, i++) g.lineTo(x, 320 - peaks[i % peaks.length])
  g.lineTo(1024, 320); g.closePath(); g.fill()
  // city skyline (center-right)
  const base = 320
  for (let i = 0; i < 16; i++) {
    const x = 470 + i * 26 + (i % 3) * 6
    const h = 60 + ((i * 37) % 90)
    const w = 16 + (i % 4) * 4
    g.fillRect(x, base - h, w, h)
    g.fillStyle = '#F2C24A'
    for (let wy = base - h + 8; wy < base - 6; wy += 12) if ((x + wy) % 5 < 2) g.fillRect(x + 3, wy, 3, 4)
    g.fillStyle = '#0A0E16'
  }
  return toTexture(c)
}
