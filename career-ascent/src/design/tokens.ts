// Cel visual identity — dark-anchored tokens lifted from DESIGN.md (the surviving visual bible).
export const tokens = {
  canvas: '#0B0F1A',
  canvasDeep: '#05070D',
  plate: '#141B2A',
  raised: '#1C2536',
  keylineInteractive: '#5E6B82',
  ink: '#0A0E16', // outline — never pure black
  ink1: '#EDF1F7',
  ink2: '#B4C0D2',
  ink3: '#8A97AB',
  accent: '#12E0C8',
  accentPress: '#0FB7A4',
  gold: '#F2C24A',
} as const

// Six-band grit -> neon ramp (chroma climbs with altitude). Index 0=ground .. 5=deep-space.
export const RAMP = ['#64564C', '#5B6B7A', '#6E8296', '#3E6B72', '#12E0C8', '#FF3D9A'] as const

// Per-band diegetic emissive accent (the one "glow" allowed in each band).
export const EMISSIVE = ['#7CF06E', '#2FBBD6', '#43D6C4', '#4FE3D2', '#B9FFF4', '#B14BFF'] as const

export const BAND_NAMES = [
  'ground', 'low-atmosphere', 'clouds', 'stratosphere', 'orbit', 'deep-space',
] as const

export const fonts = {
  display: '"Bungee","Rubik Mono One","Arial Black",sans-serif',
  body: '"Geist","Satoshi",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',
  mono: '"JetBrains Mono",ui-monospace,"SFMono-Regular",Menlo,monospace',
} as const
