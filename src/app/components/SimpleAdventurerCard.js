// src/components/SimpleAdventurerCard.js
import React, { useState } from "react";
import Image from "next/image";

const SimpleAdventurerCard = ({ adventurer }) => {
  const [flipped, setFlipped] = useState(true);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const specializations = Array.isArray(adventurer.specializations)
    ? adventurer.specializations
    : [];

  const getSpecializationImage = (spec) => {
    try {
      return require(`/public/effects/${spec}.png`);
    } catch (error) {
      return null;
    }
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
          <Image
            src={`/${adventurer.image}`}
            alt={adventurer.class}
            width={124}
            height={124}
            className="object-cover transform scale-x-[-1]"
          />
        </div>
        {/* Back of the card */}
        <div className="absolute w-full h-full bg-zinc-700 text-white flex items-center justify-center transform rotate-y-180 backface-hidden">
          <div className="flex flex-col max-h-full">
            <p className="font-lg text-center">{adventurer.class}</p>
            <ul className="list-disc list-inside">
              {specializations.length > 0 ? (
                specializations.map((spec, index) => {
                  const specImage = getSpecializationImage(spec);

                  return (
                    <li
                      key={index}
                      className="text-sm text-gray-300 flex items-center"
                    >
                      {specImage ? (
                        <Image
                          src={specImage}
                          alt={spec}
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                      ) : (
                        <span>
                          {spec.charAt(0).toUpperCase() + spec.slice(1)}{" "}
                          {/* Capitalize */}
                        </span>
                      )}
                    </li>
                  );
                })
              ) : (
                <p>No specializations available</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdventurerCard;
