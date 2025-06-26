import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!form.fullName.trim()) return toast.error("Full Name is required");
    if (!form.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email)) return toast.error("Invalid email format");
    if (!form.password.trim()) return toast.error("Password is required");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters long");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(form);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-white">
      {/* Left - Branding */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-800 relative overflow-hidden">
        <div className="text-center max-w-md space-y-4 z-10 relative">
          <div className="flex items-center justify-center gap-2 text-cyan-400 text-3xl font-bold mb-6">
            <MessageCircle size={28} />
            VibeChat
          </div>

          {/* Welcome Illustration */}
          <div className="flex justify-center mb-6">
            <div className="w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-400/30">
              <div className="space-y-4 w-full px-6">
                <div className="flex justify-end">
                  <div className="bg-cyan-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">Hey there! 👋</div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white px-4 py-2 rounded-2xl rounded-tl-sm max-w-xs">Welcome to VibeChat!</div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-cyan-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">Love the interface! ✨</div>
                </div>
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-200"></div>
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/80 text-lg font-medium">Connect. Communicate. Collaborate.</p>
          <p className="text-white/60 text-sm">
            VibeChat is a modern messaging platform for real-time conversations, team chats, and social vibes.
          </p>
        </div>
      </div>

      {/* Right - Signup */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create your <span className="text-cyan-400">VibeChat</span> account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-white/50" size={20} />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-white/50" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/50" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-white/50 hover:text-cyan-300 transition duration-150"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Sign up button */}
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition duration-200 font-medium shadow"
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin size-5" /> Loading...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center text-sm text-white/70 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:underline hover:text-cyan-300 cursor-pointer"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
