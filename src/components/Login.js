import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginWithEmail = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Store basic info locally
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("username", user.displayName?.split(" ")[0] || "User");
      localStorage.setItem("coins", "500"); // initial value (optional)
  
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const loginAsGuest = async () => {
    setError("");
    setLoading(true);
    try {
      await signInAnonymously(auth);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-green-500 to-lime-600 p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl w-full max-w-lg p-10 text-white">
        <h2 className="text-4xl font-extrabold text-center mb-8 tracking-tight">🌿 Welcome Back</h2>

        {error && (
          <div className="bg-red-200 text-red-800 px-4 py-2 rounded mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={loginWithEmail} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur focus:outline-none focus:ring-2 focus:ring-lime-300 placeholder-white text-white"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur focus:outline-none focus:ring-2 focus:ring-lime-300 placeholder-white text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-lime-500 hover:bg-lime-600"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <hr className="flex-grow border-white/30" />
          <span className="text-sm text-white/70">OR</span>
          <hr className="flex-grow border-white/30" />
        </div>

        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-green-700 font-semibold py-3 rounded-lg shadow-md hover:bg-gray-100 transition mb-4"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        <button
          onClick={loginAsGuest}
          disabled={loading}
          className="w-full flex items-center justify-center bg-white/20 backdrop-blur text-white font-semibold py-3 rounded-lg hover:bg-white/30 transition"
        >
          🌫️ Continue as Guest
        </button>

        <p className="mt-8 text-center text-white/70 text-sm">
          Forgot your password?{" "}
          <span className="underline cursor-pointer">Reset it</span>
        </p>
      </div>
    </div>
  );
}
