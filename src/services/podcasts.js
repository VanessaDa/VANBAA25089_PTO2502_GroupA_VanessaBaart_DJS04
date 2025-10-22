/**
 * Service functions for fetching and filtering podcasts.
 * @module podcasts
 */
const BASE_URL = "https://podcast-api.netlify.app";
export async function fetchPodcasts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Failed to fetch podcasts: ${res.status}`);
  return res.json();
}
