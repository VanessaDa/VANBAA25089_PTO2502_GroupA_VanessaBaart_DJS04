import { useFilters } from "../context/FiltersContext";

/**
 * SortSelect component for selecting podcast sort order.
 * @param {{ value: string, onChange: function, options: object[] }} props - Component props
 * @returns {JSX.Element}
 */
export default function SortSelect() {
  const { state, dispatch } = useFilters();
  return (
    <label className="control">
      <span>Sort</span>
      <select
        value={state.sort}
        onChange={(e) =>
          dispatch({ type: "SET_SORT", payload: e.target.value })
        }
        aria-label="Sort podcasts"
      >
        <option value="newest">Newest first</option>
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
      </select>
    </label>
  );
}
