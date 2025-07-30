import { useEffect, useState } from "react";
import { Clock, Hash, Menu, X, BookOpen, Maximize, Minimize } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../store/actions/blogAction";
import type { AppDispatch, RootState } from "../Types/types";
import BlogContent from "../Components/common/BlogContent";
import { formatDate } from "../utils/dateUtil";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [shrinkContent, setShrinkContent] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; level: number; text: string; anchor: string }[]
  >([]);
  const [activeSection, setActiveSection] = useState("");
  const [readingTime, setReadingTime] = useState(0);
  const [htmlContentWithIds, setHtmlContentWithIds] = useState<string>("");
  const { selectedBlog, loading, error } = useSelector(
    (state: RootState) => state.blogReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedBlog && selectedBlog.content) {
      const wordCount = selectedBlog.content
        .replace(/<[^>]+>/g, "")
        .split(/\s+/).length;
      const newReadingTime = Math.ceil(wordCount / 200);
      setReadingTime(newReadingTime);

      // Remove the first <h1>...</h1> from the content
      const contentWithoutFirstH1 = selectedBlog.content.replace(
        /<h1[^>]*>[\s\S]*?<\/h1>/i,
        ""
      );

      // Use DOMParser to extract headings and build TOC
      const toc: { id: string; level: number; text: string; anchor: string }[] =
        [];
      let htmlWithIds = contentWithoutFirstH1;
      if (contentWithoutFirstH1) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentWithoutFirstH1, "text/html");
        const headingEls = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headingEls.forEach((el, idx) => {
          // Exclude headings that are direct children of a list (ul/ol/li)
          if (el.closest("ul, ol, li") === null) {
            const level = Number(el.tagName.replace("H", ""));
            const text = el.textContent || `Untitled ${idx}`;
            const anchor = `toc-heading-${idx}`;
            el.setAttribute("id", anchor);
            toc.push({
              id: anchor,
              level,
              text,
              anchor,
            });
          }
        });
        // Serialize HTML with ids
        htmlWithIds = doc.body.innerHTML;
      }
      setTableOfContents(toc);
      setHtmlContentWithIds(htmlWithIds);
    }
  }, [selectedBlog]);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      tableOfContents.forEach((item) => {
        const el = document.getElementById(item.anchor);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 0) {
            currentSection = item.anchor;
          }
        }
      });
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents, activeSection]);

  const scrollToSection = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(anchor);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[83vh]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center min-h-[83vh] text-red-500">
        {error}
      </div>
    );
  }

  if (!selectedBlog) {
    return (
      <div className="w-full flex items-center justify-center min-h-[83vh]">
        Blog not found
      </div>
    );
  }

  return (
    <div className="mt-3 justify-center sm:mt-5 min-h-[83vh] flex flex-col lg:flex-row gap-5 max-w-9xl mx-auto px-1 md:px-4 pb-20 w-full">
      {/* Table of Contents Sidebar */}
      <aside
        className={`sticky ${shrinkContent ? 'w-10' : 'w-full'} top-5 h-fit transition-all duration-500 ease-in-out hidden lg:block max-w-80`}
      >
        <div className=" overflow-hidden bg-white rounded-xl shadow-sm h-full flex flex-col transition-all duration-500">
          {shrinkContent ? (
            <div
              className="flex w-10 flex-col items-center bg-white rounded-lg justify-center h-full transition-all duration-500"
            >
              <button
                className="w-10 h-10 flex items-center justify-center transition-colors rounded-full hover:bg-gray-100"
                aria-label="Open Table of Contents"
                onClick={() => setShrinkContent(false)}
              >
                <Menu size={22} className="text-gray-600 transition-transform duration-500 group-hover:rotate-90" />
              </button>
            </div>
          ) : (
            <>
              <div className="p-4 border-b bg-white rounded-t-lg border-gray-100 transition-all duration-500 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen size={18} />
                  <span className="hidden md:inline">Table of Contents</span>
                </h3>
                <button
                  onClick={() => setShrinkContent(true)}
                  className="p-1 hover:bg-gray-100 rounded transition-all duration-300"
                  aria-label="Close Table of Contents"
                >
                  <X size={16} className="text-gray-500 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>
              <div
                className="p-4 scrollbar-hide bg-white space-y-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50 transition-all duration-500"
                id="toc-scrollable"
              >
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    ref={(el) => {
                      if (activeSection === item.anchor && el) {
                        el.scrollIntoView({
                          block: "nearest",
                          behavior: "smooth",
                        });
                      }
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg duration-100 ${
                      activeSection === item.anchor
                        ? "bg-blue-50 text-blue-700 font-medium border-blue-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } ${item.level === 3 ? "ml-4 text-sm" : ""}`}
                    onClick={() => scrollToSection(item.anchor)}
                  >
                    <div className="flex items-center gap-2">
                      <Hash size={14} className="flex-shrink-0" />
                      <span className="truncate">{item.text}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-4 border-t bg-white rounded-b-lg border-gray-100 space-y-4 transition-all duration-500">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{formatDate(selectedBlog.createdAt)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto transition-all duration-500 max-w-[80%] w-full">
        <article className="bg-white relative transition-all duration-500 rounded-xl shadow-sm p-4 sm:p-8 md:p-10 lg:p-12 pb-6 w-full overflow-hidden">
          {/* Header */}
          <button
            className="absolute hidden lg:block top-3 right-4 text-gray-300 transition-all duration-500 hover:text-gray-500"
            onClick={() => setShrinkContent(!shrinkContent)}
            aria-label={shrinkContent ? 'Expand Table of Contents' : 'Shrink Table of Contents'}
          >
            {!shrinkContent ? <Maximize /> : <Minimize />}
          </button>
          <div className="mb-8 sm:mb-10 border-b border-gray-200 pb-4 sm:pb-6 transition-all duration-500">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-3 sm:mb-4 transition-all duration-500">
              {selectedBlog.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 transition-all duration-500">
              <div className="flex items-center gap-3 sm:gap-4">
                {selectedBlog.author &&
                  typeof selectedBlog.author !== "string" &&
                  selectedBlog.author.avatar && (
                    <img
                      src={selectedBlog.author.avatar}
                      alt={selectedBlog.author.name}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-blue-200 shadow transition-all duration-500"
                    />
                  )}
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg transition-all duration-500">
                    {typeof selectedBlog.author === "string"
                      ? selectedBlog.author
                      : selectedBlog.author.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1 transition-all duration-500">
                    <Clock size={14} />
                    <span>{readingTime} min read</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(selectedBlog.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Blog Content */}
          <div className="transition-all duration-500">
            <BlogContent blockContent={htmlContentWithIds} />
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;
