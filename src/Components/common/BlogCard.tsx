import { Link } from "react-router-dom";
import type { BlogCardProps } from "../../Types/types";

const BlogCard = ({ id , title, author, description, category, image }: BlogCardProps) => {

    const extractContent = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Get all text content and trim
    const content = tempDiv.textContent?.trim() || "";
    return content;
  };

  return (
    <Link to={`/blog/${id}`} className="bg-white hover:bg-gray-100 hover:shadow-[0px_2px_5px_2px_#efefef] cursor-pointer p-4 sm:p-6 border-gray-100 rounded-xl flex flex-col sm:flex-row gap-4 sm:gap-12 items-start transition-all duration-500 w-full max-w-full">
      <img
        src={image || `https://image.pollinations.ai/prompt/${encodeURIComponent([
          "portrait of a focused software engineer, dual monitors, code on screen, modern office, realistic photo",
          "realistic portrait of a female developer, tech gadgets on desk, soft lighting, casual attire",
          "photo of a young tech blogger, wearing headphones, surrounded by laptops and code, modern workspace",
          "author portrait, middle-aged male programmer, creative coder, natural lighting, minimal background",
          "professional tech writer, close-up headshot, neutral expression, clean background, photorealistic",
          "female digital creator, coding on a laptop, cozy tech-themed room, realistic style, ambient lighting",
          "modern journalist, headshot with server racks blurred in background, realistic photography style",
          "realistic portrait of a lifestyle tech blogger, cheerful face, smart devices in the background, natural light",
          "realistic avatar of a travel tech blogger, holding a tablet, digital nomad vibe, soft lighting",
          "photo of a young coder or developer, focused expression, code editor on screen, tech-themed background, realistic"
        ][Math.floor(Math.random() * 10)])}`}
        alt={title}
        className="w-full sm:w-[40%] h-40 sm:h-72 object-cover rounded-lg bg-gray-50 flex-shrink-0 transition-all duration-500"
      />
      <div className="flex flex-col gap-2 flex-1 pt-2 pr-0 sm:pr-3 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1 sm:gap-0">
          <span className="text-xs sm:text-sm bg-[#e9f0f9] text-blue-500 px-2 py-0.5 rounded-full capitalize">{category}</span>
          <span className="text-xs sm:text-sm text-gray-400">By {author}</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{title}</h2>
        <p className="text-sm sm:text-base leading-6 sm:pr-10 md:pr-20 text-gray-600/[0.8] line-clamp-3 sm:line-clamp-4">{extractContent(description)}</p>
        <button className="mt-4 sm:mt-7 text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium self-start cursor-pointer">Read More</button>
      </div>
    </Link>
  );
};

export default BlogCard;