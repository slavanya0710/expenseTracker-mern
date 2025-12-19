import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = {
  Income: "#A7F3D0",   // pastel green
  Expense: "#FECACA"  // pastel red
};

function Reports({ transactions = [] }) {
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [chartType, setChartType] = useState("bar");
  const [showChart, setShowChart] = useState(true);

  /* ------------------ DATA PROCESSING ------------------ */

  // SAFELY filter transactions by selected month
  const monthlyTransactions = transactions.filter(t => {
    if (!t.date) return false;

    const txDate = new Date(t.date);
    if (isNaN(txDate.getTime())) return false;

    const txMonth = txDate.toISOString().slice(0, 7);
    return txMonth === month;
  });

  const income = monthlyTransactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expense = monthlyTransactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = income - expense;

  // Group by category
  const categoryMap = {};
  monthlyTransactions.forEach(t => {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = { Income: 0, Expense: 0 };
    }
    categoryMap[t.category][t.type] += Number(t.amount || 0);
  });

  const chartData = Object.keys(categoryMap).map(cat => ({
    category: cat,
    Income: categoryMap[cat].Income,
    Expense: categoryMap[cat].Expense
  }));

  /* ------------------ UI ------------------ */

  return (
    <div className="page">
      {/* HEADER & SUMMARY */}
      <div className="card">
        <h2> Financial Reports</h2>
        <p className="form-desc">
          Analyze your income, expenses, and savings using visual insights.
        </p>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <div className="summary-grid">
          <div className="summary income">
            <p>Income</p>
            <h3>₹ {income}</h3>
          </div>

          <div className="summary expense">
            <p>Expense</p>
            <h3>₹ {expense}</h3>
          </div>

          <div className="summary balance">
            <p>Balance</p>
            <h3>₹ {balance}</h3>
          </div>
        </div>

        <div className={`insight ${balance >= 0 ? "good" : "bad"}`}>
          {balance >= 0
            ? " Great! You managed to save money this month."
            : " Expenses exceeded income. Review your spending."}
        </div>
      </div>

      {/* VISUALIZATION CONTROLS */}
      <div className="card visualization-card">
        <div className="viz-header">
          <h3> Visualization</h3>

          <label className="viz-toggle">
            <input
              type="checkbox"
              checked={showChart}
              onChange={() => setShowChart(!showChart)}
            />
            <span className="slider"></span>
            <span className="viz-text">
              {showChart ? "Charts On" : "Charts Off"}
            </span>
          </label>
        </div>

        {showChart && (
          <div className="viz-segment">
            <button
              className={chartType === "bar" ? "active" : ""}
              onClick={() => setChartType("bar")}
            >
               Bar Chart
            </button>
            <button
              className={chartType === "pie" ? "active" : ""}
              onClick={() => setChartType("pie")}
            >
               Pie Chart
            </button>
          </div>
        )}
      </div>

      {/* CHART DISPLAY */}
      {showChart && chartData.length > 0 && (
        <div className="card">
          <h3>Income vs Expense by Category</h3>

          {chartType === "bar" ? (
            <BarChart width={320} height={260} data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill={COLORS.Income} />
              <Bar dataKey="Expense" fill={COLORS.Expense} />
            </BarChart>
          ) : (
            <PieChart width={320} height={260}>
              <Pie
                data={[
                  { name: "Income", value: income },
                  { name: "Expense", value: expense }
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                <Cell fill={COLORS.Income} />
                <Cell fill={COLORS.Expense} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </div>
      )}

      {/* EMPTY STATE */}
      {monthlyTransactions.length === 0 && (
        <div className="card empty-state">
          <p>No transactions recorded for this month.</p>
        </div>
      )}
    </div>
  );
}

export default Reports;
