import React from "react";
import Image from "next/image";

const BuildDetails = ({ build, adventurerClass }) => {
  const lowercaseFirstLetter = (string) => {
    return string.charAt(0).toLowerCase() + string.slice(1);
  };

    return (
      <div className="flex flex-row space-x-4 overflow-auto pb-2">
        {/* Abilities */}
        <div className="flex flex-col pr-4 min-w-10">
          <h3 className="text-lg font-semibold">{build.role}</h3>
          <div className="flex mt-2 space-x-2">
            {build.abilities.map((ability, idx) => (
              <Image
                key={idx}
                src={`/${lowercaseFirstLetter(adventurerClass)}/${ability}`}
                alt={`Ability ${idx + 1}`}
                width={48}  
                height={48} 
                className="object-cover"
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
                src={`/${lowercaseFirstLetter(adventurerClass)}/${skill}.png`}
                alt={`Camping Skill ${idx + 1}`}
                width={48}  
                height={48}
                className="w-12 h-12 object-cover"
              />
            ))}
          </div>
        </div>
  
        {/* Trinkets */}
        <div className="flex flex-col min-w-7 mr-4">
          <h3 className="text-lg font-medium">Trinkets</h3>
          <div className="flex mt-2 space-x-2">
            {build.trinkets.map((trinket, idx) => (
              <Image
                key={idx}
                src={`/${lowercaseFirstLetter(adventurerClass)}/${trinket}.png`}
                alt={`Trinket ${idx + 1}`}
                width={48}  
                height={48}
                className="w-12 h-12 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default BuildDetails;
  