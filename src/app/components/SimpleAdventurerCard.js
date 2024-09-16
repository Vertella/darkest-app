// src/components/SimpleAdventurerCard.js
const SimpleAdventurerCard = ({ adventurer }) => {
    return (
      <div className="border border-gray-600 rounded-lg overflow-hidden shadow-md text-white bg-zinc-900 p-4 max-w-40 max-h-40 ">
        <img
          src={adventurer.image}
          alt={adventurer.class}
          className="object-cover self-center w-full"
        />
        <div className="flex-grow text-center">
          <h2 className="text-l font-semibold">{adventurer.class}</h2>
        </div>
      </div>
    );
  };
  
  export default SimpleAdventurerCard;
  