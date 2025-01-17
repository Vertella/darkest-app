import React, { useEffect, useState } from "react";
import HighlightWord from "./HighlightWord";

const LocationPartyAnalysis = ({ selectedLocation, party, questLength }) => {
  const colourSentence = ({ sentence = "", word = "" }) => {
    const regEx = new RegExp(`(${word})`, "gi");
    const parts = sentence.split(regEx);

    return (
      <span>
        {parts.map((part, index) =>
          regEx.test(part) ? (
            <span key={index} className="text-red-500">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="mt-2 md:mt-6 bg-zinc-800 p-2 sm:p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl text-white font-light italic">Summary</h2>

      {selectedLocation ? (
        <div className="">
          <h2 className="text-gray-300 text-center font-semibold text-lg border-b-2 max-w-fit justify-self-center">
            Heading into {selectedLocation.location_name}
          </h2>

          <div className="flex">
            {/* Display Provisions based on quest length */}
            {selectedLocation.provisions &&
            selectedLocation.provisions[questLength] ? (
              <div className="mt-2 px-2 min-w-fit border rounded-md">
                <h3 className="text-lg font-semibold text-white">Provisions</h3>
                <ul className="text-gray-300">
                  {selectedLocation.provisions[questLength].map(
                    (provision, index) => (
                      <li key={index}>
                        {provision.item.charAt(0).toUpperCase() +
                          provision.item.slice(1)}
                        : {provision.quantity}
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
            <div className="flex flex-col justify-content-center px-2">

              <div className="text-gray-300 text-center p-2">
              <HighlightWord
                sentence={selectedLocation.notes}
                highlights={[
                  { target: "bleed", className: "text-red-500" },
                  { target: "blight", className: "text-green-500" },
                ]}
              /></div>
              <div className="mt-4 p-2 text-gray-300 min-w-fit">
                <h2 className="text-lg font-semibold text-white">
                  Relationships
                </h2>
                {party.length > 0 ? (
                  <ul className="text-gray-300">
                    {party.map((adventurer, index) =>
                      adventurer ? (
                        <li key={index}>
                          <div>
                            {adventurer.class} likes:{" "}
                            {adventurer.compatibility.compatibleWith.join(", ")}
                          </div>
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
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No location selected.</p>
      )}
    </div>
  );
};

export default LocationPartyAnalysis;
