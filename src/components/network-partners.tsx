"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import "./network-partners.css";

const partners = [
  { name: "Acortex", file: "acortex.png", width: 348, height: 145 },
  { name: "Aluma", file: "aluma.png", width: 360, height: 76 },
  {
    name: "Grupo Iron Punch",
    file: "grupo-iron-punch.png",
    width: 225,
    height: 225,
  },
  { name: "Grupo LTN", file: "grupo-ltn.png", width: 526, height: 167 },
  {
    name: "Hipercerámicos",
    file: "hiperceramicos.png",
    width: 246,
    height: 64,
  },
  {
    name: "Hormiserv",
    file: "hormiserv.png",
    width: 320,
    height: 106,
    transparent: true,
  },
  { name: "Friolatina", file: "friolatina.png", width: 510, height: 99 },
  {
    name: "Saldaña",
    file: "saldana.png",
    width: 800,
    height: 266,
    transparent: true,
  },
  { name: "Ultratex", file: "ultratex.png", width: 847, height: 276 },
  {
    name: "Santiago Monteverdi",
    file: "santiago-monteverdi.png",
    width: 416,
    height: 55,
    transparent: true,
  },
  { name: "Suri", file: "suri.png", width: 300, height: 78, transparent: true },
  { name: "Bravin Hermanos", file: "bravin-hnos.jpg", width: 884, height: 472 },
  {
    name: "Indari",
    file: "indari.png",
    width: 1200,
    height: 1200,
    transparent: true,
  },
];

export default function NetworkPartners() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [automatic, setAutomatic] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setAutomatic(!motion.matches);
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  function move(direction: number) {
    const list = track.current;
    if (!list) return;
    const first = list.children[0]?.getBoundingClientRect();
    const second = list.children[1]?.getBoundingClientRect();
    if (!first || !second) return;
    const stride = second.left - first.left;
    const max = list.scrollWidth - list.clientWidth;
    const current = list.scrollLeft;
    const target =
      direction > 0 && current >= max - 2
        ? 0
        : direction < 0 && current <= 2
          ? max
          : Math.max(0, Math.min(max, current + direction * stride));
    list.scrollTo({
      left: target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  useEffect(() => {
    if (!automatic || !visible || !pageVisible || hovered || focused) return;
    const timer = window.setInterval(() => move(1), 4000);
    return () => window.clearInterval(timer);
  }, [automatic, visible, pageVisible, hovered, focused]);

  function moveManually(direction: number) {
    setAutomatic(false);
    move(direction);
  }

  function handleKeys(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveManually(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setAutomatic(false);
      track.current?.scrollTo({
        left: event.key === "Home" ? 0 : track.current.scrollWidth,
        behavior: "instant",
      });
    }
  }

  return (
    <section
      id="empresas"
      ref={section}
      className="network-partners"
      aria-labelledby="network-partners-title"
    >
      <div className="container">
        <div className="network-partners-heading">
          <div>
            <p className="inner-kicker">Relaciones que suman</p>
            <h2 id="network-partners-title">
              Empresas con las que{" "}
              <span className="text-accent">trabajamos.</span>
            </h2>
          </div>
          <div
            className="network-partners-controls"
            aria-label="Controles de empresas"
          >
            <button
              type="button"
              className="network-partners-play"
              onClick={() => setAutomatic((value) => !value)}
              aria-label={
                automatic
                  ? "Pausar recorrido de empresas"
                  : "Reproducir recorrido de empresas"
              }
              aria-controls="network-partners-list"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                {automatic ? (
                  <path
                    d="M6 4v12M14 4v12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                ) : (
                  <path d="m6 3 10 7-10 7Z" fill="currentColor" />
                )}
              </svg>
              {automatic ? "Pausar" : "Reproducir"}
            </button>
            {[-1, 1].map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => moveManually(direction)}
                aria-label={
                  direction < 0
                    ? "Ver empresa anterior"
                    : "Ver empresa siguiente"
                }
                aria-controls="network-partners-list"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    d={
                      direction < 0
                        ? "M16 10H4m6-6-6 6 6 6"
                        : "M4 10h12m-6-6 6 6-6 6"
                    }
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <ul
          id="network-partners-list"
          ref={track}
          className="network-partners-list"
          role="list"
          aria-label="Empresas con las que trabajamos"
          aria-describedby="network-partners-hint"
          tabIndex={0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onPointerDown={() => setAutomatic(false)}
          onWheel={(event) => {
            if (event.deltaX !== 0) setAutomatic(false);
          }}
          onKeyDown={handleKeys}
        >
          {partners.map((partner) => (
            <li key={partner.file}>
              <div className="network-partner-logo">
                <img
                  src={`/partners/${partner.file}`}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className={
                    partner.transparent
                      ? "network-partner-transparent"
                      : undefined
                  }
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
              <span aria-hidden="true">{partner.name}</span>
            </li>
          ))}
        </ul>
        <div className="network-partners-footer" id="network-partners-hint">
          <span>{partners.length} empresas</span>
          <span>
            Deslizá o usá las flechas para recorrerlas{" "}
            <span aria-hidden="true">↔</span>
          </span>
        </div>
      </div>
    </section>
  );
}
