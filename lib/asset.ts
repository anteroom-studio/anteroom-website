const base = process.env.NODE_ENV === "production" ? "/anteroom-website" : "";

export function asset(path: string) {
  return base + (path.startsWith("/") ? path : "/" + path);
}
