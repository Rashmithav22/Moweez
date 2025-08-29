interface ExploreButtonProps {
  onClick: () => void;
}

export default function ExploreButton({ onClick }: ExploreButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
      type="button"
    >
      Explore
    </button>
  );
}
