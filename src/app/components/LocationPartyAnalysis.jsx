import React, { useEffect, useState } from "react";

const LocationPartyAnalysis = ({ selectedLocation, party, questLength }) => {
  return (
    <div className="mt-6 bg-zinc-800 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl text-white font-bold">Summary</h2>

      {selectedLocation ? (
        <div className="">
          <p className="text-gray-400">
            Heading into {selectedLocation.location_name}
          </p>

          <div className="flex">
            {/* Display Provisions based on quest length */}
            {selectedLocation.provisions &&
            selectedLocation.provisions[questLength] ? (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white">
                  Provisions:
                </h3>
                <ul className="text-gray-300">
                  {selectedLocation.provisions[questLength].map(
                    (provision, index) => (
                      <li key={index}>
                        {provision.item}: {provision.quantity}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <p className="text-gray-300">
                No provisions listed for this quest.
              </p>
            )}

            <div className="mt-4">
              {party.length > 0 ? (
                <ul className="text-gray-300">
                  {party.map((adventurer, index) =>
                    adventurer ? (
                      <li key={index}>
                        {adventurer.name} - {adventurer.class}
                      </li>
                    ) : (
                      <li key={index}>Empty Slot</li>
                    )
                  )}
                </ul>
              ) : (
                <p>No adventurers in the party.</p>
              )}
            </div>
            <div className="text-gray-300">{selectedLocation.notes} </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No location selected.</p>
      )}
    </div>
  );
};

export default LocationPartyAnalysis;
