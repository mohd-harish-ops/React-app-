import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useTransactions } from "../context/TransactionsContext";

type Filter = "all" | "income" | "expense";

export default function Transactions() {
  const { transactions, removeTransaction, clearAll } = useTransactions();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = transactions.filter(
    (t) =>
      (filter === "all" || t.type === filter) &&
      t.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  function handleClear() {
    if (window.confirm("Saare transactions delete karne hain?")) clearAll();
  }

  return (
    <>
      <h1 className="title">Transactions</h1>
      <TransactionForm />

      <section className="card" style={{ marginTop: "1.2rem" }}>
        <div className="toolbar">
          <input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="filters">
            {(["all", "income", "expense"] as Filter[]).map((f) => (
              <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
                {f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <TransactionList items={visible} onDelete={removeTransaction} />
        {transactions.length > 0 && (
          <p style={{ textAlign: "right", marginBottom: 0 }}>
            <button className="link-btn" onClick={handleClear}>
              Clear all
            </button>
          </p>
        )}
      </section>
    </>
  );
}
