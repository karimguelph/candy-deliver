import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useState({ username: "User", coins: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    const isGuest = user.isAnonymous;
    const isGoogle = user.providerData[0]?.providerId === "google.com";
    const fallbackName = isGoogle
      ? user.displayName?.split(" ")[0] || "User"
      : "Guest";

    const ref = doc(db, "users", user.uid);

    const fetchUserData = async () => {
      try {
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setUserData({
            username: data.username || fallbackName,
            coins: data.coins ?? 500,
          });

          // Update localStorage just in case
          localStorage.setItem("username", data.username || fallbackName);
          localStorage.setItem("coins", String(data.coins ?? 500));
        } else {
          const newUser = {
            uid: user.uid,
            username: fallbackName,
            coins: 500,
            createdAt: new Date(),
          };
          await setDoc(ref, newUser);
          setUserData(newUser);

          localStorage.setItem("username", fallbackName);
          localStorage.setItem("coins", "500");
        }
      } catch (err) {
        console.warn("⚠️ Firestore failed. Using localStorage fallback.");

        // fallback if Firestore is too slow or offline
        const localUsername = localStorage.getItem("username") || fallbackName;
        const localCoins = parseInt(localStorage.getItem("coins") || "500");
        setUserData({ username: localUsername, coins: localCoins });
      } finally {
        setLoading(false);
      }
    };

    if (isGuest) {
      setUserData({ username: "Guest", coins: 500 });
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-green-200 to-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-green-700 text-white shadow-md">
        <h1 className="text-2xl font-bold">🍃 SeekoSeeko Dashboard</h1>
        <button
          onClick={() => {
            auth.signOut();
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-white text-green-700 px-4 py-2 rounded-full hover:bg-green-100 font-semibold shadow transition"
        >
          Log out
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Hi, {userData.username}
          </h2>

          <p className="text-xl mb-6">
            💰 Coin Balance:{" "}
            <span className="font-bold">{userData.coins}</span>
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/candy")}
              className="bg-green-500 hover:bg-green-600 text-white py-2 rounded shadow transition"
            >
              🍬 Choose Candy
            </button>

            <button
              onClick={() => navigate("/map")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded shadow transition"
            >
              🗺️ Select Delivery Location
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
