/**
 * QuantoPerdi - Financial Calculators
 * All calculations are realistic and use well-known financial formulas.
 */

// Historical IPCA (Brazilian inflation) average rates by decade
const IPCA_ANNUAL_AVERAGES = {
  2024: 4.83,
  2023: 4.62,
  2022: 5.79,
  2021: 10.06,
  2020: 4.52,
  2019: 4.31,
  2018: 3.75,
  2017: 2.95,
  2016: 6.29,
  2015: 10.67,
  2014: 6.41,
  2013: 5.91,
  2012: 5.84,
  2011: 6.50,
  2010: 5.91,
  2009: 4.31,
  2008: 5.90,
  2007: 4.46,
  2006: 3.14,
  2005: 5.69,
  2004: 7.60,
  2003: 9.30,
  2002: 12.53,
  2001: 7.67,
  2000: 5.97,
  1999: 8.94,
  1998: 1.66,
  1997: 5.22,
  1996: 9.56,
  1995: 22.41,
};

// Average annual investment returns (Brazil)
const INVESTMENT_RATES = {
  poupanca: 0.065,    // ~6.5% a.a. (historical average)
  cdi: 0.108,         // ~10.8% a.a. (historical average)
  ibovespa: 0.13,     // ~13% a.a. (historical average with dividends)
  sp500brl: 0.18,     // ~18% a.a. in BRL (S&P 500 + dollar appreciation)
  bitcoin: 0.80,      // ~80% a.a. (2015-2024 average, high volatility)
};

/**
 * Calculate how much money was "lost" by not investing.
 * Uses compound interest formula: FV = PV(1+r)^n + PMT * [((1+r)^n - 1) / r]
 * 
 * @param {number} initialValue - Initial investment value (R$)
 * @param {number} monthlyContribution - Monthly contribution (R$)
 * @param {number} startYear - Year the investment would have started
 * @param {string} investmentType - Type of investment (poupanca, cdi, ibovespa, sp500brl, bitcoin)
 * @returns {object} Result with finalValue, totalInvested, profit, monthlyRate, years
 */
