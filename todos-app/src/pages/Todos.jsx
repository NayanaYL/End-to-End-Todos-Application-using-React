import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../services/todo.service";
import Sidebar from "../components/Sidebar";
import UpdateTodoModal from "../components/UpdateTodoModal";

const Todos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTodos = async () => {
    const data = await getTodos(user.uid);
    setTodos(data);
    if (!selectedId && data.length > 0) setSelectedId(data[0].id);
  };

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const handleAdd = async () => {
    const title = prompt("Enter todo title");
    if (!title) return;
    await addTodo(user.uid, { title, completed: false });
    fetchTodos();
  };

  const handleToggle = async (todo) => {
    await updateTodo(user.uid, todo.id, { completed: !todo.completed });
    fetchTodos();
  };

  const handleDelete = async (todo) => {
    await deleteTodo(user.uid, todo.id);
    fetchTodos();
  };

  const handleUpdate = async (todo) => {
    await updateTodo(user.uid, todo.id, { title: todo.title });
    fetchTodos();
  };

  const selectedTodo = todos.find(t => t.id === selectedId);

  return (
    <div className="flex h-screen">
      <Sidebar todos={todos} selectedId={selectedId} setSelectedId={setSelectedId} />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Todos Dashboard</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Todo
          </button>
        </div>

        {selectedTodo ? (
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{selectedTodo.title}</h2>
            <p>Status: {selectedTodo.completed ? "Completed ✅" : "Pending ⏳"}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleToggle(selectedTodo)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Toggle Status
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(selectedTodo)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p>No todo selected</p>
        )}

        <UpdateTodoModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          todo={selectedTodo}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Todos;
