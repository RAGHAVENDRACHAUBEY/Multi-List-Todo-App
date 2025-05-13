import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";

const Task = ({ task, index, listId, onDeleteTask, onToggleComplete }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`task ${task.completed ? "completed" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input type="checkbox" checked={task.completed} onChange={() => onToggleComplete(listId, task.id)} />
          <span>{task.title}</span>
          <button onClick={() => onDeleteTask(listId, task.id)} style={{color: "red"}}><FaTrash/></button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
