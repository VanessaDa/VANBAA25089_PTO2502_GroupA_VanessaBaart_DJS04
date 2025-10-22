/**
 * Returns a single genre ID regardless of how the API formats it.
 * Supports `genre`, `genres`, or `genreIds`.
 * @param {Object} item
 * @returns {number|undefined}
 */
export function getGenreId(item) {
  if (typeof item?.genre === "number") return item.genre;
  if (Array.isArray(item?.genres) && item.genres.length)
    return Number(item.genres[0]);
  if (Array.isArray(item?.genreIds) && item.genreIds.length)
    return Number(item.genreIds[0]);
  return undefined;
}
