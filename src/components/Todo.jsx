// src/components/Todo.jsx
import React, { useState } from "react";
import { useStorage } from "../hooks/useStorage";
import "../App.css";

export default function Todo() {
  const [input, setInput] = useState("");

  // Local Storage todos
  const [localTodos, setLocalTodos, removeLocalTodos] = useStorage(
    "localTodos",
    [],
    "local"
  );

  // Session Storage todos
  const [sessionTodos, setSessionTodos, removeSessionTodos] = useStorage(
    "sessionTodos",
    [],
    "session"
  );

  const addTodo = () => {
    if (!input.trim()) return;
    setLocalTodos([...localTodos, input]);
    setSessionTodos([...sessionTodos, input]);
    setInput("");
  };

  return (
    <div className="todo-container">
      <h2>Todo App with Local & Session Storage</h2>

      <input
        className="todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a todo"
      />

      <div className="button-group">
        <button className="todo-button add-button" onClick={addTodo}>
          Add to Both
        </button>
        <button className="todo-button clear-button" onClick={removeLocalTodos}>
          Clear Local
        </button>
        <button className="todo-button session-button" onClick={removeSessionTodos}>
          Clear Session
        </button>
      </div>

      <div className="todo-lists">
        <div className="todo-section">
          <h3>Local Storage Todos</h3>
          <ul className="todo-list">
            {localTodos.map((todo, index) => (
              <li key={index} className="todo-item">{todo}</li>
            ))}
          </ul>
        </div>

        <div className="todo-section">
          <h3>Session Storage Todos</h3>
          <ul className="todo-list">
            {sessionTodos.map((todo, index) => (
              <li key={index} className="todo-item">{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
