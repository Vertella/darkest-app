// src/components/SimpleAdventurerCard.js
const SimpleAdventurerCard = ({ adventurer }) => {
    return (
      <div className="border border-gray-600 rounded-lg overflow-hidden shadow-md mb-4 text-white bg-gray-800 p-4 max-w-40 max-h-40 ">
        <img
          src={adventurer.image}
          alt={adventurer.class}
          className="w-24 h-24 object-cover mx-2 self-center"
        />
        <div className="flex-grow text-center">
          <h2 className="text-l font-semibold">{adventurer.class}</h2>
        </div>
      </div>
    );
  };
  
  export default SimpleAdventurerCard;
  