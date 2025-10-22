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

  useQuerySync(state, (patch) => dispatch({ type: "HYDRATE", payload: patch }));

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPodcasts();
        setRaw(data);
      } catch (e) {
        setError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let out = raw;
    const qVal = (state.q ?? "").trim().toLowerCase();
    if (qVal) out = out.filter((x) => x.title.toLowerCase().includes(qVal));
    if (state.genre !== "all") {
      const gid = Number(state.genre);
      out = out.filter((x) => getGenreIds(x).includes(gid));
    }
    if (state.sort === "newest") out = sortByNewest(out);
    if (state.sort === "title-asc") out = sortByTitle(out, "asc");
    if (state.sort === "title-desc") out = sortByTitle(out, "desc");
    return out;
  }, [raw, state.q, state.genre, state.sort]);

  const { pageData, totalPages, total } = useMemo(
    () => paginate(filtered, state.page, state.perPage),
    [filtered, state.page, state.perPage]
  );

  if (loading) return <p role="status">Loading podcasts…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div className="container">
      <header>
        <h1>🎧 React Podcast Browser</h1>
        <p className="muted small">{total} {total === 1 ? "show" : "shows"}</p>
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
