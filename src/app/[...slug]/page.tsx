import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import WallStory from "@/components/wall-story";
import ContactForm from "@/components/contact-form";
import ResourceDownloads from "@/components/resource-downloads";
import ResourceReader from "@/components/resource-reader";
import NetworkDiagram from "@/components/network-diagram";
import NetworkPartners from "@/components/network-partners";
import TechnologyColors from "@/components/technology-colors";
import { HousingPage, HousingDetailPage } from "@/components/housing-pages";
import { houseCatalog } from "@/lib/house-catalog";
import ProjectMedia, { TechnologyPanels } from "@/components/project-media";
import { contactRegions, contactEmails } from "@/lib/contact";
import { applications, projects, faqs } from "@/lib/content";
import "./interior.css";
import "@/components/text-accent.css";

const mainTitles: Record<string, string> = {
  tecnologia: "La tecnología",
  aplicaciones: "Aplicaciones",
  recursos: "Recursos",
  red: "Red VBT",
  empresa: "Empresa",
  viviendas: "Viviendas con VBT",
  contacto: "Conversemos",
  "preguntas-frecuentes": "Preguntas frecuentes",
  privacidad: "Privacidad",
  terminos: "Términos de uso",
};
const paths = [
  ...Object.keys(mainTitles),
  ...applications.map((x) => `aplicaciones/${x.slug}`),
  ...projects.map((x) => `aplicaciones/casos/${x.slug}`),
  ...houseCatalog.map((x) => `viviendas/${x.slug}`),
];
export const dynamicParams = false;
export function generateStaticParams() {
  return paths.map((path) => ({ slug: path.split("/") }));
}
function titleFor(path: string) {
  if (mainTitles[path]) return mainTitles[path];
  if (path.startsWith("aplicaciones/casos/"))
    return projects.find((item) => item.slug === path.split("/")[2])?.title;
  const [section, slug] = path.split("/");
  if (section === "aplicaciones")
    return applications.find((item) => item.slug === slug)?.title;
  if (section === "viviendas")
    return houseCatalog.find((item) => item.slug === slug)?.title;
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
  accent,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  children?: ReactNode;
  accent?: string;
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
            {accent
              ? line.split(accent).map((part, index) => (
                  <Fragment key={index}>
                    {index > 0 && <span className="text-accent">{accent}</span>}
                    {part}
                  </Fragment>
                ))
              : line}
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
      <figcaption>Visualización arquitectónica de referencia.</figcaption>
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
            href={`/aplicaciones/casos/${p.slug}`}
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
        accent="construir."
        text="Perfiles de PVC, acero y hormigón. Materiales con funciones diferentes, coordinados en un mismo sistema de encofrado permanente."
      >
        <div className="inner-inline-links">
          <ArrowLink href="#proceso">Ver cómo se construye</ArrowLink>
          <ArrowLink href="#paneles">Ver paneles VBT80 y VBT150</ArrowLink>
          <a href="#colores" className="inner-action">
            Ver colores <span aria-hidden="true">↗</span>
          </a>
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
          <ArrowLink href="/recursos#lectura-entender-el-sistema">
            Leer la explicación de la tecnología
          </ArrowLink>
        </div>
      </section>
      <div id="proceso" className="inner-process">
        <WallStory />
      </div>
      <section className="container inner-section" id="paneles">
        <div className="inner-section-top">
          <p className="inner-kicker">Dos familias</p>
          <h2>
            Un principio común.
            <br />
            Montajes diferentes.
          </h2>
        </div>
        <TechnologyPanels />
        <p className="inner-note">
          VBT150 es la denominación comercial de seis pulgadas (157 mm
          exteriores, 152 mm interiores). La elección de familia, armado y
          configuración requiere evaluación del proyecto. Sus piezas y
          procedimientos no son intercambiables.
        </p>
      </section>
      <TechnologyColors />
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
              <ArrowLink href="/recursos#lectura-proyectar-con-vbt">
                Proyecto y especificación
              </ArrowLink>
              <ArrowLink href="/recursos#lectura-montaje-y-obra">
                Montaje y control
              </ArrowLink>
              <ArrowLink href="/recursos#lectura-terminaciones-y-cuidados">
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
        accent="tecnología."
        text="De una escuela a una nave industrial. Cada programa plantea necesidades diferentes; el proyecto define la solución."
      />
      <div className="container inner-inline-links">
        <ArrowLink href="#casos">Ver casos de éxito</ArrowLink>
      </div>
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
      <Projects />
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
          <ArrowLink href="/recursos#lectura-proyectar-con-vbt">
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
      <section
        className="container inner-section inner-filterable"
        id="casos"
        aria-label="Catálogo de proyectos"
      >
        <div className="inner-section-top">
          <p className="inner-kicker">Casos de éxito</p>
          <h2>
            La tecnología,
            <br />
            <span className="text-accent">puesta en obra.</span>
          </h2>
          <p>
            Antecedentes educativos, institucionales, sanitarios, industriales y
            residenciales. Conocé los proyectos y los equipos que los hicieron
            posibles.
          </p>
        </div>
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
              <Link href={`/aplicaciones/casos/${p.slug}`}>
                <ProjectMedia slug={p.slug} compact />
                <div className="inner-project-head">
                  <span className="inner-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inner-kicker">{p.category}</span>
                </div>
                <h3>{p.title}</h3>
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
    </>
  );
}
function ProjectDetail({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();
  return (
    <>
      <Hero
        eyebrow={`Aplicaciones / Casos de éxito / ${p.category}`}
        title={p.title}
        text={p.location}
      />
      <div className="container case-detail-media">
        <ProjectMedia slug={p.slug} />
      </div>
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
        <ArrowLink href="/aplicaciones#casos">Explorar otros casos</ArrowLink>
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
        accent="próximo paso."
        text="Descargá documentación, consultá evidencia técnica y encontrá lecturas para cada etapa del proyecto."
      >
        <div className="inner-inline-links">
          <ArrowLink href="#descargas">Descargar documentos</ArrowLink>
          <ArrowLink href="#ensayo-fuego">
            Resultados del ensayo de fuego
          </ArrowLink>
          <ArrowLink href="#lecturas">Guía en cuatro etapas</ArrowLink>
        </div>
      </Hero>
      <ResourceDownloads />
      <section className="container inner-section" id="lecturas">
        <div className="inner-section-top">
          <p className="inner-kicker">Guía de proyecto</p>
          <h2>
            Cuatro etapas.
            <br />
            <span className="text-accent">Un recorrido.</span>
          </h2>
        </div>
        <ResourceReader />
      </section>
      <section className="inner-tinted">
        <div className="container inner-section inner-two-column">
          <div>
            <p className="inner-kicker">Más documentación</p>
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
function Network() {
  return (
    <>
      <Hero
        eyebrow="Red VBT"
        title="Cada proyecto<br/>necesita un equipo."
        accent="un equipo."
        text="Red VBT es la forma en que conectamos tu proyecto con la tecnología y los equipos que la llevan a obra. Podés trabajar con tu arquitecto y constructor, o consultarnos para encontrar un aliado."
      />
      <NetworkPartners />
      <NetworkDiagram />
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

function Contact() {
  return (
    <>
      <Hero
        eyebrow="Contacto"
        title="Hablemos de<br/>tu próximo proyecto."
        accent="proyecto."
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
            <p className="inner-kicker">Canales directos</p>
            {Object.values(contactRegions).map((r) => (
              <div className="contact-channel" key={r.label}>
                <strong>{r.label}</strong>
                <a
                  href={`https://wa.me/${r.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp · {r.phone} ↗
                </a>
                <a href={`tel:${r.telephone}`}>Llamar · {r.phone}</a>
              </div>
            ))}
            <div className="contact-channel">
              <strong>Email</strong>
              <a href={`mailto:${contactEmails.general}`}>
                {contactEmails.general}
              </a>
              <a href={`mailto:${contactEmails.projects}`}>
                {contactEmails.projects}
              </a>
            </div>
            <p className="inner-kicker">Antes de consultar</p>
            <Link href="/recursos">Recursos para evaluar la tecnología ↗</Link>
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
          el texto, copiarlo o elegir continuar en WhatsApp o tu aplicación de
          correo.
        </p>
        <p>
          Al continuar en WhatsApp o email, el texto preparado se abre en ese
          servicio. El mensaje llega al canal VBT cuando confirmás su envío
          allí. Cada servicio tiene sus propias condiciones y política de
          privacidad.
        </p>
        <h2>Datos de la calculadora</h2>
        <p>
          Los importes, ingresos y escenarios que ingresás se calculan en tu
          navegador. No se envían a VBT ni al banco. El sitio sólo consulta
          referencias financieras públicas para mostrar la fuente y su fecha.
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
          El sitio reúne fotografías de obras y visualizaciones arquitectónicas.
          Las visualizaciones no representan fotografías documentales de las
          obras. Para preguntas sobre el tratamiento de una consulta enviada,
          utilizá el canal de contacto y pedí revisión, actualización o
          supresión de los datos que hayas compartido.
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
          Las visualizaciones arquitectónicas tienen carácter ilustrativo. Las
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
  if (slug.length === 3 && slug[0] === "aplicaciones" && slug[1] === "casos")
    return <ProjectDetail slug={slug[2]} />;
  if (slug.length === 2) {
    switch (slug[0]) {
      case "aplicaciones":
        return <ApplicationDetail slug={slug[1]} />;
      case "viviendas":
        return <HousingDetailPage slug={slug[1]} />;
    }
  }
  switch (path) {
    case "tecnologia":
      return <Technology />;
    case "aplicaciones":
      return <Applications />;
    case "recursos":
      return <Resources />;
    case "red":
      return <Network />;
    case "empresa":
      return <Company />;
    case "viviendas":
      return <HousingPage />;
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
