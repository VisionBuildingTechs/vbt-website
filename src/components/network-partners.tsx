"use client";

import { useEffect, useRef, useState } from "react";
import "./network-partners.css";

const partners = [
  { name: "Acortex", file: "acortex.png", width: 348, height: 145 },
  { name: "Suri", file: "suri.png", width: 300, height: 78, tone: "suri" },
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
    tone: "light",
  },
  { name: "Friolatina", file: "friolatina.png", width: 510, height: 99 },
  {
    name: "Saldaña",
    file: "saldana.png",
    width: 800,
    height: 266,
    tone: "muted",
  },
  { name: "Ultratex", file: "ultratex.png", width: 847, height: 276 },
  {
    name: "Santiago Monteverdi",
    file: "santiago-monteverdi.png",
    width: 416,
    height: 55,
  },
  { name: "Bravin Hermanos", file: "bravin-hnos.jpg", width: 884, height: 472 },
  { name: "Indari", file: "indari.png", width: 1200, height: 1200 },
];

export default function NetworkPartners() {
  const viewport = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    if (viewport.current) observer.observe(viewport.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  return (
    <section
      id="empresas"
      className="network-partners"
      aria-labelledby="network-partners-title"
      data-running={visible && pageVisible && !paused}
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
          <button
            type="button"
            className="network-partners-control"
            onClick={() => setPaused((value) => !value)}
            aria-label={
              paused
                ? "Reanudar banner de empresas"
                : "Pausar banner de empresas"
            }
            aria-controls="network-partners-track"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
              {paused ? (
                <path d="m6 3 10 7-10 7Z" fill="currentColor" />
              ) : (
                <path
                  d="M6 4v12M14 4v12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              )}
            </svg>
            {paused ? "Reanudar" : "Pausar"}
          </button>
        </div>
        <div className="network-partners-viewport" ref={viewport}>
          <div className="network-partners-track" id="network-partners-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="network-partners-group"
                role="list"
                aria-label={
                  copy === 0 ? "Empresas con las que trabajamos" : undefined
                }
                aria-hidden={copy === 1 ? true : undefined}
              >
                {partners.map((partner) => (
                  <li key={partner.file}>
                    <img
                      src={"/partners/" + partner.file}
                      alt={copy === 0 ? partner.name : ""}
                      width={partner.width}
                      height={partner.height}
                      className={
                        partner.tone
                          ? "network-partner-" + partner.tone
                          : undefined
                      }
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
