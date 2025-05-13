import React, { useState } from "react";

const AddTaskForm = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Add new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">➕</button>
    </form>
  );
};

export default AddTaskForm;
