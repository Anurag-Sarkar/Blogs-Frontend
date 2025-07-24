import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./reducers/categorySlice";
import  blogSlice  from "./reducers/blogSlice";

export default configureStore({
  reducer: { categoryReducer: categorySlice , blogReducer : blogSlice },
});
