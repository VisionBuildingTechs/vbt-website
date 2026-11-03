import "./network-diagram.css";

const roles = [
  {
    name: "VBT",
    label: "Tecnología + suministro",
    text: "Aporta el sistema constructivo, la documentación y el acompañamiento técnico dentro del alcance acordado.",
    className: "network-role-vbt",
  },
  {
    name: "Profesionales",
    label: "Proyecto + verificación",
    text: "Tu arquitecto e ingeniero definen el proyecto, el cálculo y la coordinación técnica según sus responsabilidades.",
    className: "",
  },
  {
    name: "Constructora",
    label: "Presupuesto + obra",
    text: "La empresa responsable cotiza, contrata y ejecuta la construcción, con el alcance y las garantías de su servicio.",
    className: "",
  },
];

export default function NetworkDiagram() {
  return (
    <section
      className="container inner-section network-map-section"
      aria-labelledby="network-map-title"
    >
      <div className="inner-section-top">
        <p className="inner-kicker">Así funciona Red VBT</p>
        <h2 id="network-map-title">
          Un proyecto.
          <br />
          <span className="text-accent">Tres aportes que se conectan.</span>
        </h2>
        <p>
          La red es una forma de trabajar juntos: conectamos la tecnología con
          quienes diseñan y construyen tu obra.
        </p>
      </div>
      <figure className="network-map">
        <div className="network-map-project">
          <p className="inner-kicker">El punto de partida</p>
          <h3>Tu proyecto</h3>
          <p>
            Qué querés construir, dónde y con qué equipo ya estás trabajando.
          </p>
        </div>
        <div className="network-map-connector" aria-hidden="true">
          <svg viewBox="0 0 900 70" preserveAspectRatio="none">
            <path d="M450 0V25M150 70V25H750V70M450 25V70" />
            <circle cx="450" cy="25" r="4" />
          </svg>
        </div>
        <p className="network-map-coordination">Trabajan en coordinación</p>
        <div
          className="network-map-roles"
          role="list"
          aria-label="Quién aporta cada parte"
        >
          {roles.map((role) => (
            <article
              key={role.name}
              role="listitem"
              className={`network-map-role ${role.className}`}
            >
              <p className="network-role-label">{role.label}</p>
              <h3>{role.name}</h3>
              <p>{role.text}</p>
            </article>
          ))}
        </div>
        <div
          className="network-map-connector network-map-join"
          aria-hidden="true"
        >
          <svg viewBox="0 0 900 70" preserveAspectRatio="none">
            <path d="M150 0V35H750V0M450 35V70" />
            <circle cx="450" cy="35" r="4" />
          </svg>
        </div>
        <div className="network-map-result">
          <h3>Tu obra, con responsabilidades claras.</h3>
          <p>
            Suministro, proyecto y ejecución coordinados entre los
            participantes.
          </p>
        </div>
        <figcaption>
          VBT es el proveedor de la tecnología. La propuesta y el contrato de
          construcción se definen con la empresa que ejecuta la obra.
        </figcaption>
      </figure>
    </section>
  );
}
