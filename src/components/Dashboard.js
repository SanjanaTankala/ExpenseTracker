

import React, { useState, useEffect, useRef } from "react";
import MonthSelector from "./MonthSelector";
import ExpenseEntry from "./ExpenseEntry";
import ExpenseChart from "./ExpenseChart";
import BudgetAlert from "./BudgetAlert";
import AnnualExpenseTable from "./AnnualExpenseTable";
import { useNavigate } from "react-router-dom";

// Add this function after imports
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj)) return dateStr;
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
};

const Dashboard = () => {
  const mobile = localStorage.getItem("currentUserMobile");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [budget, setBudget] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [showAnnual, setShowAnnual] = useState(false);
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses") || "{}")[mobile]?.[year]?.[month] || []
  );
  const navigate = useNavigate();
  const name = localStorage.getItem("currentUserName");

  useEffect(() => {
    setExpenses(
      JSON.parse(localStorage.getItem("expenses") || "{}")[mobile]?.[year]?.[month] || []
    );
  }, [mobile, year, month]);

  useEffect(() => {
    const allBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");
    setBudget(
      allBudgets[mobile]?.[year]?.[month] !== undefined
        ? allBudgets[mobile][year][month]
        : ""
    );
  }, [mobile, year, month]);

  const handleSetBudget = (e) => {
    e.preventDefault();
    const allBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");
    if (!allBudgets[mobile]) allBudgets[mobile] = {};
    if (!allBudgets[mobile][year]) allBudgets[mobile][year] = {};
    allBudgets[mobile][year][month] = Number(budget);
    localStorage.setItem("budgets", JSON.stringify(allBudgets));
  };

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  const overBudgetRef = useRef(false);

  useEffect(() => {
    if (budget && Number(total) > Number(budget)) {
      setBudgetExceeded(true);
      if (!overBudgetRef.current && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function") {
        window.speechSynthesis.cancel();
        const utter = new window.SpeechSynthesisUtterance(
          "Alert! You have exceeded your monthly budget."
        );
        window.speechSynthesis.speak(utter);
        overBudgetRef.current = true;
      }
    } else {
      setBudgetExceeded(false);
      overBudgetRef.current = false;
    }
  }, [budget, total, year, month]);

  const handleLogout = () => {
    localStorage.removeItem("currentUserMobile");
    navigate("/");
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h2>
        Welcome, <span className="highlight">{name}</span>
      </h2>
      <MonthSelector
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      <form className="budget-form" onSubmit={handleSetBudget}>
        <input
          type="number"
          placeholder="Set monthly budget (₹)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          min={0}
          required
        />
        <button type="submit">Set Budget</button>
      </form>
      <BudgetAlert show={budgetExceeded} />
      <div className="budget-summary">
        <span>
          <b>Budget:</b> ₹{budget || 0}
        </span>
        <span>
          <b>Total Spent:</b> ₹{total}
        </span>
        <span>
          <b>Remaining:</b> ₹{budget ? Math.max(0, budget - total) : 0}
        </span>
      </div>
      <ExpenseEntry
        mobile={mobile}
        year={year}
        month={month}
        expenses={expenses}
        setExpenses={setExpenses}
        formatDate={formatDate} 
      />
      <button
        className="chart-btn"
        onClick={() => setShowChart((prev) => !prev)}
      >
        {showChart ? "Hide Expense Chart" : "Show Expense Chart"}
      </button>
      {showChart && (
        <ExpenseChart
          mobile={mobile}
          year={year}
          month={month}
          expenses={expenses}
        />
      )}
      <button
        className="chart-btn"
        style={{ marginTop: "10px" }}
        onClick={() => navigate("/annual-expenses")}
      >
        Show Annual Expenses
      </button>
      {showAnnual && (
        <AnnualExpenseTable mobile={mobile} year={year} />
      )}
    </div>
  );
};

export default Dashboard;
