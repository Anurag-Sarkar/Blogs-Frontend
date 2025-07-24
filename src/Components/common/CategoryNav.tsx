import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type JSX } from "react";
import type { CategoryNav } from "../../Types/types";

export default function CategoryNav({
  selectedCategory,
  setSelectedCategory,
  categories,
}: CategoryNav): JSX.Element {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollByAmount = 150;

  // Utility to update scroll button state
  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  // Scroll left
  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    setTimeout(updateScrollButtons, 300);
  };

  // Scroll right
  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
    setTimeout(updateScrollButtons, 300);
  };

  // Handle selected category indicator & auto-scroll into view
  useEffect(() => {
    const currentBtn = buttonsRef.current[selectedCategory];
    const container = containerRef.current;

    if (currentBtn && container) {
      const { offsetLeft, offsetWidth } = currentBtn;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });

      // Scroll to make selected button visible
      setTimeout(() => {
        const btnLeft = offsetLeft;
        const btnRight = offsetLeft + offsetWidth;
        const visibleLeft = container.scrollLeft;
        const visibleRight = container.scrollLeft + container.clientWidth;

        if (btnLeft < visibleLeft) {
          container.scrollTo({ left: btnLeft - 16, behavior: "auto" });
        } else if (btnRight > visibleRight) {
          container.scrollTo({
            left: btnRight - container.clientWidth + 16,
            behavior: "auto",
          });
        }
      }, 0);
    }
  }, [selectedCategory, categories]);

  // Update scroll button visibility on scroll or resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons(); // Initial call

    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div className="bg-white flex justify-center mb-6">
      {/* Scroll Left Button */}
      <button
        onClick={handleScrollLeft}
        disabled={!canScrollLeft}
        className={`flex items-center justify-center h-8 -mt-0.5 text-xl font-bold transition-colors duration-200 ${
          canScrollLeft
            ? "text-gray-600 hover:text-black cursor-pointer"
            : "text-gray-300 cursor-not-allowed"
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Category Tabs */}
      <nav
        ref={containerRef}
        className="relative flex-1 flex items-center gap-2 overflow-x-scroll scroll-smooth border-b border-gray-100 pb-3 scrollbar-hide mx-2"
        aria-label="Blog categories"
      >
        <button
            key={"All"}
            ref={(el) => { buttonsRef.current["All"] = el; }}
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-1 text-sm cursor-pointer capitalize relative whitespace-nowrap transition-colors duration-300 ${
              selectedCategory === "All" ? "text-black" : "text-gray-500"
            }`}
            aria-pressed={selectedCategory === "All"}
            type="button"
          >
            All
          </button>
        {categories.map((cat) => (
          <button
            key={cat}
            ref={(el) => { buttonsRef.current[cat] = el; }}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 text-sm cursor-pointer capitalize relative whitespace-nowrap transition-colors duration-300 ${
              selectedCategory === cat ? "text-black" : "text-gray-500"
            }`}
            aria-pressed={selectedCategory === cat}
            type="button"
          >
            {cat}
          </button>
        ))}

        {/* Animated Bottom Indicator */}
        <div
          className="absolute bottom-0 h-[2px] bg-black transition-all duration-300"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      </nav>

      {/* Scroll Right Button */}
      <button
        onClick={handleScrollRight}
        disabled={!canScrollRight}
        className={`flex items-center justify-center h-8 -mt-0.5 text-xl font-bold transition-colors duration-200 ${
          canScrollRight
            ? "text-gray-600 hover:text-black cursor-pointer"
            : "text-gray-300 cursor-not-allowed"
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
