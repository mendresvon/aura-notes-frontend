import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // State for success message

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    try {
      const response = await registerUser({ name, email, password });
      console.log("Registration successful:", response);
      setIsSuccess(true); // Set success to true
      setTimeout(() => {
        navigate("/login"); // Redirect after 2 seconds
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      const errorMessage =
        err.response && err.response.data && err.response.data.msg
          ? err.response.data.msg
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  // State and effect for the cursor glow
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

      {/* Glassmorphism Register Card with Animations */}
      <div className="w-full max-w-md rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl p-8 md:p-12 z-10 transition-all duration-500 ease-in-out hover:shadow-purple-500/20 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl font-bold text-gray-100"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Create an Account
          </h1>
          <p className="text-gray-400 mt-2">Begin your journey.</p>
        </div>

        {isSuccess ? (
          <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-md animate-fadeInUp">
            <p className="font-semibold text-green-300">Account created successfully!</p>
            <p className="text-gray-400 mt-1">Redirecting you to the login page...</p>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={onSubmit}>
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-3 rounded-md bg-black/40 border border-white/20 text-gray-200 placeholder-gray-500 hover:border-purple-500/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
                  />
                </div>

                {/* Email Input */}
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

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-400 mb-2">
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
                    minLength="6"
                    className="w-full p-3 rounded-md bg-black/40 border border-white/20 text-gray-200 placeholder-gray-500 hover:border-purple-500/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg !transition-all ease-in-out duration-300 transform hover:scale-105">
                    Create Account
                  </button>
                </div>
              </div>
            </form>

            {/* Error Message Display */}
            {error && <p className="text-center text-red-400 mt-4">{error}</p>}

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-purple-400 hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
