interface GenresListProps {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
}

export default function GenresList({ genres, selectedGenre, onSelectGenre }: GenresListProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelectGenre(genre)}
          className={`px-3 py-1 rounded ${
            selectedGenre === genre ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
          } transition`}
          type="button"
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
