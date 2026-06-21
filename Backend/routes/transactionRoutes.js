import express from "express";
import {
  getTransactions,
  addTransaction,
  getAllTransactions,
  updateTransactionStatus,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTransactions);
router.post("/", protect, addTransaction);
router.patch("/:id", protect, adminOnly, updateTransactionStatus);
router.delete("/:id", protect, adminOnly, deleteTransaction);
router.get("/all", protect, adminOnly, getAllTransactions);

export default router;
