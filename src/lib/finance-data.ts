export const BNA_URL = "https://www.bna.com.ar/Personas/CreditosHipotecarios";
export const BNA_SIMULATOR_URL =
  "https://www.bna.com.ar/Personas/SimuladorHipotecariosUva";
export const BCRA_URL = "https://www.bcra.gob.ar/estadisticas/";
const MONETARY_API = "https://api.bcra.gob.ar/estadisticas/v4.0/monetarias";

export const rateReferences = [
  {
    tna: 6.7,
    label: "BNA · segmento 6,7%",
    description:
      "Vivienda única permanente, haberes en BNA y valor de vivienda de hasta 210.000 UVA; sujeto a condiciones del banco.",
  },
  {
    tna: 12,
    label: "BNA · segmento 12%",
    description:
      "Otros segmentos publicados por BNA; confirmar destino, requisitos y costos con el banco.",
  },
] as const;

export type FinanceData = {
  date: string;
  consultedAt: string;
  referencesReviewedAt: string;
  referencesSource: string;
  references: typeof rateReferences;
  uva: { value: number; date: string; source: string } | null;
  uvaStatus: "available" | "unavailable";
};

export function argentinaDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

async function officialJson(url: string): Promise<unknown> {
  // URL construction below is fixed to the official host; no visitor-supplied URL is accepted.
  const response = await fetch(url, {
    signal: AbortSignal.timeout(7000),
    next: { revalidate: 3600 },
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("Fuente oficial no disponible");
  return response.json();
}

export async function getFinanceData(): Promise<FinanceData> {
  const date = argentinaDate();
  let uva: FinanceData["uva"] = null;
  try {
    const catalog = (await officialJson(`${MONETARY_API}?limit=1000`)) as {
      results?: {
        idVariable: number;
        descripcion: string;
        periodicidad: string;
      }[];
    };
    const variable = catalog.results?.find(
      (item) =>
        Number.isInteger(item.idVariable) &&
        item.periodicidad === "D" &&
        /unidad de valor adquisitivo/i.test(item.descripcion),
    );
    if (variable) {
      const series = (await officialJson(
        `${MONETARY_API}/${variable.idVariable}?desde=${date}&hasta=${date}&limit=10`,
      )) as { results?: { detalle?: { fecha: string; valor: number }[] }[] };
      const entry = series.results
        ?.flatMap((item) => item.detalle ?? [])
        .find(
          (item) =>
            item.fecha === date &&
            Number.isFinite(item.valor) &&
            item.valor > 0,
        );
      if (entry)
        uva = {
          value: entry.valor,
          date: entry.fecha,
          source: `${MONETARY_API}/${variable.idVariable}?desde=${date}&hasta=${date}`,
        };
    }
  } catch {
    // The manual estimator remains usable. No fabricated or stale official value is substituted.
  }
  return {
    date,
    consultedAt: new Date().toISOString(),
    referencesReviewedAt: "2026-11-03",
    referencesSource: BNA_URL,
    references: rateReferences,
    uva,
    uvaStatus: uva ? "available" : "unavailable",
  };
}
