"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { houseCatalog } from "@/lib/house-catalog";

export default function HousingCatalog() {
  const [area, setArea] = useState("all");
  const [floors, setFloors] = useState("all");
  const filtered = houseCatalog.filter((model) => {
    const matchesArea =
      area === "all" ||
      (area === "small" && model.area <= 100) ||
      (area === "medium" && model.area > 100 && model.area <= 140) ||
      (area === "large" && model.area > 140);
    return matchesArea && (floors === "all" || model.floors === Number(floors));
  });

  function reset() {
    setArea("all");
    setFloors("all");
  }

  return (
    <section
      className="container housing-catalog"
      id="modelos"
      aria-label="Catálogo de viviendas"
    >
      <div className="housing-filters">
        <label>
          Superficie del proyecto
          <select
            value={area}
            onChange={(event) => setArea(event.target.value)}
          >
            <option value="all">Todos los metrajes</option>
            <option value="small">Hasta 100 m²</option>
            <option value="medium">Más de 100 y hasta 140 m²</option>
            <option value="large">Más de 140 m²</option>
          </select>
        </label>
        <label>
          Cantidad de plantas
          <select
            value={floors}
            onChange={(event) => setFloors(event.target.value)}
          >
            <option value="all">Todas las opciones</option>
            <option value="1">Una planta</option>
            <option value="2">Dos plantas</option>
          </select>
        </label>
        <p aria-live="polite" aria-atomic="true">
          <strong>{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "proyecto" : "proyectos"}
        </p>
        {(area !== "all" || floors !== "all") && (
          <button type="button" onClick={reset}>
            Limpiar filtros ↗
          </button>
        )}
      </div>
      <div className="housing-cards">
        {filtered.map((model) => {
          const cover = model.images.find((image) => image.kind === "render")!;
          return (
            <article className="housing-card" key={model.slug}>
              <Link
                href={`/viviendas/${model.slug}`}
                className="housing-card-image"
                aria-label={`Ver planos y renders de ${model.title}`}
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(max-width:760px) 100vw, 32vw"
                />
                <span aria-hidden="true">↗</span>
              </Link>
              <div className="housing-card-body">
                <p className="inner-kicker">PROYECTO DE VIVIENDA</p>
                <h2>
                  <Link href={`/viviendas/${model.slug}`}>
                    {model.area} <span>m²</span>
                  </Link>
                </h2>
                <p className="housing-card-facts">
                  {model.floors
                    ? `${model.floors} ${model.floors === 1 ? "planta" : "plantas"}`
                    : "Plantas a confirmar"}
                  {model.bedrooms && (
                    <>
                      {" "}
                      <span>·</span> {model.bedrooms} dormitorios
                    </>
                  )}
                </p>
                <p>{model.description}</p>
                <Link
                  className="inner-action"
                  href={`/viviendas/${model.slug}`}
                >
                  Ver planos y renders <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="housing-empty">
          <h2>Busquemos otra combinación.</h2>
          <p>
            No hay proyectos publicados con esos filtros. También podemos
            conversar sobre tu propio proyecto.
          </p>
          <button type="button" className="button secondary" onClick={reset}>
            Ver todos los proyectos
          </button>
          <Link href="/contacto" className="inner-action">
            Consultar mi idea ↗
          </Link>
        </div>
      )}
    </section>
  );
}
