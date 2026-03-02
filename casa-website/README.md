# Casa da Ponta Negra — Website

Site oficial da Casa da Ponta Negra, alojamento em Santa Maria, Açores.

## Stack

- React + Vite
- React Router
- CSS
- Netlify (deploy)

## Desenvolvimento local

```bash
cd casa-website
npm install
npm run dev
```

## Estrutura

```
casa-website/
  src/
    pages/       # Home, PropertyPage, LocalePage, ContactPage
    components/  # Navbar, Footer, NImg, ScrollToTop
    styles/      # CSS por página
    context/     # LanguageContext (PT/EN)
  public/
    assets/      # Imagens (servidas via Netlify Image CDN)
```
