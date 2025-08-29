

export interface CastMember {
  name: string;
  character: string;
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  rating?: number;
  overview?: string;
  releaseDate?: string;
  genres?: string[];
  cast?: CastMember[];
  videoSrc?: string;
  language?: string;
  description: string;
  genre?: string;
  alt_description?: string;
  urls?: { regular: string };
  videos: string[]; 
  // ⬇️ New field for resume functionality
  resumeTime?: number; 


  // clips?:string[]; // in seconds
}

// export interface CardMovie {
//   id: string;
//   title: string;
//   description: string;
//   posterUrl: string;
//   rating: number;
//   videoSrc: string;
// }