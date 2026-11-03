import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./icons";
import { contactRegions, contactEmails } from "@/lib/contact";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-call">
          <div>
            <span className="eyebrow">EL PRÓXIMO PROYECTO</span>
            <h2>
              Empieza con
              <br />
              una conversación.
            </h2>
          </div>
          <Link
            href="/contacto"
            className="round-link"
            aria-label="Consultar un proyecto"
          >
            <Arrow diagonal />
          </Link>
        </div>
        <div className="footer-grid">
          <div>
            <Image
              src="/brand/logo-vbt-transparent.png"
              width={105}
              height={94}
              alt="Vision Building Technologies"
              className="footer-logo"
            />
            <p>
              Encofrado permanente.
              <br />
              Nuevas posibilidades para construir.
            </p>
          </div>
          <div>
            <h3>Explorar</h3>
            <Link href="/tecnologia">La tecnología</Link>
            <Link href="/aplicaciones">Aplicaciones</Link>
            <Link href="/aplicaciones#casos">Casos de éxito</Link>
            <Link href="/viviendas">Viviendas con VBT</Link>
          </div>
          <div>
            <h3>Conectar</h3>
            <Link href="/recursos">Centro de recursos</Link>
            <Link href="/red">Red VBT</Link>
            <Link href="/viviendas#financiacion">
              Calculadora y financiación
            </Link>
            <Link href="/contacto">Contacto</Link>
          </div>
          <div>
            <h3>Construimos relaciones</h3>
            <p>
              Acompañamos a profesionales, constructoras y organizaciones a
              incorporar VBT en sus proyectos.
            </p>
            <Link href="/red" className="footer-network">
              Conocé nuestra red <Arrow />
            </Link>
            <div className="footer-contacts">
              {Object.values(contactRegions).map((r) => (
                <a
                  key={r.label}
                  href={`https://wa.me/${r.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.label} · {r.phone}
                </a>
              ))}
              <a href={`mailto:${contactEmails.general}`}>
                {contactEmails.general}
              </a>
              <a href={`mailto:${contactEmails.projects}`}>
                {contactEmails.projects}
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Vision Building Technologies</span>
          <div>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
            <a href="#contenido">Volver arriba ↑</a>
          </div>
        </div>
        <p className="preview-note">
          Las visualizaciones arquitectónicas son ilustrativas y no documentan
          obras ejecutadas.
        </p>
      </div>
    </footer>
  );
}
