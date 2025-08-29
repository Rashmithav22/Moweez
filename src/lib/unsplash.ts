export interface UnplashImages {
  id: string;
  title: string;
  alt_description: string | null;
  description?: string | null; // <-- add this line
  urls: {
    small: string;
    regular: string;
  };
  // any other existing props...
}

export async function fetchUnsplashImages(
  query: string,
  perPage = 10
): Promise<UnplashImages[]> {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!accessKey) throw new Error('Missing Unsplash Access Key');

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    }
  );

  if (!res.ok) throw new Error('Failed to fetch from Unsplash');

  const data = await res.json();
  return data.results;
}


