import Link from "next/link";
import Image from "next/image";
import { Arrow } from "./icons";
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
              src="/brand/logo-vbt.png"
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
            <Link href="/tecnologia">Tecnología</Link>
            <Link href="/aplicaciones">Aplicaciones</Link>
            <Link href="/casos">Casos de éxito</Link>
            <Link href="/viviendas">Viviendas con VBT</Link>
          </div>
          <div>
            <h3>Conectar</h3>
            <Link href="/recursos">Centro de recursos</Link>
            <Link href="/red">Red VBT</Link>
            <Link href="/financiacion">Financiación</Link>
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
          Las imágenes identificadas como ilustrativas fueron generadas con IA y
          no documentan obras ejecutadas.
        </p>
      </div>
    </footer>
  );
}
