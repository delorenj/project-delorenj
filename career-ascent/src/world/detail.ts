import * as THREE from 'three'
import { tokens } from '../design/tokens'
import { bandName, type Era } from '../data/world'

// AD-10 the Detail Panel: an era's actual write-up (blurb + tech) painted to a CanvasTexture in
// the cel dialect — plate fill, ink border + drop, accent eyebrow, mono telemetry — so the
// content is projected in-world from the World-Data core, not just floating scenery.
const W = 1024
const H = 560
export const DETAIL_ASPECT = W / H

function wrap(g: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (g.measureText(test).width > maxW && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

export function detailTexture(era: Era, chip: string): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const g = c.getContext('2d')!
  const padL = 54
  const plateW = W - 52
  const plateH = H - 48

  // ink drop shadow, then plate, then ink keyline
  g.fillStyle = tokens.ink
  g.beginPath(); g.roundRect(30, 34, plateW, plateH, 16); g.fill()
  g.fillStyle = tokens.plate
  g.beginPath(); g.roundRect(18, 22, plateW, plateH, 16); g.fill()
  g.lineWidth = 6; g.strokeStyle = tokens.ink
  g.beginPath(); g.roundRect(18, 22, plateW, plateH, 16); g.stroke()

  let y = 78
  g.textBaseline = 'alphabetic'
  // eyebrow — seq · band
  g.font = '700 26px "JetBrains Mono", ui-monospace, monospace'
  g.fillStyle = tokens.accent
  g.fillText(`${String(era.seq + 1).padStart(2, '0')}   ·   ${bandName(era).toUpperCase()}`, padL, y)
  // title
  y += 58
  g.font = '700 50px "Geist", system-ui, sans-serif'
  g.fillStyle = tokens.ink1
  g.fillText(era.title, padL, y)
  // years
  y += 34
  g.font = '600 24px "JetBrains Mono", ui-monospace, monospace'
  g.fillStyle = tokens.ink3
  g.fillText(era.years, padL, y)
  // rule
  y += 26
  g.strokeStyle = tokens.raised; g.lineWidth = 3
  g.beginPath(); g.moveTo(padL, y); g.lineTo(W - 54, y); g.stroke()
  // blurb
  y += 44
  g.font = '400 27px "Geist", system-ui, sans-serif'
  g.fillStyle = tokens.ink2
  for (const ln of wrap(g, era.blurb, plateW - (padL - 18) - 24)) {
    g.fillText(ln, padL, y)
    y += 36
  }
  // tech chips along the bottom
  let cx = padL
  const cy = H - 52
  g.font = '600 20px "JetBrains Mono", ui-monospace, monospace'
  for (const t of era.tech) {
    const tw = g.measureText(t).width + 28
    if (cx + tw > W - 60) break
    g.strokeStyle = chip; g.lineWidth = 2
    g.beginPath(); g.roundRect(cx, cy - 26, tw, 34, 9); g.stroke()
    g.fillStyle = tokens.ink1
    g.fillText(t, cx + 14, cy - 3)
    cx += tw + 12
  }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  tex.needsUpdate = true
  return tex
}
