import Link from "next/link";
import LoanCalculator from "./loan-calculator";
import { BNA_URL, BNA_SIMULATOR_URL } from "@/lib/finance-data";
import "./housing-finance.css";

export default function HousingFinance() {
  return (
    <section
      className="housing-finance-section"
      id="financiacion"
      aria-labelledby="housing-finance-title"
    >
      <header className="container inner-section inner-two-column housing-finance-intro">
        <div>
          <p className="inner-kicker">Financiación para viviendas</p>
          <h2 id="housing-finance-title">
            Tu casa.
            <br />
            <span className="text-accent">Tus posibilidades.</span>
          </h2>
        </div>
        <div className="inner-copy">
          <p>
            Probá tu escenario acá mismo: valor de la vivienda, anticipo, monto
            a pedir, tasa y plazo. Compará la cuota inicial y ajustá los datos a
            tu situación.
          </p>
          <p>
            Banco Nación evalúa y otorga el préstamo. VBT acompaña la consulta
            por el proyecto y la tecnología junto a tu profesional o
            constructor.
          </p>
        </div>
      </header>
      <LoanCalculator labelledBy="housing-finance-title" />
      <div className="container housing-bank-info">
        <h3>Para avanzar con el banco.</h3>
        <details>
          <summary>
            Condiciones y requisitos de Banco Nación{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <div>
            <p>
              Compra de vivienda terminada y construcción en terreno propio son
              destinos distintos. Plazos, requisitos, costos y desembolsos
              dependen de la línea y del perfil del solicitante.
            </p>
            <p>
              Confirmá las condiciones actuales, la documentación del proyecto y
              los requisitos del proveedor en los canales oficiales del banco.
            </p>
            <div className="housing-bank-links">
              <a
                className="inner-action"
                href={BNA_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver condiciones hipotecarias BNA ↗
              </a>
              <a
                className="inner-action"
                href={BNA_SIMULATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comparar en el simulador oficial ↗
              </a>
            </div>
          </div>
        </details>
        <details>
          <summary>
            Cómo se relacionan la tasa, la UVA y la inflación{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="housing-finance-concepts">
            <article>
              <p className="inner-kicker">BNA</p>
              <h4>Condiciones del préstamo</h4>
              <p>
                La línea bancaria define interés, plazo, costos, requisitos y
                modalidad de desembolso. La tasa no surge de un índice general
                de inflación.
              </p>
            </article>
            <article>
              <p className="inner-kicker">BCRA</p>
              <h4>Valor de la UVA</h4>
              <p>
                En un crédito UVA, el capital y las cuotas expresados en pesos
                varían con esa unidad. Su valor oficial corresponde a una fecha.
              </p>
            </article>
            <article>
              <p className="inner-kicker">INDEC</p>
              <h4>Contexto de precios</h4>
              <p>
                El IPC y el costo de construcción ayudan a leer la evolución de
                precios. No reemplazan una cotización ni predicen una cuota
                futura.
              </p>
            </article>
          </div>
        </details>
        <details>
          <summary>
            Qué preparar para consultar por tu vivienda{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <div>
            <ul className="inner-points">
              <li>Si buscás comprar una vivienda o construir en un terreno.</li>
              <li>Tu aporte propio y la documentación del proyecto.</li>
              <li>Quién presenta la oferta y quién ejecuta la construcción.</li>
              <li>Qué gastos y etapas cubre el préstamo.</li>
            </ul>
            <p>
              La documentación financiera y la solicitud de crédito se presentan
              ante el banco. VBT puede orientar la parte de la tecnología y
              ayudarte a conectar con una empresa.
            </p>
            <Link className="inner-action" href="/contacto">
              Consultar por mi proyecto ↗
            </Link>
          </div>
        </details>
      </div>
    </section>
  );
}
