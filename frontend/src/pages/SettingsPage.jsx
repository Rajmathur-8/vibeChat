import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [animateMessages, setAnimateMessages] = useState(false);

  // Trigger message animation on mount
  useEffect(() => {
    setAnimateMessages(true);
  }, []);

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-8">
        {/* Theme Selector Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>

        {/* Theme Buttons Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-2 p-3 rounded-lg transition-all
                shadow-md
                hover:shadow-lg hover:scale-[1.08]
                focus:outline-none focus:ring-4 focus:ring-cyan-400
                ${theme === t ? "ring-4 ring-cyan-400 bg-base-200 shadow-lg" : "bg-base-100"}
              `}
              onClick={() => setTheme(t)}
              aria-pressed={theme === t}
              aria-label={`Select ${t} theme`}
            >
              <div
                className="relative h-10 w-full rounded-md overflow-hidden"
                data-theme={t}
                style={{ boxShadow: "inset 0 0 8px rgb(0 0 0 / 0.1)" }}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1 animate-shimmer rounded-md">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[12px] font-semibold truncate w-full text-center select-none">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-gradient-to-br from-base-100 to-base-200 shadow-xl">
          <div className="p-5">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
                {/* Chat Header */}
                <div className="px-5 py-4 border-b border-base-300 bg-base-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold text-lg select-none">
                    J
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">John Doe</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-6 space-y-5 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message, idx) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                      style={{
                        opacity: animateMessages ? 1 : 0,
                        transform: animateMessages
                          ? "translateY(0)"
                          : message.isSent
                          ? "translateX(30px)"
                          : "translateX(-30px)",
                        transition: `opacity 0.4s ease ${
                          idx * 0.15
                        }s, transform 0.4s ease ${idx * 0.15}s`,
                      }}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-4 shadow-md select-text ${
                          message.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-[10px] mt-1.5 select-none ${
                            message.isSent
                              ? "text-primary-content/70"
                              : "text-base-content/70"
                          }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-5 border-t border-base-300 bg-base-100">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-11 rounded-lg transition-shadow focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button
                      className="btn btn-primary h-11 min-h-0 rounded-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                      aria-label="Send message"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer animation styles */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 25%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.05) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
