import { useFilters } from "../context/FiltersContext";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { useEffect, useState } from "react";

/**
 * SearchBar component for entering podcast search queries.
 * @param {{ value: string, onChange: function }} props - Component props
 * @returns {JSX.Element}
 */
export default function SearchBar() {
  const { state, dispatch } = useFilters();
  const [value, setValue] = useState(state.q ?? "");
  const debounced = useDebouncedValue(value, 300);
  useEffect(() => {
    if (debounced !== (state.q ?? ""))
      dispatch({ type: "SET_QUERY", payload: debounced });
  }, [debounced]);
  return (
    <label className="control">
      <span>Search</span>
      <input
        type="search"
        placeholder="Search by title…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search podcasts by title"
      />
    </label>
  );
}
