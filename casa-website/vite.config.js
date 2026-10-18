import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

const PAGES = ['/', '/property', '/locale', '/info', '/book', '/contact', '/privacy']

// Endereço público do site: a Netlify define URL no build (domínio próprio, se existir)
const siteUrl = (process.env.URL || '').replace(/\/$/, '')

// Preenche __SITE_URL__ no index.html e gera sitemap.xml + robots.txt
const seo = () => ({
  name: 'seo',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
  generateBundle() {
    if (!siteUrl) return
    const urls = PAGES.map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n')
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    })
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
})
