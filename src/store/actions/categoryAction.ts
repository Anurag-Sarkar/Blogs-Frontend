import type { Dispatch } from "@reduxjs/toolkit";
import categoryApi from "../../Services/category.service";
import { setAllCategories, setCategory, clearCategory } from "../reducers/categorySlice";
import type { Category } from "../../Types/types";

// Fetch all categories
export const fetchAllCategories = () => async (dispatch: Dispatch) => {
  try {
    const response = await categoryApi.getAllCategories();
    if (
      response.data &&
      Array.isArray((response.data.data as { categories?: unknown[] }).categories)
    ) {
      dispatch(
        setAllCategories(
          ((response.data.data as unknown as { categories: Category[] }).categories)
        )
      );
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Search category by name
export const searchCategoryByName = (name: string) => async (dispatch: Dispatch) => {
  try {
    const response = await categoryApi.searchCategory(name);
    if (response.data && Array.isArray(response.data.data)) {
      dispatch(setAllCategories(response.data.data as Category[]));
    }
  } catch (error) {
    console.error("Error searching category:", error);
  }
};

// Get category by ID
export const fetchCategoryById = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await categoryApi.getCategoryById(id);
    if (response.data && response.data.data) {
      const data = response.data.data;
      if (Array.isArray(data) && data.length > 0) {
        dispatch(setCategory(data[0].name));
      } else if (!Array.isArray(data) && typeof data === 'object' && 'name' in data) {
        dispatch(setCategory((data as unknown as Category).name));
      }
    }
  } catch (error) {
    console.error("Error fetching category by ID:", error);
  }
};

// Set selected category
export const selectCategory = (category: string) => (dispatch: Dispatch) => {
  dispatch(setCategory(category));
};

// Clear selected category
export const clearSelectedCategory = () => (dispatch: Dispatch) => {
  dispatch(clearCategory());
};