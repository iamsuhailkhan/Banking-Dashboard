import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: { amount: 50000 },
  reducers: {
    updateBalance: (state, action) => {
      state.amount += action.payload;
    },
  },
});

export const { updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
