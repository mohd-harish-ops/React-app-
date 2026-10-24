import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <span className="brand">
            Expense<span>Tracker</span>
          </span>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
            <NavLink to="/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
              Transactions
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container page">
        <Outlet />
      </main>
      <footer className="footer">Built with React, TypeScript and Vite</footer>
    </>
  );
}
