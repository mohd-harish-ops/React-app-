const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatMoney = (value: number): string => currency.format(value);

export const formatDate = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const todayISO = (): string => new Date().toISOString().slice(0, 10);

export const makeId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
