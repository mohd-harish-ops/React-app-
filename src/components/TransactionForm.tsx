import { useState } from "react";
import type { FormEvent } from "react";
import { CATEGORIES } from "../types";
import type { TxType } from "../types";
import { useTransactions } from "../context/TransactionsContext";
import { todayISO } from "../utils/format";

export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TxType>("expense");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [date, setDate] = useState(todayISO());
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = Number(amount);
    if (!title.trim()) return setError("Title likho.");
    if (!Number.isFinite(value) || value <= 0) return setError("Amount 0 se bada hona chahiye.");

    addTransaction({ title: title.trim(), amount: value, type, category, date });
    setTitle("");
    setAmount("");
    setError("");
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>Add transaction</h3>
      <div className="form-grid">
        <input placeholder="Title (e.g. Lunch)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          type="number"
          min="0"
          step="any"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value as TxType)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="btn" type="submit">
          Add
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
