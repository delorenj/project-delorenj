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

// A soft cel cloud clump (flat fills + ink underline), transparent background.
export function cloudSprite(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = 512; c.height = 192
  const g = c.getContext('2d')!
  const puffs: Array<[number, number, number]> = [
    [140, 130, 70], [220, 110, 95], [320, 128, 80], [400, 138, 60], [255, 150, 110],
  ]
  g.fillStyle = '#C7D6E2'
  for (const [x, y, r] of puffs) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill() }
  g.fillStyle = '#9FB2C4'
  for (const [x, y, r] of puffs) { g.beginPath(); g.arc(x, y + r * 0.35, r * 0.9, 0, Math.PI); g.fill() }
  return toTexture(c)
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
