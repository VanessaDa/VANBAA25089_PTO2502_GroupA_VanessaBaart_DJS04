import PodcastCard from "./PodcastCard";
import { genres } from "../data/genres";
import { getGenreId } from "../utils/getGenreId"; // ✅ new helper

// Build a quick lookup map: id → title
const genreById = new Map(genres.map((g) => [g.id, g.title]));

/**
 * PodcastGrid displays a grid of PodcastCard components.
 * @param {{ items: object[] }} props - The already-filtered list of podcasts to render
 * @returns {JSX.Element}
 */
export default function PodcastGrid({ items }) {
  if (!items.length) {
    return (
      <p role="status" aria-live="polite">
        No podcasts match your filters.
      </p>
    );
  }

  return (
    <section className="grid">
      {items.map((item) => {
        // ✅ Support all possible genre fields
        const gid = getGenreId(item);
        const genreTitle = gid ? genreById.get(gid) || "—" : "—";

        return (
          <PodcastCard
            key={item.id}
            item={item}
            genreTitle={genreTitle} // ✅ always shows genre
          />
        );
      })}
    </section>
  );
}
