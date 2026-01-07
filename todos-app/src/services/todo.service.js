import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Get all todos of a user
export const getTodos = async (uid) => {
  const snapshot = await getDocs(collection(db, "users", uid, "todos"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add a new todo
export const addTodo = async (uid, todo) => {
  return await addDoc(collection(db, "users", uid, "todos"), todo);
};

// Update todo (title or completed)
export const updateTodo = async (uid, id, data) => {
  return await updateDoc(doc(db, "users", uid, "todos", id), data);
};

// Delete todo
export const deleteTodo = async (uid, id) => {
  return await deleteDoc(doc(db, "users", uid, "todos", id));
};
