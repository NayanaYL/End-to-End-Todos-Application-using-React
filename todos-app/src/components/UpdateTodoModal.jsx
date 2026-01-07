import { useState } from "react";

const UpdateTodoModal = ({ isOpen, onClose, todo, onUpdate }) => {
  const [title, setTitle] = useState(todo?.title || "");

  const handleSave = () => {
    onUpdate({ ...todo, title });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-lg font-bold mb-2">Update Todo</h3>
        <input
          className="w-full border p-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodoModal;
