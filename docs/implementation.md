# Primera implementación VBT

3 de noviembre de 2026. React 19, Next.js 16 y TypeScript. Sitio de revisión con contenido estático tipado y componentes interactivos puntuales.

## Alcance

Inicio y páginas interiores: tecnología, seis aplicaciones y sus fichas, siete casos integrados en Aplicaciones y sus fichas, recursos con tres PDF y cuatro guías HTML, red, empresa, catálogo residencial y sus fichas, financiación dentro de Viviendas, contacto, FAQ, privacidad y términos. Las rutas anteriores de casos y financiación redirigen a sus nuevas ubicaciones. Página 404 propia y robots de revisión.

El muro representa VBT150 por capas: base, encastre, acero, reservas, control, hormigón, consolidación y terminación parcial. En escritorio responde al desplazamiento; en móvil o con movimiento reducido usa controles manuales. Es conceptual, sin escala ni parámetros de ejecución.

Fotografías del portfolio VBT, visualizaciones y galerías por caso; los renders se distinguen de fotos de obra. Las menciones a IA se retiraron del sitio visible. Axonométricas originales de VBT80/VBT150 incorporadas. Logo transparente del archivo de marca e Inter local con licencia OFL. Acentos puntuales usan el mismo azul del título del inicio.

El inicio incorpora un montaje de 15 segundos con Godoy Cruz, detalle de paneles, industria, Escuela Domínguez y siete viviendas. MP4 H.264, 1280×720, 25 fps, 375 cuadros, sin audio, Rec.709 y cabecera al inicio para reproducción progresiva; pesa 2.428.436 bytes. La fuente HLG del video de Vision Latam se convirtió a SDR. Portada WebP prioritaria y fuente de video diferida hasta entrar en pantalla. Movimiento reducido y ahorro de datos requieren reproducción voluntaria; pausa manual, fuera de pantalla y con pestaña oculta. Receta, originales referenciados y control visual se conservan localmente en investigación/documentación ignorada.

## Funciones y límites

Guías HTML, filtros de casos, preguntas desplegables, menú móvil y navegación entre fichas funcionan sin servicios externos. Recursos ofrece los tres PDF expresamente seleccionados por el usuario: guía técnica/montaje (14 páginas), piezas (6) y ensayo de fuego (4). Se sirven originales completos, sin modificaciones; fuentes y huellas se conservan en documentación local ignorada. El resumen de FSI 25 y SDI 400 limita la clasificación A/1 a la muestra del reporte Element 24-002-431(B), sin confundir combustión superficial con resistencia estructural en minutos. No hay espejo público de la biblioteca privada.

El formulario valida campos recortados y prepara un borrador en el navegador. El visitante elige Argentina o Panamá, revisa y abre WhatsApp o correo; confirma el envío allí. Un cambio en los campos invalida el borrador anterior. No almacena consultas en una base ni afirma que se hayan enviado automáticamente. Una bandeja persistente requiere seleccionar y configurar su servicio.

Financiación incorpora sistema francés en pesos nominales y UVA: valor del proyecto, anticipo, capital, TNA editable, plazo, gastos, ingreso opcional y amortización. Las referencias BNA son una revisión fechada y no se presentan como actualización automática de tasas. `/api/finance` consulta UVA oficial BCRA para la fecha argentina, con validación y alternativa manual explícita. No predice UVA futura ni calcula CFT con costos incompletos; construcción sólo se representa a desembolso completo. INDEC y cron quedan pendientes. No hay aprobación de solicitudes ni claves en el código.

El catálogo de viviendas incluye los proyectos de 90, 120 y 150 m² publicados por Vision Latam, con planos, renders y filtros por superficie y plantas. Cada ficha inicia la consulta con el modelo seleccionado. No representa unidades en stock ni una oferta cerrada. No hay CMS administrativo, área privada ni portal de aliados. La red se atiende por contacto central, sin inventar empresas, precios o cobertura. Empresa deja el menú principal; su URL se conserva.

## Verificación

Compilación de producción y TypeScript; recorrido HTTP de enlaces internos con respuesta 200 y un único h1 por página; imágenes, fuentes, robots, 404 y ausencia de JWT en HTML. Se comprueban también encabezado PDF, tamaño completo de las tres descargas y redirecciones de rutas anteriores. Revisión de interacciones en navegador y adaptación de escritorio y móvil.

## Lanzamiento posterior

Validar textos y casos definitivos; sustituir imágenes ilustrativas cuando corresponda; incorporar nuevos documentos seleccionados; configurar recepción persistente si se desea; mantener la revisión de condiciones bancarias y acordar el alcance de la futura alianza. Revisar indexación, canónicas, sitemap y redirecciones al conectar dominio. El sitio actual y sus DNS no se reemplazaron.
