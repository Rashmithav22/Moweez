"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import ProfileCard from "./ProfileCard";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";

type ProfileDropdownProps = {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout: () => void;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center space-x-2"
      >
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt={user.name}
          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <ProfileCard
            name={user.name}
            email={user.email}
            avatarUrl={user.avatarUrl}
            onEdit={() => {
              setIsOpen(false);
              router.push("/profile");
            }}
            // className="bg-white shadow-none"
          />

          <div className="border-t border-gray-200 mt-2">
            <AuthButton
              text="Logout"
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              variant="primary"
              fullWidth
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
