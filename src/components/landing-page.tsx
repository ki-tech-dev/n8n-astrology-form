import { useState, useEffect, createElement } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Stars,
  Eye,
  Heart,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const LandingPage = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);

  const Benefits = [
    {
      icon: Eye,
      title: "Self-Discovery",
      description:
        "Unlock deep insights about your personality, strengths, and hidden potential through the wisdom of the stars.",
    },
    {
      icon: Heart,
      title: "Relationships",
      description:
        "Understand your compatibility patterns and how you connect with others on a cosmic level.",
    },
    {
      icon: Target,
      title: "Life Purpose",
      description:
        "Discover your life path, career potential, and the unique gifts you're meant to share with the world.",
    },
    {
      icon: Zap,
      title: "Timing",
      description:
        "Learn about favorable periods for important decisions, relationships, and personal growth.",
    },
  ];

  const features = [
    "Precise birth chart calculations",
    "Personalized interpretations",
    "Beautiful visual representations",
    "Detailed PDF reports",
    "Privacy-protected data",
    "Expert astrological insights",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % Benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-2000" />

        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Title */}
            <div className="mb-8 animate-in fade-in slide-in-from-top duration-1000">
              <div className="flex flex-col-reverse items-center justify-center md:flex-row gap-4">
                <h1 className="text-7xl md:text-8xl  font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Cosmic Navigator
                </h1>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-full">
                      <Compass
                        className="w-12 h-12 text-white animate-spin"
                        style={{ animationDuration: "8s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-2xl md:text-3xl text-purple-200 mb-4 leading-relaxed max-w-4xl mx-auto">
                Discover the celestial secrets written in the stars at the
                moment of your birth
              </p>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
                Your personalized astrological chart reveals insights about your
                personality, relationships, life purpose, and the cosmic
                influences that shape your journey.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              <Link to="/form">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30">
                  <Stars className="w-5 h-5 mr-2" />
                  Get My Birth Chart
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-purple-400 hover:text-white hover:bg-purple-400/10 px-8 py-4 text-lg rounded-full font-medium transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("learn-more")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </Button>
            </div>

            {/* Rotating Benefit Display */}
            <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
              <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-purple-500/10 max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      {createElement(Benefits[currentBenefit].icon, {
                        className: "w-6 h-6 text-white",
                      })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {Benefits[currentBenefit]?.title}
                  </h3>
                  <p className="text-slate-300">
                    {Benefits[currentBenefit]?.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What You'll Discover Section */}
        <section id="learn-more" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">
                What You'll Discover
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Your birth chart is like a cosmic fingerprint - completely
                unique to you. Here's what your personalized astrological
                analysis will reveal:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {Benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="bg-slate-900/40 backdrop-blur-xl border-slate-700/50 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-slate-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">
                How It Works
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Getting your personalized birth chart is simple and takes just a
                few minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                  <div className="text-2xl font-bold text-white">1</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Share Your Details
                </h3>
                <p className="text-slate-300">
                  Provide your name, birth date, exact time, and location. The
                  more precise, the more accurate your chart.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
                  <div className="text-2xl font-bold text-white">2</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Cosmic Calculation
                </h3>
                <p className="text-slate-300">
                  Our advanced algorithms map the exact positions of planets and
                  celestial bodies at your birth moment.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <div className="text-2xl font-bold text-white">3</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Receive Your Chart
                </h3>
                <p className="text-slate-300">
                  Get your personalized birth chart and detailed interpretation
                  delivered directly to your inbox.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">
                What's Included
              </h2>
              <p className="text-xl text-slate-300">
                Your comprehensive astrological analysis includes:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-lg"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Moon className="w-8 h-8 text-purple-400 animate-pulse" />
                <Sparkles className="w-10 h-10 text-pink-400 animate-bounce" />
                <Sun className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
              <h2 className="text-5xl font-bold text-white mb-6">
                Ready to Explore Your Cosmic Blueprint?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands who have discovered their celestial guidance.
                Your journey of self-discovery starts with a single step into
                the stars.
              </p>
            </div>

            <Link to="/form">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30">
                <Stars className="w-6 h-6 mr-3" />
                Start My Cosmic Journey
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>

            <p className="text-sm text-slate-400 mt-6">
              ✨ Free • Secure • Instant Results ✨
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
