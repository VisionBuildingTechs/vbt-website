"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import "./wall-story.css";

const steps = [
  {
    title: "Todo comienza en la base.",
    short: "Preparación",
    text: "El proyecto define el arranque, los apoyos y la coordinación de cada parte del muro.",
  },
  {
    title: "Los perfiles se encuentran.",
    short: "Paneles",
    text: "En VBT150, los perfiles de PVC se unen por encastre horizontal y forman un encofrado que permanece en el muro.",
  },
  {
    title: "El acero conecta el interior.",
    short: "Refuerzos",
    text: "Las armaduras verticales y horizontales se disponen según el proyecto. El montaje de perfiles y acero se coordina durante la ejecución.",
  },
  {
    title: "Cada instalación tiene su lugar.",
    short: "Reservas",
    text: "Las reservas, aberturas e instalaciones se coordinan antes del llenado, de acuerdo con los detalles del proyecto.",
  },
  {
    title: "Antes de llenar, se controla.",
    short: "Control",
    text: "La estabilidad temporal, la alineación y los elementos interiores se revisan antes de colocar el hormigón.",
  },
  {
    title: "El hormigón ocupa el núcleo.",
    short: "Hormigón",
    text: "El llenado integra el hormigón con las armaduras dentro del encofrado permanente, siguiendo el procedimiento de obra.",
  },
  {
    title: "Tres materiales, un muro.",
    short: "Consolidación",
    text: "El hormigón y el acero forman el elemento resistente definido por el proyecto. Los perfiles de PVC permanecen como encofrado y superficie.",
  },
  {
    title: "La terminación completa la idea.",
    short: "Terminación",
    text: "El PVC puede quedar visto o recibir una terminación compatible. Mostramos media cara revestida para que puedas ver ambas posibilidades.",
  },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function WallDrawing({ stage, progress }: { stage: number; progress: number }) {
  const instance = useId().replaceAll(":", "");
  const coreClip = `wall-core-${instance}`;
  const panelVisible = stage >= 1;
  const fillAmount = stage >= 6 ? 1 : clamp((progress - 0.59) / 0.17);
  const coreHeight = 264 * fillAmount;
  const concreteTop = 426 - coreHeight;

  return (
    <svg
      className="wall-drawing"
      viewBox="0 0 680 520"
      role="img"
      aria-labelledby={`wall-title-${instance} wall-description-${instance}`}
    >
      <title id={`wall-title-${instance}`}>
        {`Muro conceptual VBT150: ${steps[stage].short}`}
      </title>
      <desc id={`wall-description-${instance}`}>
        Vista axonométrica esquemática de perfiles de encofrado permanente con
        celdas interiores, acero vertical y horizontal, hormigón y media cara
        revestida. La imagen no define dimensiones ni parámetros de ejecución.
      </desc>
      <defs>
        <clipPath id={coreClip}>
          <path d="M170 126 460 30 520 66 230 162 230 426 170 390Z" />
          <path d="M230 162 520 66 520 330 230 426Z" />
        </clipPath>
      </defs>

      <g className="wall-ground">
        <path d="M86 397 470 270 606 352 222 479Z" />
        <path d="M86 397 222 479 222 493 86 411Z" />
        <path d="M222 479 606 352 606 366 222 493Z" />
        <path
          className="wall-ground-line"
          d="M115 402 474 283M141 418 500 299M168 434 527 315M196 450 554 331"
        />
      </g>

      <g className="wall-waits" opacity={stage === 0 ? 1 : 0.38}>
        {[0, 1, 2, 3].map((n) => (
          <path key={n} d={`M${241 + n * 72} ${424 - n * 24}v-56`} />
        ))}
      </g>

      <g className={`wall-panels${panelVisible ? " wall-layer-visible" : ""}`}>
        {[0, 1, 2, 3].map((n) => {
          const x = 170 + n * 72.5;
          const y = 126 - n * 24;
          return (
            <g
              key={n}
              className="wall-panel-module"
              style={{ transitionDelay: `${n * 60}ms` }}
            >
              <path
                className="wall-rear-face"
                d={`M${x} ${y}l72.5-24v264l-72.5 24Z`}
              />
              <path
                className="wall-panel-rim"
                d={`M${x} ${y}l72.5-24 60 36-72.5 24Z`}
              />
              <path
                className="wall-panel-cavity"
                d={`M${x + 5} ${y + 1}l62.5-20.5 48 29-62.5 20.5Z`}
              />
            </g>
          );
        })}
      </g>

      <g
        className="wall-concrete"
        clipPath={`url(#${coreClip})`}
        opacity={stage >= 5 ? 1 : 0}
      >
        <path d={`M169 ${concreteTop - 36}l291-96 62 36v300l-291 96-62-36Z`} />
        <path
          className="wall-concrete-top"
          d={`M169 ${concreteTop - 36}l291-96 62 36-291 96Z`}
        />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
          <circle
            key={n}
            cx={245 + n * 35}
            cy={388 - (n % 3) * 32}
            r={2 + (n % 2)}
          />
        ))}
      </g>

      <g className={`wall-webs${panelVisible ? " wall-layer-visible" : ""}`}>
        {[0, 1, 2, 3, 4].map((n) => {
          const x = 170 + n * 72.5;
          const y = 126 - n * 24;
          return (
            <path
              key={n}
              fillRule="evenodd"
              d={`M${x} ${y}l60 36v264l-60-36Z M${x + 11} ${y + 56}l38 23v53l-38-23Z M${x + 11} ${y + 163}l38 23v53l-38-23Z`}
            />
          );
        })}
      </g>

      <g className={`wall-steel${stage >= 2 ? " wall-layer-visible" : ""}`}>
        {[0, 1, 2, 3].map((n) => (
          <path
            className="wall-steel-vertical"
            key={n}
            d={`M${206 + n * 72.5} ${399 - n * 24}V${89 - n * 24}`}
          />
        ))}
        <path
          className="wall-steel-horizontal"
          d="M190 208 502 104M190 315 502 211"
        />
        {[0, 1, 2, 3].map((n) => (
          <g className="wall-steel-tie" key={n}>
            <path
              d={`M${198 + n * 72.5} ${205 - n * 24}l16 10M${198 + n * 72.5} ${312 - n * 24}l16 10`}
            />
          </g>
        ))}
      </g>

      <g
        className={`wall-installation${stage >= 3 ? " wall-layer-visible" : ""}`}
      >
        <path d="M334 384V251l69-23v-51" />
        <path className="wall-installation-end" d="M398 175l11-4v17l-11 4Z" />
      </g>

      <g className={`wall-fronts${panelVisible ? " wall-layer-visible" : ""}`}>
        {[0, 1, 2, 3].map((n) => {
          const x = 230 + n * 72.5;
          const y = 162 - n * 24;
          return (
            <path
              key={n}
              className={n < 2 ? "wall-front-cutaway" : "wall-front-solid"}
              d={`M${x} ${y}l72.5-24v264l-72.5 24Z`}
            />
          );
        })}
        <path className="wall-front-edge" d="M230 162 520 66V330L230 426Z" />
      </g>

      <g
        className={`wall-supports${stage >= 4 && stage < 6 ? " wall-layer-visible" : ""}`}
      >
        <path d="M291 240 219 455M470 180 565 345" />
        <path d="M209 457 229 450M555 349 575 342" />
        <circle cx="291" cy="240" r="4" />
        <circle cx="470" cy="180" r="4" />
      </g>

      <g className={`wall-finish${stage >= 7 ? " wall-layer-visible" : ""}`}>
        <path d="M375 114 520 66V330L375 378Z" />
        <path className="wall-finish-edge" d="M375 114V378" />
        {[0, 1, 2, 3, 4].map((n) => (
          <path
            className="wall-finish-line"
            key={n}
            d={`M375 ${158 + n * 44}l145-48`}
          />
        ))}
      </g>

      <g className="wall-drawing-label">
        <path d="M535 225h48" />
        <text x="589" y="229">
          {stage >= 7 ? "Acabado" : stage >= 5 ? "Muro" : "VBT150"}
        </text>
      </g>
    </svg>
  );
}

