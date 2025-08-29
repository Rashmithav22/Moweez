
import React from "react";
import { FcGoogle } from "react-icons/fc";

type AuthButtonProps = {
  text: string;
  onClick?: () => void; // optional now
  variant?: "primary" | "google";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  type = "button",
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors";

  const styles =
    variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
      : "border border-gray-300 hover:bg-gray-100 text-gray-700";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${styles} ${fullWidth ? "w-full" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {variant === "google" && <FcGoogle size={20} />}
      <span>{text}</span>
    </button>
  );
};

export default AuthButton;

