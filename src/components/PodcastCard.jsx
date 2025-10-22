export default function PodcastCard({ item, genreTitle }) {
  return (
    <article className="card">
      <img src={item.image} alt={`Artwork for ${item.title}`} loading="lazy" />
      <div className="card-body">
        <h3>{item.title}</h3>
        <p className="muted small">{item.seasons} {item.seasons === 1 ? "season" : "seasons"}</p>
        <p className="muted">{genreTitle}</p>
        <p className="muted small">Updated {new Date(item.updated).toLocaleDateString()}</p>
      </div>
    </article>
  );
}
