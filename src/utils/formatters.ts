export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatOdds(odds: string): string {
  return odds.startsWith('+') || odds.startsWith('-') ? odds : `+${odds}`;
}

export function calculatePayout(stake: number, odds: number): number {
  if (odds > 0) return stake * (odds / 100);
  return stake * (100 / Math.abs(odds));
}

export function calculateCombinedOdds(selections: { odds: number }[]): number {
  return selections.reduce((acc, s) => acc * s.odds, 1);
}

export function clamp(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}
