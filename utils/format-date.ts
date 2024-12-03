const DATE_FORMAT: Record<string, Intl.DateTimeFormatOptions> = {
  default: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  short: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  numeric: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
};

export function formatDate(
  date: Date,
  format: "default" | "short" | "numeric" = "default",
): string {
  return date.toLocaleDateString("de-DE", DATE_FORMAT[format]);
}
