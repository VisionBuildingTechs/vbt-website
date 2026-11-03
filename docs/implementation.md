# Primera implementación VBT

3 de noviembre de 2026. React 19, Next.js 16 y TypeScript. Sitio de revisión con contenido estático tipado y componentes interactivos puntuales.

## Alcance

Inicio y páginas interiores: tecnología, seis aplicaciones y sus fichas, siete antecedentes de obra y sus fichas, recursos y cuatro guías HTML, red, empresa, tipologías residenciales y sus fichas, financiación, contacto, FAQ, privacidad y términos. Página 404 propia y robots de revisión.

El muro representa VBT150 por capas: base, encastre, acero, reservas, control, hormigón, consolidación y terminación parcial. En escritorio responde al desplazamiento; en móvil o con movimiento reducido usa controles manuales. Es conceptual, sin escala ni parámetros de ejecución.

Imágenes ilustrativas IA identificadas, fotografías del portfolio VBT y galerías por caso; los renders se distinguen de fotos de obra. Axonométricas originales de VBT80/VBT150 incorporadas. Logo transparente del archivo de marca e Inter local con licencia OFL.

## Funciones y límites

Guías HTML, filtros de casos, preguntas desplegables, menú móvil y navegación entre fichas funcionan sin servicios externos. No hay espejo público de la biblioteca privada.

El formulario valida campos recortados y prepara un borrador en el navegador. El visitante elige Argentina o Panamá, revisa y abre WhatsApp o correo; confirma el envío allí. Un cambio en los campos invalida el borrador anterior. No almacena consultas en una base ni afirma que se hayan enviado automáticamente. Una bandeja persistente requiere seleccionar y configurar su servicio.

Financiación incorpora sistema francés en pesos nominales y UVA: valor del proyecto, anticipo, capital, TNA editable, plazo, gastos, ingreso opcional y amortización. Las referencias BNA son una revisión fechada y no se presentan como actualización automática de tasas. `/api/finance` consulta UVA oficial BCRA para la fecha argentina, con validación y alternativa manual explícita. No predice UVA futura ni calcula CFT con costos incompletos; construcción sólo se representa a desembolso completo. INDEC y cron quedan pendientes. No hay aprobación de solicitudes ni claves en el código.

No hay CMS administrativo, área privada, portal de aliados ni catálogo de propiedades efectivamente disponibles. Las tipologías son conceptuales. La red se atiende por contacto central, sin inventar empresas, precios o cobertura.

## Verificación

Compilación de producción y TypeScript; recorrido HTTP de enlaces internos con respuesta 200 y un único h1 por página; imágenes, fuentes, robots, 404 y ausencia de JWT en HTML. Revisión de interacciones en navegador y adaptación de escritorio y móvil.

## Lanzamiento posterior

Validar textos y casos definitivos; sustituir imágenes ilustrativas; seleccionar documentos publicables; confirmar canal por territorio; configurar recepción persistente si se desea; completar reglas bancarias antes de activar estimador. Revisar indexación, canónicas, sitemap y redirecciones al conectar dominio. El sitio actual y sus DNS no se reemplazaron.
