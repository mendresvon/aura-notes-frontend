import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getNotes, createNote, updateNote, deleteNote } from "../services/api";
import Modal from "react-modal";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import GlowingCursor from "../components/GlowingCursor"; // Import the new component

Modal.setAppElement("#root");

const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const userNotes = await getNotes();
      setNotes(userNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      if (error.response && error.response.status === 401) {
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

  const handleOpenModalForCreate = () => {
    setEditingNote(null);
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
        await updateNote(editingNote._id, noteData);
      } else {
        await createNote(noteData);
      }
      handleCloseModal();
      fetchNotes();
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this note?")) {
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-full bg-[#111111] text-gray-200 font-sans overflow-hidden relative">
      <GlowingCursor />

      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <header className="bg-black/30 backdrop-blur-xl border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1
              className="text-2xl font-bold font-serif text-gray-100"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Aura Notes
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-l p-2 pl-10 rounded-md bg-zinc-800/80 border border-zinc-700 text-gray-200 placeholder-gray-500 hover:border-purple-600 focus:ring-1 focus:ring-purple-700 focus:border-purple-500 outline-none transition-all duration-300"
                />
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 !bg-transparent text-sm font-medium !text-gray-400 rounded-md hover:bg-white/10 hover:text-white! transition-all duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10 relative">
        <div className="flex justify-end items-center mb-8">
          <button
            onClick={handleOpenModalForCreate}
            className="px-5 py-2 text-white font-semibold bg-gradient-to-l from-purple-900 to-indigo-900 rounded-md shadow-lg hover:opacity-90 transform hover:scale-105 !transition-transform duration-300 ease-in-out">
            + New Note
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading your notes...</div>
        ) : filteredNotes.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {filteredNotes.map((note, index) => (
              <NoteCard
                key={note._id}
                note={note}
                index={index}
                onEdit={handleOpenModalForEdit}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg bg-black/20 backdrop-blur-sm mt-8 animate-fadeInUp">
            <p className="text-gray-400 text-lg">You don't have any notes yet.</p>
            <p className="text-gray-500 text-sm mt-2">Click "New Note" to get started.</p>
          </div>
        )}
      </main>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel={editingNote ? "Edit Note" : "New Note"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#18181B]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-lg p-8 text-white outline-none animate-fadeInUp"
          overlayClassName="fixed inset-0 bg-black/60 z-30">
          <h2 className="text-2xl font-bold font-sans mb-6">
            {editingNote ? "Edit Note" : "New Note"}
          </h2>
          <NoteForm onSave={handleSaveNote} onCancel={handleCloseModal} note={editingNote} />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
