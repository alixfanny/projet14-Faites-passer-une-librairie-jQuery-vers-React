import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { add } = employeeSlice.actions;

export default employeeSlice.reducer;