import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    setTransactions: (state, action) => action.payload,
    addTransaction: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setTransactions, addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
