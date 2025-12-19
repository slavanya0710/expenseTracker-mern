const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


const transactionSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  type: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// ROUTES

// GET all transactions
app.get("/api/transactions", async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// ADD transaction
app.post("/api/transactions", async (req, res) => {
  const newTransaction = new Transaction(req.body);
  const saved = await newTransaction.save();
  res.json(saved);
});

// DELETE transaction
app.delete("/api/transactions/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted" });
});

// UPDATE transaction
app.put("/api/transactions/:id", async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
