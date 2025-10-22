import PodcastCard from "./PodcastCard";
import { genres } from "../data/genres";
const genreById = new Map(genres.map((g) => [g.id, g.title]));
export default function PodcastGrid({ items }) {
  if (!items.length) return <p role="status" aria-live="polite">No podcasts match your filters.</p>;
  return (
    <section className="grid">
      {items.map((item) => (
        <PodcastCard key={item.id} item={item} genreTitle={genreById.get(item.genre) || "—"} />
      ))}
    </section>
  );
}
