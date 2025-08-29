import React from 'react';

export interface SearchResult {
  id: string;
  type: 'movie' | 'show' | 'actor';
  title: string;
  description?: string;
  imageUrl?: string;
  extraInfo?: string; // e.g. year, role, genre
}

interface ResultCardProps {
  result: SearchResult;
  onClick?: (id: string) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(result.id)}
      onKeyDown={(e) => (e.key === 'Enter' ? onClick?.(result.id) : null)}
      className="flex space-x-4 p-3 cursor-pointer rounded
  hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {result.imageUrl && (
        <img
          src={result.imageUrl}
          alt={result.title}
          className="w-20 h-28 object-cover rounded"
          loading="lazy"
          draggable={false}
        />
      )}
      <div>
        <h3 className="font-semibold text-lg dark:text-white">{result.title}</h3>
        {result.extraInfo && (
          <p className="text-sm text-gray-400">{result.extraInfo}</p>
        )}
        {result.description && (
          <p className="text-sm line-clamp-2 text-gray-300">{result.description}</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;


// import React from 'react';

// export interface SearchResult {
//   id: string;
//   type: 'movie' | 'show' | 'actor';
//   title: string;
//   description?: string;
//   imageUrl?: string;
//   extraInfo?: string; // e.g. year, role, genre
// }

// interface ResultCardProps {
//   result: SearchResult;
//   onClick?: (id: string) => void;
// }

// const ResultCard: React.FC<ResultCardProps> = ({ result, onClick }) => {
//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       onClick={() => onClick?.(result.id)}
//       onKeyDown={(e) => (e.key === 'Enter' ? onClick?.(result.id) : null)}
//       className="flex space-x-4 p-3 cursor-pointer rounded
//   hover:bg-gray-200 dark:hover:bg-gray-700"
//     >
//       {result.imageUrl && (
//         <img
//           src={result.imageUrl}
//           alt={result.title}
//           className="w-20 h-28 object-cover rounded"
//           loading="lazy"
//           draggable={false}
//         />
//       )}
//       <div>
//         <h3 className="font-semibold text-lg dark:text-white">{result.title}</h3>
//         {result.extraInfo && (
//           <p className="text-sm text-gray-400">{result.extraInfo}</p>
//         )}
//         {result.description && (
//           <p className="text-sm line-clamp-2 text-gray-300">{result.description}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultCard;