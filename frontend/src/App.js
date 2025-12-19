import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Reports from "./components/Reports";
import About from "./components/About";

import {
  getTransactions,
  addTransaction as addTxAPI,
  deleteTransaction as deleteTxAPI
} from "./api/api";

function App() {
  const [transactions, setTransactions] = useState([]);

  // FETCH FROM BACKEND
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await getTransactions();
    setTransactions(res.data);
  };

  const addTransaction = async (transaction) => {
    await addTxAPI(transaction);
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await deleteTxAPI(id);
    fetchTransactions();
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/list">Transactions</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard transactions={transactions} />} />
        <Route
          path="/add"
          element={<AddTransaction addTransaction={addTransaction} />}
        />
        <Route
          path="/list"
          element={
            <TransactionList
              transactions={transactions}
              deleteTransaction={deleteTransaction}
            />
          }
        />
        <Route
          path="/reports"
          element={<Reports transactions={transactions} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
