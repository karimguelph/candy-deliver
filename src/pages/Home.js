import React from "react";
import { Link } from "react-router-dom";
<style>
  {`
    @media (max-height: 600px) {
      html, body {
        height: auto;
        overflow-y: scroll;
      }
    }
  `}
</style>

export default function Home() {
  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-green-900 via-emerald-700 to-lime-600 flex items-center justify-center px-4 py-10 sm:py-20">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 max-w-3xl w-full animate-fade-in">

        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
            🌿 SeekoSeeko Inc.
          </h1>
          <p className="text-green-100 mt-4 text-lg md:text-xl font-light">
            Log in and relax. No stress. No clutter.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-xl p-6 transition duration-300 shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">🔥 Weed store</h2>
            <p className="text-sm text-green-100">
              You are a few clicks away from getting weed
            </p>
          </div>
          <div className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-xl p-6 transition duration-300 shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">🎧 Chill Vibes</h2>
            <p className="text-sm text-green-100">
              Keep calm and order
            </p>
          </div>
          <div className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-xl p-6 transition duration-300 shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">📦 Simple Entry</h2>
            <p className="text-sm text-green-100">
              We don’t ask questions. Just log in and get your weed
            </p>
          </div>
          <div className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-xl p-6 transition duration-300 shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-2">☁️ Cloud Nine</h2>
            <p className="text-sm text-green-100">
              Amazing store
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link
            to="/login"
            className="inline-block bg-white text-green-800 hover:bg-green-100 font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-lg"
          >
            🚪 Enter the Lounge
          </Link>
        </div>

        <footer className="mt-10 text-center text-xs text-green-200">
          Built for the chill. <br /> Built by Belal & Youssef, not Karim Sherif Abdelhamid
        </footer>
      </div>
    </div>
  );
}
