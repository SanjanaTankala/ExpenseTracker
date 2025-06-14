

import React from "react";


const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const AnnualExpenseTable = ({ mobile, year }) => {
  const allExpenses = JSON.parse(localStorage.getItem("expenses") || "{}");
  const allBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");
  const userYear = allExpenses[mobile]?.[year] || {};
  const userBudgets = allBudgets[mobile]?.[year] || {};

  let annualTotal = 0;

  return (
    <div className="annual-expense-table animate-fade-in">
      <h2 className="annual-title">Annual Expenses for {year}</h2>
      <table className="crystal-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Budget (₹)</th>
            <th>Status</th>
            <th>Date</th>
            <th>Category</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {months.map((m, idx) => {
            const monthExpenses = userYear[idx] || [];
            const budget = userBudgets[idx] !== undefined ? userBudgets[idx] : "-";
            const monthTotal = monthExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
            annualTotal += monthTotal;
            const exceeded = budget !== "-" && monthTotal > budget;

            if (monthExpenses.length === 0) {
              return (
                <React.Fragment key={m}>
                  {/* Full-width separator before each month */}
                  <tr>
                    <td colSpan={6} style={{ padding: 0, background: "transparent" }}>
                      <hr className="month-divider" />
                    </td>
                  </tr>
                  <tr className="month-header-row">
                    <td style={{ fontWeight: 600, background: "#fff" }}>{m}</td>
                    <td style={{ background: "#fff" }}>{budget}</td>
                    <td style={{ background: "#fff" }}>-</td>
                    <td colSpan={3} style={{ color: "#aaa", textAlign: "center", background: "#fff" }}>No expenses</td>
                  </tr>
                </React.Fragment>
              );
            }

            // Sort by date for display
            const sortedExpenses = [...monthExpenses].sort((a, b) => a.date - b.date);

            return (
              <React.Fragment key={m}>
                {/* Full-width separator before each month */}
                <tr>
                  <td colSpan={6} style={{ padding: 0, background: "transparent" }}>
                    <hr className="month-divider" />
                  </td>
                </tr>
                {/* Month header */}
                <tr className="month-header-row">
                  <td style={{ fontWeight: 600, background: "#fff" }}>{m}</td>
                  <td style={{ background: "#fff" }}>{budget}</td>
                  <td style={{ background: "#fff", color: exceeded ? "#ef4444" : "#10b981", fontWeight: 700 }}>
                    {budget === "-" ? "-" : exceeded ? "Exceeded" : "Within"}
                  </td>
                  <td style={{ background: "#fff" }}>{String(sortedExpenses[0].date).padStart(2, "0")}</td>
                  <td style={{ background: "#fff" }}>{sortedExpenses[0].name}</td>
                  <td style={{ background: "#fff" }}>₹{sortedExpenses[0].amount}</td>
                </tr>
                {/* Expense rows (no blank row, start immediately after header) */}
                {sortedExpenses.slice(1).map((exp, i) => (
                  <tr className="expense-row" key={i}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{String(exp.date).padStart(2, "0")}</td> 
                    <td>{exp.name}</td>
                    <td>₹{exp.amount}</td>
                  </tr>
                ))}
                {/* Total row (no line before total) */}
                <tr className="total-row">
                  <td colSpan={4}></td>
                  <td style={{ fontWeight: 700, textAlign: "right" }}>Total</td>
                  <td style={{ fontWeight: 700 }}>₹{monthTotal}</td>
                </tr>
              </React.Fragment>
            );
          })}
          <tr className="annual-total-row">
  <td colSpan={4}></td>
  <td>Annual Total</td>
  <td>₹{annualTotal}</td>
</tr>
        </tbody>
      </table>
    </div>
  );
};

export default AnnualExpenseTable;

