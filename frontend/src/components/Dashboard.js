import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ transactions }) {
  const income = transactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="page">
      {/* WELCOME SECTION */}
      <div className="card hero">
        <h2>      Welcome to Expense Tracker </h2>
        <p className="tagline">
          Track every rupee. Understand your spending. Build better financial habits.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="dashboard-grid">
        <div className="dash-card income">
          <h4>Total Income</h4>
          <h2>₹ {income}</h2>
        </div>

        <div className="dash-card expense">
          <h4>Total Expense</h4>
          <h2>₹ {expense}</h2>
        </div>

        <div className="dash-card balance">
          <h4>Current Balance</h4>
          <h2>₹ {balance}</h2>
        </div>
      </div>

      {/* INSIGHT MESSAGE */}
      <div className={`card insight ${balance >= 0 ? "good" : "bad"}`}>
        {balance >= 0 ? (
          <p> Great job! You’re managing your expenses well.</p>
        ) : (
          <p> Warning! Your expenses are higher than your income.</p>
        )}
      </div>

      {/* ABOUT THE APP */}
      <div className="card">
        <h3>Why Expense Tracker?</h3>
        <ul className="why-list">
          <li> Get a clear picture of where your money goes</li>
          <li> Build smarter spending habits</li>
          <li> Analyze monthly income & expenses</li>
          <li> Visualize data with charts and reports</li>
        </ul>
      </div>

      {/* ACTION BUTTONS */}
      <div className="action-buttons">
        <Link to="/add" className="action-btn primary">
           Add Transaction
        </Link>
        <Link to="/reports" className="action-btn secondary">
           View Reports
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
