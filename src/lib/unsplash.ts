import { Movie } from "@/types/Movie";

export interface UnplashImages {
  id: string;
  title: string;
  alt_description: string | null;
  description?: string | null;
  urls: {
    small: string;
    regular: string;
  };
}

export async function fetchUnsplashImages(
  query: string,
  perPage = 10
): Promise<UnplashImages[]> {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!accessKey) {
    throw new Error('Missing Unsplash Access Key. Please check your .env.local file');
  }

  try {
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

    if (!res.ok) {
      throw new Error('Failed to fetch from Unsplash API');
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Unsplash API error:', error);
    throw error;
  }
}
