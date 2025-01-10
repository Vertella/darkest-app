// src/components/BuildDisplay.js

import React, { useState, useEffect } from "react";
import BuildDetails from "./BuildDetails";

const BuildDisplay = ({ party }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedBuilds, setSelectedBuilds] = useState([]);

  // Function to map internal index to game position (right to left)
  const mapIndexToGamePosition = (index) => {
    const gamePositions = [3, 2, 1, 0]; // Darkest Dungeon: right to left
    return gamePositions[index]; // Mapping index to the correct game position
  };

  // Initialize selectedBuilds when party changes
  useEffect(() => {
    console.log("Party:", party);
    console.log("Selected Tab:", selectedTab);
    const initialBuilds = party.map((adventurer) =>
      adventurer?.builds?.length > 0 ? 0 : null
    );
    console.log("Initial Builds:", initialBuilds);

    setSelectedBuilds(initialBuilds);

    // Ensure selectedTab is within bounds of party array
    if (selectedTab >= party.length) {
      setSelectedTab(party.length - 1 >= 0 ? party.length - 1 : 0);
    }
  }, [party]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const handleBuildChange = (adventurerIndex, buildIndex) => {
    const updatedBuilds = [...selectedBuilds];
    updatedBuilds[adventurerIndex] = buildIndex;
    setSelectedBuilds(updatedBuilds);
  };

  return (
    <div className="mt-4">
      {/* Tab Headers */}
      <div className="flex border-b border-zinc-700 overflow-x-auto">
        {party.map((adventurer, index) => {
          const gamePosition = mapIndexToGamePosition(index);

          if (!adventurer) {
            return (
              <button
                key={`empty-${index}`}
                className="py-2 px-4 text-gray-500 whitespace-nowrap"
                disabled
              >
                {`Position ${gamePosition + 1}: No Adventurer`}
              </button>
            );
          }

          return (
            <button
              key={adventurer.id || index}
              onClick={() => handleTabClick(index)}
              className={`py-2 px-4 text-gray-200 hover:text-white whitespace-nowrap hover:border-b-2 hover:border-red-500 ${
                selectedTab === index
                  ? "border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {`Position ${gamePosition + 1}: ${
                adventurer.class || "Unknown Class"
              }`}
            </button>
          );
        })}
      </div>

      {/* Build Details */}
      <div className="mt-2 transition-all duration-300 ease-in-out text-white">
        {party[selectedTab] ? (
          <>
            {/* Build Selector if multiple builds exist */}
            {party[selectedTab].builds &&
              party[selectedTab].builds.length > 1 && (
                <div className="flex space-x-2 mb-2">
                  {party[selectedTab].builds.map((_, buildIdx) => (
                    <button
                      key={buildIdx}
                      onClick={() => handleBuildChange(selectedTab, buildIdx)}
                      className={`py-1 px-3 rounded ${
                        selectedBuilds[selectedTab] === buildIdx
                          ? "bg-red-500 text-white"
                          : "bg-zinc-700 text-gray-300 hover:bg-zinc-600"
                      }`}
                    >
                      Build {buildIdx + 1}
                    </button>
                  ))}
                </div>
              )}
            {/* Display the selected build */}
            {party[selectedTab].builds &&
            party[selectedTab].builds[selectedBuilds[selectedTab]] ? (
              <BuildDetails
                build={party[selectedTab].builds[selectedBuilds[selectedTab]]}
                adventurerClass={party[selectedTab].class}
              />
            ) : (
              <div className="text-gray-500">
                No build available for this adventurer.
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500">No adventurer in this slot.</div>
        )}
      </div>
    </div>
  );
};

export default BuildDisplay;
