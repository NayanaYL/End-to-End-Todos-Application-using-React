import React from "react";

const Sidebar = ({ todos, selectedId, setSelectedId }) => {
  return (
    <div className="w-64 border-r p-4">
      <h2 className="font-bold mb-4">Your Todos</h2>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => setSelectedId(todo.id)}
            className={`p-2 cursor-pointer rounded ${
              selectedId === todo.id ? "bg-blue-100" : ""
            }`}
          >
            {todo.title} {todo.completed ? "✅" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
