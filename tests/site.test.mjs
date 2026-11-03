import test from "node:test";
import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
test("Las páginas enlazadas responden y tienen un único título principal", async () => {
  const queue = ["/"];
  const seen = new Set();
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    assert.ok(
      seen.size < 90,
      "El rastreo debe permanecer dentro del catálogo público",
    );
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, `${path}: respuesta incorrecta`);
    const html = await response.text();
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) || []).length,
      1,
      `${path}: título principal único`,
    );
    assert.doesNotMatch(
      html,
      /eyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/,
      `${path}: sin credenciales JWT`,
    );
    for (const match of html.matchAll(/href="(\/[^"?#]*)/g)) {
      const target = match[1];
      if (
        target.startsWith("//") ||
        target.startsWith("/_next") ||
        /\.[a-z0-9]+$/i.test(target)
      )
        continue;
      if (!seen.has(target)) queue.push(target);
    }
  }
  assert.ok(
    seen.size >= 30,
    `Se recorrieron ${seen.size} rutas; se esperaba el catálogo completo`,
  );
});
test("Recursos locales disponibles y página desconocida con 404", async () => {
  for (const path of [
    "/images/hero-institucional.webp",
    "/images/obra-detalle.webp",
    "/images/vivienda.webp",
    "/brand/logo-vbt.png",
    "/brand/logo-vbt-transparent.png",
    "/images/technology/vbt80-panel.png",
    "/images/technology/vbt150-panel.png",
    "/images/projects/dominguez-1.webp",
    "/fonts/InterVariable.woff2",
    "/robots.txt",
  ]) {
    assert.equal((await fetch(new URL(path, base))).status, 200, path);
  }
  assert.equal(
    (await fetch(new URL("/pagina-inexistente-de-prueba", base))).status,
    404,
  );
  const robots = await (await fetch(new URL("/robots.txt", base))).text();
  assert.match(
    robots,
    /Disallow: \//,
    "La revisión no debe indexarse antes del lanzamiento",
  );
});

test("La referencia financiera identifica fuente y fecha sin inventar UVA", async () => {
  const response = await fetch(new URL("/api/finance", base));
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.match(data.date, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new URL(data.referencesSource).hostname, "www.bna.com.ar");
  assert.ok(data.references.length > 0);
  if (data.uva !== null) {
    assert.ok(Number.isFinite(data.uva.value) && data.uva.value > 0);
    assert.equal(data.uva.date, data.date);
    assert.equal(new URL(data.uva.source).hostname, "api.bcra.gob.ar");
  } else {
    assert.equal(data.uvaStatus, "unavailable");
  }
});
