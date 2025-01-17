// src/components/PartySlots.js
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import SimpleAdventurerCard from './SimpleAdventurerCard';

const PartySlots = ({ party, highlightedSlots = [] }) => {
    const maxSlots = 4;
    const placeholders = Array.from({ length: maxSlots }, (_, i) => i+1);

    return (
      <div className="flex flex-wrap sm:flex-row md:flex-row justify-evenly lg:gap-2 rounded-sm m-1 lg:m-1">
          {placeholders.map((_, index) => (
              <Droppable key={index} droppableId={`party-slot-${index}`}>
                  {(provided, snapshot) => (
                      <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`party-slot size-12 md:size-20 lg:size-28 xl:size-36 self-center border rounded-lg transition-all md:m-1 lg:m-2 ${
                            highlightedSlots.includes(index) ? 'bg-yellow-500' :
                            snapshot.isDraggingOver ? 'bg-red-950' : 'border-dashed border-zinc-800'
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
                              <div className="w-full h-full flex items-center justify-center border border-zinc-700">
                                  <span className="text-gray-500 sm:text-3xl md:text-5xl lg:text-9xl">?</span>
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
