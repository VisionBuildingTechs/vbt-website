export type HouseImage = {
  src: string;
  alt: string;
  kind: "render" | "plan";
  label: string;
};

export type HouseModel = {
  slug: string;
  title: string;
  area: number;
  floors: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  description: string;
  sourceUrl: string;
  areaNote: string;
  features: string[];
  images: HouseImage[];
};

const sourceUrl = "https://visionlatam.com/#e-n-tab-title-513623401";
const areaNote =
  "Superficie de referencia publicada por Vision Latam. El cómputo, el alcance y la adaptación al terreno se confirman al evaluar el proyecto.";

export const houseCatalog: HouseModel[] = [
  {
    slug: "proyecto-90",
    title: "Proyecto 90 m²",
    area: 90,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "Tres dormitorios y los espacios de uso diario en una sola planta. Una distribución con cocina, comedor y estar vinculados, y acceso desde el frente de la vivienda.",
    sourceUrl,
    areaNote,
    features: [
      "Una planta",
      "Tres dormitorios",
      "Cocina, comedor y estar integrados",
    ],
    images: [
      {
        src: "/images/houses/90-render-exterior.webp",
        alt: "Render del Proyecto 90 m²: viviendas de una planta con acceso y cochera al frente",
        kind: "render",
        label: "Vista exterior",
      },
      {
        src: "/images/houses/90-render-frente.webp",
        alt: "Render del Proyecto 90 m² con una alternativa de terminación oscura",
        kind: "render",
        label: "Alternativa de terminación",
      },
      {
        src: "/images/houses/90-planta-baja.webp",
        alt: "Planta del Proyecto 90 m², con tres dormitorios y espacios sociales en un solo nivel",
        kind: "plan",
        label: "Planta baja",
      },
    ],
  },
  {
    slug: "proyecto-120",
    title: "Proyecto 120 m²",
    area: 120,
    floors: 2,
    bedrooms: 3,
    bathrooms: null,
    description:
      "Una vivienda organizada en dos plantas: los espacios sociales se encuentran en la planta baja y los tres dormitorios se reúnen en el nivel superior.",
    sourceUrl: "https://visionlatam.com/#e-n-tab-title-513623402",
    areaNote,
    features: [
      "Dos plantas",
      "Tres dormitorios en planta alta",
      "Espacios sociales en planta baja",
    ],
    images: [
      {
        src: "/images/houses/120-render-exterior.webp",
        alt: "Render del Proyecto 120 m²: viviendas de dos plantas con balcones y acceso vehicular al frente",
        kind: "render",
        label: "Vista exterior",
      },
      {
        src: "/images/houses/120-render-frente.webp",
        alt: "Render del Proyecto 120 m² con una alternativa de terminación oscura",
        kind: "render",
        label: "Alternativa de terminación",
      },
      {
        src: "/images/houses/120-planta-baja.webp",
        alt: "Planta baja del Proyecto 120 m² con cocina, comedor, estar y escalera",
        kind: "plan",
        label: "Planta baja",
      },
      {
        src: "/images/houses/120-planta-alta.webp",
        alt: "Planta alta del Proyecto 120 m² con tres dormitorios alrededor de la escalera",
        kind: "plan",
        label: "Planta alta",
      },
    ],
  },
  {
    slug: "proyecto-150",
    title: "Proyecto 150 m²",
    area: 150,
    floors: 2,
    bedrooms: 3,
    bathrooms: null,
    description:
      "Una propuesta de dos plantas con tres dormitorios en el nivel superior. La planta baja reúne cocina, comedor y estar, con una escalera central que conecta ambas plantas.",
    sourceUrl: "https://visionlatam.com/#e-n-tab-title-513623403",
    areaNote,
    features: [
      "Dos plantas",
      "Tres dormitorios en planta alta",
      "Escalera central y espacios sociales integrados",
    ],
    images: [
      {
        src: "/images/houses/150-render-exterior.webp",
        alt: "Render del Proyecto 150 m²: viviendas de dos plantas con volumen superior blanco y cochera al frente",
        kind: "render",
        label: "Vista exterior",
      },
      {
        src: "/images/houses/150-render-frente.webp",
        alt: "Render del Proyecto 150 m² con una alternativa de terminación oscura",
        kind: "render",
        label: "Alternativa de terminación",
      },
      {
        src: "/images/houses/150-planta-baja.webp",
        alt: "Planta baja del Proyecto 150 m² con cocina, comedor, estar y escalera central",
        kind: "plan",
        label: "Planta baja",
      },
      {
        src: "/images/houses/150-planta-alta.webp",
        alt: "Planta alta del Proyecto 150 m² con tres dormitorios y balcones",
        kind: "plan",
        label: "Planta alta",
      },
    ],
  },
];
