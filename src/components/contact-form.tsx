"use client";
import { FormEvent, useState } from "react";
import { Arrow } from "./icons";
export default function ContactForm() {
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
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
      `Hola, equipo VBT. Soy ${String(d.get("name")).trim()}.\n\nConsulta: ${d.get("topic")}\nUbicación: ${String(d.get("location")).trim()}\nProfesional o empresa con la que trabajo: ${String(d.get("partner") || "Aún no definido").trim()}\n\n${String(d.get("message")).trim()}\n\nMe interesa recibir orientación y coordinar el próximo paso.`,
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
          Revisás el mensaje y elegís enviarlo por WhatsApp. Este formulario no
          almacena ni envía tus datos automáticamente.
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
              href={`https://wa.me/50766284172?text=${encodeURIComponent(draft)}`}
            >
              Continuar en WhatsApp <Arrow diagonal />
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
            Usamos el canal de contacto publicado por Vision Latam. El mensaje
            se envía cuando lo confirmás en WhatsApp.
          </p>
        </section>
      )}
    </div>
  );
}
