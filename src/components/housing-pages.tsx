import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { houseCatalog } from "@/lib/house-catalog";
import HousingCatalog from "./housing-catalog";
import "./housing.css";

export function HousingPage() {
  return (
    <>
      <header className="inner-hero container housing-hero">
        <div className="inner-breadcrumb">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span>Viviendas</span>
        </div>
        <p className="inner-kicker">VIVIENDAS CON VBT</p>
        <h1>
          Imaginá tu casa.
          <br />
          Encontrá un punto de partida.
        </h1>
        <p className="inner-lead">
          Explorá proyectos con planos y renders. Elegí superficie y cantidad de
          plantas; conversemos sobre cómo adaptarlos a tu terreno y llevarlos a
          obra con tu equipo o un constructor aliado.
        </p>
      </header>
      <HousingCatalog />
      <section className="housing-next">
        <div className="container inner-section inner-two-column">
          <div>
            <p className="inner-kicker">DEL PLANO A TU PROYECTO</p>
            <h2>
              Elegís una idea.
              <br />
              La desarrollamos con tu equipo.
            </h2>
          </div>
          <div className="inner-copy">
            <p>
              Estos proyectos publicados por VBT permiten comparar superficies y
              distribuciones. La orientación, el terreno, la normativa y las
              terminaciones se definen para cada obra.
            </p>
            <p>
              VBT aporta la tecnología y acompaña la consulta. La cotización y
              la ejecución corresponden al profesional o la empresa responsable.
              Si ya tenés constructor, trabajamos junto a él.
            </p>
            <Link className="inner-action" href="/contacto">
              Contanos qué querés construir ↗
            </Link>
            <Link className="inner-action" href="/financiacion#calculadora">
              Explorar financiación ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function HousingDetailPage({ slug }: { slug: string }) {
  const model = houseCatalog.find((item) => item.slug === slug);
  if (!model) notFound();
  const renders = model.images.filter((image) => image.kind === "render");
  const plans = model.images.filter((image) => image.kind === "plan");
  const consultation = `/contacto?modelo=${encodeURIComponent(model.slug)}`;
  return (
    <>
      <header className="inner-hero container housing-model-hero">
        <div className="inner-breadcrumb">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/viviendas">Viviendas</Link>
          <span aria-hidden="true">/</span>
          <span>{model.area} m²</span>
        </div>
        <p className="inner-kicker">VIVIENDAS CON VBT / PROYECTO</p>
        <h1>{model.title}</h1>
        <div className="housing-model-intro">
          <p className="inner-lead">{model.description}</p>
          <Link className="button primary" href={consultation}>
            Consultar este proyecto ↗
          </Link>
        </div>
        <dl className="housing-model-facts">
          <div>
            <dt>Superficie publicada</dt>
            <dd>{model.area} m²</dd>
          </div>
          {model.floors && (
            <div>
              <dt>Distribución</dt>
              <dd>
                {model.floors} {model.floors === 1 ? "planta" : "plantas"}
              </dd>
            </div>
          )}
          {model.bedrooms && (
            <div>
              <dt>Dormitorios</dt>
              <dd>{model.bedrooms}</dd>
            </div>
          )}
        </dl>
      </header>
      <div className="container housing-renders">
        {renders.map((image, index) => (
          <figure key={image.src}>
            <div className="housing-render-frame">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(max-width:760px) 100vw, 90vw"
              />
            </div>
            <figcaption>
              {image.label} · Visualización arquitectónica del proyecto.
            </figcaption>
          </figure>
        ))}
      </div>
      <section className="container inner-section housing-plans" id="planos">
        <div className="inner-section-top">
          <p className="inner-kicker">LA DISTRIBUCIÓN</p>
          <h2>
            Recorré la casa.
            <br />
            Desde el plano.
          </h2>
          <p>Ampliá cada imagen para ver los ambientes y sus relaciones.</p>
        </div>
        <div
          className={`housing-plan-grid ${plans.length === 1 ? "housing-plan-single" : ""}`}
        >
          {plans.map((image) => (
            <figure key={image.src}>
              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="housing-plan-frame"
                aria-label={`Ampliar ${image.label} de ${model.title}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width:760px) 100vw, 45vw"
                />
              </a>
              <figcaption>
                <h3>{image.label}</h3>
                <a href={image.src} target="_blank" rel="noopener noreferrer">
                  Ampliar plano ↗
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="inner-note">
          Planos de referencia del proyecto publicado. La superficie y el
          alcance final se verifican con el equipo de proyecto antes de cotizar
          o construir.
        </p>
      </section>
      <section className="housing-next">
        <div className="container inner-section inner-two-column">
          <div>
            <p className="inner-kicker">HAGÁMOSLO PROPIO</p>
            <h2>
              ¿Te imaginás
              <br />
              viviendo acá?
            </h2>
          </div>
          <div className="inner-copy">
            <p>
              Contanos dónde está tu terreno y qué te gustaría adaptar. Podemos
              acompañar a tu arquitecto o constructor, o ayudarte a conectar con
              un aliado.
            </p>
            <p>
              El proyecto es un punto de partida: la propuesta debe definir
              precio, plazos, fundaciones, instalaciones, terminaciones y
              responsable de la obra.
            </p>
            <Link className="button primary" href={consultation}>
              Consultar por {model.area} m² ↗
            </Link>
            <Link className="inner-action" href="/financiacion#calculadora">
              Calcular un escenario de financiación ↗
            </Link>
          </div>
        </div>
      </section>
      <div className="container inner-back">
        <Link className="inner-action" href="/viviendas">
          ← Explorar otros proyectos
        </Link>
      </div>
    </>
  );
}
