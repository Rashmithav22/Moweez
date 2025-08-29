'use client';

import React, { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthModalContext";
import { login, signup, User } from "@/lib/api";
const AuthOverlay: React.FC = () => {
  const { open, closeAuthModal, login: contextLogin } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!open) return null;  // Render nothing if modal is closed

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup") {
      if (!name.trim()) {
        toast.error("Please enter your name");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    if (mode === "login") {
      const res = await login(email, password);
      if (res.success && res.user) {
        contextLogin(res.user);
        toast.success("Logged in successfully!");
        closeAuthModal();
      } else {
        toast.error(res.error ?? "An error occurred.");
      }
    } else {
      const newUser: User = { name, email, password, avatar: `https://i.pravatar.cc/150?u=${email}` };
      const res = await signup(newUser);
      if (res.success && res.user) {
        toast.success("Account created successfully! Please login.");
        setMode("login");
        resetFields();
      } else {
        toast.error(res.error ?? "An error occurred.");
      }
    }
  };

  const handleGoogleLogin = () => {
    // Demo google login user
    const googleUser: User = {
      name: "Google User",
      email: "googleuser@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      password: "",
    };
    contextLogin(googleUser);
    toast.success("Logged in with Google!");
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {mode === "signup" ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <AuthInput
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {mode === "signup" && (
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <AuthButton
            text={mode === "signup" ? "Sign Up" : "Log In"}
            type="submit"
            variant="primary"
            fullWidth
          />

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <AuthButton
            text="Continue with Google"
            type="button"
            variant="google"
            fullWidth
            onClick={handleGoogleLogin}
          />
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  resetFields();
                }}
                className="text-indigo-600 hover:underline"
                type="button"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  resetFields();
                }}
                className="text-indigo-600 hover:underline"
                type="button"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthOverlay;