export default function WallStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modeAnchor = useRef<{ stage: number; visualTop: number } | null>(null);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compact, setCompact] = useState(false);
  const [mode, setMode] = useState<"scroll" | "manual">("scroll");
  const manual = mode === "manual";
  const titleId = useId();
  const storyId = useId();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 760px)");
    const update = () => {
      setReducedMotion(motion.matches);
      setCompact(small.matches);
    };
    update();
    motion.addEventListener("change", update);
    small.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      small.removeEventListener("change", update);
    };
  }, []);

  function focusLine() {
    if (!compact) return window.innerHeight * 0.5;
    // The active text sits below the sticky scene on a narrow screen.
    const bottom = visualRef.current?.getBoundingClientRect().bottom ?? 0;
    return Math.min(
      window.innerHeight - 28,
      Math.max(
        window.innerHeight * 0.55,
        bottom + Math.max(48, (window.innerHeight - bottom) * 0.45),
      ),
    );
  }

  useLayoutEffect(() => {
    const anchor = modeAnchor.current;
    if (!anchor || !visualRef.current) return;
    modeAnchor.current = null;
    if (manual) {
      const headerOffset =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 80;
      const destination = Math.max(
        headerOffset,
        Math.min(anchor.visualTop, window.innerHeight * 0.3),
      );
      window.scrollBy({
        top: visualRef.current.getBoundingClientRect().top - destination,
        behavior: "instant",
      });
    } else {
      const target = stepRefs.current[anchor.stage]?.getBoundingClientRect();
      if (target) {
        window.scrollBy({
          top: target.top + target.height / 2 - focusLine(),
          behavior: "instant",
        });
      }
    }
  }, [mode]);

  useEffect(() => {
    if (manual) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!sectionRef.current) return;
      const bounds = sectionRef.current.getBoundingClientRect();
      if (bounds.top > window.innerHeight || bounds.bottom < 0) return;
      const first = stepRefs.current[0]?.getBoundingClientRect();
      const last = stepRefs.current[steps.length - 1]?.getBoundingClientRect();
      if (!first || !last) return;
      const firstMiddle = first.top + first.height / 2;
      const lastMiddle = last.top + last.height / 2;
      const next = clamp(
        (focusLine() - firstMiddle) / Math.max(1, lastMiddle - firstMiddle),
      );
      setProgress(next);
      setStage(Math.round(next * (steps.length - 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [manual, compact]);

  const goTo = (next: number) => {
    const target = Math.round(clamp(next, 0, steps.length - 1));
    setStage(target);
    setProgress(target / (steps.length - 1));
    if (!manual) {
      const bounds = stepRefs.current[target]?.getBoundingClientRect();
      if (bounds)
        window.scrollBy({
          top: bounds.top + bounds.height / 2 - focusLine(),
          behavior: reducedMotion ? "instant" : "smooth",
        });
    }
  };

  function toggleMode() {
    modeAnchor.current = {
      stage,
      visualTop: visualRef.current?.getBoundingClientRect().top ?? 80,
    };
    setMode(manual ? "scroll" : "manual");
  }

  return (
    <section
      className={`wall-story${manual ? " wall-manual" : ""}`}
      ref={sectionRef}
      aria-labelledby={titleId}
    >
      <div className="wall-story-heading">
        <p className="wall-eyebrow">Una mirada al interior</p>
        <h2 id={titleId}>
          Del panel <br />
          al muro.
        </h2>
        <p>Descubrí cómo se relacionan los materiales, paso a paso.</p>
      </div>
      <div className="wall-story-layout">
        <div className="wall-visual-column">
          <div className="wall-visual-sticky" ref={visualRef}>
            <div className="wall-visual-topline">
              <span>La tecnología en construcción</span>
              <span aria-hidden="true">
                {String(stage + 1).padStart(2, "0")} / 08
              </span>
            </div>
            <WallDrawing stage={stage} progress={progress} />
            <div className="wall-scene-caption">
              <span>Esquema conceptual · VBT150 · sin escala</span>
              <span className="wall-scene-caption-detail">
                Vista interior explicativa
              </span>
            </div>
            <button
              type="button"
              className="wall-mode-switch"
              onClick={toggleMode}
              aria-pressed={manual}
              aria-controls={storyId}
            >
              {manual
                ? "Volver al recorrido con scroll"
                : "Controlar por etapas"}
            </button>
            <div
              className="wall-controls"
              aria-label="Controlar las etapas del muro"
            >
              <button
                type="button"
                onClick={() => goTo(stage - 1)}
                disabled={stage === 0}
                aria-label="Ver etapa anterior"
                aria-controls={storyId}
              >
                <span aria-hidden="true">←</span>
              </button>
              <p aria-live={manual ? "polite" : "off"}>{steps[stage].short}</p>
              <button
                type="button"
                onClick={() => goTo(stage + 1)}
                disabled={stage === steps.length - 1}
                aria-label="Ver etapa siguiente"
                aria-controls={storyId}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
            {!manual && (
              <p className="wall-scroll-hint">
                Seguí bajando para ver la secuencia{" "}
                <span aria-hidden="true">↓</span>
              </p>
            )}
          </div>
        </div>
        <div className="wall-story-steps" id={storyId}>
          {steps.map((step, index) => (
            <div
              key={step.short}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              className={`wall-story-step${stage === index ? " wall-step-active" : ""}`}
              aria-hidden={manual && stage !== index ? true : undefined}
            >
              <span className="wall-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="wall-story-bottom">
        <p>
          La secuencia muestra el concepto. La disposición y el procedimiento se
          definen para cada proyecto. VBT80 utiliza un montaje diferente.
        </p>
        <Link href="/recursos#lectura-entender-el-sistema">
          Explorar la tecnología <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <details className="wall-text-alternative">
        <summary>Leer todas las etapas</summary>
        <ol>
          {steps.map((step) => (
            <li key={step.short}>
              <strong>{step.short}.</strong> {step.text}
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
