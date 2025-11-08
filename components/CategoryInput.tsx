
import React, { useState } from 'react';
import { Category } from '../types';
import PlusIcon from './icons/PlusIcon';

interface CategoryInputProps {
  onAddCategory: (category: Category) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [extensions, setExtensions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && extensions.trim()) {
      const extensionArray = extensions
        .split(',')
        .map(ext => {
            let trimmed = ext.trim();
            if (trimmed && !trimmed.startsWith('.')) {
                return '.' + trimmed;
            }
            return trimmed;
        })
        .filter(ext => ext);
      
      onAddCategory({ name: name.trim(), extensions: Array.from(new Set(extensionArray)) });
      setName('');
      setExtensions('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name (e.g., 'Images')"
        className="w-full sm:w-1/3 px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        required
      />
      <input
        type="text"
        value={extensions}
        onChange={(e) => setExtensions(e.target.value)}
        placeholder="Extensions (e.g., jpg, png, gif)"
        className="w-full sm:flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        required
      />
      <button
        type="submit"
        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors duration-200"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Category
      </button>
    </form>
  );
};

export default CategoryInput;
