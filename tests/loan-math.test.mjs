import test from "node:test";
import assert from "node:assert/strict";
import { calculateLoan, validateFinancing } from "../src/lib/loan-math.ts";

test("Cuota francesa coincide con un caso de referencia independiente", () => {
  const result = calculateLoan({ principal: 100000, tna: 12, months: 12 });
  assert.ok(Math.abs(result.payment - 8884.878867834) < 0.00001);
  assert.ok(Math.abs(result.tea - 12.68250301319698) < 0.00001);
});
test("Tasa cero, capital cero y plazo de un mes", () => {
  const zero = calculateLoan({ principal: 120000, tna: 0, months: 12 });
  assert.equal(zero.payment, 10000);
  assert.equal(zero.totalInterest, 0);
  assert.equal(
    calculateLoan({ principal: 0, tna: 6.7, months: 240 }).payment,
    0,
  );
  assert.ok(
    Math.abs(
      calculateLoan({ principal: 100000, tna: 12, months: 1 }).payment - 101000,
    ) < 0.00001,
  );
});
test("Amortización conserva capital y termina sin saldo", () => {
  const result = calculateLoan({ principal: 75000000, tna: 6.7, months: 360 });
  assert.equal(result.schedule.at(-1).balance, 0);
  assert.ok(
    Math.abs(
      result.schedule.reduce((sum, row) => sum + row.capital, 0) - 75000000,
    ) < 0.01,
  );
  assert.ok(
    Math.abs(
      result.schedule.reduce((sum, row) => sum + row.payment, 0) -
        result.totalPayments,
    ) < 0.01,
  );
  assert.ok(
    result.schedule.every((row) => row.balance >= 0 && row.capital >= 0),
  );
});
test("La conversión UVA conserva la equivalencia de la cuota inicial", () => {
  const pesos = calculateLoan({ principal: 75000000, tna: 6.7, months: 240 });
  const uvas = calculateLoan({
    principal: 75000000 / 2181.5,
    tna: 6.7,
    months: 240,
  });
  assert.ok(Math.abs(uvas.payment * 2181.5 - pesos.payment) < 0.00001);
});
test("Cuotas constantes también a tasas altas y casi nulas", () => {
  for (const tna of [0.00000001, 100, 200, 1000]) {
    const result = calculateLoan({ principal: 75000000, tna, months: 360 });
    assert.equal(result.schedule.at(-1).balance, 0);
    assert.ok(
      result.schedule.every(
        (row) => Math.abs(row.payment - result.payment) < 0.01,
      ),
      `TNA ${tna}`,
    );
    assert.ok(Math.abs(result.totalPayments - result.payment * 360) < 0.01);
    assert.ok(
      Math.abs(
        result.schedule.reduce((sum, row) => sum + row.capital, 0) - 75000000,
      ) < 0.01,
    );
  }
});
test("Entradas inválidas no producen resultados financieros", () => {
  for (const bad of [NaN, Infinity, -1])
    assert.throws(
      () => calculateLoan({ principal: bad, tna: 6.7, months: 240 }),
      RangeError,
    );
  for (const bad of [NaN, Infinity, -1, 1001])
    assert.throws(
      () => calculateLoan({ principal: 100000, tna: bad, months: 240 }),
      RangeError,
    );
  for (const bad of [0, 361, 1.5, NaN])
    assert.throws(
      () => calculateLoan({ principal: 100000, tna: 6.7, months: bad }),
      RangeError,
    );
  assert.ok(validateFinancing(100000, 110000, -10000));
  assert.ok(validateFinancing(100000, 25000, 70000));
  assert.equal(validateFinancing(100000, 25000, 75000), null);
});
