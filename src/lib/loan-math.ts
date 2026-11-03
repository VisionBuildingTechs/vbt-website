export type LoanInput = { principal: number; tna: number; months: number };
export type LoanRow = {
  month: number;
  payment: number;
  interest: number;
  capital: number;
  balance: number;
};
export type LoanCalculation = {
  payment: number;
  monthlyRate: number;
  tea: number;
  totalInterest: number;
  totalPayments: number;
  schedule: LoanRow[];
};

/** French amortization, equal monthly periods, no fees. Values stay in the input unit. */
export function calculateLoan({
  principal,
  tna,
  months,
}: LoanInput): LoanCalculation {
  if (!Number.isFinite(principal) || principal < 0 || principal > 1e14)
    throw new RangeError(
      "El capital debe ser un número entre 0 y 100 billones.",
    );
  if (!Number.isFinite(tna) || tna < 0 || tna > 1000)
    throw new RangeError("La TNA debe estar entre 0% y 1.000%.");
  if (!Number.isInteger(months) || months < 1 || months > 360)
    throw new RangeError(
      "El plazo debe ser un número entero entre 1 y 360 meses.",
    );
  const monthlyRate = tna / 1200;
  const payment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate) /
        -Math.expm1(-months * Math.log1p(monthlyRate));
  const tea = Math.expm1(12 * Math.log1p(monthlyRate)) * 100;
  let balance = principal;
  let totalInterest = 0;
  const schedule: LoanRow[] = [];
  for (let month = 1; month <= months; month++) {
    // PV of remaining payments avoids cancellation when payment and interest
    // are nearly equal at high rates and long terms.
    const remaining = months - month;
    const nextBalance =
      remaining === 0
        ? 0
        : monthlyRate === 0
          ? (principal * remaining) / months
          : (payment / monthlyRate) *
            -Math.expm1(-remaining * Math.log1p(monthlyRate));
    const boundedBalance = Math.max(0, Math.min(balance, nextBalance));
    const capital = balance - boundedBalance;
    const interest = Math.max(0, payment - capital);
    balance = boundedBalance;
    totalInterest += interest;
    schedule.push({
      month,
      payment: capital + interest,
      interest,
      capital,
      balance,
    });
  }
  return {
    payment,
    monthlyRate,
    tea,
    totalInterest,
    totalPayments: principal + totalInterest,
    schedule,
  };
}

export function validateFinancing(
  total: number,
  advance: number,
  principal: number,
): string | null {
  if (![total, advance, principal].every(Number.isFinite))
    return "Completá los importes con números válidos.";
  if (total <= 0 || total > 1e14)
    return "Ingresá un valor de proyecto mayor a cero.";
  if (advance < 0 || principal < 0)
    return "El anticipo y el monto a pedir no pueden ser negativos.";
  if (advance > total || principal > total)
    return "El anticipo o el préstamo no pueden superar el valor del proyecto.";
  if (Math.abs(total - advance - principal) > 0.02)
    return "El anticipo y el monto a pedir deben sumar el valor del proyecto.";
  return null;
}
