import Image from "next/image";

const BuildDetails = ({ build, adventurerClass }) => {
    return (
      <div className="flex flex-row space-x-4 overflow-auto pb-2">
        {/* Abilities */}
        <div className="flex flex-col pr-4 min-w-10">
          <h3 className="text-lg font-semibold">{build.role}</h3>
          <div className="flex mt-2 space-x-2">
            {build.abilities.map((ability, idx) => (
              <Image
                key={idx}
                src={`/${adventurerClass}/${ability}`}
                alt={`Ability ${idx + 1}`}
                className="w-12 h-12 object-cover"
              />
            ))}
          </div>
        </div>
  
        {/* Camping Skills */}
        <div className="flex flex-col min-w-7 pr-4">
          <h3 className="text-lg font-medium">Camping</h3>
          <div className="flex mt-2 space-x-2">
            {build.camping_skills.map((skill, idx) => (
              <Image
                key={idx}
                src={`/${adventurerClass}/${skill}.png`}
                alt={`Camping Skill ${idx + 1}`}
                className="w-12 h-12 object-cover"
              />
            ))}
          </div>
        </div>
  
        {/* Trinkets */}
        <div className="flex flex-col min-w-7 mr-4">
          <h3 className="text-lg font-medium">Trinkets</h3>
          <div className="flex mt-2 space-x-2">
            {build.trinkets.map((trinket, idx) => {
              const imgSrc = `/${adventurerClass}/${trinket}.png`;
              console.log(`Trinket Image URL: ${imgSrc}`); // Debugging
              <Image
                key={idx}
                src={imgSrc}
                alt={`Trinket ${idx + 1}`}
                className="w-12 h-12 object-cover"
              />
            })}
          </div>
        </div>
      </div>
    );
  };
  
  export default BuildDetails;
  