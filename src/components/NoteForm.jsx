import React, { useState, useEffect } from "react";

const NoteForm = ({ onSave, onCancel, note }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
          className="w-full p-3 rounded-md bg-black/40 border border-white/20 placeholder-gray-500 focus:ring-1 focus:ring-purple-600 outline-none transition-all duration-300 hover:border-purple-800"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="10"
          className="w-full p-3 rounded-md bg-black/40 border border-white/20 placeholder-gray-500 focus:ring-1 focus:ring-purple-600 outline-none resize-y transition-all duration-300 hover:border-purple-800"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 bg-black/90! text-gray-400 font-semibold rounded-md hover:bg-white/5 hover:text-white transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-white font-semibold bg-gradient-to-l from-purple-900 to-indigo-900 rounded-md hover:opacity-90 transform hover:-translate-y-1 !transition-transform">
          Save Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
