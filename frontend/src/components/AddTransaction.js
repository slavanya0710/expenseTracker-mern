import React, { useState } from "react";

function AddTransaction({ addTransaction }) {
  const [form, setForm] = useState({
    amount: "",
    type: "Income",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.category) {
      alert("Please fill all fields");
      return;
    }

    await addTransaction({
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: new Date()
    });

    setForm({ amount: "", type: "Income", category: "" });
  };

  return (
    <div className="page">
      <div className="card add-card">
        <h2> Add New Transaction</h2>
        <p className="form-desc">
          Record your income or expenses to keep track of your finances.
        </p>

        <form onSubmit={handleSubmit} className="add-form">
          <label>
             Amount
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
             Category
            <input
              name="category"
              placeholder="e.g. Food, Salary, Travel"
              value={form.category}
              onChange={handleChange}
              required
            />
          </label>

          <label>
             Type
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option>Income</option>
              <option>Expense</option>
            </select>
          </label>

          <button type="submit" className="add-btn">
             Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
