import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function MapSelector() {
  const [location, setLocation] = useState({ lat: 25.2048, lng: 55.2708 }); // Default: Dubai
  const [usingDefault, setUsingDefault] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setUsingDefault(false);
      },
      () => {
        console.warn("Geolocation not allowed. Defaulting to UAE.");
        setUsingDefault(true);
      }
    );
  }, []);

  const mapSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`;

  const handleConfirm = () => {
    setConfirmed(true);
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 flex flex-col items-center justify-center">
      {!confirmed ? (
        <>
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">🗺️ Delivery Location</h1>

          <p className="text-center mb-4 text-gray-600">
            {usingDefault
              ? "Could not detect your location. Showing map centered on UAE."
              : `Map centered at your current location.`}
          </p>

          <div className="rounded-lg overflow-hidden shadow-lg border border-blue-200 max-w-4xl w-full">
            <iframe
              title="Delivery Map"
              src={mapSrc}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Your order will be sent to:{" "}
            <span className="font-semibold">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </span>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
          >
            Confirm Delivery Location
          </button>
        </>
      ) : (
        <div className="text-center animate-fade-in mt-10">
          <h2 className="text-3xl font-bold text-green-700 mb-6">🎉 Delivery Confirmed!</h2>
          <p className="text-lg max-w-xl mx-auto text-gray-700 leading-relaxed">
            Our anonymous delivery driver (<strong>Belal</strong>, 19 years old, has a math exam soon,
            lives near Festival City, and is from Alexandria in Egypt, ID number: 97191717
            ) is heading to your location at{" "}
            <span className="font-semibold">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </span>.
            <br /><br />
            Enjoy your weed 🍀 and don’t forget to tip!
          </p>
        </div>
      )}
    </div>
  );
}
