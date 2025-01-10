"use client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { fetchAdventurers } from "../utils/fetcher";
import SimpleAdventurerCard from "../components/SimpleAdventurerCard";
import { useState, useEffect } from "react";
import PartySlots from "../components/PartySlots";
import Location from "../components/LocationSelector";
import LocationPartyAnalysis from "../components/LocationPartyAnalysis";
import fetchLocationData from "../utils/locationDataFetcher";
import BuildDisplay from "../components/BuildDisplay";

export default function PartyPlannerPage() {
  const [adventurerList, setAdventurerList] = useState([]);
  const [party, setParty] = useState([null, null, null, null]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [questLength, setQuestLength] = useState("");
  const [draggedAdventurerSlots, setDraggedAdventurerSlots] = useState([]);
  const [highlightedSlots, setHighlightedSlots] = useState([]);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const adventurers = await fetchAdventurers();
      setAdventurerList(adventurers);
    };
    fetchData();
  }, []);

  const handleOnDragStart = (result) => {
    const draggedAdventurer = adventurerList[result.source.index];
    setDraggedAdventurerSlots(draggedAdventurer.preferredSlots || []);
  };

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
        setDraggedAdventurerSlots([]);
      } else if (sourceId === "adventurers") {
        const updatedAdventurers = Array.from(adventurerList);
        const [movedItem] = updatedAdventurers[sourceIndex];
        updatedAdventurers[sourceIndex] = updatedAdventurers[destinationIndex];
        updatedAdventurers[destinationIndex] = movedItem;
        console.log("Swapped adventurers:", updatedAdventurers);

        setAdventurerList(updatedAdventurers);
        setDraggedAdventurerSlots([]);
      }
    } else {
      // Moving between different lists like adventurers and party
      if (
        sourceId === "adventurers" &&
        destinationId.startsWith("party-slot")
      ) {
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
        setDraggedAdventurerSlots([]);
        console.log("Updated party after adding:", updatedParty);

        //party to adventurelist
      } else if (
        sourceId.startsWith("party-slot") &&
        destinationId === "adventurers"
      ) {
        const updatedParty = Array.from(party);
        const [movedItem] = updatedParty.splice(sourceIndex, 1);
        const updatedAdventurers = Array.from(adventurerList);
        updatedAdventurers.splice(destinationIndex, 0, movedItem);
        setParty(updatedParty);
        setAdventurerList(updatedAdventurers);
      } else if (
        //party slot to party slot
        sourceId.startsWith("party-slot") &&
        destinationId.startsWith("party-slot")
      ) {
        const updatedParty = [...party];
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

  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <main className="flex-grow container sm:mx-auto pt-2 sm:p-6">
        <DragDropContext
          onDragStart={handleOnDragStart}
          onDragEnd={handleOnDragEnd}
        >
          <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
            <div className="flex flex-col w-full md:w-2/3">
              <div className="flex flex-col md:flex-row bg-zinc-800 rounded-lg w-full">
                <div className=" flex flex-row w-grow">
                  <Location
                    selectedLocation={selectedLocation}
                    setSelectedLocation={(location) =>
                      setSelectedLocation(location)
                    }
                    setQuestLength={setQuestLength}
                    locations={locations}
                  />
                </div>

                <div className="flex flex-col">
                  <h1 className=" text-center font-bold text-base md:text-2xl md:pt-4 text-white">
                    {selectedLocation
                      ? selectedLocation.location_name
                      : "Where to, adventurer?"}
                  </h1>
                  <p className="text-xs text-white text-center font-light italic">
                    {selectedLocation ? selectedLocation.description : ""}
                  </p>
                  <PartySlots
                    party={party}
                    highlightedSlots={draggedAdventurerSlots}
                  />
                </div>
              </div>
              <div className="hidden sm:flex flex-col">

              <LocationPartyAnalysis
                selectedLocation={selectedLocation}
                party={party}
                questLength={questLength}
                className="hidden sm:flex"
              />
              <BuildDisplay party={party} className="text-white" />
              </div>
            </div>


            {/* Adventurers Droppable List */}
            <div className="flex flex-col sm:w-1/3">
              <button
                className="md:hidden bg-zinc-700 text-white p-2 rounded-lg mb-2 flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuVisible
                  ? "▲ Hide Adventurers"
                  : "▼ Show Adventurers"}
              </button>

              <div
                className={`${
                  isMobileMenuVisible ? "block" : "hidden"
                } md:block bg-zinc-800 p-4 rounded-lg`}
              >
                <Droppable droppableId="adventurers">
                  {(provided) => (
                    <div
                      className="flex flex-wrap gap-2"
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
          </div>
        </DragDropContext>

        {/* Pass selectedLocation and party to LocationPartyAnalysis */}
      </main>
    </div>
  );
}
