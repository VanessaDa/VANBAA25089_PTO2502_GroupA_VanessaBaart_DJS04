/**
 * Utility functions for sorting podcast data.
 * @module sorters
 */
export const sortByNewest = (data) =>
  [...data].sort((a, b) => new Date(b.updated) - new Date(a.updated));
export const sortByTitle = (data, direction = "asc") =>
  [...data].sort((a, b) => {
    const t1 = a.title.toLowerCase();
    const t2 = b.title.toLowerCase();
    return direction === "asc" ? t1.localeCompare(t2) : t2.localeCompare(t1);
  });
