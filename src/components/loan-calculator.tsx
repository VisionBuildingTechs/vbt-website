"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { calculateLoan, validateFinancing } from "@/lib/loan-math";
import MoneyInput from "./money-input";
import {
  argentinaDate,
  BNA_SIMULATOR_URL,
  BNA_URL,
  rateReferences,
  type FinanceData,
} from "@/lib/finance-data";
import "./loan-calculator.css";

const money = (n: number, digits = 0) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
const decimal = (n: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat("es-AR", { maximumFractionDigits }).format(n);
const displayDate = (date: string) => date.split("-").reverse().join("/");
const initialAmounts = {
  total: "100000000",
  advance: "25000000",
  amount: "75000000",
};

export default function LoanCalculator({
  labelledBy,
}: {
  labelledBy?: string;
}) {
  const [amounts, setAmounts] = useState(initialAmounts);
  const [mode, setMode] = useState<"uva" | "pesos">("uva");
  const [tna, setTna] = useState("6.7");
  const [months, setMonths] = useState("240");
  const [charges, setCharges] = useState("0");
  const [income, setIncome] = useState("");
  const [uva, setUva] = useState("");
  const [manualUva, setManualUva] = useState(false);
  const [selectedReference, setSelectedReference] = useState<number | null>(
    6.7,
  );
  const [financeData, setFinanceData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const editedUva = useRef(false);
  const today = argentinaDate();
  const officialUva = financeData?.uva?.date === today ? financeData.uva : null;
  const effectiveUva = manualUva || officialUva ? Number(uva) : 0;

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 16000);
    fetch("/api/finance", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Datos no disponibles");
        return response.json() as Promise<FinanceData>;
      })
      .then((data) => {
        if (!active) return;
        setFinanceData(data);
        if (
          data.uva &&
          data.uva.date === argentinaDate() &&
          Number.isFinite(data.uva.value) &&
          data.uva.value > 0 &&
          !editedUva.current
        ) {
          setUva(String(data.uva.value));
          setManualUva(false);
        }
      })
      .catch(() => {
        /* The editable scenario remains available without a network response. */
      })
      .finally(() => {
        clearTimeout(timer);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  function updateAmount(field: keyof typeof amounts, value: string) {
    setAmounts((current) => {
      const next = { ...current, [field]: value };
      if (value.trim() === "") {
        if (field !== "total")
          next[field === "advance" ? "amount" : "advance"] = "";
        return next;
      }
      const number = Number(value);
      const total = Number(next.total);
      if (
        Number.isFinite(number) &&
        Number.isFinite(total) &&
        next.total !== ""
      ) {
        if (field === "advance")
          next.amount = String(Math.round((total - number) * 100) / 100);
        else if (field === "amount")
          next.advance = String(Math.round((total - number) * 100) / 100);
        else if (next.advance !== "")
          next.amount = String(
            Math.round((total - Number(next.advance)) * 100) / 100,
          );
      }
      return next;
    });
  }

  const calculation = useMemo(() => {
    const total = Number(amounts.total),
      advance = Number(amounts.advance),
      principal = Number(amounts.amount);
    if (
      Object.values(amounts).some((value) => value.trim() === "") ||
      tna.trim() === "" ||
      months.trim() === "" ||
      charges.trim() === ""
    )
      return {
        error: "Completá los importes, la tasa y el plazo para simular.",
      };
    const error = validateFinancing(total, advance, principal);
    if (error) return { error };
    const monthlyCharges = Number(charges);
    if (
      !Number.isFinite(monthlyCharges) ||
      monthlyCharges < 0 ||
      monthlyCharges > 1e12
    )
      return {
        error:
          "Los gastos mensuales deben ser un importe válido mayor o igual a cero.",
      };
    if (
      income !== "" &&
      (!Number.isFinite(Number(income)) || Number(income) <= 0)
    )
      return {
        error: "Ingresá ingresos mayores a cero o dejá ese campo vacío.",
      };
    if (
      mode === "uva" &&
      uva !== "" &&
      (!Number.isFinite(Number(uva)) || Number(uva) <= 0)
    )
      return { error: "El valor de una UVA debe ser mayor a cero." };
    try {
      const result = calculateLoan({
        principal,
        tna: Number(tna),
        months: Number(months),
      });
      const uvaResult =
        mode === "uva" && effectiveUva > 0
          ? calculateLoan({
              principal: principal / effectiveUva,
              tna: Number(tna),
              months: Number(months),
            })
          : null;
      return {
        error: null,
        result,
        uvaResult,
        total,
        advance,
        principal,
        monthlyCharges,
        initialPayment: result.payment + monthlyCharges,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "Revisá los datos ingresados.",
      };
    }
  }, [amounts, tna, months, charges, income, uva, mode, effectiveUva, today]);

  const result = "result" in calculation ? calculation.result : null;
  const advancePercentage =
    Number(amounts.total) > 0
      ? (Number(amounts.advance) / Number(amounts.total)) * 100
      : 0;
  const scheduleResult = calculation.error
    ? null
    : mode === "uva"
      ? calculation.uvaResult
      : calculation.result;
  const selectedRows =
    scheduleResult?.schedule.filter(
      (row) =>
        row.month <= 12 || row.month % 12 === 0 || row.month === Number(months),
    ) ?? [];
  const reviewedAt = financeData?.referencesReviewedAt ?? "2026-11-03";

  return (
    <section
      id="calculadora"
      className={`loan-calculator${labelledBy ? " loan-calculator-embedded" : ""}`}
      aria-labelledby={labelledBy ?? "loan-title"}
    >
      <div className="container">
        {!labelledBy && (
          <div className="loan-heading">
            <div>
              <p className="loan-kicker">SIMULADOR / TU ESCENARIO</p>
              <h2 id="loan-title">
                Poné tu proyecto
                <br />
                en números.
              </h2>
            </div>
            <p>
              Probá anticipo, capital, plazo y tasa. Compará una cuota inicial y
              ajustá los datos a tu situación.
            </p>
          </div>
        )}
        <div className="loan-layout">
          <div className="loan-inputs">
            <fieldset className="loan-mode">
              <legend>Cómo querés simular</legend>
              <label>
                <input
                  type="radio"
                  name="loan-mode"
                  checked={mode === "uva"}
                  onChange={() => setMode("uva")}
                />
                <span>Crédito UVA</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="loan-mode"
                  checked={mode === "pesos"}
                  onChange={() => {
                    setMode("pesos");
                    setSelectedReference(null);
                  }}
                />
                <span>Pesos · tasa fija</span>
              </label>
            </fieldset>
            <div className="loan-pair">
              <label htmlFor="loan-total">
                Valor del proyecto o vivienda
                <span className="loan-input-affix">
                  <span>$</span>
                  <MoneyInput
                    id="loan-total"
                    name="loan-total"
                    value={amounts.total}
                    onValueChange={(value) => updateAmount("total", value)}
                  />
                </span>
              </label>
              <label htmlFor="loan-advance">
                Anticipo / aporte propio
                <span className="loan-input-affix">
                  <span>$</span>
                  <MoneyInput
                    id="loan-advance"
                    name="loan-advance"
                    value={amounts.advance}
                    onValueChange={(value) => updateAmount("advance", value)}
                  />
                </span>
              </label>
            </div>
            <div className="loan-advance-line">
              <label htmlFor="loan-advance-range">
                Aporte propio{" "}
                <strong>
                  {Number.isFinite(advancePercentage)
                    ? decimal(advancePercentage, 1)
                    : "—"}
                  %
                </strong>
              </label>
              <input
                id="loan-advance-range"
                type="range"
                min="0"
                max="100"
                step="1"
                value={
                  Number.isFinite(advancePercentage)
                    ? Math.max(0, Math.min(100, advancePercentage))
                    : 0
                }
                onChange={(event) =>
                  updateAmount(
                    "advance",
                    String(
                      Math.round(
                        (Number(amounts.total) * Number(event.target.value)) /
                          100,
                      ),
                    ),
                  )
                }
              />
            </div>
            <label htmlFor="loan-principal">
              Monto a pedir
              <span className="loan-input-affix">
                <span>$</span>
                <MoneyInput
                  id="loan-principal"
                  name="loan-principal"
                  value={amounts.amount}
                  onValueChange={(value) => updateAmount("amount", value)}
                />
              </span>
              <small>Si cambiás este monto, se ajusta el anticipo.</small>
            </label>
            <div className="loan-pair">
              <label htmlFor="loan-rate">
                Tasa nominal anual (TNA)
                <span className="loan-input-affix">
                  <input
                    id="loan-rate"
                    name="loan-rate"
                    type="number"
                    min="0"
                    max="1000"
                    step="0.01"
                    inputMode="decimal"
                    value={tna}
                    onChange={(event) => {
                      setTna(event.target.value);
                      setSelectedReference(null);
                    }}
                  />
                  <span>%</span>
                </span>
              </label>
              <label htmlFor="loan-months">
                Plazo de financiación
                <span className="loan-input-affix">
                  <input
                    id="loan-months"
                    name="loan-months"
                    type="number"
                    min="1"
                    max="360"
                    step="1"
                    inputMode="numeric"
                    value={months}
                    onChange={(event) => setMonths(event.target.value)}
                  />
                  <span>meses</span>
                </span>
                <small>
                  {Number(months) > 0 && Number.isFinite(Number(months))
                    ? `${decimal(Number(months) / 12, 1)} años`
                    : "De 1 a 360 meses"}
                </small>
              </label>
            </div>
            <div className="loan-term-buttons" aria-label="Plazos habituales">
              {[60, 120, 180, 240, 300, 360].map((term) => (
                <button
                  key={term}
                  type="button"
                  aria-pressed={Number(months) === term}
                  onClick={() => setMonths(String(term))}
                >
                  {term / 12} años
                </button>
              ))}
            </div>
            <div className="loan-references">
              <p>
                Referencias publicadas por BNA <span>para créditos UVA</span>
              </p>
              <div>
                {rateReferences.map((reference) => (
                  <button
                    type="button"
                    key={reference.tna}
                    disabled={mode !== "uva"}
                    aria-pressed={
                      selectedReference === reference.tna && mode === "uva"
                    }
                    onClick={() => {
                      setTna(String(reference.tna));
                      setSelectedReference(reference.tna);
                    }}
                  >
                    {reference.label}
                  </button>
                ))}
              </div>
              <p className="loan-reference-note">
                {mode === "uva" && selectedReference !== null
                  ? rateReferences.find(
                      (reference) => reference.tna === selectedReference,
                    )?.description
                  : "Tasa ingresada por vos para este escenario; no expresa una oferta bancaria."}
              </p>
              <a href={BNA_URL} target="_blank" rel="noopener noreferrer">
                Ver condiciones BNA ↗
              </a>
              <small>
                Referencia revisada el {displayDate(reviewedAt)}. Confirmá su
                vigencia y tu segmento con el banco. La tasa siempre puede
                editarse.
              </small>
            </div>
            {mode === "uva" && (
              <div className="loan-uva">
                <label htmlFor="loan-uva">
                  Valor de una UVA en pesos
                  <span className="loan-input-affix">
                    <span>$</span>
                    <MoneyInput
                      id="loan-uva"
                      placeholder={
                        loading
                          ? "Consultando BCRA…"
                          : "Opcional: ingresar valor"
                      }
                      value={manualUva || officialUva ? uva : ""}
                      onValueChange={(value) => {
                        editedUva.current = true;
                        setManualUva(true);
                        setUva(value);
                      }}
                    />
                  </span>
                </label>
                <p>
                  {manualUva
                    ? "Valor ingresado manualmente para este escenario."
                    : officialUva
                      ? `BCRA · valor para el ${displayDate(officialUva.date)}: ${money(officialUva.value, 2)} por UVA.`
                      : loading
                        ? "Consultando el valor oficial correspondiente a hoy…"
                        : "No se obtuvo un valor oficial de hoy. Podés ingresarlo manualmente; la cuota inicial en pesos se puede estimar igual."}
                </p>
                {officialUva && (
                  <button
                    type="button"
                    onClick={() => {
                      editedUva.current = false;
                      setUva(String(officialUva.value));
                      setManualUva(false);
                    }}
                  >
                    Usar UVA oficial del {displayDate(officialUva.date)}
                  </button>
                )}
              </div>
            )}
            <details className="loan-extra">
              <summary>
                Sumar gastos e ingresos al escenario{" "}
                <span aria-hidden="true">+</span>
              </summary>
              <div className="loan-pair">
                <label htmlFor="loan-charges">
                  Gastos mensuales estimados
                  <span className="loan-input-affix">
                    <span>$</span>
                    <MoneyInput
                      id="loan-charges"
                      value={charges}
                      onValueChange={setCharges}
                    />
                  </span>
                  <small>
                    Se suman a la cuota inicial. No se obtienen del banco.
                  </small>
                </label>
                <label htmlFor="loan-income">
                  Ingresos mensuales (opcional)
                  <span className="loan-input-affix">
                    <span>$</span>
                    <MoneyInput
                      id="loan-income"
                      value={income}
                      placeholder="Sin completar"
                      onValueChange={setIncome}
                    />
                  </span>
                  <small>
                    Sólo para ver la relación cuota/ingreso; no determina
                    aprobación.
                  </small>
                </label>
              </div>
            </details>
            <p className="loan-local">
              La simulación se calcula en tu navegador. Los importes que
              ingresás no se envían ni se guardan.
            </p>
          </div>
          <div className="loan-result-column">
            <div
              className="loan-result"
              aria-label="Resultado de la simulación"
            >
              <p className="loan-kicker">
                {mode === "uva"
                  ? "CUOTA INICIAL ESTIMADA / ARS"
                  : "CUOTA MENSUAL ESTIMADA / ARS"}
              </p>
              {calculation.error ? (
                <div className="loan-error" role="alert">
                  <h3>Revisá los datos.</h3>
                  <p>{calculation.error}</p>
                </div>
              ) : (
                result && (
                  <>
                    <p className="loan-payment">
                      <output aria-live="polite" aria-atomic="true">
                        {money(calculation.initialPayment!)}
                      </output>
                      <span>/ mes</span>
                    </p>
                    <p className="loan-payment-note">
                      {mode === "uva"
                        ? "Equivalente inicial en pesos. Las cuotas posteriores cambian con la UVA."
                        : "Escenario matemático de tasa fija en pesos. No representa un producto ofrecido por BNA."}
                    </p>
                    <div className="loan-result-breakdown">
                      <div>
                        <span>Capital + interés</span>
                        <strong>{money(result.payment)}</strong>
                      </div>
                      <div>
                        <span>Gastos que agregaste</span>
                        <strong>{money(calculation.monthlyCharges!)}</strong>
                      </div>
                      {calculation.uvaResult && (
                        <div>
                          <span>Cuota base en UVA</span>
                          <strong>
                            {decimal(calculation.uvaResult.payment, 3)} UVA
                          </strong>
                        </div>
                      )}
                    </div>
                    <div
                      className="loan-funding"
                      aria-label={`Aporte propio ${decimal(advancePercentage, 1)} por ciento`}
                    >
                      <span
                        style={{
                          width: `${Math.max(0, Math.min(100, advancePercentage))}%`,
                        }}
                      />
                    </div>
                    <dl className="loan-key-values">
                      <div>
                        <dt>Tu aporte</dt>
                        <dd>{money(calculation.advance!)}</dd>
                      </div>
                      <div>
                        <dt>Capital solicitado</dt>
                        <dd>{money(calculation.principal!)}</dd>
                      </div>
                      <div>
                        <dt>Financiación sobre el valor</dt>
                        <dd>{decimal(100 - advancePercentage, 1)}%</dd>
                      </div>
                      <div>
                        <dt>Plazo</dt>
                        <dd>{months} meses</dd>
                      </div>
                      <div>
                        <dt>TNA utilizada</dt>
                        <dd>{decimal(Number(tna))}%</dd>
                      </div>
                      <div>
                        <dt>TEA sólo de interés</dt>
                        <dd>{decimal(result.tea)}%</dd>
                      </div>
                      {income !== "" && (
                        <div>
                          <dt>Cuota inicial / ingreso</dt>
                          <dd>
                            {decimal(
                              (calculation.initialPayment! / Number(income)) *
                                100,
                              1,
                            )}
                            %
                          </dd>
                        </div>
                      )}
                    </dl>
                    {calculation.principal === 0 && (
                      <p className="loan-result-alert">
                        Con ese aporte no queda capital por financiar.
                      </p>
                    )}
                    {mode === "pesos" ? (
                      <div className="loan-total">
                        <span>Total del escenario nominal</span>
                        <strong>
                          {money(
                            result.totalPayments +
                              calculation.monthlyCharges! * Number(months),
                          )}
                        </strong>
                        <small>
                          Supone la misma tasa y los mismos gastos durante todo
                          el plazo. No incluye otros costos.
                        </small>
                      </div>
                    ) : calculation.uvaResult ? (
                      <div className="loan-total">
                        <span>Total de cuotas base, en UVA</span>
                        <strong>
                          {decimal(calculation.uvaResult.totalPayments, 2)} UVA
                        </strong>
                        <small>
                          Capital e intereses, sin gastos. No es un total futuro
                          en pesos.
                        </small>
                      </div>
                    ) : null}
                  </>
                )
              )}
              <a
                className="loan-bank-link"
                href={BNA_SIMULATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comparar en el simulador BNA <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="loan-result-disclosure">
              VBT no otorga préstamos. El banco evalúa la solicitud, el proyecto
              y el proveedor. El resultado es orientativo y no constituye oferta
              ni aprobación crediticia.
            </p>
          </div>
        </div>
        {!calculation.error && scheduleResult && (
          <details className="loan-schedule">
            <summary>
              Ver capital, interés y saldo en el tiempo{" "}
              <span aria-hidden="true">+</span>
            </summary>
            <p>
              {mode === "uva"
                ? "Valores expresados en UVA, sin gastos. Los equivalentes futuros en pesos no se proyectan."
                : "Valores en pesos del escenario nominal, sin gastos."}{" "}
              Se muestran los primeros 12 meses y luego cada cierre anual.
            </p>
            <div className="loan-table-wrap">
              <table>
                <caption>
                  Amortización por sistema francés ·{" "}
                  {mode === "uva" ? "UVA" : "ARS"}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Mes</th>
                    <th scope="col">Cuota base</th>
                    <th scope="col">Interés</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRows.map((row) => (
                    <tr key={row.month}>
                      <th scope="row">{row.month}</th>
                      {[
                        row.payment,
                        row.interest,
                        row.capital,
                        row.balance,
                      ].map((value, index) => (
                        <td key={index}>
                          {mode === "uva" ? decimal(value, 3) : money(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}
        <div className="loan-assumptions">
          <h3>Qué contempla esta estimación.</h3>
          <p>
            Sistema francés, períodos mensuales regulares y capital totalmente
            desembolsado. La TNA se divide por 12. La TEA mostrada considera
            sólo interés y no es CFT. No incluye automáticamente seguros, IVA,
            escribanía, prima CVS, días irregulares ni otros cargos. Si agregás
            gastos, son supuestos tuyos.
          </p>
          <p>
            Para construcción, la cuota corresponde a una etapa posterior al
            desembolso completo: no simula desembolsos, intereses durante obra
            ni consolidación. Esos flujos se verifican con BNA. En UVA, la cuota
            en pesos varía; esta herramienta no predice inflación ni valor
            futuro de la unidad.
          </p>
        </div>
      </div>
    </section>
  );
}
