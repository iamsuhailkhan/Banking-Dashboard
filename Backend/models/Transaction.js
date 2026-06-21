import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  desc: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

export default mongoose.model("Transaction", transactionSchema);
