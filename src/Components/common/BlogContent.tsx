import React from "react";
import DOMPurify from "dompurify";
import parse, { type HTMLReactParserOptions, Element, domToReact } from "html-react-parser";

// Tailwind class mappings
const tagStyles: Record<string, string> = {
  h1: "text-4xl font-semibold text-gray-900 mt-12 mb-6 leading-tight border-b-2 border-gray-200 pb-3",
  h2: "text-3xl font-semibold text-gray-800 mt-10 mb-5 leading-tight",
  h3: "text-2xl font-medium text-gray-800 mt-8 mb-4 leading-snug",
  h4: "text-xl font-medium text-gray-700 mt-6 mb-3 leading-snug",
  h5: "text-lg font-medium text-gray-700 mt-5 mb-3 leading-normal",
  h6: "text-base font-medium text-gray-600 mt-4 mb-2 leading-normal uppercase tracking-wide",
  p: "text-gray-700 leading-relaxed mb-6 text-lg",
  ul: "list-disc list-inside space-y-2 mb-6 ml-6",
  ol: "list-decimal list-inside space-y-2 mb-6 ml-6",
  li: "text-gray-700 leading-relaxed text-lg",
  img: "rounded-xl max-w-full h-auto object-cover border border-gray-200 my-6",
  video: "rounded-xl max-w-full h-auto border border-gray-200 my-6",
  blockquote: "border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6",
  table: "table-auto border-collapse border border-gray-300 my-6 w-full",
  tr: "",
  td: "border border-gray-300 p-2 text-gray-700",
  strong: "font-semibold",
  em: "italic",
};

interface BlogContentProps {
  blockContent: string; // Raw HTML string
}

const BlogContent: React.FC<BlogContentProps> = ({ blockContent }) => {
  if (!blockContent || blockContent.trim() === "") {
    return (
      <article className="max-w-4xl mx-auto px-6 py-8 bg-white">
        <div className="text-center text-gray-500 text-lg">No content available</div>
      </article>
    );
  }

  // Fix: remove <p> inside <li> to avoid malformed bullets
  const cleanedHTML = blockContent
    .replace(/<li>\s*<p>/g, "<li>")
    .replace(/<\/p>\s*<\/li>/g, "</li>");

  const sanitized = DOMPurify.sanitize(cleanedHTML);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && tagStyles[domNode.name]) {
        const voidElements = [
          "img",
          "input",
          "br",
          "hr",
          "meta",
          "link",
          "area",
          "base",
          "col",
          "embed",
          "param",
          "source",
          "track",
          "wbr",
        ];

        if (voidElements.includes(domNode.name)) {
          return React.createElement(domNode.name, {
            className: tagStyles[domNode.name],
            ...(domNode.attribs || {}),
          });
        }

        return React.createElement(
          domNode.name,
          {
            className: tagStyles[domNode.name],
            ...(domNode.attribs || {}),
          },
          domToReact(domNode.children as import("html-react-parser").DOMNode[], options)
        );
      }
    },
  };

  return (
    <article className=" mx-auto transition-all duration-500 pb-8 px-4 sm:px-6 lg:px-0 bg-white">
      {parse(sanitized, options)}
    </article>
  );
};

export default BlogContent;
