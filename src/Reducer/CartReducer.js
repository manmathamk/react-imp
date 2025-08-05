import React, { useReducer, useState } from "react";

// Initial state
const initialTodos = [];

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    case "RESET":
      return initialTodos;

    default:
      return state;
  }
};

const CartReducer = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch({ type: "ADD_TODO", payload: input });
    setInput("");
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
            <button onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}>
              ✅
            </button>
            <button onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => dispatch({ type: "RESET" })}>Clear All</button>
    </div>
  );
};

export default CartReducer;
