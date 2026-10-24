import { formatMoney } from "../utils/format";

interface Props {
  income: number;
  expense: number;
}

export default function SummaryCards({ income, expense }: Props) {
  const balance = income - expense;
  return (
    <div className="grid">
      <div className="card">
        <p className="label">Balance</p>
        <p className={`amount ${balance < 0 ? "neg" : ""}`}>{formatMoney(balance)}</p>
      </div>
      <div className="card">
        <p className="label">Income</p>
        <p className="amount pos">{formatMoney(income)}</p>
      </div>
      <div className="card">
        <p className="label">Expenses</p>
        <p className="amount neg">{formatMoney(expense)}</p>
      </div>
    </div>
  );
}
