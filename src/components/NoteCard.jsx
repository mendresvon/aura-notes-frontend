// src/components/NoteCard.jsx

import React, { useState, useRef, useEffect } from "react";
import { FiEdit, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { format } from "date-fns";

const NoteCard = ({ note, onEdit, onDelete, index }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Create a ref to attach to the menu container

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(note._id);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  // Effect to handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener to the document when the menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup: remove the event listener when the component unmounts or menu closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // This effect depends on the isMenuOpen state

  return (
    <div
      onClick={() => onEdit(note)}
      className="bg-black/40 backdrop-blur-xl p-6 rounded-lg border border-white/10 shadow-lg flex flex-col justify-between group cursor-pointer hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp mb-6 break-inside-avoid-column"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}>
      <div className="flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-100">{note.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-6 whitespace-pre-wrap">{note.content}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-white/1 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {note.updatedAt ? format(new Date(note.updatedAt), "MMM d, yyyy") : ""}
        </span>
        
        {/* Desktop: Buttons appear on hover */}
        <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleEditClick}
            className="p-2 bg-transparent! rounded-full hover:bg-white/10 text-gray-400 hover:text-purple-400 transition-colors"
            aria-label="Edit note">
            <FiEdit size={18} />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 bg-transparent! rounded-full hover:bg-white/10 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete note">
            <FiTrash2 size={18} />
          </button>
        </div>

        {/* Mobile: Three-dots menu */}
        <div className="relative md:hidden" ref={menuRef}>
          <button
            onClick={handleMenuToggle}
            className="p-2 bg-transparent! rounded-full hover:bg-white/10 text-gray-400"
            aria-label="Options menu">
            <FiMoreVertical size={18} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-32 bg-zinc-800 rounded-md shadow-lg z-10 border border-white/10">
              <button
                onClick={handleEditClick}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 flex items-center gap-2 rounded-t-md"
              >
                <FiEdit size={16} /> Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 flex items-center gap-2 rounded-b-md"
              >
                <FiTrash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;