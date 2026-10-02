// --- Student Expense Planner ------------------------------------------------

export interface ExpenseItem {
  id: string;
  name: string;
  amount: string;
}

export interface ExpenseItemResult {
  id: string;
  name: string;
  amount: number;
  percentOfTotal: number;
  error?: string;
}

export interface ExpensePlanSummary {
  results: ExpenseItemResult[];
  totalExpenses: number;
  budget: number;
  remaining: number;
  overBudget: boolean;
}

export function calculateExpensePlan(
  items: ExpenseItem[],
  budget: number
): { ok: true; data: ExpensePlanSummary } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const results: ExpenseItemResult[] = [];

  if (Number.isNaN(budget) || budget < 0) {
    errors.push("Please enter a valid monthly budget.");
  }

  for (const item of items) {
    const name = item.name.trim() || "Untitled expense";
    const amount = Number(item.amount);
    if (item.amount.trim() === "" || Number.isNaN(amount) || amount < 0) {
      results.push({ id: item.id, name, amount: 0, percentOfTotal: 0, error: "Please enter a valid amount." });
      errors.push(`${name}: please enter a valid amount.`);
      continue;
    }
    results.push({ id: item.id, name, amount, percentOfTotal: 0 });
  }

  if (errors.length > 0) return { ok: false, errors };

  const totalExpenses = results.reduce((sum, r) => sum + r.amount, 0);
  const withPercent = results.map((r) => ({
    ...r,
    percentOfTotal: totalExpenses > 0 ? Math.round((r.amount / totalExpenses) * 10000) / 100 : 0,
  }));

  return {
    ok: true,
    data: {
      results: withPercent,
      totalExpenses: Math.round(totalExpenses * 100) / 100,
      budget: Math.round(budget * 100) / 100,
      remaining: Math.round((budget - totalExpenses) * 100) / 100,
      overBudget: totalExpenses > budget,
    },
  };
}

// --- Discount & Tax Calculator ----------------------------------------------

export interface DiscountTaxResult {
  discountAmount: number;
  priceAfterDiscount: number;
  taxAmount: number;
  finalPrice: number;
}

export function calculateDiscountTax(
  originalPrice: number,
  discountPercent: number,
  taxPercent: number
): { ok: true; data: DiscountTaxResult } | { ok: false; error: string } {
  if (Number.isNaN(originalPrice) || originalPrice < 0) {
    return { ok: false, error: "Please enter a valid price." };
  }
  if (Number.isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    return { ok: false, error: "Discount must be between 0 and 100%." };
  }
  if (Number.isNaN(taxPercent) || taxPercent < 0) {
    return { ok: false, error: "Tax must be zero or a positive percentage." };
  }

  const discountAmount = Math.round(originalPrice * (discountPercent / 100) * 100) / 100;
  const priceAfterDiscount = Math.round((originalPrice - discountAmount) * 100) / 100;
  const taxAmount = Math.round(priceAfterDiscount * (taxPercent / 100) * 100) / 100;
  const finalPrice = Math.round((priceAfterDiscount + taxAmount) * 100) / 100;

  return { ok: true, data: { discountAmount, priceAfterDiscount, taxAmount, finalPrice } };
}

// --- Interest Calculator -----------------------------------------------------

export type InterestType = "simple" | "compound";

export interface InterestResult {
  interestEarned: number;
  totalAmount: number;
}

export function calculateInterest(
  principal: number,
  ratePercent: number,
  years: number,
  type: InterestType,
  compoundsPerYear: number
): { ok: true; data: InterestResult } | { ok: false; error: string } {
  if (Number.isNaN(principal) || principal <= 0) return { ok: false, error: "Please enter a valid principal amount." };
  if (Number.isNaN(ratePercent) || ratePercent < 0) return { ok: false, error: "Please enter a valid interest rate." };
  if (Number.isNaN(years) || years <= 0) return { ok: false, error: "Please enter a valid time period." };

  let totalAmount: number;
  if (type === "simple") {
    totalAmount = principal + (principal * ratePercent * years) / 100;
  } else {
    if (Number.isNaN(compoundsPerYear) || compoundsPerYear <= 0) {
      return { ok: false, error: "Please enter a valid compounding frequency." };
    }
    const r = ratePercent / 100;
    totalAmount = principal * Math.pow(1 + r / compoundsPerYear, compoundsPerYear * years);
  }

  return {
    ok: true,
    data: {
      interestEarned: Math.round((totalAmount - principal) * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    },
  };
}
