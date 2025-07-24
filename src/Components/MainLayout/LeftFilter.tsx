import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/reducers/categorySlice";
import type { Category, LeftFilterProps, RootState } from "../../Types/types";
import type { AppDispatch } from "./Center";

const LeftFilter: React.FC<LeftFilterProps> = ({
  onTopicsChange,
  maxInitialTopics = 8,
  categories = [],
  loading = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedCategoryArr = useSelector(
    (state: RootState) => state.categoryReducer.selectedCategory
  );
  const [showAllTopics, setShowAllTopics] = useState(false);

  // Use real category names
  const topics = useMemo(
    () =>
      categories && categories.length > 0
        ? categories.map((cat: Category) => cat.name)
        : [],
    [categories]
  );

  const displayedTopics = useMemo(
    () => (showAllTopics ? topics : topics.slice(0, maxInitialTopics)),
    [topics, showAllTopics, maxInitialTopics]
  );

  const handleTopicClick = useCallback(
    (topic: string) => {
      let newSelected: string[];
      if (selectedCategoryArr.includes(topic)) {
        newSelected = selectedCategoryArr.filter((t) => t !== topic);
      } else {
        newSelected = [...selectedCategoryArr, topic];
      }
      onTopicsChange?.(new Set(newSelected));
      dispatch(setCategory(newSelected));
    },
    [onTopicsChange, dispatch, selectedCategoryArr]
  );

  const clearAllTopics = useCallback(() => {
    onTopicsChange?.(new Set());
    dispatch(setCategory([]));
  }, [onTopicsChange, dispatch]);

  const toggleShowAllTopics = useCallback(() => {
    setShowAllTopics((prev) => !prev);
  }, []);

  const remainingTopicsCount = topics.length - maxInitialTopics;

  // Use Redux selectedCategoryArr for highlighting
  const isTopicSelected = useCallback(
    (topic: string) => selectedCategoryArr.includes(topic),
    [selectedCategoryArr]
  );

  return (
    <div className="rounded-xl p-6 bg-white w-1/4 border border-gray-100 overflow-y-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-medium text-gray-800">
          Recommended Topics
        </h1>
        {selectedCategoryArr.length > 0 && (
          <button
            onClick={clearAllTopics}
            className="text-xs text-blue-600 cursor-pointer hover:text-blue-500 font-medium transition-colors duration-200"
            aria-label="Clear all selected topics"
          >
            Clear All
          </button>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></span>
          <span className="ml-3 text-blue-400 text-sm">
            Loading categories...
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {displayedTopics.map((topic: string) => {
              const isSelected = isTopicSelected(topic);
              return (
                <button
                  key={topic}
                  onClick={() => handleTopicClick(topic)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                    isSelected
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`${isSelected ? "Remove" : "Add"} ${topic} topic`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
          {!showAllTopics && remainingTopicsCount > 0 && (
            <div>
              <button
                onClick={toggleShowAllTopics}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium hover:underline cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1"
                aria-label={`Show ${remainingTopicsCount} more topics`}
              >
                Show more topics ({remainingTopicsCount} more)
              </button>
            </div>
          )}
          {showAllTopics && (
            <div>
              <button
                onClick={toggleShowAllTopics}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium hover:underline cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1"
                aria-label="Show fewer topics"
              >
                Show less topics
              </button>
            </div>
          )}
          {selectedCategoryArr && selectedCategoryArr.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                Selected ({selectedCategoryArr.length}):
              </p>
              <div className="flex flex-wrap gap-1">
                {selectedCategoryArr.map((topic: string) => (
                  <span
                    key={topic}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-500 text-xs rounded-full"
                  >
                    {topic}
                    <button
                      onClick={() => handleTopicClick(topic)}
                      className="ml-1 text-blue-400 hover:text-blue-600 focus:outline-none"
                      aria-label={`Remove ${topic}`}
                      style={{ lineHeight: 1 }}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LeftFilter;
