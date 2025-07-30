import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl shrink-0">
      <div className="p-2 w-fit bg-black rounded-xl">
        <img className="h-6 sm:h-6 md:h-7" src="/images/light-logo.png" alt="Shery Blogs Logo" />
      </div>
    </Link>
  );
};

export default Logo;
