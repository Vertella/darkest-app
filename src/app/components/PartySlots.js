// src/components/PartySlots.js
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SimpleAdventurerCard from './SimpleAdventurerCard';

const PartySlots = ({ party }) => {
    const maxSlots = 4;
    const placeholders = Array.from({ length: maxSlots }, (_, i) => i+1);

    return (
      <div className="flex justify-around gap-4 border border-zinc-700 rounded-sm m-5">
          {placeholders.map((_, index) => (
              <Droppable key={index} droppableId={`party-slot-${index}`}>
                  {(provided, snapshot) => (
                      <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`party-slot w-40 h-40 border rounded-lg transition-all ${
                              snapshot.isDraggingOver ? 'bg-red-950' : 'border-dashed border-zinc-400 m-5'
                          }`}
                      >
                          {party[index] ? (
                              <Draggable
                                  key={party[index].id}
                                  draggableId={`draggable-${party[index].id}`}
                                  index={index}
                              >
                                  {(provided) => (
                                      <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className="w-full h-full"
                                      >
                                          <SimpleAdventurerCard adventurer={party[index]} />
                                      </div>
                                  )}
                              </Draggable>
                          ) : (
                              // Placeholder content for empty slot
                              <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-gray-500 text-9xl">?</span>
                              </div>
                          )}
                          {provided.placeholder}
                      </div>
                  )}
              </Droppable>
          ))}
      </div>
  );
};

export default PartySlots;
