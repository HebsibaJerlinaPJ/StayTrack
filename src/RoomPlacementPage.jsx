import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StrictModeDroppable } from "./StrictModeDroppable";

const initialData = {
  floor1: [
    { id: "1", content: "Room 231" },
    { id: "2", content: "Room 100" },
    { id: "3", content: "Room 331" },
    { id: "4", content: "Room 200" },
  ],
  floor2: [
    { id: "5", content: "Room 101" },
    { id: "6", content: "Room 675" },
    { id: "7", content: "Room 901" },
    { id: "8", content: "Room 775" },
  ],
};

export default function RoomPlacementPage() {
  const navigate = useNavigate();
  const [floors, setFloors] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceFloor = Array.from(floors[source.droppableId]);
    const destFloor =
      source.droppableId === destination.droppableId
        ? sourceFloor
        : Array.from(floors[destination.droppableId]);

    const [movedItem] = sourceFloor.splice(source.index, 1);
    destFloor.splice(destination.index, 0, movedItem);

    setFloors((prevFloors) => ({
      ...prevFloors,
      [source.droppableId]: sourceFloor,
      [destination.droppableId]: destFloor,
    }));
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        Room Placement by Floor
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(floors).map((floor, index) => (
          <Paper key={floor} style={{ padding: 16, marginBottom: 16 }}>
            <Typography variant="h6" gutterBottom>
              {`Floor ${index + 1}`}
            </Typography>

            <StrictModeDroppable droppableId={floor} direction="horizontal">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    display: "flex",
                    minHeight: "100px",
                    overflow: "auto",
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  {floors[floor].map(({ id, content }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            width: 80,
                            height: 60,
                            backgroundColor: "#305CDE",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            marginRight: "10px", // Add some spacing between boxes
                            ...provided.draggableProps.style,
                          }}
                        >
                          {content}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </StrictModeDroppable>
          </Paper>
        ))}
      </DragDropContext>

      <Button variant="contained" onClick={() => navigate("/rooms")}>
        Back to Rooms
      </Button>
    </div>
  );
}