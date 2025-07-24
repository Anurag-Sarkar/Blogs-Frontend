import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl shrink-0">
      <div className="p-2 w-fit bg-black rounded-xl">
        <img className="h-5 sm:h-6 md:h-7" src="/images/shery-white.jpg" alt="Shery Blogs Logo" />
      </div>
      <h1 className="hidden md:block xs:block text-base sm:text-lg md:text-[1.3rem] lg:text-[1.5rem] ">Shery Blogs</h1>
    </Link>
  );
};

export default Logo;
