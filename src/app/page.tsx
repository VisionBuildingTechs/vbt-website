import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/icons";
import WallStory from "@/components/wall-story";

const uses = [
  [
    "01",
    "Educación",
    "Espacios para aprender, pensados para durar.",
    "educacion",
  ],
  ["02", "Salud", "Infraestructura al servicio del cuidado.", "salud"],
  [
    "03",
    "Institucional",
    "Arquitectura para responder a nuevas necesidades.",
    "institucional",
  ],
  [
    "04",
    "Industria y comercio",
    "Una tecnología para proyectos de distintas escalas.",
    "industrial",
  ],
  [
    "05",
    "Residencial",
    "Viviendas que se construyen con nuestra red.",
    "residencial",
  ],
];
const cases = [
  [
    "EDUCACIÓN / MENDOZA",
    "Escuela Francisco Javier Domínguez",
    "Junín, Argentina",
    "escuela-dominguez",
  ],
  [
    "EDUCACIÓN / MENDOZA",
    "Instituto del Club Deportivo Godoy Cruz",
    "Maipú, Argentina",
    "escuela-godoy-cruz",
  ],
  [
    "INSTITUCIONAL / MENDOZA",
    "Laboratorio de Huellas Balísticas",
    "Mendoza, Argentina",
    "laboratorio-balistico-mendoza",
  ],
  ["RESIDENCIAL / PANAMÁ", "Techos de Esperanza", "Panamá", "viviendas-panama"],
];
export default function Home() {
  return (
    <>
      <section className="home-hero container">
        <div className="hero-kicker">
          <span className="eyebrow">VISION BUILDING TECHNOLOGIES</span>
          <span className="hero-index">TECNOLOGÍA VBT / 01</span>
        </div>
        <div className="hero-heading">
          <h1>
            Una forma distinta
            <br />
            de <span>construir.</span>
          </h1>
          <div className="hero-intro">
            <p>
              PVC que da forma.
              <br />
              Hormigón que construye.
              <br />
              Posibilidades que se multiplican.
            </p>
            <Link href="/tecnologia" className="text-link">
              Conocé la tecnología <Arrow diagonal />
            </Link>
          </div>
        </div>
        <figure className="hero-image">
          <Image
            src="/images/hero-institucional.webp"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 94vw"
            alt="Ilustración arquitectónica de un edificio educativo contemporáneo de una planta"
          />
          <div className="hero-image-tag">
            <span>
              UNA TECNOLOGÍA.
              <br />
              MÚLTIPLES APLICACIONES.
            </span>
            <Link href="/aplicaciones" aria-label="Explorar aplicaciones">
              <Arrow diagonal />
            </Link>
          </div>
        </figure>
        <div className="hero-foot">
          <span>DE LA PIEZA AL EDIFICIO</span>
          <span>
            Explorá cómo funciona <span aria-hidden="true">↓</span>
          </span>
        </div>
      </section>
      <section className="intro-section container">
        <span className="eyebrow">01 / LA TECNOLOGÍA</span>
        <div>
          <h2>
            El muro se construye.
            <br />
            El encofrado <span className="muted-word">permanece.</span>
          </h2>
          <div className="intro-columns">
            <p>
              VBT es una tecnología de encofrado permanente de PVC para ejecutar
              muros de hormigón armado en obra. Los perfiles se ensamblan,
              reciben los refuerzos y contienen el hormigón.
            </p>
            <p>
              El resultado conecta sistema y arquitectura: una base para
              proyectos educativos, sanitarios, institucionales, industriales y
              residenciales, definida por el diseño de cada obra.
            </p>
          </div>
          <Link href="/tecnologia" className="text-link">
            Entender la tecnología <Arrow diagonal />
          </Link>
        </div>
      </section>
      <WallStory />
      <section className="applications-section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / APLICACIONES</span>
            <h2>
              Cambia el proyecto.
              <br />
              La lógica se conecta.
            </h2>
          </div>
          <p>
            Una tecnología, distintas maneras de habitar, trabajar y
            encontrarnos.
          </p>
        </div>
        <div className="application-list">
          {uses.map(([n, title, description, slug]) => (
            <Link
              href={`/aplicaciones/${slug}`}
              className="application-row"
              key={n}
            >
              <span className="row-number">{n}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Arrow diagonal />
            </Link>
          ))}
        </div>
      </section>
      <section className="cases-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 / CASOS DE ÉXITO</span>
              <h2>
                La tecnología,
                <br />
                en contexto.
              </h2>
            </div>
            <Link href="/aplicaciones#casos" className="text-link">
              Explorar los casos <Arrow diagonal />
            </Link>
          </div>
          <div className="cases-editorial">
            <figure className="cases-image">
              <Image
                src="/images/projects/dominguez-1.webp"
                fill
                sizes="(max-width: 800px) 100vw, 48vw"
                alt="Vista aérea de la escuela Francisco Javier Domínguez de Junín"
              />
              <figcaption>
                Escuela Francisco Javier Domínguez · fotografía del portfolio
                VBT.
              </figcaption>
            </figure>
            <div className="case-links">
              {cases.map(([category, title, location, slug]) => (
                <Link
                  key={slug}
                  href={`/aplicaciones/casos/${slug}`}
                  className="case-link"
                >
                  <span className="eyebrow">{category}</span>
                  <h3>{title}</h3>
                  <div>
                    <span>{location}</span>
                    <Arrow diagonal />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="resource-band">
        <div className="container resource-inner">
          <div>
            <span className="eyebrow">04 / CONOCIMIENTO QUE ACOMPAÑA</span>
            <h2>
              Del proyecto a la obra,
              <br />
              con información clara.
            </h2>
            <p>
              Conceptos, sistemas, proceso y cuidados. Encontrá el recurso que
              necesitás según la etapa de tu proyecto.
            </p>
            <Link href="/recursos" className="button light">
              Explorar recursos <Arrow diagonal />
            </Link>
          </div>
          <div className="resource-index">
            {[
              ["01", "Entender la tecnología", "entender-el-sistema"],
              ["02", "Proyectar con VBT", "proyectar-con-vbt"],
              ["03", "Construir y controlar", "montaje-y-obra"],
              ["04", "Usar y mantener", "terminaciones-y-cuidados"],
            ].map(([n, title, slug]) => (
              <Link href={`/recursos/${slug}`} key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <Arrow diagonal />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="network-section container">
        <div className="network-top">
          <span className="eyebrow">05 / CONSTRUIMOS EN RED</span>
          <h2>
            Tu proyecto.
            <br />
            Un equipo conectado.
          </h2>
        </div>
        <div className="network-copy">
          <p>
            La tecnología la aporta VBT. Los proyectos toman forma con
            profesionales, constructoras y organizaciones que la incorporan a su
            trabajo.
          </p>
          <p>
            Si ya tenés un equipo, lo acompañamos. Si necesitás encontrarlo, te
            ayudamos a dar el próximo paso con un aliado.
          </p>
          <Link href="/red" className="text-link">
            Conocer la red VBT <Arrow diagonal />
          </Link>
        </div>
      </section>
      <section className="housing-section container">
        <figure>
          <Image
            src="/images/houses/90-render-exterior.webp"
            fill
            sizes="(max-width:800px) 100vw, 50vw"
            alt="Render del Proyecto 90 m², vivienda de una planta del catálogo VBT"
          />
          <figcaption>Proyecto 90 m² · Visualización arquitectónica</figcaption>
        </figure>
        <div className="housing-copy">
          <span className="eyebrow">VIVIENDAS CON VBT</span>
          <h2>
            Una tecnología.
            <br />
            Tu manera de vivir.
          </h2>
          <p>
            Compará proyectos por superficie y cantidad de plantas. Mirá sus
            planos y renders, y conocé cómo avanzar con tu equipo o un
            constructor aliado.
          </p>
          <Link href="/viviendas" className="text-link">
            Explorar viviendas <Arrow diagonal />
          </Link>
          <Link
            href="/viviendas/financiacion#calculadora"
            className="subtle-link"
          >
            Calcular financiación →
          </Link>
        </div>
      </section>
      <section className="faq-section container">
        <div>
          <span className="eyebrow">PARA EMPEZAR</span>
          <h2>
            Buenas preguntas.
            <br />
            Respuestas claras.
          </h2>
          <Link href="/preguntas-frecuentes" className="text-link">
            Todas las preguntas <Arrow diagonal />
          </Link>
        </div>
        <div className="faq-list">
          {[
            [
              "¿Qué es un encofrado permanente?",
              "Es un sistema que contiene el hormigón durante la ejecución y permanece en el muro. En VBT, los perfiles de PVC se ensamblan para dar forma al elemento de hormigón armado.",
            ],
            [
              "¿VBT vende el sistema o construye la obra?",
              "VBT aporta la tecnología, el suministro y el acompañamiento correspondiente. La ejecución se define con el profesional o empresa responsable. Las viviendas se canalizan a través de aliados.",
            ],
            [
              "¿Se usa solamente para viviendas?",
              "La tecnología tiene aplicaciones educativas, sanitarias, institucionales, industriales, comerciales y residenciales. Cada proyecto define su configuración y requisitos.",
            ],
            [
              "¿Puedo trabajar con mi constructor?",
              "Sí. Si ya tenés arquitecto, ingeniero o constructor, la consulta parte de ese equipo. Buscamos acompañar la incorporación de la tecnología y preservar esa relación.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
