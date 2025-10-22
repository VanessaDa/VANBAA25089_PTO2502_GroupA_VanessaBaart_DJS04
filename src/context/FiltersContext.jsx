import { createContext, useContext, useMemo, useReducer } from "react";

/**
 * FiltersContext provides filter state and updater functions for the app.
 * @type {React.Context<{state: {
 *   q: string,
 *   sort: 'newest' | 'title-asc' | 'title-desc',
 *   genre: string,
 *   page: number,
 *   perPage: number,
 * }, dispatch: React.Dispatch<any>}>}
 */
const FiltersContext = createContext(null);

const initialState = {
  q: "",
  sort: "newest",
  genre: "all",
  page: 1,
  perPage: 12,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      // ❌ was: return { ...state, q: action.payload, page: 1 };
      return { ...state, q: action.payload };

    case "SET_SORT":
      // ❌ was: return { ...state, sort: action.payload, page: 1 };
      return { ...state, sort: action.payload };

    case "SET_GENRE":
      // ❌ was: return { ...state, genre: action.payload, page: 1 };
      return { ...state, genre: action.payload };

    case "SET_PAGE":
      return { ...state, page: action.payload };

    case "SET_PER_PAGE":
      return { ...state, perPage: action.payload };

    case "HYDRATE": {
      // Optional: accept only known keys & coerce types (helps URL-sync)
      const patch = action.payload ?? {};
      const next = { ...state };

      if (typeof patch.q === "string") next.q = patch.q;
      if (typeof patch.sort === "string") next.sort = patch.sort;
      if (typeof patch.genre === "string") next.genre = patch.genre;

      if (patch.page != null) {
        const n = Number(patch.page);
        if (!Number.isNaN(n)) next.page = n;
      }
      if (patch.perPage != null) {
        const n = Number(patch.perPage);
        if (!Number.isNaN(n)) next.perPage = n;
      }
      return next;
    }

    default:
      return state;
  }
}

export function FiltersProvider({ children, initial = {} }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...initial,
  });
  const api = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <FiltersContext.Provider value={api}>{children}</FiltersContext.Provider>
  );
}

export const useFilters = () => {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider");
  return ctx;
};
