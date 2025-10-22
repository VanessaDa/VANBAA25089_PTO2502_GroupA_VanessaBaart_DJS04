import { useEffect, useMemo, useState } from "react";
import { FiltersProvider, useFilters } from "./context/FiltersContext";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import GenreFilter from "./components/GenreFilter";
import Pagination from "./components/Pagination";
import PodcastGrid from "./components/PodcastGrid";
import { fetchPodcasts } from "./services/podcasts";
import { sortByNewest, sortByTitle } from "./utils/sorters";
import { paginate } from "./utils/paginate";
import useQuerySync from "./hooks/useQuerySync";
import "./styles/theme.css";
import "./styles/styles.css";

/**
 * Normalizes possible genre shapes on an item into an array of numeric IDs.
 * Supports `genre`, `genres`, and `genreIds`.
 * @param {object} item
 * @returns {number[]}
 */
function getGenreIds(item) {
  if (Array.isArray(item.genres)) return item.genres.map(Number);
  if (Array.isArray(item.genreIds)) return item.genreIds.map(Number);
  if (typeof item.genre === "number") return [item.genre];
  if (typeof item.genre === "string") return [Number(item.genre)];
  return [];
}

function Shell() {
  const { state, dispatch } = useFilters();
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ URL-state sync (persist q/genre/sort/page/perPage)
  useQuerySync(
    {
      q: state.q,
      genre: state.genre,
      sort: state.sort,
      page: state.page,
      perPage: state.perPage,
    },
    (patch) => dispatch({ type: "HYDRATE", payload: patch })
  );

  // ✅ Fetch once (logic separated in services/podcasts.js)
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPodcasts();
        setRaw(data);
      } catch (e) {
        setError(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Pipeline: search → filter → sort
  const filtered = useMemo(() => {
    let out = raw;

    // search (any part of title)
    const qVal = (state.q ?? "").trim().toLowerCase();
    if (qVal) out = out.filter((x) => x.title?.toLowerCase().includes(qVal));

    // genre filter
    if (state.genre !== "all") {
      const gid = Number(state.genre);
      out = out.filter((x) => getGenreIds(x).includes(gid));
    }

    // sort
    if (state.sort === "newest") out = sortByNewest(out);
    if (state.sort === "title-asc") out = sortByTitle(out, "asc");
    if (state.sort === "title-desc") out = sortByTitle(out, "desc");

    return out;
  }, [raw, state.q, state.genre, state.sort]);

  // ✅ Paginate AFTER filtering/sorting
  const { pageData, totalPages, total } = useMemo(
    () => paginate(filtered, state.page, state.perPage),
    [filtered, state.page, state.perPage]
  );

  // ✅ Clamp page to valid range (prevents surprise jump to page 1)
  useEffect(() => {
    if (totalPages === 0 && state.page !== 1) {
      dispatch({ type: "SET_PAGE", payload: 1 });
      return;
    }
    if (state.page > totalPages) {
      dispatch({ type: "SET_PAGE", payload: totalPages || 1 });
    } else if (state.page < 1) {
      dispatch({ type: "SET_PAGE", payload: 1 });
    }
  }, [state.page, totalPages, dispatch]);

  if (loading) return <p role="status">Loading podcasts…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div className="container">
      <header>
        <h1>🎧 React Podcast Browser</h1>
        <p className="muted small">
          {total} {total === 1 ? "show" : "shows"}
        </p>
      </header>

      <div className="toolbar">
        <SearchBar />
        <GenreFilter />
        <SortSelect />
      </div>

      <PodcastGrid items={pageData} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default function App() {
  return (
    <FiltersProvider>
      <Shell />
    </FiltersProvider>
  );
}
