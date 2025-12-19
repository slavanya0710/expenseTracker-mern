import React, { useState } from "react";
import { updateTransaction } from "../api/api";

function TransactionList({ transactions, deleteTransaction }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortType, setSortType] = useState("latest");

  const [editingTx, setEditingTx] = useState(null);

  const filteredTransactions = transactions
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => filterType === "All" || t.type === filterType)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTransaction(editingTx._id, editingTx);
    setEditingTx(null);
    window.location.reload();
  };

  return (
    <div className="page">
      <div className="card">
        <h2> Transactions</h2>

        <div className="filter-bar">
          <input
            placeholder="Search category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>All</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
      </div>

      {filteredTransactions.map((t) => (
        <div key={t._id} className="card transaction-card">
          <div>
            <h4>{t.category}</h4>
            <span className={`badge ${t.type === "Income" ? "income" : "expense"}`}>
              {t.type}
            </span>
          </div>

          <div className="transaction-right">
            <h3>₹ {t.amount}</h3>
            <div className="action-btns">
              <button
                className="edit-btn"
                onClick={() => setEditingTx(t)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(t._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* EDIT MODAL */}
      {editingTx && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Transaction</h3>

            <form onSubmit={handleUpdate}>
              <input
                type="number"
                value={editingTx.amount}
                onChange={(e) =>
                  setEditingTx({ ...editingTx, amount: e.target.value })
                }
              />

              <input
                value={editingTx.category}
                onChange={(e) =>
                  setEditingTx({ ...editingTx, category: e.target.value })
                }
              />

              <select
                value={editingTx.type}
                onChange={(e) =>
                  setEditingTx({ ...editingTx, type: e.target.value })
                }
              >
                <option>Income</option>
                <option>Expense</option>
              </select>

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTx(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
