import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import logo from "./assets/logo.png";
import AnnualExpensePage from "./components/AnnualExpensePage";

function App() {
  return (
    <Router>
      <div className="app-bg">
        <header className="app-header">
          <img src={logo} alt="Expense Tracker Logo" className="app-logo" />
          <h1>Expense Tracker</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/annual-expenses" element={<AnnualExpensePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;