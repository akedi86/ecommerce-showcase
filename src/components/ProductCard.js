import React, { useState } from "react";

export default function ProductCard({ id, name, price, image, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart();
    setAdded(true);
  };

  return (
    <div className="bg-white shadow-lg rounded p-6 hover:shadow-xl transition">
      <img 
        src={image} 
        alt={name} 
        className="rounded h-64 w-full object-cover"
      />
      <h2 className="mt-4 font-semibold text-black">{name}</h2>
      <p className="text-gray-700">KSh {price.toLocaleString()}</p>

      {!added ? (
        <button 
          onClick={handleAdd} 
          className="mt-4 bg-[#81D8D0] text-black px-4 py-2 rounded hover:bg-[#5bb8b0]"
        >
          Add to Cart
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-green-600 font-semibold">Added to Cart ✅</span>
          <button 
            onClick={handleAdd} 
            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
