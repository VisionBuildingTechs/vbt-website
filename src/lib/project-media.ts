export type ProjectVisual = {
  src: string;
  alt: string;
  caption: string;
  sourceUrl?: string;
  kind: "photo" | "illustration";
};

const portfolio = "https://visionlatam.com/proyectos/";

export const projectMedia: Record<string, ProjectVisual> = {
  "escuela-dominguez": {
    src: "/images/projects/dominguez-1.webp",
    alt: "Vista aérea del edificio de la escuela Francisco Javier Domínguez en Junín, con sus patios y cubierta",
    caption:
      "Escuela Francisco Javier Domínguez · vista aérea del edificio. Fotografía del portfolio VBT.",
    sourceUrl: portfolio,
    kind: "photo",
  },
  "escuela-godoy-cruz": {
    src: "/images/projects/godoy-cruz-5.webp",
    alt: "Galería exterior y aulas de la escuela del Club Deportivo Godoy Cruz durante la terminación de la obra",
    caption:
      "Escuela Club Deportivo Godoy Cruz · galería exterior. Fotografía del portfolio VBT.",
    sourceUrl: portfolio,
    kind: "photo",
  },
  "laboratorio-balistico-mendoza": {
    src: "/images/projects/balistica-1.webp",
    alt: "Edificio del laboratorio de huellas balísticas de Mendoza, en una fotografía de la etapa de terminaciones",
    caption:
      "Laboratorio de Huellas Balísticas · etapa de terminaciones. Fotografía del portfolio VBT.",
    sourceUrl: portfolio,
    kind: "photo",
  },
  "centros-salud-panama": {
    src: "/images/projects/salud-conceptual.webp",
    alt: "Ilustración de un centro de atención primaria de una planta en un entorno tropical",
    caption:
      "Visualización de referencia. No corresponde a un establecimiento de salud identificado.",
    kind: "illustration",
  },
  "viviendas-panama": {
    src: "/images/projects/panama-viviendas-2.webp",
    alt: "Conjunto de viviendas de una planta y cubiertas rojas publicado en el antecedente Techos de Esperanza de VBT",
    caption:
      "Viviendas de Panamá · antecedente Techos de Esperanza. Fotografía del portfolio VBT.",
    sourceUrl: portfolio,
    kind: "photo",
  },
  "costa-paradiso": {
    src: "/images/projects/costa-paradiso-1.webp",
    alt: "Render exterior de Costa Paradiso con vivienda contemporánea y expansiones en un entorno tropical",
    caption:
      "Costa Paradiso · visualización arquitectónica publicada por VBT. No es una fotografía de obra terminada.",
    sourceUrl: portfolio,
    kind: "illustration",
  },
  "naves-canada": {
    src: "/images/projects/canada-1.webp",
    alt: "Fachada de la planta Vision Profile Extrusions en Canadá, con su identificación institucional",
    caption:
      "Vision Profile Extrusions · Canadá. Fotografía publicada en el portfolio VBT.",
    sourceUrl: portfolio,
    kind: "photo",
  },
};

export const projectGalleries: Record<string, ProjectVisual[]> = {
  "escuela-dominguez": [
    {
      src: "/images/projects/dominguez-2.webp",
      alt: "Vista cenital de la escuela Francisco Javier Domínguez, patios y cancha",
      caption: "Vista cenital del conjunto educativo.",
      sourceUrl: portfolio,
      kind: "photo",
    },
    {
      src: "/images/projects/dominguez-3.webp",
      alt: "Interior de un aula de la escuela Francisco Javier Domínguez",
      caption: "Interior de un aula y superficie de los muros.",
      sourceUrl: portfolio,
      kind: "photo",
    },
  ],
  "escuela-godoy-cruz": [
    {
      src: "/images/projects/godoy-cruz-3.webp",
      alt: "Galería cubierta de la escuela Godoy Cruz durante su construcción",
      caption: "Galería cubierta durante la ejecución.",
      sourceUrl: portfolio,
      kind: "photo",
    },
  ],
  "laboratorio-balistico-mendoza": [
    {
      src: "/images/projects/balistica-2.webp",
      alt: "Muros y vanos del laboratorio de huellas balísticas durante la ejecución",
      caption: "Muros y aberturas durante la ejecución.",
      sourceUrl: portfolio,
      kind: "photo",
    },
    {
      src: "/images/projects/balistica-3.webp",
      alt: "Ensamblaje de perfiles en la obra del laboratorio de Mendoza",
      caption: "Montaje del encofrado permanente en obra.",
      sourceUrl: portfolio,
      kind: "photo",
    },
  ],
  "viviendas-panama": [
    {
      src: "/images/projects/panama-viviendas-1.webp",
      alt: "Vivienda de una planta con muros de acabado claro, incluida en la referencia Panamá de VBT",
      caption: "Vivienda de una planta publicada en el antecedente de Panamá.",
      sourceUrl: portfolio,
      kind: "photo",
    },
  ],
  "costa-paradiso": [
    {
      src: "/images/projects/costa-paradiso-2.webp",
      alt: "Render de dormitorio y baño de Costa Paradiso",
      caption:
        "Visualización arquitectónica de un ambiente interior; no es una fotografía de obra.",
      sourceUrl: portfolio,
      kind: "illustration",
    },
    {
      src: "/images/projects/costa-paradiso-3.webp",
      alt: "Render de estar y comedor de Costa Paradiso hacia el jardín",
      caption:
        "Visualización de estar y comedor; no es una fotografía de obra.",
      sourceUrl: portfolio,
      kind: "illustration",
    },
  ],
  "naves-canada": [
    {
      src: "/images/projects/canada-2.webp",
      alt: "Vista exterior de las instalaciones canadienses publicadas por VBT",
      caption: "Otra vista de instalaciones publicada en el portfolio VBT.",
      sourceUrl: portfolio,
      kind: "photo",
    },
  ],
};
