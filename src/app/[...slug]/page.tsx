import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import WallStory from "@/components/wall-story";
import ContactForm from "@/components/contact-form";
import {
  applications,
  projects,
  resources,
  houseModels,
  faqs,
} from "@/lib/content";
import "./interior.css";

const mainTitles: Record<string, string> = {
  tecnologia: "La tecnología",
  aplicaciones: "Aplicaciones",
  casos: "Casos de éxito",
  recursos: "Recursos",
  red: "Red VBT",
  empresa: "Empresa",
  viviendas: "Viviendas con VBT",
  financiacion: "Financiación",
  contacto: "Conversemos",
  "preguntas-frecuentes": "Preguntas frecuentes",
  privacidad: "Privacidad",
  terminos: "Términos de uso",
};
const paths = [
  ...Object.keys(mainTitles),
  ...applications.map((x) => `aplicaciones/${x.slug}`),
  ...projects.map((x) => `casos/${x.slug}`),
  ...resources.map((x) => `recursos/${x.slug}`),
  ...houseModels.map((x) => `viviendas/${x.slug}`),
];
export const dynamicParams = false;
export function generateStaticParams() {
  return paths.map((path) => ({ slug: path.split("/") }));
}
function titleFor(path: string) {
  const [section, slug] = path.split("/");
  return (
    mainTitles[path] ??
    (section === "aplicaciones"
      ? applications.find((x) => x.slug === slug)?.title
      : section === "casos"
        ? projects.find((x) => x.slug === slug)?.title
        : section === "recursos"
          ? resources.find((x) => x.slug === slug)?.title
          : section === "viviendas"
            ? houseModels.find((x) => x.slug === slug)?.title
            : undefined)
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const title = titleFor(path);
  return {
    title: title ?? "Página no encontrada",
    description:
      "Tecnología de encofrado permanente para proyectos educativos, sanitarios, institucionales, industriales y residenciales. Conocé el sistema y la red VBT.",
  };
}

function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inner-action ${light ? "inner-action-light" : ""}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
function Hero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <header className="inner-hero container">
      <div className="inner-breadcrumb">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span>{eyebrow}</span>
      </div>
      <p className="inner-kicker">{eyebrow}</p>
      <h1>
        {title.split("<br/>").map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </h1>
      {text && <p className="inner-lead">{text}</p>}
      {children}
    </header>
  );
}
function CTA({
  title = "Cada proyecto empieza con una conversación.",
  text = "Contanos qué querés construir y en qué etapa estás. Revisemos juntos cómo incorporar VBT.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="inner-cta">
      <div className="container inner-cta-content">
        <div>
          <p className="inner-kicker">Siguiente paso</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <ArrowLink href="/contacto" light>
          Consultar mi proyecto
        </ArrowLink>
      </div>
    </section>
  );
}
function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`inner-photo ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>
        Imagen ilustrativa generada con IA. Recurso conceptual reemplazable.
      </figcaption>
    </figure>
  );
}
function FAQ({ all = false }: { all?: boolean }) {
  return (
    <div className="inner-faq">
      {(all ? faqs : faqs.slice(0, 6)).map((f, i) => (
        <details key={f.question}>
          <summary>
            <span className="inner-faq-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            {f.question}
            <span className="inner-plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
function CaseLinks({ slugs }: { slugs: string[] }) {
  const items = projects.filter((p) => slugs.includes(p.slug));
  return items.length ? (
    <section className="container inner-section">
      <div className="inner-section-top">
        <p className="inner-kicker">En la práctica</p>
        <h2>Antecedentes relacionados.</h2>
      </div>
      <div className="inner-case-list">
        {items.map((p) => (
          <Link
            className="inner-case-row"
            href={`/casos/${p.slug}`}
            key={p.slug}
          >
            <span className="inner-kicker">{p.category}</span>
            <div>
              <h3>{p.title}</h3>
              <p>{p.location}</p>
            </div>
            <span className="inner-case-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
    </section>
  ) : null;
}

function Technology() {
  return (
    <>
      <Hero
        eyebrow="Tecnología"
        title="Entendé el muro. Imaginá lo que podés construir."
        text="Perfiles de PVC, acero y hormigón. Materiales con funciones diferentes, coordinados en un mismo sistema de encofrado permanente."
      >
        <div className="inner-inline-links">
          <ArrowLink href="#proceso">Ver cómo se construye</ArrowLink>
          <ArrowLink href="/recursos">Explorar recursos</ArrowLink>
        </div>
      </Hero>
      <section className="container inner-section inner-two-column">
        <div>
          <p className="inner-kicker">El concepto</p>
          <h2>El encofrado forma el muro. Y permanece.</h2>
        </div>
        <div className="inner-copy">
          <p>
            Los perfiles de PVC se ensamblan para dar forma a un muro que se
            completa con hormigón y armaduras. Después del llenado permanecen
            incorporados y pueden constituir la superficie final.
          </p>
          <p>
            El proyecto define la solución resistente, las instalaciones, las
            aberturas y los acabados. La tecnología aporta una forma de
            construir; cada obra determina cómo se aplica.
          </p>
          <ArrowLink href="/recursos/entender-el-sistema">
            Leer la explicación del sistema
          </ArrowLink>
        </div>
      </section>
      <div id="proceso" className="inner-process">
        <WallStory />
      </div>
      <section className="container inner-section">
        <div className="inner-section-top">
          <p className="inner-kicker">Dos familias</p>
          <h2>
            Un principio común.
            <br />
            Montajes diferentes.
          </h2>
        </div>
        <div className="inner-system-pair">
          <article>
            <span className="inner-system-name">80</span>
            <div>
              <p className="inner-kicker">VBT80</p>
              <h3>Deslizamiento vertical.</h3>
              <p>
                Paneles y conectores se ensamblan desde arriba, con componentes
                y detalles propios de esta familia.
              </p>
            </div>
          </article>
          <article>
            <span className="inner-system-name">150</span>
            <div>
              <p className="inner-kicker">VBT150</p>
              <h3>Encastre horizontal.</h3>
              <p>
                Uniones macho-hembra por encastre. La denominación comercial
                corresponde al sistema de seis pulgadas: 157 mm exteriores y 152
                mm interiores.
              </p>
            </div>
          </article>
        </div>
        <p className="inner-note">
          La elección de familia, armado y configuración requiere evaluación del
          proyecto. Sus piezas y procedimientos no son intercambiables.
        </p>
      </section>
      <section className="inner-tinted">
        <div className="container inner-section inner-two-column">
          <div>
            <p className="inner-kicker">Proyectar el conjunto</p>
            <h2>Los detalles también construyen.</h2>
          </div>
          <div className="inner-copy">
            <p>
              Instalaciones, encuentros, aberturas y terminaciones se coordinan
              antes de ejecutar. Esa conversación temprana permite definir el
              alcance del sistema y la documentación que necesita la obra.
            </p>
            <div className="inner-text-links">
              <ArrowLink href="/recursos/proyectar-con-vbt">
                Proyecto y especificación
              </ArrowLink>
              <ArrowLink href="/recursos/montaje-y-obra">
                Montaje y control
              </ArrowLink>
              <ArrowLink href="/recursos/terminaciones-y-cuidados">
                Terminaciones y cuidados
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>
      <section className="container inner-section">
        <div className="inner-section-top">
          <p className="inner-kicker">Preguntas frecuentes</p>
          <h2>Lo que conviene saber.</h2>
        </div>
        <FAQ />
        <ArrowLink href="/preguntas-frecuentes">Todas las preguntas</ArrowLink>
      </section>
      <CTA />
    </>
  );
}

function Applications() {
  return (
    <>
      <Hero
        eyebrow="Aplicaciones"
        title="Una tecnología.<br/>Muchas maneras de habitarla."
        text="De una escuela a una nave industrial. Cada programa plantea necesidades diferentes; el proyecto define la solución."
      />
      <section className="container inner-section inner-application-list">
        {applications.map((a) => (
          <Link
            href={`/aplicaciones/${a.slug}`}
            key={a.slug}
            className="inner-application-row"
          >
            <span className="inner-index">{a.number}</span>
            <h2>{a.title}</h2>
            <p>{a.summary}</p>
            <span aria-hidden="true" className="inner-big-arrow">
              ↗
            </span>
          </Link>
        ))}
      </section>
      <section className="inner-tinted">
        <div className="container inner-section inner-two-column">
          <div>
            <p className="inner-kicker">Un proyecto, un equipo</p>
            <h2>La aplicación se define en conjunto.</h2>
          </div>
          <div className="inner-copy">
            <p>
              Programa, ubicación, acciones, exposición e instalaciones son
              parte de la evaluación. VBT trabaja con los profesionales y las
              empresas responsables para estudiar cómo incorporar la tecnología.
            </p>
            <ArrowLink href="/red">Conocer la red VBT</ArrowLink>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
function ApplicationDetail({ slug }: { slug: string }) {
  const a = applications.find((x) => x.slug === slug);
  if (!a) return notFound();
  return (
    <>
      <Hero
        eyebrow={`Aplicaciones / ${a.title}`}
        title={`VBT para ${a.title.toLocaleLowerCase("es")}.`}
        text={a.summary}
      />
      <section className="container inner-section inner-two-column">
        <div>
          <p className="inner-kicker">{a.number} / Aplicaciones</p>
          <h2>
            Pensar en el uso.
            <br />
            Resolver el conjunto.
          </h2>
        </div>
        <div className="inner-copy">
          <p>{a.detail}</p>
          <ul className="inner-points">
            {a.priorities.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <ArrowLink href="/recursos/proyectar-con-vbt">
            Qué preparar para evaluar tu proyecto
          </ArrowLink>
        </div>
      </section>
      <CaseLinks slugs={a.projectSlugs} />
      {slug === "residencial" && (
        <section className="inner-tinted">
          <div className="container inner-section inner-two-column">
            <div>
              <p className="inner-kicker">Viviendas con VBT</p>
              <h2>
                La tecnología.
                <br />
                El equipo que la construye.
              </h2>
            </div>
            <div>
              <p className="inner-body">
                Explorá tipologías y contanos dónde querés construir. Te
                acompañamos a definir el siguiente paso con profesionales y
                empresas de la red.
              </p>
              <ArrowLink href="/viviendas">
                Explorar viviendas con VBT
              </ArrowLink>
            </div>
          </div>
        </section>
      )}
      <CTA />
    </>
  );
}

function Projects() {
  return (
    <>
      <Hero
        eyebrow="Casos de éxito"
        title="La tecnología,<br/>puesta en obra."
        text="Una selección de antecedentes educativos, institucionales, sanitarios, industriales y residenciales. Conocé las aplicaciones y los equipos detrás de cada proyecto."
      />
      <section
        className="container inner-section inner-filterable"
        aria-label="Catálogo de proyectos"
      >
        <fieldset className="inner-filters">
          <legend>Filtrar por aplicación</legend>
          {[
            { slug: "todos", title: "Todos" },
            ...applications.filter((x) => x.slug !== "comercial"),
          ].map((a, i) => (
            <span key={a.slug}>
              <input
                className="inner-filter-radio"
                type="radio"
                name="sector"
                id={`sector-${a.slug}`}
                defaultChecked={i === 0}
              />
              <label htmlFor={`sector-${a.slug}`}>{a.title}</label>
            </span>
          ))}
        </fieldset>
        <div className="inner-project-grid">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className="inner-project"
              data-sector={p.sector}
            >
              <Link href={`/casos/${p.slug}`}>
                <div className="inner-project-head">
                  <span className="inner-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inner-kicker">{p.category}</span>
                </div>
                <h2>{p.title}</h2>
                <p className="inner-project-location">{p.location}</p>
                <p>{p.summary}</p>
                <span className="inner-project-more">
                  Conocer el antecedente <span aria-hidden="true">↗</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CTA title="Tu próximo proyecto también puede construir experiencia." />
    </>
  );
}
function ProjectDetail({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();
  return (
    <>
      <Hero
        eyebrow={`Casos / ${p.category}`}
        title={p.title}
        text={p.location}
      />
      <section className="container inner-section inner-case-detail">
        <aside>
          <p className="inner-kicker">Ficha del antecedente</p>
          <dl>
            <div>
              <dt>Aplicación</dt>
              <dd>{p.category}</dd>
            </div>
            <div>
              <dt>Ubicación</dt>
              <dd>{p.location}</dd>
            </div>
            <div>
              <dt>Más información</dt>
              <dd>
                <Link href={`/aplicaciones/${p.sector}`}>
                  VBT en {p.category.toLocaleLowerCase("es")} ↗
                </Link>
              </dd>
            </div>
          </dl>
        </aside>
        <div className="inner-copy">
          <h2>Del proyecto a su aplicación.</h2>
          <p>{p.story}</p>
          <h3>Una obra es un trabajo compartido.</h3>
          <p>{p.collaboration}</p>
          <p className="inner-note">{p.note}</p>
          <a
            className="inner-source"
            href={p.source}
            target="_blank"
            rel="noreferrer"
          >
            Fuente: {p.sourceLabel} ↗
          </a>
        </div>
      </section>
      <section className="inner-tinted">
        <div className="container inner-section inner-two-column">
          <h2>¿Estás evaluando una obra similar?</h2>
          <div className="inner-copy">
            <p>
              Contanos el uso, la ubicación y el estado del proyecto. Podemos
              revisar antecedentes y documentación pertinentes para tu caso.
            </p>
            <ArrowLink href="/contacto">Hablar con VBT</ArrowLink>
          </div>
        </div>
      </section>
      <div className="container inner-back">
        <ArrowLink href="/casos">Explorar otros casos</ArrowLink>
      </div>
    </>
  );
}

function Resources() {
  return (
    <>
      <Hero
        eyebrow="Recursos"
        title="Información para<br/>dar el próximo paso."
        text="Una biblioteca organizada por lo que necesitás hacer: entender, proyectar, construir y mantener."
      />
      <section className="container inner-section">
        <div className="inner-resource-list">
          {resources.map((r, i) => (
            <Link
              key={r.slug}
              href={`/recursos/${r.slug}`}
              className="inner-resource-row"
            >
              <span className="inner-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="inner-kicker">{r.category}</p>
                <h2>{r.title}</h2>
                <p>{r.summary}</p>
              </div>
              <span className="inner-resource-type">
                Guía de lectura <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="inner-tinted">
        <div className="container inner-section inner-two-column">
          <div>
            <p className="inner-kicker">Documentación técnica</p>
            <h2>
              El documento correcto,
              <br />
              para tu proyecto.
            </h2>
          </div>
          <div className="inner-copy">
            <p>
              Solicitá fichas, manuales y evidencia aplicable indicando el
              sistema y el tipo de obra. Te ayudamos a identificar la
              documentación correspondiente a la configuración que estás
              evaluando.
            </p>
            <p>
              Los recursos públicos de esta página explican conceptos. La
              ejecución y la especificación requieren documentos vigentes y un
              proyecto definido.
            </p>
            <ArrowLink href="/contacto">Solicitar documentación</ArrowLink>
          </div>
        </div>
      </section>
      <section className="container inner-section">
        <div className="inner-section-top">
          <p className="inner-kicker">Consultas habituales</p>
          <h2>Respuestas sin vueltas.</h2>
        </div>
        <FAQ />
        <ArrowLink href="/preguntas-frecuentes">
          Ver todas las respuestas
        </ArrowLink>
      </section>
    </>
  );
}
function ResourceDetail({ slug }: { slug: string }) {
  const r = resources.find((x) => x.slug === slug);
  if (!r) return notFound();
  return (
    <>
      <Hero
        eyebrow={`Recursos / ${r.category}`}
        title={r.title}
        text={r.summary}
      />
      <article className="container inner-reading">
        <aside className="inner-reading-nav">
          <p className="inner-kicker">En esta guía</p>
          {r.sections.map((s, i) => (
            <a key={s.title} href={`#parte-${i + 1}`}>
              {String(i + 1).padStart(2, "0")} / {s.title}
            </a>
          ))}
        </aside>
        <div>
          {r.sections.map((s, i) => (
            <section
              id={`parte-${i + 1}`}
              key={s.title}
              className="inner-reading-section"
            >
              <p className="inner-kicker">{String(i + 1).padStart(2, "0")}</p>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              {s.points && (
                <ul className="inner-points">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className="inner-reading-note">
            <p>
              Guía de lectura general. Para especificar o ejecutar una obra,
              solicitá la documentación vigente de la familia y configuración
              correspondiente.
            </p>
            <ArrowLink href="/contacto">Pedir documentación técnica</ArrowLink>
          </div>
        </div>
      </article>
      <div className="container inner-back">
        <ArrowLink href="/recursos">Volver a recursos</ArrowLink>
      </div>
    </>
  );
}

function Network() {
  return (
    <>
      <Hero
        eyebrow="Red VBT"
        title="La tecnología conecta.<br/>Los equipos construyen."
        text="Trabajamos con profesionales, constructoras y empresas que incorporan VBT a sus proyectos. Queremos fortalecer ese trabajo compartido."
      />
      <section className="container inner-section inner-two-column">
        <div>
          <p className="inner-kicker">Cada rol, claro</p>
          <h2>
            Un sistema.
            <br />
            Distintas responsabilidades.
          </h2>
        </div>
        <div className="inner-role-list">
          <article>
            <span>01</span>
            <div>
              <h3>VBT</h3>
              <p>
                Tecnología, suministro del sistema y acompañamiento dentro del
                alcance acordado.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Profesionales</h3>
              <p>
                Proyecto, especificación y verificación técnica de la solución
                para cada obra.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Empresas constructoras</h3>
              <p>
                Propuesta de ejecución, contrato de obra y responsabilidades de
                su servicio.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="inner-network-band">
        <div className="container inner-section inner-two-column">
          <div>
            <p className="inner-kicker">¿Ya tenés equipo?</p>
            <h2>
              Sigamos construyendo
              <br />
              esa relación.
            </h2>
          </div>
          <div className="inner-copy">
            <p>
              Si ya trabajás con un arquitecto o constructor, contanos quién
              acompaña tu proyecto. Podemos ayudar a evaluar el sistema junto a
              ese equipo.
            </p>
            <p>
              Si necesitás encontrar una empresa, orientamos la consulta por
              ubicación, tipo de obra y disponibilidad. Compartimos tus datos
              con el aliado correspondiente con tu autorización.
            </p>
            <ArrowLink href="/contacto">Contarnos tu proyecto</ArrowLink>
          </div>
        </div>
      </section>
      <section className="container inner-section inner-two-column">
        <h2>
          ¿Querés incorporar VBT
          <br />a tu trabajo?
        </h2>
        <div className="inner-copy">
          <p>
            Hablemos sobre tu actividad, territorio y experiencia. Podemos
            revisar la tecnología, la documentación y las necesidades de
            capacitación o acompañamiento.
          </p>
          <ArrowLink href="/contacto">Conversar sobre la red</ArrowLink>
        </div>
      </section>
    </>
  );
}
function Company() {
  return (
    <>
      <Hero
        eyebrow="Empresa"
        title="Construir conocimiento.<br/>Conectarlo con la obra."
        text="Vision Building Technologies acerca una tecnología de encofrado permanente a profesionales y empresas que desarrollan proyectos en la región."
      />
      <Photo
        src="/images/hero-institucional.webp"
        alt="Representación conceptual de arquitectura institucional contemporánea"
        className="container inner-wide-photo"
      />
      <section className="container inner-section inner-two-column">
        <div>
          <p className="inner-kicker">Nuestro lugar en el proyecto</p>
          <h2>
            Tecnología y<br />
            acompañamiento.
          </h2>
        </div>
        <div className="inner-copy">
          <p>
            El valor de un sistema se comprende cuando se ve cómo se incorpora
            al proyecto. Por eso conectamos explicación técnica, recursos,
            antecedentes y conversación con los equipos responsables.
          </p>
          <p>
            VBT participa desde la tecnología y su alcance de provisión.
            Arquitectos, ingenieros, constructoras y comitentes conservan sus
            funciones en el desarrollo y la ejecución de cada obra.
          </p>
          <ArrowLink href="/red">Conocer cómo trabajamos en red</ArrowLink>
        </div>
      </section>
      <section className="inner-tinted">
        <div className="container inner-section">
          <p className="inner-kicker">Una base común, distintos programas</p>
          <div className="inner-company-sectors">
            {applications.map((a) => (
              <Link key={a.slug} href={`/aplicaciones/${a.slug}`}>
                {a.title}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function Housing() {
  return (
    <>
      <Hero
        eyebrow="Viviendas con VBT"
        title="Tu vivienda.<br/>Un equipo para hacerla posible."
        text="Explorá ideas y conectá con empresas que construyen con VBT. La tecnología, el proyecto y la ejecución tienen responsables definidos."
      />
      <Photo
        src="/images/vivienda.webp"
        alt="Ilustración conceptual de una vivienda contemporánea de una planta"
        className="container inner-wide-photo"
      />
      <section className="container inner-section">
        <div className="inner-section-top">
          <p className="inner-kicker">Puntos de partida</p>
          <h2>
            Distintas maneras
            <br />
            de pensar una casa.
          </h2>
          <p>
            Estas tipologías son conceptuales. No representan unidades
            disponibles ni una oferta cerrada de construcción.
          </p>
        </div>
        <div className="inner-housing-list">
          {houseModels.map((m, i) => (
            <Link key={m.slug} href={`/viviendas/${m.slug}`}>
              <span className="inner-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="inner-kicker">{m.label}</p>
                <h3>{m.title}</h3>
                <p>{m.summary}</p>
              </div>
              <span className="inner-case-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="inner-tinted">
        <div className="container inner-section inner-two-column">
          <h2>
            Antes de comparar,
            <br />
            definí el alcance.
          </h2>
          <div className="inner-copy">
            <p>
              Una vivienda completa es más que sus muros. Terreno, fundaciones,
              proyecto, permisos, transporte, instalaciones, conexiones y
              terminaciones deben quedar incluidos o excluidos expresamente en
              la propuesta del constructor.
            </p>
            <p>
              VBT te ayuda a orientar la consulta. El aliado que presenta la
              oferta define precio, plazos, contrato y responsabilidades de
              ejecución.
            </p>
            <ArrowLink href="/red">Cómo funciona la red</ArrowLink>
            <ArrowLink href="/financiacion">
              Conocer opciones de financiación
            </ArrowLink>
          </div>
        </div>
      </section>
      <CTA
        title="Empecemos por dónde y cómo querés vivir."
        text="Contanos si tenés terreno y si ya trabajás con un profesional o constructor. Respetamos esa relación y definimos el próximo paso."
      />
    </>
  );
}
function FloorPlan({ rooms }: { rooms: number }) {
  return (
    <svg
      className="inner-floorplan"
      viewBox="0 0 500 340"
      role="img"
      aria-label={`Organización conceptual de vivienda con ${rooms} dormitorio${rooms > 1 ? "s" : ""}, sin escala`}
    >
      <rect
        x="22"
        y="22"
        width="456"
        height="272"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M290 24 V292 M292 170 H476 M290 100 H476"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <rect
        x="25"
        y="208"
        width="124"
        height="82"
        fill="currentColor"
        opacity=".07"
      />
      <text x="80" y="133">
        ESTAR / COMEDOR
      </text>
      <text x="61" y="250">
        COCINA
      </text>
      <text x="330" y="67">
        DORMITORIO
      </text>
      <text x="352" y="141">
        BAÑO
      </text>
      <text x="322" y="242">
        {rooms === 1 ? "EXPANSIÓN" : "DORMITORIOS"}
      </text>
      <path
        d="M60 294 H150 M330 22 H420 M478 213 V263"
        fill="none"
        stroke="var(--paper, #f7f5f0)"
        strokeWidth="7"
      />
      <text x="24" y="328" className="inner-floorplan-caption">
        ESQUEMA CONCEPTUAL · SIN ESCALA · NO ES UN PLANO DE OBRA
      </text>
    </svg>
  );
}
function HousingDetail({ slug }: { slug: string }) {
  const m = houseModels.find((x) => x.slug === slug);
  if (!m) return notFound();
  return (
    <>
      <Hero eyebrow="Viviendas / Tipologías" title={m.title} text={m.summary} />
      <section className="container inner-section inner-two-column">
        <div className="inner-plan">
          <p className="inner-kicker">Organización de referencia</p>
          <FloorPlan rooms={houseModels.indexOf(m) + 1} />
          <p className="inner-note">
            Distribución y superficies a definir con el equipo de proyecto.
          </p>
        </div>
        <div className="inner-copy">
          <p className="inner-kicker">{m.label}</p>
          <h2>
            Una idea para
            <br />
            empezar a conversar.
          </h2>
          <p>{m.description}</p>
          <ul className="inner-points">
            {m.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <ArrowLink href="/contacto">Consultar esta tipología</ArrowLink>
          <p className="inner-note">
            Concepto residencial, sin precio ni disponibilidad confirmada. El
            proveedor y el alcance se identifican en la propuesta comercial.
          </p>
        </div>
      </section>
      <section className="inner-tinted">
        <div className="container inner-section inner-two-column">
          <h2>
            Lo que debe incluir
            <br />
            una propuesta clara.
          </h2>
          <div className="inner-copy">
            <ul className="inner-points">
              <li>
                Responsable de la oferta, cobertura y alcance contractual.
              </li>
              <li>Proyecto, terreno, fundaciones, permisos y conexiones.</li>
              <li>Instalaciones, aberturas, equipamiento y terminaciones.</li>
              <li>
                Transporte, impuestos, precio, plazos y condiciones de validez.
              </li>
              <li>Responsables de garantías y atención posterior.</li>
            </ul>
            <ArrowLink href="/financiacion">Explorar financiación</ArrowLink>
          </div>
        </div>
      </section>
      <div className="container inner-back">
        <ArrowLink href="/viviendas">Volver a viviendas con VBT</ArrowLink>
      </div>
    </>
  );
}

function Financing() {
  return (
    <>
      <Hero
        eyebrow="Financiación"
        title="Entender el crédito<br/>también es avanzar."
        text="Información para orientar tu consulta y continuar por los canales oficiales. El banco evalúa y otorga el préstamo; VBT no financia ni aprueba solicitudes."
      />
      <section className="container inner-section inner-two-column">
        <div>
          <p className="inner-kicker">Banco de la Nación Argentina</p>
          <h2>
            Consultá condiciones
            <br />y simulá en el banco.
          </h2>
        </div>
        <div className="inner-copy">
          <p>
            Compra de vivienda terminada y construcción en terreno propio son
            destinos distintos. Plazos, requisitos, costos y desembolsos
            dependen de la línea y del perfil del solicitante.
          </p>
          <p>
            Para conocer condiciones actualizadas y obtener una simulación
            orientativa, utilizá el canal oficial de Banco Nación. Confirmá
            también la documentación del proyecto y del proveedor que presenta
            la oferta.
          </p>
          <a
            href="https://www.bna.com.ar/Personas/SimuladorHipotecariosUva"
            target="_blank"
            rel="noreferrer"
            className="inner-action"
          >
            Ir al simulador oficial BNA <span aria-hidden="true">↗</span>
          </a>
          <a
            className="inner-source"
            href="https://www.bna.com.ar/Personas/CreditosHipotecarios"
            target="_blank"
            rel="noreferrer"
          >
            Ver condiciones hipotecarias BNA ↗
          </a>
        </div>
      </section>
      <section className="inner-finance-explainer">
        <div className="container inner-section">
          <p className="inner-kicker">Tres conceptos diferentes</p>
          <h2>
            La tasa. La UVA.
            <br />
            La inflación.
          </h2>
          <div className="inner-finance-columns">
            <article>
              <span>01 / BNA</span>
              <h3>Condiciones del préstamo</h3>
              <p>
                La línea bancaria define interés, plazo, costos, requisitos y
                modalidad de desembolso. La tasa no surge de un índice general
                de inflación.
              </p>
            </article>
            <article>
              <span>02 / BCRA</span>
              <h3>Valor de la UVA</h3>
              <p>
                En un crédito UVA, el capital y las cuotas expresados en pesos
                varían con esa unidad. Su valor oficial corresponde a una fecha.
              </p>
            </article>
            <article>
              <span>03 / INDEC</span>
              <h3>Contexto de precios</h3>
              <p>
                El IPC y el costo de construcción ayudan a leer la evolución de
                precios. No reemplazan una cotización ni predicen una cuota
                futura.
              </p>
            </article>
          </div>
          <p className="inner-note">
            No se muestran tasas o cuotas propias sin condiciones verificadas.
            La simulación bancaria es orientativa y está sujeta a evaluación y
            aprobación.
          </p>
        </div>
      </section>
      <section className="container inner-section inner-two-column">
        <h2>
          Prepará la consulta.
          <br />
          Separá cada necesidad.
        </h2>
        <div className="inner-copy">
          <ul className="inner-points">
            <li>¿Buscás comprar una vivienda o construir en un terreno?</li>
            <li>¿Qué aporte propio y documentación de proyecto necesitás?</li>
            <li>¿Quién presenta la oferta y quién ejecuta la construcción?</li>
            <li>¿Qué gastos y etapas cubre el préstamo?</li>
          </ul>
          <p>
            VBT puede orientar la parte del sistema y ayudarte a conectar con
            una empresa. La documentación financiera y la solicitud de crédito
            se presentan ante el banco.
          </p>
          <ArrowLink href="/contacto">Consultar por el proyecto</ArrowLink>
        </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <>
      <Hero
        eyebrow="Contacto"
        title="Hablemos de<br/>tu próximo proyecto."
        text="Una obra nueva, una consulta técnica o una idea para trabajar juntos. Contanos dónde estás y qué necesitás resolver."
      />
      <section className="container inner-section inner-contact-layout">
        <aside>
          <p className="inner-kicker">Empecemos por lo importante</p>
          <h2>
            Ubicación.
            <br />
            Uso.
            <br />
            Próximo paso.
          </h2>
          <p>
            No hace falta tener todo resuelto para conversar. Si ya trabajás con
            un arquitecto o constructor, indicalo para acompañar a tu equipo.
          </p>
          <div className="inner-contact-aside">
            <p className="inner-kicker">Antes de consultar</p>
            <Link href="/recursos">Recursos para evaluar el sistema ↗</Link>
            <Link href="/preguntas-frecuentes">Preguntas frecuentes ↗</Link>
            <Link href="/red">Cómo trabaja la red VBT ↗</Link>
          </div>
        </aside>
        <ContactForm />
      </section>
    </>
  );
}
function Privacy() {
  return (
    <>
      <Hero
        eyebrow="Privacidad"
        title="Tus datos,<br/>con una finalidad clara."
        text="Vos revisás la consulta y elegís cuándo compartirla con VBT."
      />
      <article className="container inner-legal">
        <h2>Cómo funciona el formulario</h2>
        <p>
          El formulario prepara un mensaje dentro de tu navegador. No almacena
          tus datos ni envía una consulta automáticamente a VBT. Podés revisar
          el texto, copiarlo o elegir continuar en WhatsApp.
        </p>
        <p>
          Al continuar en WhatsApp, el texto preparado se comparte con ese
          servicio para abrir la conversación. El mensaje llega al canal VBT
          cuando confirmás su envío allí. WhatsApp tiene sus propias condiciones
          y política de privacidad.
        </p>
        <h2>Consultas y derivaciones</h2>
        <p>
          Compartí sólo los datos necesarios para conversar sobre tu proyecto.
          No envíes claves, documentos de identidad, recibos de sueldo ni
          información bancaria por este sitio.
        </p>
        <p>
          Si tu consulta requiere participar a una empresa o profesional de la
          red, la derivación de tus datos se realiza con tu autorización. Podés
          indicar que ya tenés un equipo para conservar ese vínculo.
        </p>
        <h2>Recursos y servicios externos</h2>
        <p>
          Esta versión no incorpora analítica ni cookies opcionales. Las fuentes
          y las imágenes del sitio se sirven desde recursos locales. El
          alojamiento puede procesar datos técnicos necesarios para entregar y
          proteger las páginas.
        </p>
        <p>
          Los enlaces a bancos y otras fuentes abren sitios externos que tienen
          sus propias condiciones y políticas. VBT no recibe una solicitud
          bancaria por el hecho de que visites un enlace.
        </p>
        <h2>Sobre este sitio</h2>
        <p>
          Las ilustraciones generadas con IA están identificadas y no
          representan fotografías documentales de las obras. Para preguntas
          sobre el tratamiento de una consulta enviada, utilizá el canal de
          contacto y pedí revisión, actualización o supresión de los datos que
          hayas compartido.
        </p>
        <ArrowLink href="/contacto">Contactar a VBT</ArrowLink>
      </article>
    </>
  );
}
function Terms() {
  return (
    <>
      <Hero
        eyebrow="Términos de uso"
        title="Información para<br/>evaluar y conversar."
        text="El contenido del sitio presenta el sistema, sus aplicaciones y los canales de consulta."
      />
      <article className="container inner-legal">
        <h2>Alcance de la información</h2>
        <p>
          Las guías y esquemas son explicativos. No sustituyen el proyecto, el
          cálculo, los permisos ni la documentación de ejecución de una obra.
          Las prestaciones deben corresponder al producto y a la configuración
          aplicable.
        </p>
        <h2>Ofertas y participantes</h2>
        <p>
          Las tipologías de vivienda son conceptuales mientras no exista una
          oferta concreta con responsable, ubicación, alcance, precio y
          condiciones. La participación de VBT como proveedor tecnológico no
          equivale a contratar una construcción completa con VBT.
        </p>
        <h2>Financiación</h2>
        <p>
          El banco determina sus condiciones y evalúa cada solicitud. VBT no
          otorga préstamos ni garantiza elegibilidad. Los canales oficiales
          bancarios son la fuente para una consulta financiera actual.
        </p>
        <h2>Imágenes y referencias</h2>
        <p>
          Las imágenes ilustrativas generadas con IA están identificadas. Las
          referencias de proyectos no expresan por sí solas una garantía de
          resultados equivalentes para otra obra.
        </p>
        <ArrowLink href="/contacto">Solicitar información específica</ArrowLink>
      </article>
    </>
  );
}

export default async function InteriorPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  if (!paths.includes(path)) notFound();
  if (slug.length === 2) {
    switch (slug[0]) {
      case "aplicaciones":
        return <ApplicationDetail slug={slug[1]} />;
      case "casos":
        return <ProjectDetail slug={slug[1]} />;
      case "recursos":
        return <ResourceDetail slug={slug[1]} />;
      case "viviendas":
        return <HousingDetail slug={slug[1]} />;
    }
  }
  switch (path) {
    case "tecnologia":
      return <Technology />;
    case "aplicaciones":
      return <Applications />;
    case "casos":
      return <Projects />;
    case "recursos":
      return <Resources />;
    case "red":
      return <Network />;
    case "empresa":
      return <Company />;
    case "viviendas":
      return <Housing />;
    case "financiacion":
      return <Financing />;
    case "contacto":
      return <Contact />;
    case "preguntas-frecuentes":
      return (
        <>
          <Hero
            eyebrow="Preguntas frecuentes"
            title="Preguntar también<br/>es construir."
            text="Respuestas sobre la tecnología, el proyecto, la red y el recorrido residencial."
          />
          <section className="container inner-section">
            <FAQ all />
          </section>
          <CTA />
        </>
      );
    case "privacidad":
      return <Privacy />;
    case "terminos":
      return <Terms />;
    default:
      return notFound();
  }
}
