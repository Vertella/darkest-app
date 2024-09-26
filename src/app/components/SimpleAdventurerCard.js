// src/components/SimpleAdventurerCard.js
import React, { useState } from "react";

const SimpleAdventurerCard = ({ adventurer }) => {
  const [flipped, setFlipped] = useState(true);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`relative size-12 md:size-20 lg:size-28 xl:size-36 perspective-1000 cursor-pointer overflow-hidden ${
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
            className="object-cover w-full h-full transform scale-x-[-1]"
          />
        </div>
        {/* Back of the card */}
        <div className="absolute w-full h-full bg-zinc-700 text-white flex items-center justify-center transform rotate-y-180 backface-hidden">
          <div className="flex flex-col">
            <p className="p-2 font-lg text-center">{adventurer.class}</p>
            <p className="p-2 font-light text-sm overflow-hidden">{adventurer.description}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SimpleAdventurerCard;
