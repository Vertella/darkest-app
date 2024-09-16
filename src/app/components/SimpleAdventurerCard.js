// src/components/SimpleAdventurerCard.js
import React, { useState } from "react";

const SimpleAdventurerCard = ({ adventurer }) => {
  const [flipped, setFlipped] = useState(true);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`relative w-40 h-40 perspective-1000 cursor-pointer overflow-hidden rounded-lg ${
        flipped ? "flipped" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d">
        {/* Front Face */}
        <div className="absolute w-full h-full bg-zinc-700 flex items-center justify-center">
          <img
            src={adventurer.image}
            alt={adventurer.class}
            className="object-cover w-full h-full p-2"
          />
        </div>
        {/* Back of the card */}
        <div className="absolute w-full h-full bg-zinc-700 text-white flex items-center justify-center transform rotate-y-180 backface-hidden">
          <div className="flex flex-col">
          <p className="p-4 font-lg">{adventurer.class}</p>
          <p className="p-4 font-light">{adventurer.description}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SimpleAdventurerCard;
