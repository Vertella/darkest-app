import React, { useState, useEffect } from "react";
import fetchLocationData from "../utils/locationDataFetcher";

const Location = ({ selectedLocation, setSelectedLocation, locations }) => {
  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
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
        value={selectedLocation}
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
        <p className="mt-2 text-gray-400">You selected: {selectedLocation}</p>
      )}
    </div>
  );
};

export default Location;
