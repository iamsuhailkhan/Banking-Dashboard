import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("userId", "email").sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTransaction = async (req, res) => {
  const { date, desc, amount, status } = req.body;
  try {
    const transaction = await Transaction.create({
      userId: req.user,
      date,
      desc,
      amount,
      status: status || "Pending",
    });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["Pending", "Completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid transaction status" });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
