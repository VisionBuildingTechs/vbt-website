"use client";
import { FormEvent, useEffect, useState } from "react";
import { houseCatalog } from "@/lib/house-catalog";
import { Arrow } from "./icons";
import {
  contactRegions,
  contactEmails,
  type ContactRegion,
} from "@/lib/contact";
export default function ContactForm() {
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [region, setRegion] = useState<ContactRegion>("argentina");
  const [model, setModel] = useState("");
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("modelo");
    if (houseCatalog.some((item) => item.slug === slug)) setModel(slug!);
  }, []);
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const selectedModel = houseCatalog.find(
      (item) => item.slug === d.get("model"),
    );
    if (
      String(d.get("name")).trim().length < 2 ||
      String(d.get("location")).trim().length < 2 ||
      String(d.get("message")).trim().length < 10
    ) {
      setError(
        "Completá tu nombre, ubicación y un mensaje de al menos 10 caracteres, sin contar espacios al inicio o al final.",
      );
      setDraft("");
      return;
    }
    setError("");
    setDraft(
      `Hola, equipo VBT. Soy ${String(d.get("name")).trim()}.\n\nConsulta: ${d.get("topic")}${selectedModel ? `\nProyecto de interés: ${selectedModel.title}` : ""}\nUbicación: ${String(d.get("location")).trim()}\nProfesional o empresa con la que trabajo: ${String(d.get("partner") || "Aún no definido").trim()}\n\n${String(d.get("message")).trim()}\n\nMe interesa recibir orientación y coordinar el próximo paso.`,
    );
    setCopied(false);
  }
  return (
    <div className="contact-form-wrap">
      <form
        onSubmit={prepare}
        onChange={() => {
          setDraft("");
          setError("");
          setCopied(false);
        }}
        className="contact-form"
      >
        <label>
          ¿Con qué equipo querés conversar?
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as ContactRegion)}
            name="region"
          >
            <option value="argentina">
              Argentina · {contactRegions.argentina.phone}
            </option>
            <option value="panama">
              Panamá · {contactRegions.panama.phone}
            </option>
          </select>
        </label>
        <label>
          Proyecto de vivienda de interés <span>(opcional)</span>
          <select
            name="model"
            value={model}
            onChange={(event) => setModel(event.target.value)}
          >
            <option value="">Consulta general / tengo otro proyecto</option>
            {houseCatalog.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <div className="form-pair">
          <label>
            Tu nombre
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Nombre y apellido"
            />
          </label>
          <label>
            ¿Dónde está el proyecto?
            <input
              name="location"
              autoComplete="address-level2"
              required
              maxLength={150}
              placeholder="Ciudad, provincia y país"
            />
          </label>
        </div>
        <label>
          ¿En qué podemos ayudarte?
          <select name="topic" defaultValue="Evaluar un proyecto">
            <option>Evaluar un proyecto</option>
            <option>Consultar documentación técnica</option>
            <option>Construir con VBT</option>
            <option>Viviendas con aliados</option>
            <option>Formar parte de la red</option>
            <option>Otra consulta</option>
          </select>
        </label>
        <label>
          ¿Ya trabajás con un profesional o constructor? <span>(opcional)</span>
          <input
            name="partner"
            maxLength={150}
            placeholder="Su nombre o empresa, para acompañar esa relación"
          />
        </label>
        <label>
          Contanos tu idea
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={5}
            placeholder="Uso, etapa del proyecto, superficie aproximada y qué necesitás resolver."
          />
        </label>
        <label className="form-consent">
          <input type="checkbox" required />
          <span>
            Leí la <a href="/privacidad">información de privacidad</a> y quiero
            preparar esta consulta para enviarla al canal de VBT.
          </span>
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <button className="button primary" type="submit">
          Preparar mi consulta <Arrow />
        </button>
        <p className="form-note">
          Revisás el mensaje y elegís enviarlo por WhatsApp o email. Este
          formulario no almacena ni envía tus datos automáticamente.
        </p>
      </form>
      {draft && (
        <section
          className="contact-draft"
          aria-label="Consulta preparada"
          role="status"
        >
          <h3>Tu consulta, lista para revisar.</h3>
          <pre>{draft}</pre>
          <div className="draft-actions">
            <a
              className="button primary"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${contactRegions[region].whatsapp}?text=${encodeURIComponent(draft)}`}
            >
              Continuar en WhatsApp <Arrow diagonal />
            </a>
            <a
              className="button secondary"
              href={`mailto:${contactEmails.general}?subject=${encodeURIComponent("Consulta web VBT · " + contactRegions[region].label)}&body=${encodeURIComponent(draft)}`}
            >
              Enviar por email <Arrow diagonal />
            </a>
            <button
              className="button secondary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(draft);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Consulta copiada" : "Copiar consulta"}
            </button>
          </div>
          <p>
            Equipo de {contactRegions[region].label}:{" "}
            {contactRegions[region].phone}. Revisás y confirmás el envío en
            WhatsApp o en tu aplicación de correo.
          </p>
        </section>
      )}
    </div>
  );
}
