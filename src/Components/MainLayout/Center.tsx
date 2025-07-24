import BlogCard from "../common/BlogCard";
import { useEffect, useState } from "react";
import CategoryNav from "../common/CategoryNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../store/actions/blogAction";
import type { RootState } from "../../Types/types";
import store from "../../store/store";
export type AppDispatch = typeof store.dispatch;

const Center = ({ categories }: { categories: string[] }) => {
  const dispatch: AppDispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogReducer.allBlogs);
  const loading = useSelector((state: RootState) => state.blogReducer.loading);
  const error = useSelector((state: RootState) => state.blogReducer.error);

  const [selectedCategory, setSelectedCategory] = useState(
    categories[0] || "All"
  );

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) =>
          Array.isArray(blog.category)
            ? blog.category.some((cat) => cat.name === selectedCategory)
            : false
        );

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="bg-white rounded-lg sticky top-0 z-10 p-4 pb-0">
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {/* Blog Cards */}
      <div className="space-y-5 px-4 pb-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></span>
            <span className="ml-3 text-blue-400 text-sm">Loading blogs...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-700 font-medium py-8">{error}</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No blogs found.</div>
        ) : (
          filteredBlogs.map((blog) => {
            // Extract all text from blockContent
            const contentText = Array.isArray(blog.blockContent)
              ? blog.blockContent
                  .flatMap((block) =>
                    Array.isArray(block.content)
                      ? block.content
                          .filter((item) => typeof item.text === "string")
                          .map((item) => item.text)
                      : []
                  )
                  .join(" ")
              : "";

            return (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                author={
                  typeof blog.author === "object"
                    ? blog.author.name
                    : blog.author
                }
                description={contentText}
                category={
                  Array.isArray(blog.category)
                    ? blog.category.map((cat) => cat.name).join(", ")
                    : ""
                }
                image={blog.previewImage}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Center;
