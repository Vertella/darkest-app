"use client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchAdventurers } from "../utils/fetcher";
import SimpleAdventurerCard from "../components/SimpleAdventurerCard";
import { useState, useEffect } from "react";
import PartySlots from "../components/PartySlots";
import Location from "../components/Location"
import LocationPartyAnalysis from "../components/LocationPartyAnalysis";

export default function PartyPlannerPage() {
  const [adventurerList, setAdventurerList] = useState([]);
  const [party, setParty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const adventurers = await fetchAdventurers();
      setAdventurerList(adventurers);
    };
    fetchData();
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
        const updatedParty = Array.from(party);
        const [movedItem] = updatedParty.splice(sourceIndex, 1);
        updatedParty.splice(destinationIndex, 0, movedItem);
        console.log("Updated party:", updatedParty);
        setParty(updatedParty);
      } else if (sourceId === "adventurers") {
        const updatedAdventurers = Array.from(adventurerList);
        const [movedItem] = updatedAdventurers.splice(sourceIndex, 1);
        updatedAdventurers.splice(destinationIndex, 0, movedItem);
        console.log("Updated adventurers:", updatedAdventurers);
        setAdventurerList(updatedAdventurers);
      }
    } else {
      // Moving between adventurers and party, or party slots
      if (
        sourceId === "adventurers" &&
        destinationId.startsWith("party-slot")
      ) {
        const updatedAdventurers = Array.from(adventurerList);
        const [movedItem] = updatedAdventurers.splice(sourceIndex, 1);
        const updatedParty = Array.from(party);

        if (!updatedParty[destinationIndex]) {
          updatedParty[destinationIndex] = movedItem;
          setParty(updatedParty);
          setAdventurerList(updatedAdventurers);
          console.log("Updated party after adding:", updatedParty);
        }
      } else if (
        sourceId.startsWith("party-slot") &&
        destinationId === "adventurers"
      ) {
        const updatedParty = Array.from(party);
        const [movedItem] = updatedParty.splice(sourceIndex, 1);
        const updatedAdventurers = Array.from(adventurerList);
        updatedAdventurers.splice(destinationIndex, 0, movedItem);
        console.log("Updated party after removing:", updatedParty);
        console.log("Updated adventurers after adding:", updatedAdventurers);
        setParty(updatedParty);
        setAdventurerList(updatedAdventurers);
      } else if (
        sourceId.startsWith("party-slot") &&
        destinationId.startsWith("party-slot")
      ) {
        const updatedParty = Array.from(party);
        const [movedItem] = updatedParty.splice(sourceIndex, 1);
        updatedParty.splice(destinationIndex, 0, movedItem);
        console.log("Updated party after reordering:", updatedParty);
        setParty(updatedParty);
      }
    }
  };

  if (!Array.isArray(adventurerList)) {
    return <div>Error: Data is not available</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">Adventure Planner</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex">
            <Location />
            <PartySlots party={party} />
          </div>
          {/* Adventurers Droppable List */}
          <Droppable droppableId="adventurers">
            {(provided) => (
              <div
                className="flex flex-wrap gap-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ minHeight: "200px" }}
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
                          className="draggable-item"
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
        </DragDropContext>
      </main>
    </div>
  );
}
