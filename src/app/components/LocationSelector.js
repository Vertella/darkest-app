import React, { useState } from "react";
import PropTypes from "prop-types";

const Location = ({ selectedLocation, setSelectedLocation, locations, setQuestLength }) => {

  const handleLocationChange = (event) => {
    const selectedLocationName = (event.target.value);
    const location = locations.find(
      (loc) => loc.location_name === selectedLocationName
    );
    setSelectedLocation(location);
  };

  // Handle quest length selection change
  const handleQuestLengthChange = (event) => {
    const selectedLength = event.target.value;
    setQuestLength(selectedLength);
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-4">
      {/* Location selection dropdown */}
      <label
        htmlFor="location-dropdown"
        className="block text-sm lg:text-lg font-bold text-gray-300 mb-2"
      >
        Choose a Location:
      </label>
      <select
        id="location-dropdown"
        value={selectedLocation ? selectedLocation.location_name : ""}
        onChange={handleLocationChange}
        className="bg-gray-700 text-sm lg:text-lg text-gray-300 border border-gray-600 rounded-lg p-2 w-full"
      >
        <option value="" disabled>
          Select a destination
        </option>
        {locations.map((location, index) => (
          <option key={index} value={location.location_name}>
            {location.location_name}
          </option>
        ))}
      </select>

        {/* Quest length selection dropdown */}
        {selectedLocation && (
          <>
          <label
            htmlFor="quest-length-dropdown"
            className="block text-sm lg:text-lg font-bold text-gray-300 mt-4"
          >
            Choose Quest Length:
          </label>
          <select
            id="quest-length-dropdown"
            value={selectedLocation.questLength}
            onChange={handleQuestLengthChange}
            className="bg-gray-700 text-gray-300 border border-gray-600 rounded-lg p-2 w-full"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>

          {/* Displaying location-specific details */}

        <div className="text-gray-400 max-w-52">
        <p>Do bring: {selectedLocation.preferredDamage} </p>
        <p>Avoid: {selectedLocation.avoidDamage} </p>
        </div>
        </>
      )}
    </div>
  );
};

Location.propTypes = {
  selectedLocation: PropTypes.object,
  setSelectedLocation: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      location_name: PropTypes.string.isRequired,
      description: PropTypes.string,
      enemyTypes: PropTypes.array,
      resistances: PropTypes.array,
      bosses: PropTypes.array,
      preferredDamage: PropTypes.array,
      avoidDamage: PropTypes.array,
      notes: PropTypes.string,
      provisions: PropTypes.shape({
        short: PropTypes.arrayOf(
          PropTypes.shape({
            item: PropTypes.string,
            quantity: PropTypes.string,
          })
        ),
        medium: PropTypes.arrayOf(
          PropTypes.shape({
            item: PropTypes.string,
            quantity: PropTypes.string,
          })
        ),
        long: PropTypes.arrayOf(
          PropTypes.shape({
            item: PropTypes.string,
            quantity: PropTypes.string,
          })
        ),
      }),
    })
  ).isRequired,
};

export default Location;
