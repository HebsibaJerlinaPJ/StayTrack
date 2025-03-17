import { Droppable } from "react-beautiful-dnd";

export const StrictModeDroppable = ({ children, ...props }) => {
  return (
    <Droppable {...props}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children(provided)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};