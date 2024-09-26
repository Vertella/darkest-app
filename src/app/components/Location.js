import React, { useState, useEffect } from "react";
import fetchLocationData from "../utils/locationDataFetcher";
import PropTypes from "prop-types";

const Location = ({ selectedLocation, setSelectedLocation, locations }) => {
  const handleChange = (event) => {
    const selectedLocationName = (event.target.value);
    const location = locations.find(
      (loc) => loc.location_name === selectedLocationName
    );
    setSelectedLocation(location);
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md mb-4">
      <label
        htmlFor="location-dropdown"
        className="block text-lg font-bold text-gray-300 mb-2"
      >
        Choose a Location:
      </label>
      <select
        id="location-dropdown"
        value={selectedLocation ? selectedLocation.location_name : ""}
        onChange={handleChange}
        className="bg-gray-700 text-gray-300 border border-gray-600 rounded-lg p-2 w-full"
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

      {selectedLocation && (
        <div className="text-gray-400 max-w-52">
        <p>Do bring: {selectedLocation.preferredDamage} </p>
        <p>Avoid: {selectedLocation.avoidDamage} </p>
        <p className="flex flex-wrap w-auto mt-4">{selectedLocation.notes} </p>
        </div>
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
    })
  ).isRequired,
};

export default Location;
