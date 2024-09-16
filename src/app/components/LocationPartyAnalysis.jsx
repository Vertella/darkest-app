import React, { useEffect, useState } from "react";

const LocationPartyAnalysis = ({ selectedLocation, party }) => {
    
  return (
    <div className="mt-6 bg-zinc-800 p-4 rounded-lg shadow-md max-w-fit">
      <h2 className="text-xl text-white font-bold">Party Analysis</h2>

      {selectedLocation ? (
        <>
          <p className="text-gray-400">You selected: {selectedLocation}</p>

          <div className="mt-4">
            {party.length > 0 ? (
              <ul className="text-gray-300">
                {party.map((adventurer, index) => (
                  adventurer ? (
                    <li key={index}>
                      {adventurer.name} - {adventurer.class} ({adventurer.role} in {selectedLocation})
                    </li>
                  ) : (
                    <li key={index}>Empty Slot</li>
                  )
                ))}
              </ul>
            ) : (
              <p>No adventurers in the party.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-400">No location selected.</p>
      )}
    </div>
  );
};

export default LocationPartyAnalysis;
