import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container error-page">
      <span className="eyebrow">PÁGINA NO ENCONTRADA / 404</span>
      <h1>
        Volvamos al
        <br />
        punto de partida.
      </h1>
      <p>Este enlace no corresponde a una página disponible.</p>
      <Link href="/" className="button primary">
        Volver al inicio →
      </Link>
    </section>
  );
}
