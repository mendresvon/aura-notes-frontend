import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getNotes, createNote, updateNote, deleteNote } from "../services/api";
import Modal from "react-modal";
import NoteForm from "../components/NoteForm";

// Set the app element for accessibility
Modal.setAppElement("#root");

const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null); // Tracks the note being edited

  // Memoized function to fetch notes from the API
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const userNotes = await getNotes();
      setNotes(userNotes);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      if (error.msg === "Token is not valid") {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // --- Modal and Note Handlers ---

  const handleOpenModalForCreate = () => {
    setEditingNote(null); // Ensure we're not editing
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        // Update existing note
        await updateNote(editingNote._id, noteData);
      } else {
        // Create new note
        await createNote(noteData);
      }
      handleCloseModal();
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    // A simple confirmation dialog
    if (window.confirm("Are you sure you want to permanently delete this note?")) {
      try {
        await deleteNote(id);
        fetchNotes(); // Refresh the notes list
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  return (
    <div className="min-h-full bg-[#111111] text-gray-200">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1
                className="text-2xl font-bold text-gray-100"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Aura Notes
              </h1>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-black/20 rounded-md hover:bg-purple-600/50 transition-colors duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Your Notes</h2>
          <button
            onClick={handleOpenModalForCreate}
            className="px-5 py-2 text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:opacity-90 transition-opacity duration-300">
            + New Note
          </button>
        </div>

        {/* Notes Grid or Placeholder */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading your notes...</div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-black/30 p-6 rounded-lg border border-white/10 shadow-lg flex flex-col justify-between hover:border-purple-500/50 transition-colors duration-300">
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-200">{note.title}</h3>
                  <p className="text-gray-400 line-clamp-4 whitespace-pre-wrap">{note.content}</p>
                </div>
                <div className="mt-4 flex justify-end gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleOpenModalForEdit(note)}
                    className="text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-500">You don't have any notes yet.</p>
            <p className="text-gray-600 text-sm mt-2">Click "New Note" to get started.</p>
          </div>
        )}
      </main>

      {/* Modal for Creating/Editing */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel={editingNote ? "Edit Note" : "New Note"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#18181B]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-lg p-8 text-white outline-none"
          overlayClassName="fixed inset-0 bg-black/60 z-30">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {editingNote ? "Edit Note" : "New Note"}
          </h2>
          <NoteForm onSave={handleSaveNote} onCancel={handleCloseModal} note={editingNote} />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
