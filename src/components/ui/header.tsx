import { Link, useLocation } from "react-router-dom";
import { Compass, Stars } from "lucide-react";
import { Button } from "./button";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full">
              <Compass className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Cosmic Navigator
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-purple-400 ${
              location.pathname === "/" ? "text-purple-400" : "text-slate-300"
            }`}
          >
            Home
          </Link>
          <Link to="/form">
            <Button
              size="sm"
              className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white ${
                location.pathname === "/form" ? "opacity-75 cursor-default" : ""
              }`}
              disabled={location.pathname === "/form"}
            >
              <Stars className="w-4 h-4 mr-2" />
              Get Birth Chart
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
