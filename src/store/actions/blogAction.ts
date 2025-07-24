import type { Dispatch } from "@reduxjs/toolkit";
import blogsApi from "../../Services/blog.service";
import {
  setAllBlogs,
  setSelectedBlog,
  setLoading,
  setError,
  clearSelectedBlog,
} from "../reducers/blogSlice";
import type { Blog } from "../../Types/types";

// Fetch all blogs
export const fetchAllBlogs = (page = 1, limit = 10, status?: string, search?: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await blogsApi.getAllBlog(page, limit, status, search);
    if (response.data && Array.isArray(response.data.data.blogs)) {
      dispatch(setAllBlogs(response.data.data.blogs as Blog[]));
    } else {
      dispatch(setAllBlogs([]));
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Failed to fetch blogs"));
    dispatch(setLoading(false));
    console.error("Error fetching blogs:", error);
  }
};

// Fetch blog by ID
export const fetchBlogById = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await blogsApi.getBlog(id);
    if (response.data && response.data.data) {
      dispatch(setSelectedBlog(response.data.data as Blog));
    } else {
      dispatch(setSelectedBlog(null));
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Failed to fetch blog by ID"));
    dispatch(setLoading(false));
    console.error("Error fetching blog by ID:", error);
  }
};

// Clear selected blog
export const clearBlogSelection = () => (dispatch: Dispatch) => {
  dispatch(clearSelectedBlog());
};
