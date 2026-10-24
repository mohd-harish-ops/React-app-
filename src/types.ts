export type TxType = "income" | "expense";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TxType;
  category: string;
  date: string; // YYYY-MM-DD
}

export const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Salary", "Other"] as const;
