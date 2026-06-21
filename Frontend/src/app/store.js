import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactionsSlice";
import balanceReducer from "../features/balanceSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    balance: balanceReducer,
    auth: authReducer,
  },
});
