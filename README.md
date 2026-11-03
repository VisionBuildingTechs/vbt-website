# Vision Building Technologies

Sitio público de VBT con React, Next.js y TypeScript. Tecnología multipropósito, aplicaciones, casos, recursos y red; viviendas mediante aliados.

## Desarrollo

Node.js 22 y npm. Instalar con `npm ci`, ejecutar `npm run dev` y abrir `http://127.0.0.1:3000`.

`npm run build` prepara producción; `npm start` inicia esa versión. `npm run typecheck` comprueba TypeScript. Con el sitio en ejecución, `npm test` recorre enlaces y verifica páginas, recursos y errores 404. `TEST_BASE_URL` permite probar otro origen.

## Contenido y recursos

- Contenido: `src/lib/content.ts`.
- Inicio: `src/app/page.tsx`.
- Interiores: `src/app/[...slug]/page.tsx`.
- Muro: `src/components/wall-story.tsx`.
- Imágenes ilustrativas reemplazables: `public/images/*.webp`.
- Logo original: `public/brand/logo-vbt.png`.
- Inter variable y licencia OFL: `public/fonts/`.

Las imágenes IA están identificadas; no documentan obras reales. Los documentos internos no se publican. El contacto prepara una consulta que el visitante revisa y envía por WhatsApp oficial. No simula almacenamiento o envío automático.

## Revisión y publicación

Proyecto Vercel: `vbt-website`. Configuración local y secretos excluidos de Git. La revisión lleva `noindex` y robots restrictivo; la indexación se habilita junto con el lanzamiento y la estrategia de dominio.

La calculadora incluye capital, anticipo, plazo, tasa editable, gastos y amortización. Las referencias BNA tienen fecha de revisión; no constituyen ofertas o aprobación. `/api/finance` consulta UVA del día en BCRA. INDEC queda pendiente y usaría `INDEC_API_TOKEN` sólo en servidor; `.env.example` no incluye credenciales.

Detalles: [implementación](docs/implementation.md).

El video del inicio está en `public/videos/vbt-inicio-15s.mp4`, con portada `public/images/hero-video-poster.webp`. El reproductor reserva el espacio y arranca automáticamente sin sonido cuando entra en pantalla. Incluye botón de pausa y se detiene fuera de pantalla o con la pestaña oculta; si el navegador rechaza la reproducción automática, conserva la portada y permite iniciarlo con el botón.
