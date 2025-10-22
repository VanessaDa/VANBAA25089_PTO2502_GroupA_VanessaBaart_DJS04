import { useFilters } from "../context/FiltersContext";

/**
 * Pagination component for navigating pages.
 * @param {{ currentPage: number, totalPages: number, onPageChange: function }} props - Component props
 * @returns {JSX.Element}
 */
export default function Pagination({ totalPages }) {
  const { state, dispatch } = useFilters();
  if (totalPages <= 1) return null;
  const go = (p) => dispatch({ type: "SET_PAGE", payload: p });
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="pagination" aria-label="Podcast pagination">
      <button disabled={state.page === 1} onClick={() => go(state.page - 1)}>
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          aria-current={p === state.page ? "page" : undefined}
          className={p === state.page ? "active" : ""}
          onClick={() => go(p)}
        >
          {p}
        </button>
      ))}
      <button
        disabled={state.page === totalPages}
        onClick={() => go(state.page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
