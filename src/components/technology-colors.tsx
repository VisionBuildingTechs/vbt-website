import Link from "next/link";
import "./technology-colors.css";

const colors = [
  { name: "Gris", tone: "gray" },
  { name: "Beige", tone: "beige" },
  { name: "Blanco", tone: "white" },
];

export default function TechnologyColors() {
  return (
    <section
      className="container inner-section technology-colors"
      id="colores"
      aria-labelledby="technology-colors-title"
    >
      <div className="technology-colors-copy">
        <p className="inner-kicker">Colores y terminaciones</p>
        <h2 id="technology-colors-title">
          Una base.
          <br />
          <span className="text-accent">Tres colores.</span>
        </h2>
        <p>
          Los muros VBT se producen en gris, beige y blanco. Podés conservar la
          superficie del panel o definir otros revestimientos según el proyecto.
        </p>
        <Link href="/contacto" className="inner-action">
          Consultar colores y terminaciones <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <figure className="technology-colors-samples">
        <ul
          className="technology-colors-palette"
          aria-label="Colores del muro VBT"
        >
          {colors.map((color) => (
            <li key={color.tone}>
              <span
                className="technology-colors-swatch"
                data-tone={color.tone}
                aria-hidden="true"
              />
              <span className="technology-colors-name">{color.name}</span>
            </li>
          ))}
        </ul>
        <figcaption>
          Tonos orientativos en pantalla. Consultanos por muestras y
          disponibilidad.
        </figcaption>
      </figure>
    </section>
  );
}
