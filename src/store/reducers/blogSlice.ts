import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Blog, BlogState } from "../../Types/types";

const initialState: BlogState = {
  allBlogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setAllBlogs(state, action: PayloadAction<Blog[]>) {
      state.allBlogs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedBlog(state, action: PayloadAction<Blog | null>) {
      state.selectedBlog = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearSelectedBlog(state) {
      state.selectedBlog = null;
    },
  },
});

export const {
  setAllBlogs,
  setSelectedBlog,
  setLoading,
  setError,
  clearSelectedBlog,
} = blogSlice.actions;
export default blogSlice.reducer;
