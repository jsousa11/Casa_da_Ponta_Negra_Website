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
    pages/       # Home, PropertyPage, LocalePage, InfoPage, BookPage, ContactPage, PrivacyPage
    components/  # Navbar, Footer, NImg, ScrollToTop
    styles/      # CSS por página
    config/      # site.js — dados da casa (RNAL, preço, horários, notas...) e places.js — locais do mapa
    context/     # LanguageContext + translations.js (todos os textos PT/EN)
    hooks/       # usePageMeta (título e descrição de cada página)
  public/
    assets/      # Imagens (servidas via Netlify Image CDN)
```

## Editar dados da casa

Tudo o que muda com frequência está em `src/config/site.js`. Os campos a `null` não aparecem no site:
número de registo AL (`rnal`), preço "desde" (`priceFrom`), horários de check-in/out e notas no Booking/Airbnb.

## Reservas (pagamento imediato)

Fluxo: o hóspede escolhe datas → `create-checkout` confirma disponibilidade e preço, retém as datas 30 min e abre o Stripe →
ao pagar, o Stripe chama `stripe-webhook` → reserva marcada como paga, emails enviados → `direct-calendar` publica as
reservas diretas para o Airbnb e o Booking importarem. Os métodos de pagamento são os ativos no painel do Stripe (Settings → Payment methods): cartão, Apple Pay, Google Pay, Link, MB WAY e Revolut Pay.

Preços, suplemento por pessoa, desconto e regras: `src/config/pricing.js`.

### Variáveis na Netlify (Site configuration → Environment variables)

| Variável | Para quê |
|---|---|
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | Envio dos emails (palavra-passe de app do Google) |
| `AIRBNB_ICAL_URL` / `BOOKING_ICAL_URL` | Links de exportação do calendário de cada plataforma |
| `STRIPE_SECRET_KEY` | Chave secreta do Stripe (`sk_live_…` ou `sk_test_…` para testar) |
| `STRIPE_WEBHOOK_SECRET` | Segredo do webhook (`whsec_…`) |
| `TEST_BOOKING_CODE` | Opcional. Quem escrever este código na mensagem da reserva paga 1 € (para testar pagamentos reais). Apagar depois dos testes |

### Stripe → webhook
Programadores → Webhooks → Adicionar destino: `https://<site>/.netlify/functions/stripe-webhook`, com os eventos
`checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`, `charge.refunded`.
Reservas feitas com chaves de teste não bloqueiam datas; os emails levam "[TESTE]" no assunto.

### Airbnb e Booking → importar reservas diretas
Em cada plataforma, "Importar calendário": `https://<site>/.netlify/functions/direct-calendar`
