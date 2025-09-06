import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import AnimatedComponent from "../components/AnimatedComponent"; // Import the new component

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginUser({ email, password });
      login(data.token);
      navigate("/");
    } catch (err) {
      setError(err.msg || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center bg-[#111111] p-4 text-gray-200 overflow-hidden">
      {/* Cursor Glow Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(167, 139, 250, 0.15), transparent 80%)`,
        }}></div>

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Glassmorphism Login Card */}
      <div className="w-full max-w-md rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl p-8 md:p-12 z-10 transition-all duration-500 ease-in-out hover:shadow-purple-500/20 hover:shadow-2xl hover:-translate-y-2">
        {/* Header */}
        <div className="text-center mb-10">
          <AnimatedComponent delay={0.1}>
            <div
              className="inline-block font-bold text-6xl md:text-7xl bg-gradient-to-r from-gray-200 to-gray-400 text-transparent bg-clip-text mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Aura
            </div>
          </AnimatedComponent>
          <AnimatedComponent delay={0.2}>
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-100"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Notes
            </h1>
          </AnimatedComponent>
          <AnimatedComponent delay={0.3}>
            <TypeAnimation
              sequence={[1000, "By Von Mendres「馬盛中」"]}
              wrapper="p"
              cursor={true}
              speed={50}
              className="text-gray-400 mt-2"
            />
          </AnimatedComponent>
        </div>

        {/* Form */}
        <AnimatedComponent delay={0.4}>
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  required
                  className="w-full p-3 rounded-md bg-black/40 border border-white/20 text-gray-200 placeholder-gray-500 hover:border-purple-500/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••"
                  required
                  className="w-full p-3 rounded-md bg-black/40 border border-white/20 text-gray-200 placeholder-gray-500 hover:border-purple-500/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg !transition-all ease-in-out duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </div>
          </form>
        </AnimatedComponent>

        {isLoading && (
          <div className="text-center text-sm text-gray-400 mt-4">
            <p>Waking up the server... this might take a moment.</p>
          </div>
        )}
        {error && <p className="text-center text-red-400 mt-4">{error}</p>}

        {/* Sign Up Link */}
        <AnimatedComponent delay={0.5}>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="font-medium text-purple-400 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
};

export default LoginPage;