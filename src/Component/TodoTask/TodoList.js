import React from "react";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import { FaEdit, FaTrash } from "react-icons/fa";

const TodoList = ({ list, onAddTask, onDeleteTask, onToggleComplete, onDeleteList, onRenameList }) => {
  return (
    <div className="todo-list">
      <div className="list-header">
        <h3>{list.name}</h3>
        <div>
          <button onClick={() => onRenameList(list.id)} style={{marginRight: "5px"}}><FaEdit/></button>
          <button onClick={() => onDeleteList(list.id)} style={{color: "red"}}><FaTrash/></button>
        </div>
      </div>
      {list.tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          listId={list.id}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
      <AddTaskForm onAdd={(title) => onAddTask(list.id, title)} />
    </div>
  );
};

export default TodoList;

