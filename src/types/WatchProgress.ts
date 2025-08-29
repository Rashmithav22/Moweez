// src/types/WatchProgress.ts
import { Movie } from "./Movie";

export interface WatchProgress {
  movie: Movie;        // The full movie object
  progress: number;    // Last watched time in seconds
  duration: number;    // Total duration of video
}
