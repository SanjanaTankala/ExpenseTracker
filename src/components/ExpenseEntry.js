import React, { useState, useEffect} from "react";

const expenseOptions = [
  "Groceries", "Transport", "Utilities", "Dining", "Shopping",
  "Health", "Education", "Entertainment", "Other"
];

const getDaysInMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

const ExpenseEntry = ({ mobile, year, month, expenses, setExpenses , formatDate }) => {
  const [selectedDate, setSelectedDate] = useState(1);
  const [expenseName, setExpenseName] = useState("");
  const [customName, setCustomName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Update local state if parent changes month/year/mobile
  useEffect(() => {
    setSelectedDate(1);
    setExpenseName("");
    setCustomName("");
    setAmount("");
    setError("");
  }, [mobile, year, month]);

  const days = getDaysInMonth(year, month);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    const name = expenseName === "Other" ? customName : expenseName;
    if (!name) {
      setError("Enter expense name.");
      return;
    }
    // Save to localStorage
    const allExpenses = JSON.parse(localStorage.getItem("expenses") || "{}");
    if (!allExpenses[mobile]) allExpenses[mobile] = {};
    if (!allExpenses[mobile][year]) allExpenses[mobile][year] = {};
    if (!allExpenses[mobile][year][month]) allExpenses[mobile][year][month] = [];
    allExpenses[mobile][year][month].push({
      date: selectedDate,
      name,
      amount: Number(amount)
    });
    localStorage.setItem("expenses", JSON.stringify(allExpenses));
    setExpenses([...allExpenses[mobile][year][month]]); // Update parent state
    setAmount("");
    setCustomName("");
    setExpenseName("");
    setError("");
  };

  // Delete expense by index
  const handleDeleteExpense = (idx) => {
    const allExpenses = JSON.parse(localStorage.getItem("expenses") || "{}");
    const userMonthExpenses = allExpenses[mobile]?.[year]?.[month] || [];
    userMonthExpenses.splice(idx, 1);
    if (allExpenses[mobile] && allExpenses[mobile][year] && allExpenses[mobile][year][month]) {
      allExpenses[mobile][year][month] = userMonthExpenses;
      localStorage.setItem("expenses", JSON.stringify(allExpenses));
      setExpenses([...userMonthExpenses]); // Update parent state
    }
  };

  return (
    <div className="expense-entry animate-slide-up">
      <h3>Enter Expenses</h3>
      <form onSubmit={handleAddExpense}>
        <select
  value={selectedDate}
  onChange={e => setSelectedDate(Number(e.target.value))}
>
  {Array.from({ length: days }, (_, i) => (
    <option key={i + 1} value={i + 1}>
      {String(i + 1).padStart(2, "0")}-{String(month + 1).padStart(2, "0")}-{year}
    </option>
  ))}
</select>
        
        <input
  type="text"
  placeholder="Expense Name"
  value={expenseName}
  onChange={e => setExpenseName(e.target.value)}
  required
/>
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min={1}
          required
        />
        <button type="submit">Add Expense</button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="expense-list">
        <h4>Expenses for {year}-{String(month + 1).padStart(2, "0")}</h4>
        {expenses.length === 0 && <div className="empty">No expenses yet.</div>}
        <ul>
          {expenses
            .sort((a, b) => a.date - b.date)
            .map((exp, idx) => (
              <li key={idx} className="expense-row">
                <span className="exp-date">{String(exp.date).padStart(2, "0")}</span>
                <span className="exp-name">{exp.name}</span>
                <span className="exp-amt">₹{exp.amount}</span>
                <button
                  className="delete-expense-btn"
                  title="Delete"
                  onClick={() => handleDeleteExpense(idx)}
                  type="button"
                >🗑️</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseEntry;