import { createContext, useCallback, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Transaction } from "../types";
import { makeId } from "../utils/format";

interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (data: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
  clearAll: () => void;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("expense-tracker-data", []);

  const addTransaction = useCallback(
    (data: Omit<Transaction, "id">) => setTransactions((prev) => [{ ...data, id: makeId() }, ...prev]),
    [setTransactions]
  );
  const removeTransaction = useCallback(
    (id: string) => setTransactions((prev) => prev.filter((t) => t.id !== id)),
    [setTransactions]
  );
  const clearAll = useCallback(() => setTransactions([]), [setTransactions]);

  const value = useMemo(
    () => ({ transactions, addTransaction, removeTransaction, clearAll }),
    [transactions, addTransaction, removeTransaction, clearAll]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions(): TransactionsContextValue {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used inside TransactionsProvider");
  return ctx;
}
