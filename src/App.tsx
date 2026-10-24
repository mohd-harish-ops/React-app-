import { Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "3rem 0" }}>
      <h1>404</h1>
      <p>Ye page nahi mila.</p>
      <Link to="/">Dashboard par jao</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
