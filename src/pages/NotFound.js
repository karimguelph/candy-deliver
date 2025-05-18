import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-600 underline">Back to Home</Link>
    </div>
  );
}
