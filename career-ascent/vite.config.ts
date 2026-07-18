import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Client-only SPA. 3D/audio assets will live on Cloudflare R2 (assets.jaradd.com) later;
// nothing here is SSR'd — the capability gate in src/App.tsx boots the world or the bail-out.
export default defineConfig({
  plugins: [react()],
  build: { target: 'es2022' },
})
