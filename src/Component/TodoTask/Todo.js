
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoList from "./TodoList";

function Todo() {

  const [searchQuery, setSearchQuery] = useState("");

  const [lists, setLists] = useState(() => {

    const data = localStorage.getItem("todo-lists");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {

    localStorage.setItem("todo-lists", JSON.stringify(lists));
  }, [lists]);



  const handleAddList = () => {
    const name = prompt("List name:");
    if (name) {
      const newList = { id: Date.now(), name, tasks: [] };
      setLists([...lists, newList]);
    }
  };

  const handleDeleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const handleRenameList = (id) => {
    const name = prompt("New name:");
    if (name) {
      setLists(lists.map((list) => list.id === id ? { ...list, name } : list));
    }
  };

  const handleAddTask = (listId, taskTitle) => {
    const newTask = { id: Date.now(), title: taskTitle, completed: false };
    setLists(lists.map(list => list.id === listId
      ? { ...list, tasks: [...list.tasks, newTask] }
      : list
    ));
  };

  const handleDeleteTask = (listId, taskId) => {
    setLists(lists.map(list => list.id === listId
      ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
      : list
    ));
  };

  const handleToggleComplete = (listId, taskId) => {
    setLists(lists.map(list => list.id === listId
      ? {
        ...list,
        tasks: list.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }
      : list
    ));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceListId = source.droppableId;
    const destListId = destination.droppableId;

    // Find source and destination list
    const sourceList = lists.find(list => list.id.toString() === sourceListId);
    const destList = lists.find(list => list.id.toString() === destListId);

    // Clone tasks
    const draggedTask = sourceList.tasks[source.index];

    // Same list
    if (sourceListId === destListId) {
      const updatedTasks = [...sourceList.tasks];
      updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, draggedTask);

      const updatedLists = lists.map(list =>
        list.id.toString() === sourceListId
          ? { ...list, tasks: updatedTasks }
          : list
      );

      setLists(updatedLists);
    } else {
      // Different lists
      const sourceTasks = [...sourceList.tasks];
      sourceTasks.splice(source.index, 1);

      const destTasks = [...destList.tasks];
      destTasks.splice(destination.index, 0, draggedTask);

      const updatedLists = lists.map(list => {
        if (list.id.toString() === sourceListId) {
          return { ...list, tasks: sourceTasks };
        }
        if (list.id.toString() === destListId) {
          return { ...list, tasks: destTasks };
        }
        return list;
      });

      setLists(updatedLists);
    }
  };


  return (
    <div className="App">
      <h1>Multi-List Todo App</h1>
      <button onClick={handleAddList} className="add-list-btn">+ Add List</button>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search tasks across all lists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          className="search-bar"
        />
      </div>



      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lists-container">
          {lists.map(list => (
            <Droppable droppableId={list.id.toString()} key={list.id}>
              {(provided) => (
                <div className="list-wrapper" ref={provided.innerRef} {...provided.droppableProps}>
                  <TodoList
                    list={{
                      ...list,
                      tasks: list.tasks.filter(task =>
                        task.title.toLowerCase().includes(searchQuery)
                      )
                    }}
                    onAddTask={handleAddTask}
                    onDeleteTask={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                    onDeleteList={handleDeleteList}
                    onRenameList={handleRenameList}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Todo;
