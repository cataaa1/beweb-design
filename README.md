# BeWeb — beweb.com.ar

Sitio one-page de BeWeb, agencia de diseño y desarrollo web de Mar del Plata.
Construido con [Astro](https://astro.build) + Tailwind CSS: el build genera HTML estático, CSS y un poco de JS vanilla.

## Scripts

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Servidor de desarrollo en http://localhost:4321 |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run type-check` | `astro check` (tipos de .astro y .ts) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Estructura

```
src/
  pages/index.astro       # orden de las secciones
  layouts/Base.astro      # <head> (SEO, OG, JSON-LD, Turnstile), header, footer, cursor
  components/*.astro      # una sección/pieza por archivo, cada una con su <script> si es interactiva
  scripts/                # comportamientos compartidos (reveal al scrollear, pixel field, cursor)
  lib/classes.ts          # clases de Tailwind que dependen del estado (las usan el markup y los scripts)
  data/beweb-data.ts      # contenido: proyectos, servicios, proceso, stats, navegación
  styles/global.css       # tokens, fuentes, animaciones y efectos propios
public/                   # favicon, imágenes de proyectos, OG, robots.txt, sitemap.xml
```

## Marca

- Colores: Crema `#EDE6D8`, Marino `#1B2433` / `#1F2F45`, Ladrillo `#B5473A`, Acero `#3E5C7E`, Bruma `#9CC2E0` (tokens de Tailwind `crema`, `marino`, `marino-2`, `marino-deep`, `ladrillo`, `acero`, `bruma`).
- Tipografías: Space Grotesk y Space Mono.
- Fondo marino (nunca crema). Sin pills, gradientes ni eyebrows. Textos en español rioplatense.

## Formulario de contacto

Envía a FormPost (`https://formpost.rollpix.app/submit`, `website_id=beweb`) con Cloudflare Turnstile.
La clave de Turnstile está atada al dominio: en `localhost` el captcha falla salvo que se agregue ese hostname en Cloudflare.

## Deploy (beta)

La beta vive en Cloudflare Pages, proyecto `beweb-beta`: https://beta.beweb.com.ar (también https://beweb-beta.pages.dev).
Los hosts de beta responden con `X-Robots-Tag: noindex` (ver `public/_headers`), así no compiten con el sitio real en Google.

```sh
# con un token de Cloudflare con permiso de Pages (no lo guardes en el repo)
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=ff609bf3b368a8545591c355cafb301c
npm run deploy:beta
```

No uses `wrangler deploy` ni dejes que wrangler "convierta" el proyecto a Workers: en la cuenta existe el Worker `beweb` (el sitio en producción) y podría pisarse.
