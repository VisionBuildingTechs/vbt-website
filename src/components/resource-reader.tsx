"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { resources } from "@/lib/content";
import "./resource-reader.css";

export default function ResourceReader() {
  const [active, setActive] = useState(0);
  const menuRef = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const scrollFrame = useRef(0);

  function showReading(
    index: number,
    updateHistory = true,
    focusPanel = false,
  ) {
    setActive(index);
    const hash = `#lectura-${resources[index].slug}`;
    if (updateHistory && window.location.hash !== hash)
      window.history.pushState(null, "", hash);
    cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const panel = panels.current[index];
      if (!panel || panel.hidden) return;
      const headerHeight =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .height ?? 100;
      if (focusPanel) panel.focus({ preventScroll: true });
      window.scrollBy({
        top: panel.getBoundingClientRect().top - headerHeight - 20,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }

  useEffect(() => {
    function readLocation() {
      const index = resources.findIndex(
        (resource) => window.location.hash === `#lectura-${resource.slug}`,
      );
      if (index !== -1) showReading(index, false);
      else if (
        window.location.hash === "#lecturas" ||
        window.location.hash === ""
      ) {
        cancelAnimationFrame(scrollFrame.current);
        setActive(0);
      }
    }
    readLocation();
    window.addEventListener("hashchange", readLocation);
    return () => {
      window.removeEventListener("hashchange", readLocation);
      cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      target = (index + 1) % resources.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      target = (index + resources.length - 1) % resources.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = resources.length - 1;
    else return;
    event.preventDefault();
    tabs.current[target]?.focus({ preventScroll: true });
    showReading(target);
  }

  function returnToMenu() {
    menuRef.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    tabs.current[active]?.focus({ preventScroll: true });
  }

  return (
    <div className="resource-reader-layout">
      <aside
        className="resource-reader-menu"
        ref={menuRef}
        aria-label="Elegir etapa de lectura"
      >
        <p className="inner-kicker">Las cuatro etapas</p>
        <div
          className="resource-reader-tabs"
          role="tablist"
          aria-label="Lecturas del proyecto"
          aria-orientation="vertical"
        >
          {resources.map((resource, index) => (
            <button
              type="button"
              role="tab"
              id={`lectura-${resource.slug}`}
              key={resource.slug}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              aria-selected={index === active}
              aria-controls={`panel-${resource.slug}`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => showReading(index)}
              onKeyDown={(event) => moveTab(event, index)}
            >
              <span className="resource-reader-number">0{index + 1}</span>
              <span>
                <small>{resource.category}</small>
                <strong>{resource.title}</strong>
              </span>
              <span className="resource-reader-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
        <p className="resource-reader-menu-note">
          Elegí una etapa y seguí leyendo acá mismo.
        </p>
      </aside>
      <div className="resource-reader-content">
        {resources.map((resource, index) => (
          <section
            key={resource.slug}
            id={`panel-${resource.slug}`}
            role="tabpanel"
            aria-labelledby={`lectura-${resource.slug}`}
            hidden={active !== index}
            tabIndex={0}
            className="resource-reader-panel"
            ref={(node) => {
              panels.current[index] = node;
            }}
          >
            <div className="resource-reader-panel-top">
              <p className="inner-kicker">Lectura 0{index + 1} / 04</p>
              <button type="button" onClick={returnToMenu}>
                Ver las etapas ↑
              </button>
            </div>
            <h3>{resource.title}</h3>
            <p className="resource-reader-summary">{resource.summary}</p>
            {resource.sections.map((section) => (
              <div key={section.title} className="resource-reader-part">
                <h4>{section.title}</h4>
                <p>{section.text}</p>
                {section.points && (
                  <ul className="inner-points">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="resource-reader-note">
              <p>
                Esta lectura ayuda a entender el concepto. Para especificar o
                ejecutar una obra, consultá la documentación de la familia y
                configuración correspondiente.
              </p>
              <Link href="/recursos#descargas">
                Ver documentos descargables ↗
              </Link>
            </div>
            <div
              className="resource-reader-pagination"
              aria-label="Continuar las lecturas"
            >
              {index > 0 ? (
                <button
                  type="button"
                  onClick={() => showReading(index - 1, true, true)}
                >
                  <small>← Anterior</small>
                  <strong>{resources[index - 1].category}</strong>
                </button>
              ) : (
                <span />
              )}
              {index < resources.length - 1 ? (
                <button
                  type="button"
                  onClick={() => showReading(index + 1, true, true)}
                >
                  <small>Siguiente →</small>
                  <strong>{resources[index + 1].category}</strong>
                </button>
              ) : (
                <Link href="/contacto">
                  <small>Próximo paso →</small>
                  <strong>Consultar mi proyecto</strong>
                </Link>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
