import type { Transaction } from "../types";
import { formatDate, formatMoney } from "../utils/format";

interface Props {
  items: Transaction[];
  onDelete?: (id: string) => void;
}

export default function TransactionList({ items, onDelete }: Props) {
  if (items.length === 0) return <p className="empty">Koi transaction nahi mila.</p>;

  return (
    <ul className="list">
      {items.map((t) => (
        <li key={t.id} className="row">
          <div className="row-main">
            <strong>{t.title}</strong>
            <span className="muted">
              {t.category} · {formatDate(t.date)}
            </span>
          </div>
          <span className={`amount-sm ${t.type === "income" ? "pos" : "neg"}`}>
            {t.type === "income" ? "+" : "-"}
            {formatMoney(t.amount)}
          </span>
          {onDelete && (
            <button className="icon-btn" onClick={() => onDelete(t.id)} aria-label={`Delete ${t.title}`}>
              ✕
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
