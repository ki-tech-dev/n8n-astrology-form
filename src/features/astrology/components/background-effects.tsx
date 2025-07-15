import { Stars, Moon, Sun, Sparkles, Zap, Compass } from "lucide-react";

export const BackgroundEffects = () => {
  return (
    <>
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            const icons = [Stars, Moon, Sun, Sparkles, Zap];
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="absolute animate-float opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              >
                <Icon className="w-6 h-6 text-purple-300" />
              </div>
            );
          })}
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full">
            <Compass
              className="w-8 h-8 text-white animate-spin"
              style={{ animationDuration: "8s" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
