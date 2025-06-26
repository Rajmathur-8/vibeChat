import React, { useState } from "react"
import { Eye, EyeOff, Mail, Lock, MessageCircle, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })

  const {login,isLoggingIn} = useAuthStore()
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    login(form);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900 text-white">
      {/* Left - Branding Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-800 relative overflow-hidden">
        <div className="text-center max-w-md space-y-4 z-10 relative">
          <div className="flex items-center justify-center gap-2 text-cyan-400 text-3xl font-bold mb-6">
            <MessageCircle size={28} />
            VibeChat
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-cyan-400/30">
              <div className="space-y-4 w-full px-6">
                <div className="flex justify-center">
                  <div className="bg-cyan-500 text-white px-6 py-3 rounded-2xl text-sm font-medium">
                    Welcome back! 🎉
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white px-4 py-2 rounded-2xl rounded-tl-sm max-w-xs text-sm">
                    Your conversations are waiting...
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-cyan-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs text-sm">
                    Ready to chat! 💬
                  </div>
                </div>
                <div className="flex justify-center space-x-2 pt-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-xs text-white/60">Friends online</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/80 text-lg font-medium">
            Welcome back to your conversations
          </p>
          <p className="text-white/60 text-sm">
            Login to continue chatting with your friends and teams. Your messages are end-to-end encrypted and secure.
          </p>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Login to <span className="text-cyan-400">VibeChat</span>
          </h2>

          <div className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-white/50" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/50" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
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

            <div className="flex justify-end text-sm">
              <span className="text-cyan-400 hover:underline hover:text-cyan-300 cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition duration-200 font-medium shadow"
            >
              {isLoggingIn ? (<><Loader2 className="h-5 w-5 animate-spin"/>Loading...</>)
              : "Login"}
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Removed Google sign-in button */}

          <p className="text-center text-sm text-white/70 mt-6">
            Don't have an account?{" "}
            <Link to='/signup' className="text-cyan-400 hover:underline hover:text-cyan-300 cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
