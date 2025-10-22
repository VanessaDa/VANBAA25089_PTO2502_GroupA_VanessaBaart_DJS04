import { useEffect } from "react";

/**
 * Custom React hook for syncing state with the URL query string.
 * @param {object} state - The current state object to sync with the URL.
 * @param {function} hydrate - Function to update the state based on the URL query parameters.
 */
export default function useQuerySync(state, hydrate) {
  useEffect(() => {
    const u = new URL(window.location.href);
    const patch = {};
    if (u.searchParams.has("q")) patch.q = u.searchParams.get("q");
    if (u.searchParams.has("sort")) patch.sort = u.searchParams.get("sort");
    if (u.searchParams.has("genre")) patch.genre = u.searchParams.get("genre");
    if (u.searchParams.has("page"))
      patch.page = Number(u.searchParams.get("page")) || 1;
    if (Object.keys(patch).length) hydrate(patch);
  }, []);
  useEffect(() => {
    const u = new URL(window.location.href);
    const { q, sort, genre, page } = state;
    (q ?? "").length ? u.searchParams.set("q", q) : u.searchParams.delete("q");
    sort ? u.searchParams.set("sort", sort) : u.searchParams.delete("sort");
    genre ? u.searchParams.set("genre", genre) : u.searchParams.delete("genre");
    page
      ? u.searchParams.set("page", String(page))
      : u.searchParams.delete("page");
    window.history.replaceState(
      {},
      "",
      `${u.pathname}?${u.searchParams.toString()}`
    );
  }, [state]);
}
