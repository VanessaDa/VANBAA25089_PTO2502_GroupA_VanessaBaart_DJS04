import { useFilters } from "../context/FiltersContext";
import { genres } from "../data/genres";
export default function GenreFilter() {
  const { state, dispatch } = useFilters();
  return (
    <label className="control">
      <span>Genre</span>
      <select
        value={state.genre}
        onChange={(e) => dispatch({ type: "SET_GENRE", payload: e.target.value })}
        aria-label="Filter by genre"
      >
        <option value="all">All</option>
        {genres.map((g) => (
          <option key={g.id} value={String(g.id)}>
            {g.title}
          </option>
        ))}
      </select>
    </label>
  );
}
