import Image from "next/image";
import {
  projectMedia,
  projectGalleries,
  type ProjectVisual,
} from "@/lib/project-media";
import "./project-media.css";

function Visual({
  media,
  compact = false,
}: {
  media: ProjectVisual;
  compact?: boolean;
}) {
  return (
    <figure
      className={`project-media ${compact ? "project-media-compact" : ""}`}
    >
      <div className="project-media-frame">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={
            compact
              ? "(max-width:760px) 100vw, 48vw"
              : "(max-width:760px) 100vw, 90vw"
          }
        />
        {media.kind === "illustration" && (
          <span className="project-media-label">
            VISUALIZACIÓN ARQUITECTÓNICA
          </span>
        )}
      </div>
      <figcaption>
        {media.caption}
        {!compact && media.sourceUrl && (
          <>
            {" "}
            <a href={media.sourceUrl} target="_blank" rel="noreferrer">
              Fuente: VBT ↗
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}

export default function ProjectMedia({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const main = projectMedia[slug];
  if (!main) return null;
  const gallery = projectGalleries[slug] || [];
  return (
    <div
      className={`project-media-block ${compact ? "project-media-block-compact" : ""}`}
    >
      <Visual media={main} compact={compact} />
      {!compact && gallery.length > 0 && (
        <details className="project-media-more">
          <summary>
            Ver más imágenes del proyecto <span aria-hidden="true">+</span>
          </summary>
          <div className="project-media-gallery">
            {gallery.map((media) => (
              <Visual key={media.src} media={media} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

export function TechnologyPanels() {
  return (
    <div
      className="technology-panels"
      aria-label="Axonométricas de paneles VBT80 y VBT150"
    >
      <article>
        <figure className="technology-panel-figure">
          <Image
            src="/images/technology/vbt80-panel.png"
            alt="Axonométrica original del panel VBT80, con sus celdas interiores y uniones laterales"
            fill
            sizes="(max-width:760px) 90vw, 42vw"
          />
        </figure>
        <div className="technology-panel-info">
          <span>VBT80</span>
          <h3>Deslizamiento vertical.</h3>
          <p>
            Panel de la familia VBT80. Sus perfiles y conectores se ensamblan
            desde arriba.
          </p>
          <small>Axonométrica original de componente · sin escala.</small>
        </div>
      </article>
      <article>
        <figure className="technology-panel-figure">
          <Image
            src="/images/technology/vbt150-panel.png"
            alt="Axonométrica original del panel VBT150 9-Form, con celdas y tabiques interiores perforados"
            fill
            sizes="(max-width:760px) 90vw, 42vw"
          />
        </figure>
        <div className="technology-panel-info">
          <span>VBT150</span>
          <h3>Encastre horizontal.</h3>
          <p>
            Panel de la familia VBT150. Unión horizontal macho-hembra por
            encastre.
          </p>
          <small>Axonométrica original de componente · sin escala.</small>
        </div>
      </article>
    </div>
  );
}
