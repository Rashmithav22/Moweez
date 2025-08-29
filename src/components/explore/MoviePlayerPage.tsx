// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getResumeTime, saveResumeTime } from "@/utils/storage";
// import { useSearchParams } from "next/navigation";
// import type { Movie } from "@/types/Movie";


// interface MoviePlayerProps {
//   movie: Movie;
// }

// export default function MoviePlayerPage({ movie }: MoviePlayerProps) {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [resumeAvailable, setResumeAvailable] = useState(false);
//   const searchParams = useSearchParams();
//   const id = searchParams?.get("id"); // ✅ grab ID
//   const startTime = Number(searchParams?.get("time") ?? 0);

//   useEffect(() => {
//     const savedTime = getResumeTime(movie.id);
//     if (savedTime && savedTime > 10) {  // show only if watched >10s
//       setResumeAvailable(true);
//     }
//   }, [movie.id]);

//   const handleResume = () => {
//     const savedTime = getResumeTime(movie.id);
//     if (videoRef.current && savedTime) {
//       videoRef.current.currentTime = savedTime;
//       videoRef.current.play();
//       setResumeAvailable(false);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       saveResumeTime(movie.id, videoRef.current.currentTime);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
//       <div>
//       <h1>Playing movie: {id}</h1>
//       <video controls autoPlay>
//         <source src={`/videos/${id}.mp4`} type="video/mp4" />
//       </video>
//     </div>

//       <video
//         ref={videoRef}
//         src={movie.videoSrc}
//         controls
//         onTimeUpdate={handleTimeUpdate}
//         className="w-full max-w-5xl rounded-lg shadow-lg"
//       />

//       {resumeAvailable && (
//         <button
//           onClick={handleResume}
//           className="mt-4 px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
//         >
//           ▶ Resume from last time
//         </button>
//       )}
//       {movie.videos.map((clip, i) => (
//   <video key={i} src={clip} controls />
// ))}

//     </div>
//   );
// }


"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getResumeTime, saveResumeTime } from "@/utils/storage";
import type { Movie } from "@/types/Movie";

interface MoviePlayerProps {
  movie: Movie;
}

export default function MoviePlayerPage({ movie }: MoviePlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const startTime = Number(searchParams?.get("time") ?? 0);

  useEffect(() => {
    const savedTime = getResumeTime(movie.id);
    if (savedTime && savedTime > 10) {
      setResumeAvailable(true);
    }
  }, [movie.id]);

  const handleResume = () => {
    const savedTime = getResumeTime(movie.id);
    if (videoRef.current && savedTime) {
      videoRef.current.currentTime = savedTime;
      videoRef.current.play();
      setResumeAvailable(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      saveResumeTime(movie.id, videoRef.current.currentTime);
    }
  };

  // ✅ Decide what to play: prefer videoSrc → then videos[0] → then /clips/id.mp4
  const videoSource =
    movie.videoSrc ||
    (movie.videos && movie.videos.length > 0 ? movie.videos[0] : null) ||
    (id ? `/clips/${id}.mp4` : null);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      {videoSource ? (
        <>
          <video
            ref={videoRef}
            src={videoSource}
            controls
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            className="w-full max-w-5xl rounded-lg shadow-lg"
          />
          {resumeAvailable && (
            <button
              onClick={handleResume}
              className="mt-4 px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              ▶ Resume from last time
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-500">❌ No video available for this movie.</p>
      )}

      {/* ✅ Show additional clips if movie.videos exists */}
      {movie.videos && movie.videos.length > 1 && (
        <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-5xl">
          {movie.videos.slice(1).map((clip, i) => (
            <video key={i} src={clip} controls className="rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
}