export function calcInvestmentLoss(initialValue, monthlyContribution, startYear, investmentType = 'cdi') {
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;
  
  if (years <= 0) return { finalValue: initialValue, totalInvested: initialValue, profit: 0, years: 0 };
  
  const annualRate = INVESTMENT_RATES[investmentType] || INVESTMENT_RATES.cdi;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const totalMonths = years * 12;
  
  // Future Value of initial investment
  const fvInitial = initialValue * Math.pow(1 + monthlyRate, totalMonths);
  
  // Future Value of monthly contributions (annuity)
  const fvContributions = monthlyContribution > 0
    ? monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
    : 0;
  
  const finalValue = fvInitial + fvContributions;
  const totalInvested = initialValue + (monthlyContribution * totalMonths);
  const profit = finalValue - totalInvested;
  
  return {
    finalValue: Math.round(finalValue * 100) / 100,
    totalInvested: Math.round(totalInvested * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    years,
    monthlyRate: Math.round(monthlyRate * 10000) / 100,
    annualRate: Math.round(annualRate * 100),
  };
}

/**
 * Calculate total amount paid on credit card debt with compound interest.
 * Formula: Total = P * (1 + r)^n
 * 
 * @param {number} debtValue - Initial debt value (R$)
 * @param {number} monthlyRate - Monthly interest rate (e.g., 12 for 12%)
 * @param {number} months - Number of months
 * @returns {object} Result with totalPaid, interestPaid, multiplier
 */
export function calcCreditCardDebt(debtValue, monthlyRate, months) {
  const rate = monthlyRate / 100;
  const totalPaid = debtValue * Math.pow(1 + rate, months);
  const interestPaid = totalPaid - debtValue;
  
  return {
    totalPaid: Math.round(totalPaid * 100) / 100,
    interestPaid: Math.round(interestPaid * 100) / 100,
    multiplier: Math.round((totalPaid / debtValue) * 100) / 100,
    months,
  };
}

/**
 * Calculate accumulated invisible expenses over time.
 * 
 * @param {number} amount - Daily or monthly expense (R$)
 * @param {'daily'|'monthly'} frequency - Expense frequency
 * @returns {object} Losses at different time horizons
 */
export function calcInvisibleExpenses(amount, frequency = 'daily') {
  const monthlyAmount = frequency === 'daily' ? amount * 30 : amount;
  const dailyAmount = frequency === 'daily' ? amount : amount / 30;
  
  return {
    daily: Math.round(dailyAmount * 100) / 100,
    monthly: Math.round(monthlyAmount * 100) / 100,
    sixMonths: Math.round(monthlyAmount * 6 * 100) / 100,
    yearly: Math.round(monthlyAmount * 12 * 100) / 100,
    fiveYears: Math.round(monthlyAmount * 60 * 100) / 100,
    tenYears: Math.round(monthlyAmount * 120 * 100) / 100,
    // If invested in CDI instead
    tenYearsInvested: Math.round(
      calcInvestmentLoss(0, monthlyAmount, new Date().getFullYear() - 10, 'cdi').finalValue * 100
    ) / 100,
  };
}

/**
 * Calculate purchasing power loss due to inflation.
 * Uses historical IPCA data when available.
 * 
 * @param {number} value - Original value (R$)
 * @param {number} startYear - Year of the original value
 * @returns {object} Current purchasing power and loss
 */
export function calcInflationLoss(value, startYear) {
  const currentYear = new Date().getFullYear();
  
  if (startYear >= currentYear) {
    return { currentPower: value, loss: 0, percentLoss: 0, years: 0 };
  }
  
  let accumulatedInflation = 1;
  
  for (let year = startYear; year < currentYear; year++) {
    const rate = IPCA_ANNUAL_AVERAGES[year] || 5.0; // 5% default if no data
    accumulatedInflation *= (1 + rate / 100);
  }
  
  const equivalentValue = value * accumulatedInflation;
  const currentPower = value / accumulatedInflation * value;
  const loss = equivalentValue - value;
  const percentLoss = ((accumulatedInflation - 1) * 100);
  
  return {
    originalValue: value,
    equivalentToday: Math.round(equivalentValue * 100) / 100,
    currentPurchasingPower: Math.round((value / accumulatedInflation) * 100) / 100,
    loss: Math.round(loss * 100) / 100,
    percentLoss: Math.round(percentLoss * 100) / 100,
    years: currentYear - startYear,
    accumulatedInflation: Math.round((accumulatedInflation - 1) * 10000) / 100,
  };
}

/**
 * Convert a monetary value into tangible comparisons.
 * 
 * @param {number} value - Value in R$
 * @returns {Array} Array of comparison objects
 */
export function getComparisons(value) {
  const comparisons = [
    { item: 'iPhones', emoji: '📱', unitPrice: 7999, quantity: Math.floor(value / 7999) },
    { item: 'viagens internacionais', emoji: '✈️', unitPrice: 15000, quantity: Math.floor(value / 15000) },
    { item: 'meses de aluguel', emoji: '🏠', unitPrice: 2500, quantity: Math.floor(value / 2500) },
    { item: 'carros populares', emoji: '🚗', unitPrice: 75000, quantity: Math.floor(value / 75000) },
    { item: 'cestas básicas', emoji: '🛒', unitPrice: 780, quantity: Math.floor(value / 780) },
    { item: 'salários mínimos', emoji: '💰', unitPrice: 1518, quantity: Math.floor(value / 1518) },
  ];
  
  return comparisons.filter(c => c.quantity >= 1).slice(0, 3);
}

/**
 * Format a number as Brazilian currency.
 * 
 * @param {number} value - Value to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a large number in a human-readable way.
 * 
 * @param {number} value - Value to format
 * @returns {string} Formatted string (e.g., "42.5 mil", "1.2 milhões")
 */
export function formatLargeNumber(value) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} bilhões`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} milhões`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)} mil`;
  return value.toFixed(2);
}

// Investment type labels for UI
export const INVESTMENT_LABELS = {
  poupanca: { name: 'Poupança', emoji: '🏦', color: '#6b7280' },
  cdi: { name: 'CDI/CDB', emoji: '📈', color: '#22c55e' },
  ibovespa: { name: 'Ibovespa', emoji: '📊', color: '#3b82f6' },
  sp500brl: { name: 'S&P 500 (em R$)', emoji: '🇺🇸', color: '#8b5cf6' },
  bitcoin: { name: 'Bitcoin', emoji: '₿', color: '#f97316' },
};

// Preset invisible expenses for quick selection
export const EXPENSE_PRESETS = [
  { name: 'Cafézinho', emoji: '☕', dailyValue: 8, frequency: 'daily' },
  { name: 'Cigarro', emoji: '🚬', dailyValue: 15, frequency: 'daily' },
  { name: 'Delivery', emoji: '🍔', dailyValue: 0, monthlyValue: 450, frequency: 'monthly' },
  { name: 'Streaming', emoji: '📺', dailyValue: 0, monthlyValue: 120, frequency: 'monthly' },
  { name: 'Uber/99', emoji: '🚕', dailyValue: 0, monthlyValue: 350, frequency: 'monthly' },
  { name: 'Loteria', emoji: '🎰', dailyValue: 0, monthlyValue: 100, frequency: 'monthly' },
];
