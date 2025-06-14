import React from "react";
import { useNavigate } from "react-router-dom";
import AnnualExpenseTable from "./AnnualExpenseTable";

const AnnualExpensePage = () => {
  const mobile = localStorage.getItem("currentUserMobile");
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <div className="annual-expense-page animate-fade-in">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
      <AnnualExpenseTable mobile={mobile} year={year} />
    </div>
  );
};

export default AnnualExpensePage;