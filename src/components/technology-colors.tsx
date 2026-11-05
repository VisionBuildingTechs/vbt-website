"use client";

import Link from "next/link";
import { useId, useState } from "react";
import "./technology-colors.css";

const colors = [
  { name: "Gris", tone: "gray", rgb: [197, 197, 202] },
  { name: "Beige", tone: "beige", rgb: [198, 186, 167] },
  { name: "Blanco", tone: "white", rgb: [255, 255, 255] },
];

export default function TechnologyColors() {
  const [selectedTone, setSelectedTone] = useState("white");
  const selected = colors.find((color) => color.tone === selectedTone)!;
  const controlId = useId();
  const filterId = `${controlId}-color`;
  const exteriorClipId = `${controlId}-exterior`;
  const previewTitleId = `${controlId}-preview-title`;
  const previewId = `${controlId}-preview`;

  // Tint the exterior only; the original image underneath keeps the interior intact.
  const colorMatrix = [
    ...selected.rgb.flatMap((channel) => {
      const value = channel / 255;
      return [
        0.2126 * 0.9 * value,
        0.7152 * 0.9 * value,
        0.0722 * 0.9 * value,
        0,
        0.33 * value,
      ];
    }),
    0,
    0,
    0,
    1,
    0,
  ].join(" ");

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
          Gris, beige o blanco. Podés dejar la superficie del panel vista o
          definir otros revestimientos según el proyecto.
        </p>
      </div>
      <fieldset className="technology-colors-picker">
        <legend>Elegí el color de la cara exterior.</legend>
        <div className="technology-colors-palette">
          {colors.map((color) => (
            <label key={color.tone} className="technology-colors-option">
              <input
                type="radio"
                name={`${controlId}-tone`}
                value={color.tone}
                checked={selectedTone === color.tone}
                onChange={() => setSelectedTone(color.tone)}
                aria-controls={previewId}
              />
              <span
                className="technology-colors-swatch"
                data-tone={color.tone}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <path
                    d="m5 12 4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <span className="technology-colors-name">{color.name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <figure className="technology-colors-preview" id={previewId}>
        <div className="technology-colors-stage">
          <div className="technology-colors-model">
            <span>Panel VBT150</span>
            <span>9-Form</span>
          </div>
          <svg
            className="technology-colors-panel"
            viewBox="70 0 560 700"
            width="560"
            height="700"
            role="img"
            aria-labelledby={previewTitleId}
          >
            <title id={previewTitleId}>
              {`Panel VBT150 9-Form con cara exterior en color ${selected.name.toLowerCase()} e interior en su color original`}
            </title>
            <defs>
              <clipPath id={exteriorClipId} clipPathUnits="userSpaceOnUse">
                <polygon points="278,335 590,129 590,510 278,690" />
              </clipPath>
              <filter id={filterId} colorInterpolationFilters="sRGB">
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values={colorMatrix}
                  result="exteriorColor"
                />
                {/* The original exterior is warm; the cool interior and top edges stay untouched. */}
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  128 -128 0 0 0"
                  result="exteriorMask"
                />
                <feComposite
                  in="exteriorColor"
                  in2="exteriorMask"
                  operator="in"
                />
              </filter>
            </defs>
            <image
              href="/images/technology/vbt150-panel.png"
              width="700"
              height="700"
            />
            <image
              href="/images/technology/vbt150-panel.png"
              width="700"
              height="700"
              filter={`url(#${filterId})`}
              clipPath={`url(#${exteriorClipId})`}
            />
          </svg>
          <p
            className="technology-colors-current"
            aria-live="polite"
            aria-atomic="true"
          >
            Cara exterior en <strong>{selected.name.toLowerCase()}</strong>
          </p>
        </div>
        <figcaption>
          Tonos orientativos en pantalla. Consultanos por muestras y
          disponibilidad.
        </figcaption>
      </figure>
      <Link href="/contacto" className="inner-action technology-colors-contact">
        Consultar colores y terminaciones <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
