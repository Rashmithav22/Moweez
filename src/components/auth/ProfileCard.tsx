// import React from "react";

// type ProfileCardProps = {
//   name: string;
//   email: string;
//   avatarUrl?: string;
//   onEdit?: () => void;
//   className?: string;
// };

// const ProfileCard: React.FC<ProfileCardProps> = ({
//   name,
//   email,
//   avatarUrl,
//   onEdit,
//   className = "",
// }) => {
//   return (
//     <div
//       className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow ${className}`}
//     >
//       <img
//         src={avatarUrl || "/default-avatar.png"}
//         alt={name}
//         className="w-16 h-16 rounded-full object-cover border border-gray-300"
//       />
//       <div className="flex flex-col">
//         <span className="font-semibold text-lg">{name}</span>
//         <span className="text-sm text-gray-500">{email}</span>
//         {onEdit && (
//           <button
//             onClick={onEdit}
//             className="text-indigo-600 text-sm mt-1 hover:underline"
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;



'use client';
import React from 'react';

type ProfileCardProps = {
  name: string;
  email: string;
  avatarUrl?: string;
  onEdit?: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, avatarUrl, onEdit }) => {
  return (
    <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow">
      <img
        src={avatarUrl || '/default-avatar.png'}
        alt={name}
        className="w-20 h-20 rounded-full border border-gray-300 object-cover"
      />
      <div className="flex flex-col">
        <span className="font-semibold text-lg">{name}</span>
        <span className="text-gray-500 text-sm">{email}</span>
        {onEdit && (
          <button
            onClick={onEdit}
            className="mt-2 text-indigo-600 text-sm hover:underline"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
