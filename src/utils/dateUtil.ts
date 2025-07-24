
export const formatDate = (
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!dateString) return "Unknown date";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatOptions = options || defaultOptions;

  try {
    return new Date(dateString).toLocaleDateString("en-US", formatOptions);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};