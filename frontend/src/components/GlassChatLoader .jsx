import React from "react"
import { MessageSquare } from "lucide-react"

const GlassChatLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-gray-800/30 dark:to-gray-900/30 backdrop-blur-md">
      <div className="relative p-8 rounded-2xl border border-white/20 shadow-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl flex flex-col items-center gap-4">
        {/* Glowing Chat Icon */}
        <div className="relative">
          <MessageSquare className="w-12 h-12 text-white animate-pulse" />
          <div className="absolute inset-0 w-full h-full rounded-full blur-2xl bg-blue-500/30 animate-ping" />
        </div>

        {/* Animated Bubbles */}
        <div className="flex space-x-2 mt-4">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
        </div>

        <p className="mt-2 text-sm text-white/80 animate-pulse">Connecting to VibeChat...</p>
      </div>
    </div>
  )
}

export default GlassChatLoader
