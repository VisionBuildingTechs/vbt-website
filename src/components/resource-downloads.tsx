import { downloads, fireTestSummary } from "@/lib/downloads";
import "./resource-downloads.css";

function sizeLabel(bytes: number) {
  return bytes >= 1_000_000
    ? `${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`
    : `${Math.round(bytes / 1000)} KB`;
}

export default function ResourceDownloads() {
  return (
    <>
      <section
        className="container inner-section resource-downloads"
        id="descargas"
        aria-labelledby="downloads-title"
      >
        <div className="inner-section-top">
          <p className="inner-kicker">Biblioteca descargable</p>
          <h2 id="downloads-title">
            Documentos para
            <br />
            <span className="text-accent">trabajar.</span>
          </h2>
          <p>
            Guías, componentes y evidencia técnica. Consultá el documento
            completo y su alcance para el proyecto que estás evaluando.
          </p>
        </div>
        <div className="download-grid">
          {downloads.map((document, index) => (
            <article
              key={document.slug}
              className={`download-card ${document.kind === "guide" ? "download-featured" : ""}`}
            >
              <div className="download-card-top">
                <span>
                  0{index + 1} / {document.format}
                </span>
                <span>{document.pages} páginas</span>
              </div>
              <div className="download-card-copy">
                <h3>{document.title}</h3>
                <p>{document.summary}</p>
              </div>
              <div className="download-card-bottom">
                <p>
                  {document.language} · {sizeLabel(document.sizeBytes)}
                </p>
                <div className="download-actions">
                  <a
                    href={document.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Leer ${document.title}`}
                  >
                    Leer PDF ↗
                  </a>
                  <a
                    href={document.href}
                    download={document.filename}
                    aria-label={`Descargar ${document.title}`}
                  >
                    Descargar ↓
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        className="resource-fire"
        id="ensayo-fuego"
        aria-labelledby="fire-title"
      >
        <div className="container inner-section inner-two-column">
          <div>
            <p className="inner-kicker">Evidencia / Combustión superficial</p>
            <h2 id="fire-title">
              Qué midió
              <br />
              <span className="text-accent">el ensayo.</span>
            </h2>
            <p className="resource-fire-source">
              {fireTestSummary.laboratory}
              <br />
              Informe {fireTestSummary.reportNumber}
              <br />
              17 de diciembre de 2024
            </p>
            <a
              className="inner-action"
              href={fireTestSummary.documentHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver informe completo ↗
            </a>
          </div>
          <div>
            <p className="resource-fire-method">
              {fireTestSummary.method}. {fireTestSummary.referenceMethod}.
            </p>
            <dl className="resource-fire-results">
              {fireTestSummary.results.map((result) => (
                <div key={result.label}>
                  <dt>{result.label}</dt>
                  <dd>{result.value}</dd>
                </div>
              ))}
            </dl>
            <p className="resource-fire-classification">
              {fireTestSummary.classification}
            </p>
            <p className="resource-fire-scope">
              {fireTestSummary.scope} {fireTestSummary.limitation}
            </p>
            <details className="resource-fire-details">
              <summary>Muestra y condiciones de referencia</summary>
              <p>
                Muestra identificada como {fireTestSummary.specimen}.{" "}
                {fireTestSummary.specimenDescription}
              </p>
              <p>
                Los resultados deben leerse con el montaje, el método y las
                limitaciones del informe completo. No sustituyen la evaluación
                de la configuración de tu obra.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
