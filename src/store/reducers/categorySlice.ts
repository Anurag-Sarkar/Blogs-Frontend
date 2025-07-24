// categorySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../Types/types";

interface CategoryState {
  selectedCategory: string[];
  allCategories: Category[];
}

const initialState: CategoryState = {
    selectedCategory: JSON.parse(sessionStorage.getItem("category") || "[]"),
    allCategories:[]
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
      sessionStorage.setItem("category", JSON.stringify(action.payload));
    },
    setAllCategories(state, action) {
      state.allCategories = action.payload;
    },
    clearCategory(state) {
      state.selectedCategory = [];
      sessionStorage.removeItem("category");
    },
  },
});

export const { setCategory, setAllCategories, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
