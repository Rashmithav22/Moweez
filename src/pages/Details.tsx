import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUnsplashImages } from '@/lib/unsplash';
import type { Movie } from '@/types/Movie';
import Link from 'next/link';


export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      // Ensure id is a string (Next.js query params can be string or string[])
      const idString = Array.isArray(id) ? id[0] : id;
      const images = await fetchUnsplashImages(idString, 1);
      if (images.length > 0) {
        const image = images[0];
        const movieData: Movie = {
          id: image.id,
          title: image.alt_description || 'Untitled',
          posterUrl: image.urls.small,
          description: image.description || image.alt_description || '',
          videos: [],
        };
        setMovie(movieData);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <main className="p-6">Loading…</main>;
  if (!movie)   return <main className="p-6">Not found. <Link href="/" className="underline">Home</Link></main>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 grid md:grid-cols-[2fr,1fr] gap-6">
      <section className="space-y-3">
        <img src={movie.posterUrl} alt={movie.title} className="w-full rounded-2xl object-cover" />
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        {typeof movie.rating === 'number' && <p>Rating: {movie.rating.toFixed(1)}</p>}
        {movie.releaseDate && <p>Release date: {movie.releaseDate}</p>}
        {movie.overview && <p className="opacity-90">{movie.overview}</p>}
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {movie.genres.map(g => <span key={g} className="px-3 py-1 rounded-full bg-white/10 text-sm">{g}</span>)}
          </div>
        )}
      </section>
      <aside className="space-y-3">
        {movie.cast && movie.cast.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Cast</h2>
            <ul className="space-y-1 opacity-90">
              {movie.cast.map((c, i) => (
  <li key={i}>
    {c.name}{c.character ? ` — ${c.character}` : ''}
  </li>
))}

            </ul>
          </div>
        )}
        <Link href="/" className="underline opacity-80">Back to Home</Link>
      </aside>
    </main>
  );
}
