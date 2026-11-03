export type DownloadDocument = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  filename: string;
  sizeBytes: number;
  pages: number;
  format: "PDF";
  language: "Español" | "Inglés";
  kind: "guide" | "components" | "test";
};

export const downloads: DownloadDocument[] = [
  {
    slug: "guia-tecnica-montaje",
    title: "Guía técnica y de montaje",
    summary:
      "Conceptos de la tecnología VBT, componentes, secuencia de montaje, hormigonado y revestimientos.",
    href: "/documents/guia-tecnica-montaje.pdf",
    filename: "VBT-Guia-Tecnica-y-de-Montaje.pdf",
    sizeBytes: 1824247,
    pages: 14,
    format: "PDF",
    language: "Español",
    kind: "guide",
  },
  {
    slug: "detalle-piezas",
    title: "Detalle de piezas",
    summary:
      "Identificación de paneles, conectores y piezas de las familias VBT80 y VBT150, con dimensiones de referencia.",
    href: "/documents/detalle-piezas.pdf",
    filename: "VBT-Detalle-de-Piezas.pdf",
    sizeBytes: 792190,
    pages: 6,
    format: "PDF",
    language: "Español",
    kind: "components",
  },
  {
    slug: "ensayo-fuego-2024",
    title: "Ensayo de combustión superficial",
    summary:
      "Informe completo de Element sobre propagación superficial de la llama y desarrollo de humo según UL 723, procedimiento consistente con ASTM E84.",
    href: "/documents/ensayo-fuego-2024.pdf",
    filename: "VBT-Ensayo-Fuego-24-002-431B-Revision-1.pdf",
    sizeBytes: 68133,
    pages: 4,
    format: "PDF",
    language: "Inglés",
    kind: "test",
  },
];

export const fireTestSummary = {
  reportNumber: "24-002-431(B)(Revision 1)",
  reportDate: "2024-12-17",
  testDate: "2024-12-16",
  laboratory: "Element Fire Testing · Oakville, Canadá",
  method: "UL 723 · 11.ª edición",
  referenceMethod: "Procedimiento consistente con ASTM E84",
  specimen: "“Vision Building Systems” (90435)",
  specimenDescription:
    "Encofrado permanente de PVC con hormigón, de 51 mm de espesor total y una cara de PVC de 3,05 mm expuesta a la llama.",
  results: [
    { label: "Índice de propagación de llama (FSI)", value: "25" },
    { label: "Índice de desarrollo de humo (SDI)", value: "400" },
  ],
  classification:
    "Clase 1 o Clase A para la muestra ensayada, según el informe.",
  scope:
    "Resultados de combustión superficial correspondientes exclusivamente a la muestra y a las condiciones del ensayo descritas en el informe.",
  limitation:
    "No es un ensayo de resistencia al fuego de un muro en minutos, ni acredita por sí solo todas las configuraciones VBT80 o VBT150.",
  documentHref: "/documents/ensayo-fuego-2024.pdf",
  sourcePages: [2, 3, 4],
} as const;
