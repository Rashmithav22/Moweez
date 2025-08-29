// "use client";

// import React, { useState } from "react";
// import AuthInput from "./AuthInput";
// import AuthButton from "./AuthButton";

// type ProfileEditFormProps = {
//   user: {
//     name: string;
//     email: string;
//     avatarUrl?: string;
//   };
//   onSave: (updatedData: FormData) => Promise<void>;
// };

// const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ user, onSave }) => {
//   const [name, setName] = useState(user.name);
//   const [password, setPassword] = useState("");
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     if (password) formData.append("password", password);
//     if (avatarFile) formData.append("avatar", avatarFile);

//     try {
//       await onSave(formData);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md w-full p-6 bg-white rounded-lg shadow space-y-4"
//     >
//       <div className="flex flex-col items-center space-y-2">
//         <img
//           src={
//             avatarFile
//               ? URL.createObjectURL(avatarFile)
//               : user.avatarUrl || "/default-avatar.png"
//           }
//           alt="Profile"
//           className="w-20 h-20 rounded-full border border-gray-300 object-cover"
//         />
//         <label className="cursor-pointer text-sm text-indigo-600 hover:underline">
//           Change Picture
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) =>
//               setAvatarFile(e.target.files ? e.target.files[0] : null)
//             }
//           />
//         </label>
//       </div>

//       <AuthInput
//         label="Name"
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <AuthInput label="Email" type="email" value={user.email} disabled />

//       <AuthInput
//         label="New Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Leave blank to keep current password"
//       />

//       <AuthButton
//         text={loading ? "Saving..." : "Save Changes"}
//         type="submit"
//         variant="primary"
//         fullWidth
//         disabled={loading}
//       />
//     </form>
//   );
// };

// export default ProfileEditForm;


'use client';
import React, { useState } from 'react';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

type ProfileEditFormProps = {
  user: { name: string; email: string; avatarUrl?: string };
  onSave: (formData: FormData) => Promise<void>;
};

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    if (password) formData.append('password', password);
    if (avatarFile) formData.append('avatar', avatarFile);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full p-6 bg-white rounded-lg shadow space-y-4"
    >
      <div className="flex flex-col items-center space-y-2">
        <img
          src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatarUrl || '/default-avatar.png'}
          alt="Profile"
          className="w-20 h-20 rounded-full border border-gray-300 object-cover"
        />
        <label className="cursor-pointer text-sm text-indigo-600 hover:underline">
          Change Picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)}
          />
        </label>
      </div>

      <AuthInput label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <AuthInput label="Email" type="email" value={user.email} disabled />
      <AuthInput
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Leave blank to keep current password"
      />

      <AuthButton text={loading ? 'Saving...' : 'Save Changes'} type="submit" variant="primary" fullWidth disabled={loading} />
    </form>
  );
};

export default ProfileEditForm;
