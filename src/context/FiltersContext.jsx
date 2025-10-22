import { createContext, useContext, useMemo, useReducer } from "react";

/**
 * FiltersContext provides filter state and updater functions for the app.
 * @type {React.Context}
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
      return { ...state, q: action.payload, page: 1 };
    case "SET_SORT":
      return { ...state, sort: action.payload, page: 1 };
    case "SET_GENRE":
      return { ...state, genre: action.payload, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "HYDRATE":
      return { ...state, ...action.payload };
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
