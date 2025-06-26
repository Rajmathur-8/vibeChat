import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100/80 border-b border-base-300 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-primary hover:opacity-90 transition"
        >
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-base-content">VibeChat</span>
        </Link>

        {/* Nav Actions */}
        <div className="flex items-center gap-3">
          <Link to="/settings" className="btn btn-sm btn-ghost gap-1">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="btn btn-sm btn-ghost gap-1">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="btn btn-sm btn-ghost gap-1 text-error"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
