import axios from "axios";

// Create an instance of axios with a base URL
const api = axios.create({
  baseURL: "https://aura-notes-backend-5omd.onrender.com/", // Your backend server's URL
});

// Interceptor: Automatically attach the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AUTH FUNCTIONS ---

// Function to handle user registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to handle user login
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data; // This will return { token: "..." }
  } catch (error) {
    throw error.response.data;
  }
};

// --- NOTES FUNCTIONS ---

// Function to get all notes for the logged-in user
export const getNotes = async () => {
  try {
    const response = await api.get("/notes");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to create a new note
export const createNote = async (noteData) => {
  try {
    const response = await api.post("/notes", noteData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to update an existing note
export const updateNote = async (id, noteData) => {
  try {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to delete a note
export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
