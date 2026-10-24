import { useMemo } from "react";
import { Link } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";
import TransactionList from "../components/TransactionList";
import { useTransactions } from "../context/TransactionsContext";
import { formatMoney } from "../utils/format";

export default function Dashboard() {
  const { transactions } = useTransactions();

  const { income, expense, byCategory } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const map = new Map<string, number>();
    for (const t of transactions) {
      if (t.type === "income") income += t.amount;
      else {
        expense += t.amount;
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
      }
    }
    const byCategory = [...map.entries()].sort((a, b) => b[1] - a[1]);
    return { income, expense, byCategory };
  }, [transactions]);

  return (
    <>
      <h1 className="title">Dashboard</h1>
      <SummaryCards income={income} expense={expense} />

      <div className="two-col">
        <section className="card">
          <h3>Spending by category</h3>
          {byCategory.length === 0 ? (
            <p className="empty">Abhi koi expense nahi hai.</p>
          ) : (
            byCategory.map(([name, total]) => (
              <div key={name} className="bar-row">
                <div className="bar-label">
                  <span>{name}</span>
                  <span className="muted">{formatMoney(total)}</span>
                </div>
                <div className="bar">
                  <div className="bar-fill" style={{ width: `${(total / expense) * 100}%` }} />
                </div>
              </div>
            ))
          )}
        </section>

        <section className="card">
          <h3>Recent transactions</h3>
          <TransactionList items={transactions.slice(0, 5)} />
          <p>
            <Link to="/transactions">Sab dekho &rarr;</Link>
          </p>
        </section>
      </div>
    </>
  );
}
