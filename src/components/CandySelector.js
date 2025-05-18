import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function CandySelector() {
  const [coins, setCoins] = useState(500);
  const [selectedGrams, setSelectedGrams] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    // Set to default 500 coins for EVERYONE
    const storedCoins = parseInt(localStorage.getItem("coins"));
    if (!isNaN(storedCoins)) {
      setCoins(storedCoins);
    } else {
      setCoins(500);
      localStorage.setItem("coins", "500");
    }
  }, [navigate]);

  const weedOptions = [
    {
      id: 1,
      name: "Weed Type 1",
      description: "🔥 Elegant weed",
      image:
        "https://img.freepik.com/free-photo/closeup-shot-purple-flower_181624-25863.jpg?semt=ais_hybrid&w=740",
      pricePerGram: 10,
    },
    {
      id: 2,
      name: "Weed Type 2",
      description: "💨 Weed exported from India, original and expensive",
      image:
        "https://images.news18.com/ibnlive/uploads/2025/01/pakalu-papito-meme-2025-01-ed0968c6b5390fbb9298dc1b5dea6802-16x9.png",
      pricePerGram: 15,
    },
    {
      id: 3,
      name: "Weed Type 3",
      description: " 💯 Original weed",
      image:
        "https://wallpapers.com/images/hd/4k-marijuana-pj09rw3eoo18qgoz.jpg",
      pricePerGram: 8,
    },
  ];

  const handleBuy = (item) => {
    const grams = selectedGrams[item.id] || 1;
    const totalCost = grams * item.pricePerGram;

    if (coins < totalCost) {
      alert("Not enough coins! Try selecting fewer grams.");
      return;
    }

    const newBalance = coins - totalCost;
    setCoins(newBalance);
    localStorage.setItem("coins", String(newBalance));
    navigate("/map");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white">
      {/* Header */}
      <header className="p-6 bg-green-700 text-white shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">🌿 Weed Selector</h1>
        <div className="text-right">
          <p className="text-sm">Balance</p>
          <p className="text-lg font-bold">{coins} coins</p>
        </div>
      </header>

      {/* Tagline */}
      <div className="text-center mt-8 mb-4 px-4">
        <h2 className="text-4xl font-extrabold text-green-700 mb-2 animate-fade-in">
          Choose Your Vibe
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Customize how hard you're tryna vibe today. Pay per gram. All highs are imaginary.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {weedOptions.map((item) => {
          const grams = selectedGrams[item.id] || 1;
          const totalCost = grams * item.pricePerGram;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-72 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-600 font-semibold">
                    How many grams? ({grams}g)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={grams}
                    onChange={(e) =>
                      setSelectedGrams({
                        ...selectedGrams,
                        [item.id]: parseInt(e.target.value),
                      })
                    }
                    className="w-full mt-2"
                  />
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-green-600 font-bold">
                    {item.pricePerGram} coins/g = {totalCost} total
                  </span>
                  <button
                    onClick={() => handleBuy(item)}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                  >
                    Buy & Deliver
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="text-center p-6 text-sm text-gray-500">
        SeekoSeeko App © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
