// src/components/NoteCard.jsx

import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";

const NoteCard = ({ note, onEdit, onDelete, index }) => {
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(note._id);
  };

  return (
    <div
      onClick={() => onEdit(note)}
      // Key changes for masonry layout and slightly refined styling
      className="bg-black/40 backdrop-blur-xl p-6 rounded-lg border border-white/10 shadow-lg flex flex-col justify-between group cursor-pointer hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp mb-6 break-inside-avoid-column"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}>
      <div className="flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-100">{note.title}</h3>
        {/* Increased line-clamp for better content preview in a masonry grid */}
        <p className="text-gray-400 text-sm line-clamp-6 whitespace-pre-wrap">{note.content}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-white/1 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {note.updatedAt ? format(new Date(note.updatedAt), "MMM d, yyyy") : ""}
        </span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      </div>
    </div>
  );
};

export default NoteCard;
