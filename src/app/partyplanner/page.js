"use client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchAdventurers } from "../utils/fetcher";
import SimpleAdventurerCard from "../components/SimpleAdventurerCard";
import { useState, useEffect } from "react";
import PartySlots from "../components/PartySlots";
import Location from "../components/Location"
import LocationPartyAnalysis from "../components/LocationPartyAnalysis";
import fetchLocationData from "../utils/locationDataFetcher";

export default function PartyPlannerPage() {
  const [adventurerList, setAdventurerList] = useState([]);
  const [party, setParty] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const adventurers = await fetchAdventurers();
      setAdventurerList(adventurers);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const fetchedLocations = await fetchLocationData();
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getLocations();
  }, []);

  const handleOnDragEnd = (result) => {
    console.log("Drag result:", result);
    console.log("Current party:", party);
    console.log("Current adventurers:", adventurerList);

    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const destinationIndex = destinationId.charAt(destinationId.length - 1);

    // Moving within the same list (either adventurers or party)
    if (sourceId === destinationId) {
      if (sourceId.startsWith("party-slot")) {
        // Swapping within the party
        const updatedParty = Array.from(party);
        // Swap the dragged and destination adventurers
        const [movedItem] = updatedParty[sourceIndex];
        updatedParty[sourceIndex] = updatedParty[destinationIndex];
        updatedParty[destinationIndex] = [movedItem];
        console.log("Swapped party:", updatedParty);
        setParty(updatedParty);

      } else if (sourceId === "adventurers") {
        const updatedAdventurers = Array.from(adventurerList);
        const [movedItem] = updatedAdventurers[sourceIndex];
        updatedAdventurers[sourceIndex] = updatedAdventurers[destinationIndex];
        updatedAdventurers[destinationIndex] = movedItem;
        console.log("Swapped adventurers:", updatedAdventurers);

        setAdventurerList(updatedAdventurers);
      }
    } else {
      // Moving between different lists like adventurers and party
      if (
        sourceId === "adventurers" && destinationId.startsWith("party-slot")) {
        const updatedAdventurers = Array.from(adventurerList);
        const [movedItem] = updatedAdventurers.splice(sourceIndex, 1);
        const updatedParty = Array.from(party);

        const replacedAdventurer = updatedParty[destinationIndex];
        if (replacedAdventurer) {
          updatedAdventurers.push(replacedAdventurer);
        }

          updatedParty[destinationIndex] = movedItem;
          setParty(updatedParty);
          setAdventurerList(updatedAdventurers);
          console.log("Updated party after adding:", updatedParty);

      //party to adventurelist
      } else if (sourceId.startsWith("party-slot") && destinationId === "adventurers") {
        const updatedParty = Array.from(party);
        const [movedItem] = updatedParty.splice(sourceIndex, 1);
        const updatedAdventurers = Array.from(adventurerList);
        updatedAdventurers.splice(destinationIndex, 0, movedItem);
        setParty(updatedParty);
        setAdventurerList(updatedAdventurers);
      } else if (
        //party slot to party slot
        sourceId.startsWith("party-slot") && destinationId.startsWith("party-slot")
      ) {
        const updatedParty = Array.from(party);
        const temp = updatedParty[sourceIndex];
        updatedParty[sourceIndex] = updatedParty[destinationIndex];
        updatedParty[destinationIndex] = temp;
        setParty(updatedParty);
      }
    }
  };

  if (!Array.isArray(adventurerList)) {
    return <div>Error: Data is not available</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <header className="bg-zinc-800 text-white p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">Adventure Planner</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex flex-row gap-4">
          <div className="flex flex-col w-2/3">
          <div className="flex flex-col md:flex-row bg-zinc-800 rounded-lg max-w-fit">
          <Location
              selectedLocation={selectedLocation}
              setSelectedLocation={(location) => setSelectedLocation(location)}
              locations={locations}
            />
            <div className="flex flex-col">
              <h1 className=" text-center font-bold text-2xl md:pt-4 text-white">
              {selectedLocation ? selectedLocation.location_name : "Where to, adventurer?"}
                </h1>
                <p className="text-white text-center font-light italic">{selectedLocation ? selectedLocation.description : ""}</p>
            <PartySlots party={party} />
            </div>
          </div>

          <LocationPartyAnalysis selectedLocation={selectedLocation} party={party} />
          </div>
          {/* Adventurers Droppable List */}
          <div className="flex w-1/3">
          <Droppable droppableId="adventurers">
            {(provided) => (
              <div
                className="flex flex-wrap gap-1 lg:gap-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ minHeight: "48px" }}
              >
                {adventurerList.length === 0 ? (
                  <div>No adventurers found.</div>
                ) : (
                  adventurerList.map((adventurer, index) => (
                    <Draggable
                      key={`adventurer-${adventurer.id}`}
                      draggableId={`adventurer-${adventurer.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="size-12 md:size-20 lg:size-28 xl:size-36"
                        >
                          <SimpleAdventurerCard adventurer={adventurer} />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          </div>
          </div>
        </DragDropContext>

        {/* Pass selectedLocation and party to LocationPartyAnalysis */}
        
        
      </main>
    </div>
  );
  
}
