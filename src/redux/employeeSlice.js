import { createSlice } from "@reduxjs/toolkit";

let listEmployees = localStorage.getItem("employees"); 

const initialState = {
  list: listEmployees ? JSON.parse(listEmployees) : [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.list))
    },
  },
});

export const { add } = employeeSlice.actions;

export default employeeSlice.reducer;