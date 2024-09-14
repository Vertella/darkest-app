// src/components/AdventurerCard.js
"use client";
import { useState } from "react";
import BuildDetails from "./BuildDetails";

const AdventurerCard = ({ adventurer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`border border-gray-600 rounded-lg overflow-hidden shadow-md mb-4 text-white ${
        isExpanded ? "bg-gray-700" : "bg-gray-800"
      }`}
    >
      <div
        className="flex p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Profile Image */}
        <img
          src={adventurer.image}
          alt={adventurer.class}
          className="w-24 h-24 object-cover mr-4 self-start"
        />

        {/* Title and Description */}
        <div className="flex-grow">
          <h2 className="text-xl font-semibold">{adventurer.class}</h2>
          {isExpanded && (
            <p className="text-gray-300 mt-2">{adventurer.description}</p>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          className={`transition-transform ${
            isExpanded ? "rotate-180" : "rotate-0"
          } transform`}
          aria-label="Expand/Collapse"
        >
          &darr;
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 flex flex-col space-y-4">
          {adventurer.builds.map((build, index) => (
            <BuildDetails key={index} build={build} adventurerClass={adventurer.class} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdventurerCard;
