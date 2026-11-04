"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { resources } from "@/lib/content";
import { Arrow } from "./icons";
import "./resource-reader.css";

const compactReaderQuery =
  "(max-width: 760px), (max-width: 1000px) and (max-height: 500px)";

const actions = [
  {
    href: "/tecnologia#paneles",
    title: "Comparar VBT80 y VBT150",
    text: "Mirá los paneles y cómo se ensambla cada familia.",
    icon: "panels",
  },
  {
    href: "/contacto",
    title: "Preparar la consulta de mi proyecto",
    text: "Ubicación, uso, planos y equipo de trabajo.",
    icon: "plan",
  },
  {
    href: "/tecnologia#proceso",
    title: "Ver el proceso animado",
    text: "Recorré la relación entre paneles, armaduras y hormigón.",
    icon: "assembly",
  },
  {
    href: "/recursos#descargas",
    title: "Consultar la documentación",
    text: "Abrí la guía técnica y los documentos disponibles.",
    icon: "documents",
  },
];

function GuideIcon({ kind }: { kind: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {kind === "plan" ? (
        <>
          <path d="M5 4h22v24H5zM5 12h13v16M18 4v8h9M11 12v8h7M5 23h6" />
          <path d="M22 18h3M22 22h3" />
        </>
      ) : kind === "assembly" ? (
        <>
          <path d="m3 10 13-6 13 6-13 6zM3 16l13 6 13-6M3 22l13 6 13-6" />
        </>
      ) : (
        <>
          <path d="M8 3h12l6 6v20H8zM20 3v7h6M13 15h8M13 20h8M13 25h5M4 8v21" />
        </>
      )}
    </svg>
  );
}

export default function ResourceReader() {
  const [active, setActive] = useState(0);
  const menuRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stages = useRef<(HTMLElement | null)[]>([]);
  const scrollFrame = useRef(0);

  function readingOffset() {
    const header =
      document.querySelector(".site-header")?.getBoundingClientRect().height ??
      100;
    const menu = window.matchMedia(compactReaderQuery).matches
      ? (menuRef.current?.getBoundingClientRect().height ?? 0)
      : 0;
    return header + menu + 20;
  }

  function scrollToStage(index: number, updateHistory = true, focus = false) {
    setActive(index);
    const hash = "#lectura-" + resources[index].slug;
    if (updateHistory && window.location.hash !== hash)
      window.history.pushState(null, "", hash);
    cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const stage = stages.current[index];
      if (!stage) return;
      if (focus) stage.focus({ preventScroll: true });
      window.scrollBy({
        top: stage.getBoundingClientRect().top - readingOffset(),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }

  function navigate(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    scrollToStage(index, true, true);
  }

  useEffect(() => {
    let frame = 0;
    let mounted = true;
    const compact = window.matchMedia(compactReaderQuery);

    function updatePosition() {
      frame = 0;
      if (!mounted) return;
      const line = readingOffset() + 48;
      let current = 0;
      for (let index = 0; index < stages.current.length; index++) {
        const stage = stages.current[index];
        if (stage && stage.getBoundingClientRect().top <= line) current = index;
      }
      setActive(current);
    }

    function schedulePosition() {
      if (!mounted || frame) return;
      frame = requestAnimationFrame(updatePosition);
    }

    function readLocation() {
      const index = resources.findIndex(
        (resource) => window.location.hash === "#lectura-" + resource.slug,
      );
      if (index !== -1) scrollToStage(index, false);
      else schedulePosition();
    }

    readLocation();
    const observer = new ResizeObserver(schedulePosition);
    if (menuRef.current) observer.observe(menuRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    const header = document.querySelector(".site-header");
    if (header) observer.observe(header);
    window.addEventListener("scroll", schedulePosition, { passive: true });
    window.addEventListener("resize", schedulePosition);
    window.addEventListener("hashchange", readLocation);
    compact.addEventListener("change", schedulePosition);
    return () => {
      mounted = false;
      observer.disconnect();
      window.removeEventListener("scroll", schedulePosition);
      window.removeEventListener("resize", schedulePosition);
      window.removeEventListener("hashchange", readLocation);
      compact.removeEventListener("change", schedulePosition);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  return (
    <div className="resource-reader-layout">
      <aside className="resource-reader-menu" ref={menuRef}>
        <p className="inner-kicker">Las cuatro etapas</p>
        <nav aria-label="Etapas de la guía VBT">
          <ol className="resource-reader-links" role="list">
            {resources.map((resource, index) => (
              <li key={resource.slug}>
                <a
                  href={"#lectura-" + resource.slug}
                  aria-current={index === active ? "step" : undefined}
                  onClick={(event) => navigate(event, index)}
                >
                  <span className="resource-reader-number">0{index + 1}</span>
                  <span>
                    <small>{resource.category}</small>
                    <strong>{resource.title}</strong>
                  </span>
                  <span className="resource-reader-arrow" aria-hidden="true">
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="resource-reader-menu-note">
          Seguí bajando para recorrer las cuatro etapas, o elegí a cuál ir.
        </p>
      </aside>
      <div className="resource-reader-content" ref={contentRef}>
        {resources.map((resource, index) => {
          const action = actions[index];
          return (
            <section
              key={resource.slug}
              id={"lectura-" + resource.slug}
              aria-labelledby={"resource-title-" + resource.slug}
              tabIndex={-1}
              className="resource-reader-stage"
              ref={(node) => {
                stages.current[index] = node;
              }}
            >
              <header className="resource-reader-stage-header">
                <h3
                  className="resource-reader-title"
                  id={"resource-title-" + resource.slug}
                >
                  <span className="resource-reader-title-number">
                    0{index + 1}
                  </span>
                  <span>{resource.title}</span>
                </h3>
                <p className="resource-reader-summary">{resource.summary}</p>
              </header>
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
              <Link href={action.href} className="resource-reader-action">
                <span
                  className={
                    "resource-reader-action-visual" +
                    (action.icon === "panels"
                      ? " resource-reader-action-image"
                      : "")
                  }
                >
                  {action.icon === "panels" ? (
                    <Image
                      src="/images/technology/vbt150-panel.png"
                      alt=""
                      fill
                      sizes="(max-width:760px) 72px, 112px"
                    />
                  ) : (
                    <GuideIcon kind={action.icon} />
                  )}
                </span>
                <span className="resource-reader-action-copy">
                  <strong>{action.title}</strong>
                  <span>{action.text}</span>
                </span>
                <Arrow />
              </Link>
              {index < resources.length - 1 && (
                <a
                  className="resource-reader-continue"
                  href={"#lectura-" + resources[index + 1].slug}
                  onClick={(event) => navigate(event, index + 1)}
                >
                  <span>
                    Siguiente etapa{" "}
                    <strong>
                      0{index + 2} · {resources[index + 1].category}
                    </strong>
                  </span>
                  <Arrow />
                </a>
              )}
            </section>
          );
        })}
        <div className="resource-reader-note">
          <p>
            Estas lecturas explican el concepto. Para especificar o ejecutar una
            obra, consultá la documentación de la familia y configuración
            correspondiente.
          </p>
          <Link href="/recursos#descargas">Ver documentos descargables ↗</Link>
        </div>
      </div>
    </div>
  );
}
