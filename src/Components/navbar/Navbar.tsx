import Input from "../common/Input";
import Logo from "../common/Logo";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

const mockResults = ["React JS", "Next JS", "Tailwind CSS", "Node.js", "MongoDB", "Express.js", "React Native", "TypeScript"];

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Memoize filtered results
    const filteredResults = useMemo(() => mockResults.filter((item) => item.toLowerCase().includes(search.toLowerCase()) && search.trim() !== ""), [search]);

    // Memoize handlers
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setShowDropdown(true);
    }, []);

    const handleInputFocus = useCallback(() => {
        setShowDropdown(true);
    }, []);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="py-4 sticky top-0 flex z-50 items-center px-6 bg-white">
            {/* Left side - Navigation Links */}
            <div className="flex items-center gap-6">
                <a href="https://sheryians.com/courses" target="_blank" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    COURSES
                </a>
                <a href="https://sheryians.com/src" target="_blank" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    SRC
                </a>
                <a href="https://sheryians.com/kodr" target="_blank" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    KODR
                </a>
            </div>

            {/* Center - Logo (Absolutely centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Logo />
            </div>

            {/* Right side - Search Input */}
            <div className="flex items-center ml-auto">
                <div className="relative w-36 sm:w-44 md:w-74" ref={wrapperRef}>
                    <Input placeholder="Search..." value={search} onChange={handleInputChange} onFocus={handleInputFocus} className="pl-10 pr-4 py-2" aria-label="Search" leftIcon={<SearchIcon />} />

                    {/* Dropdown */}
                    {showDropdown && filteredResults.length > 0 && (
                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow-md max-h-60 overflow-y-auto">
                            {filteredResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                    onClick={() => {
                                        setSearch(result);
                                        setShowDropdown(false);
                                    }}>
                                    {result}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No results message */}
                    {showDropdown && search.trim() !== "" && filteredResults.length === 0 && <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow-md px-4 py-2 text-sm text-gray-500">No results found.</div>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
